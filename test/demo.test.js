"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const api_stack_1 = require("../lib/api.stack");
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new api_stack_1.ApiStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::Lambda::Function"));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVtby50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTZGO0FBQzdGLHFDQUFxQztBQUNyQyxnREFBMEM7QUFFMUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsT0FBTztJQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksb0JBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0MsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2V4cGVjdCBhcyBleHBlY3RDREssIG1hdGNoVGVtcGxhdGUsIE1hdGNoU3R5bGUsIGhhdmVSZXNvdXJjZX0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7QXBpU3RhY2t9IGZyb20gXCIuLi9saWIvYXBpLnN0YWNrXCI7XG5cbnRlc3QoJ0VtcHR5IFN0YWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IEFwaVN0YWNrKGFwcCwgJ015VGVzdFN0YWNrJyk7XG4gICAgLy8gVEhFTlxuICAgIGV4cGVjdENESyhzdGFjaykudG8oaGF2ZVJlc291cmNlKFwiQVdTOjpMYW1iZGE6OkZ1bmN0aW9uXCIpKVxufSk7XG4iXX0=