import {CfnOutput, Construct, Stage, StageProps} from "@aws-cdk/core";
import {ApiStack} from "./api.stack";

export class DemoStage extends Stage {
    readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new ApiStack(this, 'web-service');

        this.urlOutput = service.urlOutput;
    }

}
