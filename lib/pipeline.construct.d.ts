import { Construct, Stage } from "@aws-cdk/core";
import { Artifact, IAction } from "@aws-cdk/aws-codepipeline";
import { CdkPipeline } from "@aws-cdk/pipelines";
import { IFunction } from "@aws-cdk/aws-lambda";
export interface PipelineConstructProps {
    id: string;
}
interface GithubActionProps {
    secretName: string;
    owner: string;
    repo: string;
    branch?: string;
}
export declare class PipelineConstruct {
    readonly sourceArtifact: Artifact;
    readonly cloudAssemblyArtifact: Artifact;
    private readonly scope;
    readonly id: string;
    private pipeline;
    private stage;
    private actions;
    private sourceAction;
    private synthAction;
    static of(scope: Construct, props: PipelineConstructProps): PipelineConstruct;
    private constructor();
    addGithubRepository({ secretName, owner, repo, branch }: GithubActionProps): this;
    addStage(stage: Stage): this;
    addAction(fun: (pipeline: CdkPipeline, nextRunOrder: number) => IAction): this;
    addInvokeLambdaAction(lambda: IFunction, params?: {
        [key: string]: unknown;
    }): this;
    build(): this;
}
export {};
