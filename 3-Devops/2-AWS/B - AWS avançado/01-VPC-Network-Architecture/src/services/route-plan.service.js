export class RoutePlanService {
  constructor({ routes }) {
    this.routes = routes;
  }

  buildPlan() {
    return {
      publicRoute: this.routes.internetGatewayRoute,
      privateRoute: this.routes.natGatewayRoute,
      commands: [
        "aws ec2 create-route --route-table-id <public-rt-id> --destination-cidr-block 0.0.0.0/0 --gateway-id <igw-id>",
        "aws ec2 create-route --route-table-id <private-rt-id> --destination-cidr-block 0.0.0.0/0 --nat-gateway-id <nat-id>"
      ]
    };
  }
}
