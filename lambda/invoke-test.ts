import {APIGatewayProxyEvent, APIGatewayProxyResult, CodePipelineEvent, Context} from "aws-lambda";
import * as AWS from 'aws-sdk';

const pipeline = new AWS.CodePipeline({
    region: 'us-east-1',
});

const putJobSuccess = function(jobId: string, message: string, context: Context) {
    const params = {
        jobId
    };
    console.log('pre put jo success');
    pipeline.putJobSuccessResult(params, function(err, data) {
        console.log('put job success', err, data);

        if(err) {
            context.fail(err);
        } else {
            console.log('context success', message)
            context.succeed(message);
        }
    });
};

const putJobFailure = function(jobId: string, message: string, context: Context) {
    const params = {
        jobId,
        failureDetails: {
            message: JSON.stringify(message),
            type: 'JobFailed',
            externalExecutionId: context.awsRequestId
        }
    };
    pipeline.putJobFailureResult(params, function(err, data) {
        context.fail(message);
    });
};

export async function handler(event: CodePipelineEvent, context: Context) {
    const jobId = event["CodePipeline.job"].id;
    console.log(jobId);
    console.log(JSON.stringify(event["CodePipeline.job"].data.actionConfiguration, undefined, 2));

    putJobSuccess(jobId, 'success', context)
}
