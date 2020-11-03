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
            .addInvokeLambdaAction(invokeLambda)
            .addAction((_, nextRunOrder) => new aws_codepipeline_actions_1.ManualApprovalAction({
            actionName: 'Approve',
            runOrder: nextRunOrder
        }))
            .build();
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUsyQztBQUMzQyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUN2RCx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHlCQUF5QjtZQUN6QixpQ0FBaUM7WUFDakMsMEJBQTBCO1lBQzFCLEtBQUs7YUFDSixXQUFXLENBQUM7WUFDVCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFVBQVUsRUFBRSxhQUFhO1NBQzVCLENBQUM7YUFDRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDdEQsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7YUFDRixRQUFRLENBQUMsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDekQsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO2FBQ0YscUJBQXFCLENBQUMsWUFBWSxDQUFDO2FBQ25DLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDckQsVUFBVSxFQUFFLFNBQVM7WUFDckIsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO2FBQ0YsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBbERELHNDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RydWN0LCBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHN9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQge0FydGlmYWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZVwiO1xuaW1wb3J0IHtDZGtQaXBlbGluZSwgU2hlbGxTY3JpcHRBY3Rpb24sIFNpbXBsZVN5bnRoQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvcGlwZWxpbmVzXCI7XG5pbXBvcnQge1xuICAgIEdpdEh1YlNvdXJjZUFjdGlvbixcbiAgICBMYW1iZGFJbnZva2VBY3Rpb24sXG4gICAgTWFudWFsQXBwcm92YWxBY3Rpb24sXG4gICAgUzNTb3VyY2VBY3Rpb25cbn0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9uc1wiO1xuaW1wb3J0IHtEZW1vU3RhZ2V9IGZyb20gXCIuL2RlbW8uc3RhZ2VcIjtcbmltcG9ydCB7Q29kZSwgRnVuY3Rpb24sIFJ1bnRpbWV9IGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQge1BpcGVsaW5lQ29uc3RydWN0fSBmcm9tIFwiLi9waXBlbGluZS5jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHByZVByb2QgPSBuZXcgRGVtb1N0YWdlKHRoaXMsICdwcmUtcHJvZCcsIHtcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXG4gICAgICAgICAgICAgICAgYWNjb3VudDogJzk4MjYzNzc2OTM3NCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaW52b2tlTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdpbnZva2UtbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdpbnZva2UtdGVzdC5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgICAgICB9KVxuXG4gICAgICAgIFBpcGVsaW5lQ29uc3RydWN0Lm9mKHRoaXMsIHsgaWQ6ICdQaXBlbGluZScsIHN0YWdlOiAnZGV2J30pXG4gICAgICAgICAgICAvLyAuYWRkR2l0aHViUmVwb3NpdG9yeSh7XG4gICAgICAgICAgICAvLyAgICAgc2VjcmV0TmFtZTogJ3Rlc3QtZ2l0aHViLXRva2VuJyxcbiAgICAgICAgICAgIC8vICAgICBvd25lcjogJ0JhcnJva2dsJyxcbiAgICAgICAgICAgIC8vICAgICByZXBvOiAnY2RrLXBpcGVsaW5lLWRlbW8nLFxuICAgICAgICAgICAgLy8gICAgIGJyYW5jaDogJ2ZlYXR1cmUvKidcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAuYWRkUzNTb3VyY2Uoe1xuICAgICAgICAgICAgICAgIGJ1Y2tldE5hbWU6ICdkZXYtcGlwZWxpbmUtc291cmNlcycsXG4gICAgICAgICAgICAgICAgYnVja2V0UGF0aDogJ3NvdXJjZXMuemlwJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hZGRQcmVEZXBsb3lBY3Rpb24oKF8sIG5leHQpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ1ByZURlcGxveUFwcHJvdmUnLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5hZGRTdGFnZShwcmVQcm9kKVxuICAgICAgICAgICAgLmFkZEFjdGlvbigocGlwZWxpbmUsIG5leHRSdW5PcmRlcikgPT4gbmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZEludm9rZUxhbWJkYUFjdGlvbihpbnZva2VMYW1iZGEpXG4gICAgICAgICAgICAuYWRkQWN0aW9uKChfLCBuZXh0UnVuT3JkZXIpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0FwcHJvdmUnLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxufVxuIl19