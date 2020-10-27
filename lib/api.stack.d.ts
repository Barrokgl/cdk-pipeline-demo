import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
export declare class ApiStack extends Stack {
    readonly urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: StackProps);
}
