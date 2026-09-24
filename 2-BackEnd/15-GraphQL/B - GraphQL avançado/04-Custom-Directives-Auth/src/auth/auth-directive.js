import { defaultFieldResolver, GraphQLError } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export function authDirectiveTransformer(schema, directiveName = "auth") {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (!authDirective) {
        return fieldConfig;
      }

      const { resolve = defaultFieldResolver } = fieldConfig;
      const requiredRole = authDirective.role ?? null;
      const requiredScopes = authDirective.scopes ?? [];

      fieldConfig.resolve = async (source, args, context, info) => {
        const currentUser = context.currentUser;

        if (!currentUser) {
          throw new GraphQLError("Authentication required.", {
            extensions: { code: "UNAUTHENTICATED" }
          });
        }

        if (requiredRole && currentUser.role !== requiredRole) {
          throw new GraphQLError(`Role ${requiredRole} required.`, {
            extensions: { code: "FORBIDDEN" }
          });
        }

        const missingScopes = requiredScopes.filter(
          (scope) => !currentUser.scopes.includes(scope)
        );

        if (missingScopes.length > 0) {
          throw new GraphQLError(`Missing scopes: ${missingScopes.join(", ")}.`, {
            extensions: { code: "FORBIDDEN" }
          });
        }

        return resolve(source, args, context, info);
      };

      return fieldConfig;
    }
  });
}
