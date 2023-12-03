import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok } from "src/utils/Returns";

const sayHello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  return ok("Hello world!", "message");
};

export const handler = Handler(sayHello);