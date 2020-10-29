"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const core_1 = require("@aws-cdk/core");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
class ApiStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const handler = new aws_lambda_1.Function(this, 'lambda', {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            handler: 'handler.handler',
            code: aws_lambda_1.Code.fromAsset('lambda')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFzRTtBQUN0RSxvREFBOEQ7QUFFOUQsNERBQXNEO0FBRXRELE1BQWEsUUFBUyxTQUFRLFlBQUs7SUFHL0IsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUN6QyxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxXQUFXLEVBQUUsWUFBWTtZQUN6QixPQUFPO1NBQ1YsQ0FBQyxDQUFDO1FBR0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUN4QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBdkJELDRCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2ZuT3V0cHV0LCBDb25zdHJ1Y3QsIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgRnVuY3Rpb24sIFJ1bnRpbWUsIENvZGUgfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0xhbWJkYVJlc3RBcGl9IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuXG5leHBvcnQgY2xhc3MgQXBpU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgcmVhZG9ubHkgdXJsT3V0cHV0OiBDZm5PdXRwdXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBGdW5jdGlvbih0aGlzLCAnbGFtYmRhJywge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyLmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdhdGV3YXkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAncmVzdC1hcGknLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2FwaWdhdGV3YXknLFxuICAgICAgICAgICAgaGFuZGxlclxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMudXJsT3V0cHV0ID0gbmV3IENmbk91dHB1dCh0aGlzLCAndXJsJywge1xuICAgICAgICAgICAgdmFsdWU6IGdhdGV3YXkudXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19