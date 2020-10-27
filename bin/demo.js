#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const pipeline_stack_1 = require("../lib/pipeline.stack");
const app = new cdk.App();
new pipeline_stack_1.PipelineStack(app, 'pipeline', {
    env: {
        region: 'us-east-1'
    }
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQywwREFBb0Q7QUFFcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFHMUIsSUFBSSw4QkFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDL0IsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLFdBQVc7S0FDdEI7Q0FDSixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQge1BpcGVsaW5lU3RhY2t9IGZyb20gXCIuLi9saWIvcGlwZWxpbmUuc3RhY2tcIjtcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxuXG5uZXcgUGlwZWxpbmVTdGFjayhhcHAsICdwaXBlbGluZScsIHtcbiAgICBlbnY6IHtcbiAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJ1xuICAgIH1cbn0pO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==