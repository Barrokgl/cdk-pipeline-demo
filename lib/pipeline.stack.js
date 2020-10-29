"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const core_1 = require("@aws-cdk/core");
const aws_codepipeline_1 = require("@aws-cdk/aws-codepipeline");
const pipelines_1 = require("@aws-cdk/pipelines");
const aws_codepipeline_actions_1 = require("@aws-cdk/aws-codepipeline-actions");
const demo_stage_1 = require("./demo.stage");
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
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFDeEUsZ0VBQW1EO0FBQ25ELGtEQUFxRjtBQUNyRixnRkFBcUU7QUFDckUsNkNBQXVDO0FBRXZDLE1BQWEsYUFBYyxTQUFRLFlBQUs7SUFDcEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFRLEVBQUUsQ0FBQztRQUN0QyxNQUFNLHFCQUFxQixHQUFHLElBQUksMkJBQVEsRUFBRSxDQUFDO1FBRTdDLDRDQUE0QztRQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLDZDQUFrQixDQUFDO1lBQ3hDLFVBQVUsRUFBRSxjQUFjO1lBQzFCLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLFVBQVUsRUFBRSxrQkFBVyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzRCxLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxNQUFNO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLDZCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ25ELGNBQWM7WUFDZCxxQkFBcUI7WUFDckIsWUFBWSxFQUFFLGVBQWU7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDL0MsWUFBWSxFQUFFLGVBQWU7WUFDN0IscUJBQXFCLEVBQUUscUJBQXFCO1lBQzVDLFlBQVk7WUFDWixXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDNUMsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxXQUFXO2dCQUNuQixPQUFPLEVBQUUsY0FBYzthQUMxQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDMUMsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04seUJBQXlCO2FBQzVCO1NBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0NBQ0o7QUFqREQsc0NBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7QXJ0aWZhY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQge0Nka1BpcGVsaW5lLCBTaGVsbFNjcmlwdEFjdGlvbiwgU2ltcGxlU3ludGhBY3Rpb259IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7R2l0SHViU291cmNlQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQge0RlbW9TdGFnZX0gZnJvbSBcIi4vZGVtby5zdGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3Qgc291cmNlQXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoKTtcbiAgICAgICAgY29uc3QgY2xvdWRBc3NlbWJseUFydGlmYWN0ID0gbmV3IEFydGlmYWN0KCk7XG5cbiAgICAgICAgLy8gc2VjdGlvbiBmb3IgY3JlYXRpbmcgYXV0byBwaXBlbGluZSBkZXBsb3lcbiAgICAgICAgY29uc3Qgc291cmNlQWN0aW9uID0gbmV3IEdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnR2l0aHViU291cmNlJyxcbiAgICAgICAgICAgIG91dHB1dDogc291cmNlQXJ0aWZhY3QsXG4gICAgICAgICAgICBvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcigndGVzdC1naXRodWItdG9rZW4nKSxcbiAgICAgICAgICAgIG93bmVyOiAnQmFycm9rZ2wnLFxuICAgICAgICAgICAgcmVwbzogJ2Nkay1waXBlbGluZS1kZW1vJyxcbiAgICAgICAgICAgIGJyYW5jaDogJ21haW4nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN5bnRoQWN0aW9uID0gU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG4gICAgICAgICAgICBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgICAgIGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcbiAgICAgICAgICAgIGJ1aWxkQ29tbWFuZDogJ25wbSBydW4gYnVpbGQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENka1BpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtcbiAgICAgICAgICAgIHBpcGVsaW5lTmFtZTogJ2RlbW8tcGlwZWxpbmUnLFxuICAgICAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0OiBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG4gICAgICAgICAgICBzb3VyY2VBY3Rpb24sXG4gICAgICAgICAgICBzeW50aEFjdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcmVQcm9kID0gbmV3IERlbW9TdGFnZSh0aGlzLCAncHJlLXByb2QnLCB7XG4gICAgICAgICAgICBlbnY6IHtcbiAgICAgICAgICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAgICAgICAgICAgIGFjY291bnQ6ICc5ODI2Mzc3NjkzNzQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHByZVByb2RTdGFnZSA9IHBpcGVsaW5lLmFkZEFwcGxpY2F0aW9uU3RhZ2UocHJlUHJvZCk7XG5cbiAgICAgICAgcHJlUHJvZFN0YWdlLmFkZEFjdGlvbnMobmV3IFNoZWxsU2NyaXB0QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdUZXN0U2VydmljZScsXG4gICAgICAgICAgICB1c2VPdXRwdXRzOiB7XG4gICAgICAgICAgICAgICAgRU5EUE9JTlRfVVJMOiBwaXBlbGluZS5zdGFja091dHB1dChwcmVQcm9kLnVybE91dHB1dClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgICdjdXJsIC1Tc2YgJEVORFBPSU5UX1VSTCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiJdfQ==