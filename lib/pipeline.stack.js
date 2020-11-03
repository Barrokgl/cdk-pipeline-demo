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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUsyQztBQUMzQyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFDLENBQUM7WUFDekMseUJBQXlCO1lBQ3pCLHVDQUF1QztZQUN2Qyx5QkFBeUI7WUFDekIsaUNBQWlDO1lBQ2pDLDBCQUEwQjtZQUMxQixLQUFLO2FBQ0osV0FBVyxDQUFDO1lBQ1QsVUFBVSxFQUFFLHNCQUFzQjtZQUNsQyxVQUFVLEVBQUUsYUFBYTtTQUM1QixDQUFDO2FBQ0Qsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLCtDQUFvQixDQUFDO1lBQ3RELFVBQVUsRUFBRSxrQkFBa0I7WUFDOUIsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDO2FBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQzthQUNqQixTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLDZCQUFpQixDQUFDO1lBQ3pELFVBQVUsRUFBRSxhQUFhO1lBQ3pCLFVBQVUsRUFBRTtnQkFDUixZQUFZLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ3hEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLHlCQUF5QjthQUM1QjtZQUNELFFBQVEsRUFBRSxZQUFZO1NBQ3pCLENBQUMsQ0FBQzthQUNGLHFCQUFxQixDQUFDLFlBQVksQ0FBQzthQUNuQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLCtDQUFvQixDQUFDO1lBQ3JELFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFFBQVEsRUFBRSxZQUFZO1NBQ3pCLENBQUMsQ0FBQzthQUNGLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQWxERCxzQ0FrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnN0cnVjdCwgU2VjcmV0VmFsdWUsIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHtBcnRpZmFjdH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCB7Q2RrUGlwZWxpbmUsIFNoZWxsU2NyaXB0QWN0aW9uLCBTaW1wbGVTeW50aEFjdGlvbn0gZnJvbSBcIkBhd3MtY2RrL3BpcGVsaW5lc1wiO1xuaW1wb3J0IHtcbiAgICBHaXRIdWJTb3VyY2VBY3Rpb24sXG4gICAgTGFtYmRhSW52b2tlQWN0aW9uLFxuICAgIE1hbnVhbEFwcHJvdmFsQWN0aW9uLFxuICAgIFMzU291cmNlQWN0aW9uXG59IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcbmltcG9ydCB7RGVtb1N0YWdlfSBmcm9tIFwiLi9kZW1vLnN0YWdlXCI7XG5pbXBvcnQge0NvZGUsIEZ1bmN0aW9uLCBSdW50aW1lfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHtQaXBlbGluZUNvbnN0cnVjdH0gZnJvbSBcIi4vcGlwZWxpbmUuY29uc3RydWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBQaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBwcmVQcm9kID0gbmV3IERlbW9TdGFnZSh0aGlzLCAncHJlLXByb2QnLCB7XG4gICAgICAgICAgICBlbnY6IHtcbiAgICAgICAgICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAgICAgICAgICAgIGFjY291bnQ6ICc5ODI2Mzc3NjkzNzQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGludm9rZUxhbWJkYSA9IG5ldyBGdW5jdGlvbih0aGlzLCAnaW52b2tlLWxhbWJkYScsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICAgICAgICBoYW5kbGVyOiAnaW52b2tlLXRlc3QuaGFuZGxlcicsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnbGFtYmRhJylcbiAgICAgICAgfSlcblxuICAgICAgICBQaXBlbGluZUNvbnN0cnVjdC5vZih0aGlzLCB7IGlkOiAnUGlwZWxpbmUnfSlcbiAgICAgICAgICAgIC8vIC5hZGRHaXRodWJSZXBvc2l0b3J5KHtcbiAgICAgICAgICAgIC8vICAgICBzZWNyZXROYW1lOiAndGVzdC1naXRodWItdG9rZW4nLFxuICAgICAgICAgICAgLy8gICAgIG93bmVyOiAnQmFycm9rZ2wnLFxuICAgICAgICAgICAgLy8gICAgIHJlcG86ICdjZGstcGlwZWxpbmUtZGVtbycsXG4gICAgICAgICAgICAvLyAgICAgYnJhbmNoOiAnZmVhdHVyZS8qJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC5hZGRTM1NvdXJjZSh7XG4gICAgICAgICAgICAgICAgYnVja2V0TmFtZTogJ2Rldi1waXBlbGluZS1zb3VyY2VzJyxcbiAgICAgICAgICAgICAgICBidWNrZXRQYXRoOiAnc291cmNlcy56aXAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZFByZURlcGxveUFjdGlvbigoXywgbmV4dCkgPT4gbmV3IE1hbnVhbEFwcHJvdmFsQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnUHJlRGVwbG95QXBwcm92ZScsXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZFN0YWdlKHByZVByb2QpXG4gICAgICAgICAgICAuYWRkQWN0aW9uKChwaXBlbGluZSwgbmV4dFJ1bk9yZGVyKSA9PiBuZXcgU2hlbGxTY3JpcHRBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdUZXN0U2VydmljZScsXG4gICAgICAgICAgICAgICAgdXNlT3V0cHV0czoge1xuICAgICAgICAgICAgICAgICAgICBFTkRQT0lOVF9VUkw6IHBpcGVsaW5lLnN0YWNrT3V0cHV0KHByZVByb2QudXJsT3V0cHV0KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRSdW5PcmRlclxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAuYWRkSW52b2tlTGFtYmRhQWN0aW9uKGludm9rZUxhbWJkYSlcbiAgICAgICAgICAgIC5hZGRBY3Rpb24oKF8sIG5leHRSdW5PcmRlcikgPT4gbmV3IE1hbnVhbEFwcHJvdmFsQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnQXBwcm92ZScsXG4gICAgICAgICAgICAgICAgcnVuT3JkZXI6IG5leHRSdW5PcmRlclxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG59XG4iXX0=