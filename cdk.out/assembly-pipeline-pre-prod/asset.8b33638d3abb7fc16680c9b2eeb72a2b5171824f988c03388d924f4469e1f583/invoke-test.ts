import {APIGatewayProxyEvent, APIGatewayProxyResult, CodePipelineEvent, Context} from "aws-lambda";

export async function handler(event: CodePipelineEvent, context: Context): Promise<APIGatewayProxyResult>{
    const jobId = event["CodePipeline.job"].id;
    console.log(jobId);
    console.log(JSON.stringify(event["CodePipeline.job"].data, undefined, 2));

    return {
        body: 'Hello from invoke',
        statusCode: 200,
    };
}
