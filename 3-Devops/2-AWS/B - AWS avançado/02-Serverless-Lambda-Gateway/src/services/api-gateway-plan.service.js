import { ApiRouteModel } from "../models/api-route.model.js";
import { LambdaFunctionModel } from "../models/lambda-function.model.js";

export class ApiGatewayPlanService {
  constructor({ settings, routes }) {
    this.settings = settings;
    this.routes = routes;
  }

  buildPlan() {
    const apiRoutes = this.routes.map((route) => new ApiRouteModel(route));
    const functions = apiRoutes.map(
      (route) =>
        new LambdaFunctionModel({
          name: route.name,
          handler: route.handler,
          method: route.method,
          path: route.path
        })
    );

    return {
      apiName: this.settings.apiName,
      stage: this.settings.stage,
      region: this.settings.region,
      httpApiType: "HTTP API v2",
      routes: apiRoutes,
      functions,
      deployCommand: `sam deploy --stack-name ${this.settings.serviceName}-${this.settings.stage} --region ${this.settings.region} --capabilities CAPABILITY_IAM`
    };
  }
}
