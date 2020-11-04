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
        super(scope, id, {
            ...props, env: {
                region: 'us-east-1',
                account: '982637769374'
            }
        });
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
            .addAppStage(preProd)
            .addPostDeployAction((pipeline, nextRunOrder) => new pipelines_1.ShellScriptAction({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUsyQztBQUMzQyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDYixHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLE9BQU8sRUFBRSxjQUFjO2FBQzFCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUN0RCx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHlCQUF5QjtZQUN6QixpQ0FBaUM7WUFDakMsMEJBQTBCO1lBQzFCLEtBQUs7YUFDSixXQUFXLENBQUM7WUFDVCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFVBQVUsRUFBRSxhQUFhO1NBQzVCLENBQUM7YUFDRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDdEQsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7YUFDRixXQUFXLENBQUMsT0FBTyxDQUFDO2FBQ3BCLG1CQUFtQixDQUFDLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsSUFBSSw2QkFBaUIsQ0FBQztZQUNuRSxVQUFVLEVBQUUsYUFBYTtZQUN6QixVQUFVLEVBQUU7Z0JBQ1IsWUFBWSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUN4RDtZQUNELFFBQVEsRUFBRTtnQkFDTix5QkFBeUI7YUFDNUI7WUFDRCxRQUFRLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7WUFDSCx1Q0FBdUM7WUFDdkMsNkRBQTZEO1lBQzdELDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsTUFBTTthQUNMLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQXZERCxzQ0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnN0cnVjdCwgU2VjcmV0VmFsdWUsIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHtBcnRpZmFjdH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCB7Q2RrUGlwZWxpbmUsIFNoZWxsU2NyaXB0QWN0aW9uLCBTaW1wbGVTeW50aEFjdGlvbn0gZnJvbSBcIkBhd3MtY2RrL3BpcGVsaW5lc1wiO1xuaW1wb3J0IHtcbiAgICBHaXRIdWJTb3VyY2VBY3Rpb24sXG4gICAgTGFtYmRhSW52b2tlQWN0aW9uLFxuICAgIE1hbnVhbEFwcHJvdmFsQWN0aW9uLFxuICAgIFMzU291cmNlQWN0aW9uXG59IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcbmltcG9ydCB7RGVtb1N0YWdlfSBmcm9tIFwiLi9kZW1vLnN0YWdlXCI7XG5pbXBvcnQge0NvZGUsIEZ1bmN0aW9uLCBSdW50aW1lfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHtQaXBlbGluZUNvbnN0cnVjdH0gZnJvbSBcIi4vcGlwZWxpbmUuY29uc3RydWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBQaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHtcbiAgICAgICAgICAgIC4uLnByb3BzLCBlbnY6IHtcbiAgICAgICAgICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAgICAgICAgICAgIGFjY291bnQ6ICc5ODI2Mzc3NjkzNzQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHByZVByb2QgPSBuZXcgRGVtb1N0YWdlKHRoaXMsICdwcmUtcHJvZCcsIHtcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXG4gICAgICAgICAgICAgICAgYWNjb3VudDogJzk4MjYzNzc2OTM3NCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW52b2tlTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdpbnZva2UtbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdpbnZva2UtdGVzdC5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgICAgICB9KVxuXG4gICAgICAgIFBpcGVsaW5lQ29uc3RydWN0Lm9mKHRoaXMsIHtpZDogJ1BpcGVsaW5lJywgc3RhZ2U6ICdkZXYnfSlcbiAgICAgICAgICAgIC8vIC5hZGRHaXRodWJSZXBvc2l0b3J5KHtcbiAgICAgICAgICAgIC8vICAgICBzZWNyZXROYW1lOiAndGVzdC1naXRodWItdG9rZW4nLFxuICAgICAgICAgICAgLy8gICAgIG93bmVyOiAnQmFycm9rZ2wnLFxuICAgICAgICAgICAgLy8gICAgIHJlcG86ICdjZGstcGlwZWxpbmUtZGVtbycsXG4gICAgICAgICAgICAvLyAgICAgYnJhbmNoOiAnZmVhdHVyZS8qJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5hZGRTM1NvdXJjZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0TmFtZTogJ2Rldi1waXBlbGluZS1zb3VyY2VzJyxcbiAgICAgICAgICAgICAgICBidWNrZXRQYXRoOiAnc291cmNlcy56aXAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFByZURlcGxveUFjdGlvbigoXywgbmV4dCkgPT4gbmV3IE1hbnVhbEFwcHJvdmFsQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnUHJlRGVwbG95QXBwcm92ZScsXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZEFwcFN0YWdlKHByZVByb2QpXG4gICAgICAgICAgICAuYWRkUG9zdERlcGxveUFjdGlvbigocGlwZWxpbmUsIG5leHRSdW5PcmRlcikgPT4gbmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLy8gLmFkZEludm9rZUxhbWJkYUFjdGlvbihpbnZva2VMYW1iZGEpXG4gICAgICAgICAgICAvLyAuYWRkQWN0aW9uKChfLCBuZXh0UnVuT3JkZXIpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAvLyAgICAgYWN0aW9uTmFtZTogJ0FwcHJvdmUnLFxuICAgICAgICAgICAgLy8gICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIC8vIH0pKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxufVxuIl19