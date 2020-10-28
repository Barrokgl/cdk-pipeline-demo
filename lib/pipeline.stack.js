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
            oauthToken: core_1.SecretValue.secretsManager('test-github-token'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS5zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0U7QUFDeEUsZ0VBQW1EO0FBQ25ELGtEQUFrRTtBQUNsRSxnRkFBcUU7QUFFckUsTUFBYSxhQUFjLFNBQVEsWUFBSztJQUNwQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQVEsRUFBRSxDQUFDO1FBQ3RDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSwyQkFBUSxFQUFFLENBQUM7UUFFN0MsNENBQTRDO1FBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksNkNBQWtCLENBQUM7WUFDeEMsVUFBVSxFQUFFLGNBQWM7WUFDMUIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDO1lBQzNELEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUksRUFBRSxtQkFBbUI7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsNkJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDbkQsY0FBYztZQUNkLHFCQUFxQjtZQUNyQixZQUFZLEVBQUUsZUFBZTtTQUNoQyxDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUMvQyxZQUFZLEVBQUUsZUFBZTtZQUM3QixxQkFBcUIsRUFBRSxxQkFBcUI7WUFDNUMsWUFBWTtZQUNaLFdBQVc7U0FDZCxDQUFDLENBQUM7SUFHUCxDQUFDO0NBQ0o7QUEvQkQsc0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7QXJ0aWZhY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQge0Nka1BpcGVsaW5lLCBTaW1wbGVTeW50aEFjdGlvbn0gZnJvbSBcIkBhd3MtY2RrL3BpcGVsaW5lc1wiO1xuaW1wb3J0IHtHaXRIdWJTb3VyY2VBY3Rpb259IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUFydGlmYWN0ID0gbmV3IEFydGlmYWN0KCk7XG4gICAgICAgIGNvbnN0IGNsb3VkQXNzZW1ibHlBcnRpZmFjdCA9IG5ldyBBcnRpZmFjdCgpO1xuXG4gICAgICAgIC8vIHNlY3Rpb24gZm9yIGNyZWF0aW5nIGF1dG8gcGlwZWxpbmUgZGVwbG95XG4gICAgICAgIGNvbnN0IHNvdXJjZUFjdGlvbiA9IG5ldyBHaXRIdWJTb3VyY2VBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0dpdGh1YlNvdXJjZScsXG4gICAgICAgICAgICBvdXRwdXQ6IHNvdXJjZUFydGlmYWN0LFxuICAgICAgICAgICAgb2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ3Rlc3QtZ2l0aHViLXRva2VuJyksXG4gICAgICAgICAgICBvd25lcjogJ0JhcnJva2dsJyxcbiAgICAgICAgICAgIHJlcG86ICdjZGstcGlwZWxpbmUtZGVtbydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3ludGhBY3Rpb24gPSBTaW1wbGVTeW50aEFjdGlvbi5zdGFuZGFyZE5wbVN5bnRoKHtcbiAgICAgICAgICAgIHNvdXJjZUFydGlmYWN0LFxuICAgICAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICAgICAgYnVpbGRDb21tYW5kOiAnbnBtIHJ1biBidWlsZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ2RrUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgICAgICAgcGlwZWxpbmVOYW1lOiAnZGVtby1waXBlbGluZScsXG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3Q6IGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcbiAgICAgICAgICAgIHNvdXJjZUFjdGlvbixcbiAgICAgICAgICAgIHN5bnRoQWN0aW9uXG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG4iXX0=