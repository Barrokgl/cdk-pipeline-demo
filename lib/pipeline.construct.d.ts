import { Construct, Stage } from "@aws-cdk/core";
import { Artifact, IAction } from "@aws-cdk/aws-codepipeline";
import { CdkPipeline } from "@aws-cdk/pipelines";
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
export declare class PipelineConstruct {
    readonly sourceArtifact: Artifact;
    readonly cloudAssemblyArtifact: Artifact;
    private readonly scope;
    readonly id: string;
    private pipeline;
    private stage;
    private preDeployActions;
    private postDeployActions;
    private sourceAction;
    private synthAction;
    static of(scope: Construct, props: PipelineConstructProps): PipelineConstruct;
    private constructor();
    addS3Source({ bucketName, bucketPath }: S3Source): this;
    addGithubRepository({ secretName, owner, repo, branch }: GithubActionProps): this;
    addPreDeployAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction): this;
    addAppStage(stage: Stage): this;
    addPostDeployAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction): this;
    build(): this;
}
export {};
