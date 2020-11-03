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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFFeEUsa0RBQXFGO0FBQ3JGLGdGQUsyQztBQUMzQyw2Q0FBdUM7QUFDdkMsb0RBQTREO0FBQzVELDZEQUF1RDtBQUV2RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDYixHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLE9BQU8sRUFBRSxjQUFjO2FBQzFCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ2pDLENBQUMsQ0FBQTtRQUVGLHNDQUFpQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztZQUN0RCx5QkFBeUI7WUFDekIsdUNBQXVDO1lBQ3ZDLHlCQUF5QjtZQUN6QixpQ0FBaUM7WUFDakMsMEJBQTBCO1lBQzFCLEtBQUs7YUFDSixXQUFXLENBQUM7WUFDVCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFVBQVUsRUFBRSxhQUFhO1NBQzVCLENBQUM7YUFDRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksK0NBQW9CLENBQUM7WUFDdEQsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7YUFDRixRQUFRLENBQUMsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDekQsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO1lBQ0gsdUNBQXVDO1lBQ3ZDLDZEQUE2RDtZQUM3RCw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLE1BQU07YUFDTCxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUF2REQsc0NBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7QXJ0aWZhY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQge0Nka1BpcGVsaW5lLCBTaGVsbFNjcmlwdEFjdGlvbiwgU2ltcGxlU3ludGhBY3Rpb259IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7XG4gICAgR2l0SHViU291cmNlQWN0aW9uLFxuICAgIExhbWJkYUludm9rZUFjdGlvbixcbiAgICBNYW51YWxBcHByb3ZhbEFjdGlvbixcbiAgICBTM1NvdXJjZUFjdGlvblxufSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQge0RlbW9TdGFnZX0gZnJvbSBcIi4vZGVtby5zdGFnZVwiO1xuaW1wb3J0IHtDb2RlLCBGdW5jdGlvbiwgUnVudGltZX0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7UGlwZWxpbmVDb25zdHJ1Y3R9IGZyb20gXCIuL3BpcGVsaW5lLmNvbnN0cnVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCB7XG4gICAgICAgICAgICAuLi5wcm9wcywgZW52OiB7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50OiAnOTgyNjM3NzY5Mzc0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcmVQcm9kID0gbmV3IERlbW9TdGFnZSh0aGlzLCAncHJlLXByb2QnLCB7XG4gICAgICAgICAgICBlbnY6IHtcbiAgICAgICAgICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAgICAgICAgICAgIGFjY291bnQ6ICc5ODI2Mzc3NjkzNzQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGludm9rZUxhbWJkYSA9IG5ldyBGdW5jdGlvbih0aGlzLCAnaW52b2tlLWxhbWJkYScsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICAgICAgICBoYW5kbGVyOiAnaW52b2tlLXRlc3QuaGFuZGxlcicsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnbGFtYmRhJylcbiAgICAgICAgfSlcblxuICAgICAgICBQaXBlbGluZUNvbnN0cnVjdC5vZih0aGlzLCB7aWQ6ICdQaXBlbGluZScsIHN0YWdlOiAnZGV2J30pXG4gICAgICAgICAgICAvLyAuYWRkR2l0aHViUmVwb3NpdG9yeSh7XG4gICAgICAgICAgICAvLyAgICAgc2VjcmV0TmFtZTogJ3Rlc3QtZ2l0aHViLXRva2VuJyxcbiAgICAgICAgICAgIC8vICAgICBvd25lcjogJ0JhcnJva2dsJyxcbiAgICAgICAgICAgIC8vICAgICByZXBvOiAnY2RrLXBpcGVsaW5lLWRlbW8nLFxuICAgICAgICAgICAgLy8gICAgIGJyYW5jaDogJ2ZlYXR1cmUvKidcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAuYWRkUzNTb3VyY2Uoe1xuICAgICAgICAgICAgICAgIGJ1Y2tldE5hbWU6ICdkZXYtcGlwZWxpbmUtc291cmNlcycsXG4gICAgICAgICAgICAgICAgYnVja2V0UGF0aDogJ3NvdXJjZXMuemlwJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hZGRQcmVEZXBsb3lBY3Rpb24oKF8sIG5leHQpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ1ByZURlcGxveUFwcHJvdmUnLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5hZGRTdGFnZShwcmVQcm9kKVxuICAgICAgICAgICAgLmFkZEFjdGlvbigocGlwZWxpbmUsIG5leHRSdW5PcmRlcikgPT4gbmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLy8gLmFkZEludm9rZUxhbWJkYUFjdGlvbihpbnZva2VMYW1iZGEpXG4gICAgICAgICAgICAvLyAuYWRkQWN0aW9uKChfLCBuZXh0UnVuT3JkZXIpID0+IG5ldyBNYW51YWxBcHByb3ZhbEFjdGlvbih7XG4gICAgICAgICAgICAvLyAgICAgYWN0aW9uTmFtZTogJ0FwcHJvdmUnLFxuICAgICAgICAgICAgLy8gICAgIHJ1bk9yZGVyOiBuZXh0UnVuT3JkZXJcbiAgICAgICAgICAgIC8vIH0pKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxufVxuIl19