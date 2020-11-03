import {Construct, SecretValue, Stage} from "@aws-cdk/core";
import {Artifact, IAction} from "@aws-cdk/aws-codepipeline";
import {GitHubSourceAction, LambdaInvokeAction, S3SourceAction, S3Trigger} from "@aws-cdk/aws-codepipeline-actions";
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines";
import {IFunction} from "@aws-cdk/aws-lambda";
import {Bucket} from "@aws-cdk/aws-s3";
import {ReadWriteType, Trail} from "@aws-cdk/aws-cloudtrail";
import {BuildEnvironmentVariableType} from "@aws-cdk/aws-codebuild";

export interface PipelineConstructProps {
    id: string;
    stage: string;
}

interface GithubActionProps {
    secretName: string;
    owner: string;
    repo: string;
    branch?: string;
}

interface S3Source {
    bucketName: string;
    bucketPath: string;
}

export class PipelineConstruct {
    readonly sourceArtifact: Artifact;
    readonly cloudAssemblyArtifact: Artifact;

    private readonly scope: Construct;
    readonly id: string;

    private pipeline: CdkPipeline;
    private stage: Stage;

    private preDeployActions: Array<(pipeline: CdkPipeline, nextRunOrder: number) => IAction> = [];
    private actions: Array<(pipeline: CdkPipeline, nextRunOrder: number) => IAction> = [];
    private sourceAction: IAction;
    private synthAction: IAction;

    static of(scope: Construct, props: PipelineConstructProps) {
        return new PipelineConstruct(scope, props);
    }

    private constructor(scope: Construct, props: PipelineConstructProps) {
        this.scope = scope;
        this.id = props.id;
        this.sourceArtifact = new Artifact();
        this.cloudAssemblyArtifact = new Artifact();

        this.synthAction = SimpleSynthAction.standardNpmSynth({
            sourceArtifact: this.sourceArtifact,
            cloudAssemblyArtifact: this.cloudAssemblyArtifact,
            buildCommand: 'npm run build',
            environmentVariables: {
                'STAGE': {
                    type: BuildEnvironmentVariableType.PLAINTEXT,
                    value: props.stage
                }
            }
        });
        return this;
    }

    addS3Source({bucketName, bucketPath}: S3Source) {
        const bucket = Bucket.fromBucketName(this.scope, bucketName, bucketName)

        const trail = new Trail(this.scope, `${this.id}-cloud-trail`);

        trail.addS3EventSelector([{bucket, objectPrefix: bucket.arnForObjects(bucketPath)}], {
            readWriteType: ReadWriteType.WRITE_ONLY,
        });

        bucket.onCloudTrailPutObject(`${this.id}-event-rule`, {
            paths: [bucketPath]
        });

        this.sourceAction = new S3SourceAction({
            actionName: 'S3Source',
            bucketKey: bucketPath,
            bucket: bucket,
            output: this.sourceArtifact,
            trigger: S3Trigger.EVENTS,
        });
        return this;
    }

    addGithubRepository({secretName, owner, repo, branch = 'develop'}: GithubActionProps) {
        this.sourceAction = new GitHubSourceAction({
            actionName: 'GithubSource',
            output: this.sourceArtifact,
            oauthToken: SecretValue.secretsManager(secretName),
            owner,
            repo,
            branch,
        });
        return this;
    }

    addPreDeployAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction) {
        this.preDeployActions.push(fun);
        return this;
    }

    addStage(stage: Stage) {
        this.stage = stage;
        return this;
    }

    addAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction) {
        this.actions.push(fun);
        return this;
    }

    addInvokeLambdaAction(lambda: IFunction, params?: {[key: string]: unknown}) {

        this.addAction((_, nextRunOrder) => new LambdaInvokeAction({
            lambda: lambda,
            actionName: `InvokeLambda`,
            userParameters: params,
            runOrder: nextRunOrder
        }));
        return this;
    }

    build() {
        this.pipeline = new CdkPipeline(this.scope, this.id, {
            pipelineName: this.id,
            cloudAssemblyArtifact: this.cloudAssemblyArtifact,
            sourceAction: this.sourceAction,
            synthAction: this.synthAction,
        });

        if (this.preDeployActions.length > 0) {
            const preDeploy = this.pipeline.addStage('PreDeploy');
            this.preDeployActions.forEach(f => {
                preDeploy.addActions(f(this.pipeline, preDeploy.nextSequentialRunOrder()));
            });
        }

        if (this.stage !== undefined) {
            const appStage = this.pipeline.addApplicationStage(this.stage);
            appStage.nextSequentialRunOrder()
            this.actions.forEach(f => {
                appStage.addActions(f(this.pipeline, appStage.nextSequentialRunOrder()))
            });
        }

        return this;
    }
}
