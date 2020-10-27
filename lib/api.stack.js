"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const core_1 = require("@aws-cdk/core");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const path = require("path");
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
class ApiStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const handler = new aws_lambda_1.Function(this, 'lambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            handler: 'handler.handler',
            code: aws_lambda_1.Code.fromAsset(path.resolve(__dirname, 'lambda'))
        });
        const gateway = new aws_apigateway_1.LambdaRestApi(this, 'rest-api', {
            description: 'apigateway',
            handler
        });
        this.urlOutput = new core_1.CfnOutput(this, 'url', {
            value: gateway.url
        });
    }
}
exports.ApiStack = ApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFzRTtBQUN0RSxvREFBOEQ7QUFDOUQsNkJBQTZCO0FBQzdCLDREQUFzRDtBQUV0RCxNQUFhLFFBQVMsU0FBUSxZQUFLO0lBRy9CLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDeEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDekMsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxRCxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxXQUFXLEVBQUUsWUFBWTtZQUN6QixPQUFPO1NBQ1YsQ0FBQyxDQUFDO1FBR0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUN4QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBdkJELDRCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2ZuT3V0cHV0LCBDb25zdHJ1Y3QsIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgRnVuY3Rpb24sIFJ1bnRpbWUsIENvZGUgfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0xhbWJkYVJlc3RBcGl9IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuXG5leHBvcnQgY2xhc3MgQXBpU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgcmVhZG9ubHkgdXJsT3V0cHV0OiBDZm5PdXRwdXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBGdW5jdGlvbih0aGlzLCAnbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyLmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xhbWJkYScpKVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBnYXRld2F5ID0gbmV3IExhbWJkYVJlc3RBcGkodGhpcywgJ3Jlc3QtYXBpJywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdhcGlnYXRld2F5JyxcbiAgICAgICAgICAgIGhhbmRsZXJcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLnVybE91dHB1dCA9IG5ldyBDZm5PdXRwdXQodGhpcywgJ3VybCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiBnYXRld2F5LnVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==