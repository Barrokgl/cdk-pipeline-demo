import {APIGatewayProxyEvent, APIGatewayProxyResult, CodePipelineEvent, Context} from "aws-lambda";

export async function handler(event: CodePipelineEvent, context: Context): Promise<APIGatewayProxyResult>{
    return {
        body: 'Hello from invoke',
        statusCode: 200,
    };
}
