"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const core_1 = require("@aws-cdk/core");
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
            // .addStage(preProd)
            // .addAction((pipeline) => new ShellScriptAction({
            //     actionName: 'TestService',
            //     useOutputs: {
            //         ENDPOINT_URL: pipeline.stackOutput(preProd.urlOutput)
            //     },
            //     commands: [
            //         'curl -Ssf $ENDPOINT_URL'
            //     ]
            // }))
            // .addInvokeLambdaAction(invokeLambda)
            // .addAction(() => new ManualApprovalAction({
            //     actionName: 'Approve'
            // }))
            .build();
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFJeEUsNkNBQXVDO0FBQ3ZDLG9EQUE0RDtBQUM1RCw2REFBdUQ7QUFFdkQsTUFBYSxhQUFjLFNBQVEsWUFBSztJQUNwQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzVDLEdBQUcsRUFBRTtnQkFDRCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsT0FBTyxFQUFFLGNBQWM7YUFDMUI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNyRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUNqQyxDQUFDLENBQUE7UUFFRixzQ0FBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxDQUFDO2FBQ3hDLG1CQUFtQixDQUFDO1lBQ2pCLFVBQVUsRUFBRSxtQkFBbUI7WUFDL0IsS0FBSyxFQUFFLFVBQVU7WUFDakIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDO1lBQ0YscUJBQXFCO1lBQ3JCLG1EQUFtRDtZQUNuRCxpQ0FBaUM7WUFDakMsb0JBQW9CO1lBQ3BCLGdFQUFnRTtZQUNoRSxTQUFTO1lBQ1Qsa0JBQWtCO1lBQ2xCLG9DQUFvQztZQUNwQyxRQUFRO1lBQ1IsTUFBTTtZQUNOLHVDQUF1QztZQUN2Qyw4Q0FBOEM7WUFDOUMsNEJBQTRCO1lBQzVCLE1BQU07YUFDTCxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUF4Q0Qsc0NBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7QXJ0aWZhY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQge0Nka1BpcGVsaW5lLCBTaGVsbFNjcmlwdEFjdGlvbiwgU2ltcGxlU3ludGhBY3Rpb259IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7R2l0SHViU291cmNlQWN0aW9uLCBMYW1iZGFJbnZva2VBY3Rpb24sIE1hbnVhbEFwcHJvdmFsQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQge0RlbW9TdGFnZX0gZnJvbSBcIi4vZGVtby5zdGFnZVwiO1xuaW1wb3J0IHtDb2RlLCBGdW5jdGlvbiwgUnVudGltZX0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7UGlwZWxpbmVDb25zdHJ1Y3R9IGZyb20gXCIuL3BpcGVsaW5lLmNvbnN0cnVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgcHJlUHJvZCA9IG5ldyBEZW1vU3RhZ2UodGhpcywgJ3ByZS1wcm9kJywge1xuICAgICAgICAgICAgZW52OiB7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50OiAnOTgyNjM3NzY5Mzc0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpbnZva2VMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgJ2ludm9rZS1sYW1iZGEnLCB7XG4gICAgICAgICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgICAgICAgaGFuZGxlcjogJ2ludm9rZS10ZXN0LmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpXG4gICAgICAgIH0pXG5cbiAgICAgICAgUGlwZWxpbmVDb25zdHJ1Y3Qub2YodGhpcywgeyBpZDogJ1BpcGVsaW5lJ30pXG4gICAgICAgICAgICAuYWRkR2l0aHViUmVwb3NpdG9yeSh7XG4gICAgICAgICAgICAgICAgc2VjcmV0TmFtZTogJ3Rlc3QtZ2l0aHViLXRva2VuJyxcbiAgICAgICAgICAgICAgICBvd25lcjogJ0JhcnJva2dsJyxcbiAgICAgICAgICAgICAgICByZXBvOiAnY2RrLXBpcGVsaW5lLWRlbW8nLFxuICAgICAgICAgICAgICAgIGJyYW5jaDogJ21haW4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmFkZFN0YWdlKHByZVByb2QpXG4gICAgICAgICAgICAvLyAuYWRkQWN0aW9uKChwaXBlbGluZSkgPT4gbmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgIC8vICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgICAgICAgLy8gICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAvLyAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgIC8vICAgICBdXG4gICAgICAgICAgICAvLyB9KSlcbiAgICAgICAgICAgIC8vIC5hZGRJbnZva2VMYW1iZGFBY3Rpb24oaW52b2tlTGFtYmRhKVxuICAgICAgICAgICAgLy8gLmFkZEFjdGlvbigoKSA9PiBuZXcgTWFudWFsQXBwcm92YWxBY3Rpb24oe1xuICAgICAgICAgICAgLy8gICAgIGFjdGlvbk5hbWU6ICdBcHByb3ZlJ1xuICAgICAgICAgICAgLy8gfSkpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG59XG4iXX0=