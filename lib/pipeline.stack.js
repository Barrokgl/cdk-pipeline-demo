"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const core_1 = require("@aws-cdk/core");
const pipelines_1 = require("@aws-cdk/pipelines");
const aws_codepipeline_actions_1 = require("@aws-cdk/aws-codepipeline-actions");
const demo_stage_1 = require("./demo.stage");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const pipeline_construct_1 = require("./pipeline.construct");
class PipelineStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const preProd = new demo_stage_1.DemoStage(this, 'pre-prod', {
            env: {
                region: 'us-east-1',
                account: '982637769374'
            }
        });
        const invokeLambda = new aws_lambda_1.Function(this, 'invoke-lambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            handler: 'invoke-test.handler',
            code: aws_lambda_1.Code.fromAsset('lambda')
        });
        pipeline_construct_1.PipelineConstruct.of(this, { id: 'Pipeline', stage: 'dev' })
            // .addGithubRepository({
            //     secretName: 'test-github-token',
            //     owner: 'Barrokgl',
            //     repo: 'cdk-pipeline-demo',
            //     branch: 'feature/*'
            // })
            .addS3Source({
            bucketName: 'dev-pipeline-sources',
            bucketPath: 'sources.zip'
        })
            .addPreDeployAction((_, next) => new aws_codepipeline_actions_1.ManualApprovalAction({
            actionName: 'PreDeployApprove',
            runOrder: next
        }))
            .addStage(preProd)
            .addAction((pipeline, nextRunOrder) => new pipelines_1.ShellScriptAction({
            actionName: 'TestService',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(preProd.urlOutput)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ],
            runOrder: nextRunOrder
        }))
            // .addInvokeLambdaAction(invokeLambda)
            // .addAction((_, nextRunOrder) => new ManualApprovalAction({
            //     actionName: 'Approve',
            //     runOrder: nextRunOrder
            // }))
            .build();
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUsyQztBQUMzQyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUN2RCx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHlCQUF5QjtZQUN6QixpQ0FBaUM7WUFDakMsMEJBQTBCO1lBQzFCLEtBQUs7YUFDSixXQUFXLENBQUM7WUFDVCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFVBQVUsRUFBRSxhQUFhO1NBQzVCLENBQUM7YUFDRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDdEQsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7YUFDRixRQUFRLENBQUMsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDekQsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO1lBQ0gsdUNBQXVDO1lBQ3ZDLDZEQUE2RDtZQUM3RCw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLE1BQU07YUFDTCxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFsREQsc0NBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7QXJ0aWZhY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQge0Nka1BpcGVsaW5lLCBTaGVsbFNjcmlwdEFjdGlvbiwgU2ltcGxlU3ludGhBY3Rpb259IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7XG4gICAgR2l0SHViU291cmNlQWN0aW9uLFxuICAgIExhbWJkYUludm9rZUFjdGlvbixcbiAgICBNYW51YWxBcHByb3ZhbEFjdGlvbixcbiAgICBTM1NvdXJjZUFjdGlvblxufSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQge0RlbW9TdGFnZX0gZnJvbSBcIi4vZGVtby5zdGFnZVwiO1xuaW1wb3J0IHtDb2RlLCBGdW5jdGlvbiwgUnVudGltZX0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7UGlwZWxpbmVDb25zdHJ1Y3R9IGZyb20gXCIuL3BpcGVsaW5lLmNvbnN0cnVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgcHJlUHJvZCA9IG5ldyBEZW1vU3RhZ2UodGhpcywgJ3ByZS1wcm9kJywge1xuICAgICAgICAgICAgZW52OiB7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50OiAnOTgyNjM3NzY5Mzc0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpbnZva2VMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgJ2ludm9rZS1sYW1iZGEnLCB7XG4gICAgICAgICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2ludm9rZS10ZXN0LmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpXG4gICAgICAgIH0pXG5cbiAgICAgICAgUGlwZWxpbmVDb25zdHJ1Y3Qub2YodGhpcywgeyBpZDogJ1BpcGVsaW5lJywgc3RhZ2U6ICdkZXYnfSlcbiAgICAgICAgICAgIC8vIC5hZGRHaXRodWJSZXBvc2l0b3J5KHtcbiAgICAgICAgICAgIC8vICAgICBzZWNyZXROYW1lOiAndGVzdC1naXRodWItdG9rZW4nLFxuICAgICAgICAgICAgLy8gICAgIG93bmVyOiAnQmFycm9rZ2wnLFxuICAgICAgICAgICAgLy8gICAgIHJlcG86ICdjZGstcGlwZWxpbmUtZGVtbycsXG4gICAgICAgICAgICAvLyAgICAgYnJhbmNoOiAnZmVhdHVyZS8qJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5hZGRTM1NvdXJjZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0TmFtZTogJ2Rldi1waXBlbGluZS1zb3VyY2VzJyxcbiAgICAgICAgICAgICAgICBidWNrZXRQYXRoOiAnc291cmNlcy56aXAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFByZURlcGxveUFjdGlvbigoXywgbmV4dCkgPT4gbmV3IE1hbnVhbEFwcHJvdmFsQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnUHJlRGVwbG95QXBwcm92ZScsXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZFN0YWdlKHByZVByb2QpXG4gICAgICAgICAgICAuYWRkQWN0aW9uKChwaXBlbGluZSwgbmV4dFJ1bk9yZGVyKSA9PiBuZXcgU2hlbGxTY3JpcHRBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdUZXN0U2VydmljZScsXG4gICAgICAgICAgICAgICAgdXNlT3V0cHV0czoge1xuICAgICAgICAgICAgICAgICAgICBFTkRQT0lOVF9VUkw6IHBpcGVsaW5lLnN0YWNrT3V0cHV0KHByZVByb2QudXJsT3V0cHV0KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRSdW5PcmRlclxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAvLyAuYWRkSW52b2tlTGFtYmRhQWN0aW9uKGludm9rZUxhbWJkYSlcbiAgICAgICAgICAgIC8vIC5hZGRBY3Rpb24oKF8sIG5leHRSdW5PcmRlcikgPT4gbmV3IE1hbnVhbEFwcHJvdmFsQWN0aW9uKHtcbiAgICAgICAgICAgIC8vICAgICBhY3Rpb25OYW1lOiAnQXBwcm92ZScsXG4gICAgICAgICAgICAvLyAgICAgcnVuT3JkZXI6IG5leHRSdW5PcmRlclxuICAgICAgICAgICAgLy8gfSkpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG59XG4iXX0=