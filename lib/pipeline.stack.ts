import {Construct, SecretValue, Stack, StackProps} from "@aws-cdk/core";
import {Artifact} from "@aws-cdk/aws-codepipeline";
import {CdkPipeline, ShellScriptAction, SimpleSynthAction} from "@aws-cdk/pipelines";
import {GitHubSourceAction, LambdaInvokeAction, ManualApprovalAction} from "@aws-cdk/aws-codepipeline-actions";
import {DemoStage} from "./demo.stage";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda";
import {PipelineConstruct} from "./pipeline.construct";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const preProd = new DemoStage(this, 'pre-prod', {
            env: {
                region: 'us-east-1',
                account: '982637769374'
            }
        });

        const invokeLambda = new Function(this, 'invoke-lambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'invoke-test.handler',
            code: Code.fromAsset('lambda')
        })

        PipelineConstruct.of(this, { id: 'Pipeline'})
            .addGithubRepository({
                secretName: 'test-github-token',
                owner: 'Barrokgl',
                repo: 'cdk-pipeline-demo',
                branch: 'main'
            })
            .addPreDeployAction((_, next) => new ManualApprovalAction({
                actionName: 'PreDeployApprove',
                runOrder: next
            }))
            .addStage(preProd)
            .addAction((pipeline, nextRunOrder) => new ShellScriptAction({
                actionName: 'TestService',
                useOutputs: {
                    ENDPOINT_URL: pipeline.stackOutput(preProd.urlOutput)
                },
                commands: [
                    'curl -Ssf $ENDPOINT_URL'
                ],
                runOrder: nextRunOrder
            }))
            .addInvokeLambdaAction(invokeLambda)
            .addAction((_, nextRunOrder) => new ManualApprovalAction({
                actionName: 'Approve',
                runOrder: nextRunOrder
            }))
            .build();
    }
}
