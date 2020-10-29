import {Construct, SecretValue, Stack, StackProps} from "@aws-cdk/core";
import {Artifact} from "@aws-cdk/aws-codepipeline";
import {CdkPipeline, ShellScriptAction, SimpleSynthAction} from "@aws-cdk/pipelines";
import {GitHubSourceAction, LambdaInvokeAction, ManualApprovalAction} from "@aws-cdk/aws-codepipeline-actions";
import {DemoStage} from "./demo.stage";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceArtifact = new Artifact();
        const cloudAssemblyArtifact = new Artifact();

        // section for creating auto pipeline deploy
        const sourceAction = new GitHubSourceAction({
            actionName: 'GithubSource',
            output: sourceArtifact,
            oauthToken: SecretValue.secretsManager('test-github-token'),
            owner: 'Barrokgl',
            repo: 'cdk-pipeline-demo',
            branch: 'main'
        });

        const synthAction = SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build'
        });

        const pipeline = new CdkPipeline(this, 'Pipeline', {
            pipelineName: 'demo-pipeline',
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            sourceAction,
            synthAction
        });

        const preProd = new DemoStage(this, 'pre-prod', {
            env: {
                region: 'us-east-1',
                account: '982637769374'
            }
        });

        const preProdStage = pipeline.addApplicationStage(preProd);

        preProdStage.addActions(new ShellScriptAction({
            actionName: 'TestService',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(preProd.urlOutput)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ]
        }));

        const invokeLambda = new Function(this, 'invoke-lambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'invoke-test.handler',
            code: Code.fromAsset('lambda')
        })

        preProdStage.addActions(new LambdaInvokeAction({
            lambda: invokeLambda,
            actionName: 'iInvokeLambda',
            userParameters: {
                param1: '1',
                param2: '2'
            }
        }));

        // preProdStage.addActions(new ManualApprovalAction({
        //     runOrder: 3,
        //     actionName: 'Approve'
        // }));
    }
}
