import {Construct, SecretValue, Stage} from "@aws-cdk/core";
import {Artifact, IAction} from "@aws-cdk/aws-codepipeline";
import {Action, GitHubSourceAction, LambdaInvokeAction} from "@aws-cdk/aws-codepipeline-actions";
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines";
import {IFunction} from "@aws-cdk/aws-lambda";
import {pipeline} from "stream";

export interface PipelineConstructProps {
    id: string;
}

interface GithubActionProps {
    secretName: string;
    owner: string;
    repo: string;
    branch?: string;
}

export class PipelineConstruct {
    readonly sourceArtifact: Artifact;
    readonly cloudAssemblyArtifact: Artifact;

    private readonly scope: Construct;
    readonly id: string;

    private pipeline: CdkPipeline;
    private stage: Stage;

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
            buildCommand: 'npm run build'
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

    addStage(stage: Stage) {
        this.stage = stage;
        return this;
    }

    addAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction) {
        this.actions.push(fun)
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
            crossAccountKeys: false
        });

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
