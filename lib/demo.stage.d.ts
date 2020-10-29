import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
export declare class DemoStage extends Stage {
    readonly urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: StageProps);
}
