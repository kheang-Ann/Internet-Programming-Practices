import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest or canActivate to support GraphQL
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req || context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check if the request is for GraphQL Playground/Introspection
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();

    // Allow the playground to load without a token
    if (
      info &&
      (info.fieldName === '__schema' || info.fieldName === '_service')
    ) {
      return true;
    }

    // 2. Otherwise, run the normal JWT validation
    return (await super.canActivate(context)) as boolean;
  }
}
