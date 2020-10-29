import {CfnOutput, Construct, Stack, StackProps} from "@aws-cdk/core";
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import * as path from 'path';
import {LambdaRestApi} from "@aws-cdk/aws-apigateway";

export class ApiStack extends Stack {
    readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const handler = new Function(this, 'lambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'handler.handler',
            code: Code.fromAsset('lambda')
        });

        const gateway = new LambdaRestApi(this, 'rest-api', {
            description: 'apigateway',
            handler
        });


        this.urlOutput = new CfnOutput(this, 'url', {
            value: gateway.url
        });
    }

}
