"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const core_1 = require("@aws-cdk/core");
const aws_codepipeline_1 = require("@aws-cdk/aws-codepipeline");
const pipelines_1 = require("@aws-cdk/pipelines");
const aws_codepipeline_actions_1 = require("@aws-cdk/aws-codepipeline-actions");
const demo_stage_1 = require("./demo.stage");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
class PipelineStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const sourceArtifact = new aws_codepipeline_1.Artifact();
        const cloudAssemblyArtifact = new aws_codepipeline_1.Artifact();
        // section for creating auto pipeline deploy
        const sourceAction = new aws_codepipeline_actions_1.GitHubSourceAction({
            actionName: 'GithubSource',
            output: sourceArtifact,
            oauthToken: core_1.SecretValue.secretsManager('test-github-token'),
            owner: 'Barrokgl',
            repo: 'cdk-pipeline-demo',
            branch: 'main'
        });
        const synthAction = pipelines_1.SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build'
        });
        const pipeline = new pipelines_1.CdkPipeline(this, 'Pipeline', {
            pipelineName: 'demo-pipeline',
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            sourceAction,
            synthAction
        });
        const preProd = new demo_stage_1.DemoStage(this, 'pre-prod', {
            env: {
                region: 'us-east-1',
                account: '982637769374'
            }
        });
        const preProdStage = pipeline.addApplicationStage(preProd);
        preProdStage.addActions(new pipelines_1.ShellScriptAction({
            actionName: 'TestService',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(preProd.urlOutput)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ]
        }));
        const invokeLambda = new aws_lambda_1.Function(this, 'invoke-lambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            handler: 'invoke-test.handler',
            code: aws_lambda_1.Code.fromAsset('lambda')
        });
        preProdStage.addActions(new aws_codepipeline_actions_1.LambdaInvokeAction({
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
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFDeEUsZ0VBQW1EO0FBQ25ELGtEQUFxRjtBQUNyRixnRkFBK0c7QUFDL0csNkNBQXVDO0FBQ3ZDLG9EQUE0RDtBQUU1RCxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBQ3BDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBUSxFQUFFLENBQUM7UUFDdEMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLDJCQUFRLEVBQUUsQ0FBQztRQUU3Qyw0Q0FBNEM7UUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSw2Q0FBa0IsQ0FBQztZQUN4QyxVQUFVLEVBQUUsY0FBYztZQUMxQixNQUFNLEVBQUUsY0FBYztZQUN0QixVQUFVLEVBQUUsa0JBQVcsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUM7WUFDM0QsS0FBSyxFQUFFLFVBQVU7WUFDakIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuRCxjQUFjO1lBQ2QscUJBQXFCO1lBQ3JCLFlBQVksRUFBRSxlQUFlO1NBQ2hDLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQy9DLFlBQVksRUFBRSxlQUFlO1lBQzdCLHFCQUFxQixFQUFFLHFCQUFxQjtZQUM1QyxZQUFZO1lBQ1osV0FBVztTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzVDLEdBQUcsRUFBRTtnQkFDRCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsT0FBTyxFQUFFLGNBQWM7YUFDMUI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLDZCQUFpQixDQUFDO1lBQzFDLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLFVBQVUsRUFBRTtnQkFDUixZQUFZLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ3hEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLHlCQUF5QjthQUM1QjtTQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDckQsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDakMsQ0FBQyxDQUFBO1FBRUYsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLDZDQUFrQixDQUFDO1lBQzNDLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFVBQVUsRUFBRSxlQUFlO1lBQzNCLGNBQWMsRUFBRTtnQkFDWixNQUFNLEVBQUUsR0FBRztnQkFDWCxNQUFNLEVBQUUsR0FBRzthQUNkO1NBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSixxREFBcUQ7UUFDckQsbUJBQW1CO1FBQ25CLDRCQUE0QjtRQUM1QixPQUFPO0lBQ1gsQ0FBQztDQUNKO0FBckVELHNDQXFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RydWN0LCBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHN9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQge0FydGlmYWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZVwiO1xuaW1wb3J0IHtDZGtQaXBlbGluZSwgU2hlbGxTY3JpcHRBY3Rpb24sIFNpbXBsZVN5bnRoQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvcGlwZWxpbmVzXCI7XG5pbXBvcnQge0dpdEh1YlNvdXJjZUFjdGlvbiwgTGFtYmRhSW52b2tlQWN0aW9uLCBNYW51YWxBcHByb3ZhbEFjdGlvbn0gZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9uc1wiO1xuaW1wb3J0IHtEZW1vU3RhZ2V9IGZyb20gXCIuL2RlbW8uc3RhZ2VcIjtcbmltcG9ydCB7Q29kZSwgRnVuY3Rpb24sIFJ1bnRpbWV9IGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5cbmV4cG9ydCBjbGFzcyBQaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBzb3VyY2VBcnRpZmFjdCA9IG5ldyBBcnRpZmFjdCgpO1xuICAgICAgICBjb25zdCBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoKTtcblxuICAgICAgICAvLyBzZWN0aW9uIGZvciBjcmVhdGluZyBhdXRvIHBpcGVsaW5lIGRlcGxveVxuICAgICAgICBjb25zdCBzb3VyY2VBY3Rpb24gPSBuZXcgR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdHaXRodWJTb3VyY2UnLFxuICAgICAgICAgICAgb3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCd0ZXN0LWdpdGh1Yi10b2tlbicpLFxuICAgICAgICAgICAgb3duZXI6ICdCYXJyb2tnbCcsXG4gICAgICAgICAgICByZXBvOiAnY2RrLXBpcGVsaW5lLWRlbW8nLFxuICAgICAgICAgICAgYnJhbmNoOiAnbWFpbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3ludGhBY3Rpb24gPSBTaW1wbGVTeW50aEFjdGlvbi5zdGFuZGFyZE5wbVN5bnRoKHtcbiAgICAgICAgICAgIHNvdXJjZUFydGlmYWN0LFxuICAgICAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICAgICAgYnVpbGRDb21tYW5kOiAnbnBtIHJ1biBidWlsZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ2RrUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgICAgICAgcGlwZWxpbmVOYW1lOiAnZGVtby1waXBlbGluZScsXG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3Q6IGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcbiAgICAgICAgICAgIHNvdXJjZUFjdGlvbixcbiAgICAgICAgICAgIHN5bnRoQWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHByZVByb2QgPSBuZXcgRGVtb1N0YWdlKHRoaXMsICdwcmUtcHJvZCcsIHtcbiAgICAgICAgICAgIGVudjoge1xuICAgICAgICAgICAgICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXG4gICAgICAgICAgICAgICAgYWNjb3VudDogJzk4MjYzNzc2OTM3NCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcHJlUHJvZFN0YWdlID0gcGlwZWxpbmUuYWRkQXBwbGljYXRpb25TdGFnZShwcmVQcm9kKTtcblxuICAgICAgICBwcmVQcm9kU3RhZ2UuYWRkQWN0aW9ucyhuZXcgU2hlbGxTY3JpcHRBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ1Rlc3RTZXJ2aWNlJyxcbiAgICAgICAgICAgIHVzZU91dHB1dHM6IHtcbiAgICAgICAgICAgICAgICBFTkRQT0lOVF9VUkw6IHBpcGVsaW5lLnN0YWNrT3V0cHV0KHByZVByb2QudXJsT3V0cHV0KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc3QgaW52b2tlTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdpbnZva2UtbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdpbnZva2UtdGVzdC5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgICAgICB9KVxuXG4gICAgICAgIHByZVByb2RTdGFnZS5hZGRBY3Rpb25zKG5ldyBMYW1iZGFJbnZva2VBY3Rpb24oe1xuICAgICAgICAgICAgbGFtYmRhOiBpbnZva2VMYW1iZGEsXG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnaUludm9rZUxhbWJkYScsXG4gICAgICAgICAgICB1c2VyUGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAgIHBhcmFtMTogJzEnLFxuICAgICAgICAgICAgICAgIHBhcmFtMjogJzInXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBwcmVQcm9kU3RhZ2UuYWRkQWN0aW9ucyhuZXcgTWFudWFsQXBwcm92YWxBY3Rpb24oe1xuICAgICAgICAvLyAgICAgcnVuT3JkZXI6IDMsXG4gICAgICAgIC8vICAgICBhY3Rpb25OYW1lOiAnQXBwcm92ZSdcbiAgICAgICAgLy8gfSkpO1xuICAgIH1cbn1cbiJdfQ==