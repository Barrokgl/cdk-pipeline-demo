"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
async function handler(event, context) {
    const jobId = event["CodePipeline.job"].id;
    console.log(jobId);
    console.log(JSON.stringify(event["CodePipeline.job"].data, undefined, 2));
    return {
        body: 'Hello from invoke',
        statusCode: 200,
    };
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2tlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZva2UtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQXdCLEVBQUUsT0FBZ0I7SUFDcEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRSxPQUFPO1FBQ0gsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixVQUFVLEVBQUUsR0FBRztLQUNsQixDQUFDO0FBQ04sQ0FBQztBQVRELDBCQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0LCBDb2RlUGlwZWxpbmVFdmVudCwgQ29udGV4dH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IENvZGVQaXBlbGluZUV2ZW50LCBjb250ZXh0OiBDb250ZXh0KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+e1xuICAgIGNvbnN0IGpvYklkID0gZXZlbnRbXCJDb2RlUGlwZWxpbmUuam9iXCJdLmlkO1xuICAgIGNvbnNvbGUubG9nKGpvYklkKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShldmVudFtcIkNvZGVQaXBlbGluZS5qb2JcIl0uZGF0YSwgdW5kZWZpbmVkLCAyKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBib2R5OiAnSGVsbG8gZnJvbSBpbnZva2UnLFxuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgfTtcbn1cbiJdfQ==