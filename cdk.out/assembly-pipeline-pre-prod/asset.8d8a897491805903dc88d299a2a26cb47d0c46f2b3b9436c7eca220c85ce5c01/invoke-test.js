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
        if (err) {
            context.fail(err);
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2tlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZva2UtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBK0I7QUFFL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFeEMsTUFBTSxhQUFhLEdBQUcsVUFBUyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQWdCO0lBQzNFLE1BQU0sTUFBTSxHQUFHO1FBQ1gsS0FBSztLQUNSLENBQUM7SUFDRixRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDbkQsSUFBRyxHQUFHLEVBQUU7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxVQUFTLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBZ0I7SUFDM0UsTUFBTSxNQUFNLEdBQUc7UUFDWCxLQUFLO1FBQ0wsY0FBYyxFQUFFO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2hDLElBQUksRUFBRSxXQUFXO1lBQ2pCLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxZQUFZO1NBQzVDO0tBQ0osQ0FBQztJQUNGLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSTtRQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUssS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUF3QixFQUFFLE9BQWdCO0lBQ3BFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUYsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDNUMsQ0FBQztBQU5ELDBCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0LCBDb2RlUGlwZWxpbmVFdmVudCwgQ29udGV4dH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcblxuY29uc3QgcGlwZWxpbmUgPSBuZXcgQVdTLkNvZGVQaXBlbGluZSgpO1xuXG5jb25zdCBwdXRKb2JTdWNjZXNzID0gZnVuY3Rpb24oam9iSWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBqb2JJZFxuICAgIH07XG4gICAgcGlwZWxpbmUucHV0Sm9iU3VjY2Vzc1Jlc3VsdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmFpbChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zdWNjZWVkKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5jb25zdCBwdXRKb2JGYWlsdXJlID0gZnVuY3Rpb24oam9iSWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBqb2JJZCxcbiAgICAgICAgZmFpbHVyZURldGFpbHM6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgdHlwZTogJ0pvYkZhaWxlZCcsXG4gICAgICAgICAgICBleHRlcm5hbEV4ZWN1dGlvbklkOiBjb250ZXh0LmF3c1JlcXVlc3RJZFxuICAgICAgICB9XG4gICAgfTtcbiAgICBwaXBlbGluZS5wdXRKb2JGYWlsdXJlUmVzdWx0KHBhcmFtcywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGNvbnRleHQuZmFpbChtZXNzYWdlKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBDb2RlUGlwZWxpbmVFdmVudCwgY29udGV4dDogQ29udGV4dCkge1xuICAgIGNvbnN0IGpvYklkID0gZXZlbnRbXCJDb2RlUGlwZWxpbmUuam9iXCJdLmlkO1xuICAgIGNvbnNvbGUubG9nKGpvYklkKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShldmVudFtcIkNvZGVQaXBlbGluZS5qb2JcIl0uZGF0YS5hY3Rpb25Db25maWd1cmF0aW9uLCB1bmRlZmluZWQsIDIpKTtcblxuICAgIHB1dEpvYlN1Y2Nlc3Moam9iSWQsICdzdWNjZXNzJywgY29udGV4dClcbn1cbiJdfQ==