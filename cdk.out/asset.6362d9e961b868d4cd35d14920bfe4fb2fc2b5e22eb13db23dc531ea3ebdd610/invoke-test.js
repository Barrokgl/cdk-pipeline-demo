"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const pipeline = new AWS.CodePipeline();
const putJobSuccess = function (jobId, message, context) {
    const params = {
        jobId
    };
    pipeline.putJobSuccessResult(params, function (err, data) {
        console.log('put job success', err, data);
        if (err) {
            context.fail(err);
        }
        else {
            console.log('context success', message);
            context.succeed(message);
        }
    });
};
const putJobFailure = function (jobId, message, context) {
    const params = {
        jobId,
        failureDetails: {
            message: JSON.stringify(message),
            type: 'JobFailed',
            externalExecutionId: context.awsRequestId
        }
    };
    pipeline.putJobFailureResult(params, function (err, data) {
        context.fail(message);
    });
};
async function handler(event, context) {
    const jobId = event["CodePipeline.job"].id;
    console.log(jobId);
    console.log(JSON.stringify(event["CodePipeline.job"].data.actionConfiguration, undefined, 2));
    putJobSuccess(jobId, 'success', context);
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2tlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZva2UtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBK0I7QUFFL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFeEMsTUFBTSxhQUFhLEdBQUcsVUFBUyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQWdCO0lBQzNFLE1BQU0sTUFBTSxHQUFHO1FBQ1gsS0FBSztLQUNSLENBQUM7SUFDRixRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBRyxHQUFHLEVBQUU7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLFVBQVMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFnQjtJQUMzRSxNQUFNLE1BQU0sR0FBRztRQUNYLEtBQUs7UUFDTCxjQUFjLEVBQUU7WUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDaEMsSUFBSSxFQUFFLFdBQVc7WUFDakIsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFlBQVk7U0FDNUM7S0FDSixDQUFDO0lBQ0YsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJO1FBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFSyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQXdCLEVBQUUsT0FBZ0I7SUFDcEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5RixhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIENvZGVQaXBlbGluZUV2ZW50LCBDb250ZXh0fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBwaXBlbGluZSA9IG5ldyBBV1MuQ29kZVBpcGVsaW5lKCk7XG5cbmNvbnN0IHB1dEpvYlN1Y2Nlc3MgPSBmdW5jdGlvbihqb2JJZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGpvYklkXG4gICAgfTtcbiAgICBwaXBlbGluZS5wdXRKb2JTdWNjZXNzUmVzdWx0KHBhcmFtcywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwdXQgam9iIHN1Y2Nlc3MnLCBlcnIsIGRhdGEpO1xuXG4gICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgY29udGV4dC5mYWlsKGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGV4dCBzdWNjZXNzJywgbWVzc2FnZSlcbiAgICAgICAgICAgIGNvbnRleHQuc3VjY2VlZChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgcHV0Sm9iRmFpbHVyZSA9IGZ1bmN0aW9uKGpvYklkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29udGV4dDogQ29udGV4dCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgam9iSWQsXG4gICAgICAgIGZhaWx1cmVEZXRhaWxzOiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgICAgIHR5cGU6ICdKb2JGYWlsZWQnLFxuICAgICAgICAgICAgZXh0ZXJuYWxFeGVjdXRpb25JZDogY29udGV4dC5hd3NSZXF1ZXN0SWRcbiAgICAgICAgfVxuICAgIH07XG4gICAgcGlwZWxpbmUucHV0Sm9iRmFpbHVyZVJlc3VsdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBjb250ZXh0LmZhaWwobWVzc2FnZSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogQ29kZVBpcGVsaW5lRXZlbnQsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBjb25zdCBqb2JJZCA9IGV2ZW50W1wiQ29kZVBpcGVsaW5lLmpvYlwiXS5pZDtcbiAgICBjb25zb2xlLmxvZyhqb2JJZCk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXZlbnRbXCJDb2RlUGlwZWxpbmUuam9iXCJdLmRhdGEuYWN0aW9uQ29uZmlndXJhdGlvbiwgdW5kZWZpbmVkLCAyKSk7XG5cbiAgICBwdXRKb2JTdWNjZXNzKGpvYklkLCAnc3VjY2VzcycsIGNvbnRleHQpXG59XG4iXX0=