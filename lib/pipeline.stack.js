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
        pipeline_construct_1.PipelineConstruct.of(this, { id: 'Pipeline' })
            .addGithubRepository({
            secretName: 'test-github-token',
            owner: 'Barrokgl',
            repo: 'cdk-pipeline-demo',
            branch: 'main'
        })
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
            .addInvokeLambdaAction(invokeLambda)
            .addAction((_, nextRunOrder) => new aws_codepipeline_actions_1.ManualApprovalAction({
            actionName: 'Approve',
            runOrder: nextRunOrder
        }))
            .build();
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUErRztBQUMvRyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDeEMsbUJBQW1CLENBQUM7WUFDakIsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxNQUFNO1NBQ2pCLENBQUM7YUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDekQsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO2FBQ0YscUJBQXFCLENBQUMsWUFBWSxDQUFDO2FBQ25DLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDckQsVUFBVSxFQUFFLFNBQVM7WUFDckIsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO2FBQ0YsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBMUNELHNDQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RydWN0LCBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHN9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQge0FydGlmYWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZVwiO1xuaW1wb3J0IHtDZGtQaXBlbGluZSwgU2hlbGxTY3JpcHRBY3Rpb24sIFNpbXBsZVN5bnRoQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvcGlwZWxpbmVzXCI7XG5pbXBvcnQge0dpdEh1YlNvdXJjZUFjdGlvbiwgTGFtYmRhSW52b2tlQWN0aW9uLCBNYW51YWxBcHByb3ZhbEFjdGlvbn0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9uc1wiO1xuaW1wb3J0IHtEZW1vU3RhZ2V9IGZyb20gXCIuL2RlbW8uc3RhZ2VcIjtcbmltcG9ydCB7Q29kZSwgRnVuY3Rpb24sIFJ1bnRpbWV9IGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQge1BpcGVsaW5lQ29uc3RydWN0fSBmcm9tIFwiLi9waXBlbGluZS5jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHByZVByb2QgPSBuZXcgRGVtb1N0YWdlKHRoaXMsICdwcmUtcHJvZCcsIHtcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXG4gICAgICAgICAgICAgICAgYWNjb3VudDogJzk4MjYzNzc2OTM3NCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW52b2tlTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdpbnZva2UtbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdpbnZva2UtdGVzdC5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgICAgICB9KVxuXG4gICAgICAgIFBpcGVsaW5lQ29uc3RydWN0Lm9mKHRoaXMsIHsgaWQ6ICdQaXBlbGluZSd9KVxuICAgICAgICAgICAgLmFkZEdpdGh1YlJlcG9zaXRvcnkoe1xuICAgICAgICAgICAgICAgIHNlY3JldE5hbWU6ICd0ZXN0LWdpdGh1Yi10b2tlbicsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdCYXJyb2tnbCcsXG4gICAgICAgICAgICAgICAgcmVwbzogJ2Nkay1waXBlbGluZS1kZW1vJyxcbiAgICAgICAgICAgICAgICBicmFuY2g6ICdtYWluJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hZGRTdGFnZShwcmVQcm9kKVxuICAgICAgICAgICAgLmFkZEFjdGlvbigocGlwZWxpbmUsIG5leHRSdW5PcmRlcikgPT4gbmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZEludm9rZUxhbWJkYUFjdGlvbihpbnZva2VMYW1iZGEpXG4gICAgICAgICAgICAuYWRkQWN0aW9uKChfLCBuZXh0UnVuT3JkZXIpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0FwcHJvdmUnLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxufVxuIl19