import {expect as expectCDK, matchTemplate, MatchStyle, haveResource} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {ApiStack} from "../lib/api.stack";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function"))
});
