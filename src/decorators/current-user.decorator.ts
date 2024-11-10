import{
  createParamDecorator,
  ExecutionContext
} from "@nestjs/common";

export const CurrentUserId = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user.sub;
    return userId;
  }
);