import {Construct, SecretValue, Stack, StackProps} from "@aws-cdk/core";
import {Artifact} from "@aws-cdk/aws-codepipeline";
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines";
import {GitHubSourceAction} from "@aws-cdk/aws-codepipeline-actions";

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceArtifact = new Artifact();
        const cloudAssemblyArtifact = new Artifact();

        // section for creating auto pipeline deploy
        const sourceAction = new GitHubSourceAction({
            actionName: 'GithubSource',
            output: sourceArtifact,
            oauthToken: SecretValue.secretsManager('github-token'),
            owner: 'Barrokgl',
            repo: 'cdk-pipeline-demo'
        });

        const synthAction = SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build'
        });

        const pipeline = new CdkPipeline(this, 'Pipeline', {
            pipelineName: 'demo-pipeline',
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            sourceAction,
            synthAction
        });


    }
}
