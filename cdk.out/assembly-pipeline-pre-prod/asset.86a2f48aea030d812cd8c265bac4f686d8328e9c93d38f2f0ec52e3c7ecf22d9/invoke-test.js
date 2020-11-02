"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const pipeline = new AWS.CodePipeline({
    region: 'us-east-1',
});
const putJobSuccess = async function (jobId, message, context) {
    const params = {
        jobId
    };
    console.log('pre put jo success');
    await pipeline.putJobSuccessResult(params, function (err, data) {
        console.log('put job success', err, data);
        if (err) {
            context.fail(err);
        }
        else {
            console.log('context success', message);
            context.succeed(message);
        }
    }).promise();
};
const putJobFailure = async function (jobId, message, context) {
    const params = {
        jobId,
        failureDetails: {
            message: JSON.stringify(message),
            type: 'JobFailed',
            externalExecutionId: context.awsRequestId
        }
    };
    await pipeline.putJobFailureResult(params, function (err, data) {
        context.fail(message);
    }).promise();
};
async function handler(event, context) {
    const jobId = event["CodePipeline.job"].id;
    console.log(jobId);
    console.log(JSON.stringify(event["CodePipeline.job"].data.actionConfiguration, undefined, 2));
    putJobSuccess(jobId, 'success', context);
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2tlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZva2UtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBK0I7QUFFL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxXQUFXO0NBQ3RCLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLEtBQUssV0FBVSxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQWdCO0lBQ2pGLE1BQU0sTUFBTSxHQUFHO1FBQ1gsS0FBSztLQUNSLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbEMsTUFBTSxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBRyxHQUFHLEVBQUU7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxLQUFLLFdBQVUsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFnQjtJQUNqRixNQUFNLE1BQU0sR0FBRztRQUNYLEtBQUs7UUFDTCxjQUFjLEVBQUU7WUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDaEMsSUFBSSxFQUFFLFdBQVc7WUFDakIsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFlBQVk7U0FDNUM7S0FDSixDQUFDO0lBQ0YsTUFBTSxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFSyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQXdCLEVBQUUsT0FBZ0I7SUFDcEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5RixhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIENvZGVQaXBlbGluZUV2ZW50LCBDb250ZXh0fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBwaXBlbGluZSA9IG5ldyBBV1MuQ29kZVBpcGVsaW5lKHtcbiAgICByZWdpb246ICd1cy1lYXN0LTEnLFxufSk7XG5cbmNvbnN0IHB1dEpvYlN1Y2Nlc3MgPSBhc3luYyBmdW5jdGlvbihqb2JJZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGpvYklkXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygncHJlIHB1dCBqbyBzdWNjZXNzJyk7XG4gICAgYXdhaXQgcGlwZWxpbmUucHV0Sm9iU3VjY2Vzc1Jlc3VsdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygncHV0IGpvYiBzdWNjZXNzJywgZXJyLCBkYXRhKTtcblxuICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmFpbChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRleHQgc3VjY2VzcycsIG1lc3NhZ2UpXG4gICAgICAgICAgICBjb250ZXh0LnN1Y2NlZWQobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9KS5wcm9taXNlKCk7XG59O1xuXG5jb25zdCBwdXRKb2JGYWlsdXJlID0gYXN5bmMgZnVuY3Rpb24oam9iSWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBqb2JJZCxcbiAgICAgICAgZmFpbHVyZURldGFpbHM6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgdHlwZTogJ0pvYkZhaWxlZCcsXG4gICAgICAgICAgICBleHRlcm5hbEV4ZWN1dGlvbklkOiBjb250ZXh0LmF3c1JlcXVlc3RJZFxuICAgICAgICB9XG4gICAgfTtcbiAgICBhd2FpdCBwaXBlbGluZS5wdXRKb2JGYWlsdXJlUmVzdWx0KHBhcmFtcywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGNvbnRleHQuZmFpbChtZXNzYWdlKTtcbiAgICB9KS5wcm9taXNlKCk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogQ29kZVBpcGVsaW5lRXZlbnQsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zdCBqb2JJZCA9IGV2ZW50W1wiQ29kZVBpcGVsaW5lLmpvYlwiXS5pZDtcbiAgICBjb25zb2xlLmxvZyhqb2JJZCk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXZlbnRbXCJDb2RlUGlwZWxpbmUuam9iXCJdLmRhdGEuYWN0aW9uQ29uZmlndXJhdGlvbiwgdW5kZWZpbmVkLCAyKSk7XG5cbiAgICBwdXRKb2JTdWNjZXNzKGpvYklkLCAnc3VjY2VzcycsIGNvbnRleHQpXG59XG4iXX0=