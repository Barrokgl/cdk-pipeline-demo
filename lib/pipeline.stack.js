"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const core_1 = require("@aws-cdk/core");
const aws_codepipeline_1 = require("@aws-cdk/aws-codepipeline");
const pipelines_1 = require("@aws-cdk/pipelines");
const aws_codepipeline_actions_1 = require("@aws-cdk/aws-codepipeline-actions");
class PipelineStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const sourceArtifact = new aws_codepipeline_1.Artifact();
        const cloudAssemblyArtifact = new aws_codepipeline_1.Artifact();
        // section for creating auto pipeline deploy
        const sourceAction = new aws_codepipeline_actions_1.GitHubSourceAction({
            actionName: 'GithubSource',
            output: sourceArtifact,
            oauthToken: core_1.SecretValue.secretsManager('github-token'),
            owner: 'Barrokgl',
            repo: 'cdk-pipeline-demo'
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
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFDeEUsZ0VBQW1EO0FBQ25ELGtEQUFrRTtBQUNsRSxnRkFBcUU7QUFFckUsTUFBYSxhQUFjLFNBQVEsWUFBSztJQUNwQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQVEsRUFBRSxDQUFDO1FBQ3RDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSwyQkFBUSxFQUFFLENBQUM7UUFFN0MsNENBQTRDO1FBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksNkNBQWtCLENBQUM7WUFDeEMsVUFBVSxFQUFFLGNBQWM7WUFDMUIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztZQUN0RCxLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsbUJBQW1CO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLDZCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ25ELGNBQWM7WUFDZCxxQkFBcUI7WUFDckIsWUFBWSxFQUFFLGVBQWU7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDL0MsWUFBWSxFQUFFLGVBQWU7WUFDN0IscUJBQXFCLEVBQUUscUJBQXFCO1lBQzVDLFlBQVk7WUFDWixXQUFXO1NBQ2QsQ0FBQyxDQUFDO0lBR1AsQ0FBQztDQUNKO0FBL0JELHNDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RydWN0LCBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHN9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQge0FydGlmYWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZVwiO1xuaW1wb3J0IHtDZGtQaXBlbGluZSwgU2ltcGxlU3ludGhBY3Rpb259IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7R2l0SHViU291cmNlQWN0aW9ufSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5cbmV4cG9ydCBjbGFzcyBQaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBzb3VyY2VBcnRpZmFjdCA9IG5ldyBBcnRpZmFjdCgpO1xuICAgICAgICBjb25zdCBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QgPSBuZXcgQXJ0aWZhY3QoKTtcblxuICAgICAgICAvLyBzZWN0aW9uIGZvciBjcmVhdGluZyBhdXRvIHBpcGVsaW5lIGRlcGxveVxuICAgICAgICBjb25zdCBzb3VyY2VBY3Rpb24gPSBuZXcgR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdHaXRodWJTb3VyY2UnLFxuICAgICAgICAgICAgb3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4nKSxcbiAgICAgICAgICAgIG93bmVyOiAnQmFycm9rZ2wnLFxuICAgICAgICAgICAgcmVwbzogJ2Nkay1waXBlbGluZS1kZW1vJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzeW50aEFjdGlvbiA9IFNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuICAgICAgICAgICAgc291cmNlQXJ0aWZhY3QsXG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG4gICAgICAgICAgICBidWlsZENvbW1hbmQ6ICducG0gcnVuIGJ1aWxkJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDZGtQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdkZW1vLXBpcGVsaW5lJyxcbiAgICAgICAgICAgIGNsb3VkQXNzZW1ibHlBcnRpZmFjdDogY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICAgICAgc291cmNlQWN0aW9uLFxuICAgICAgICAgICAgc3ludGhBY3Rpb25cbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cbiJdfQ==