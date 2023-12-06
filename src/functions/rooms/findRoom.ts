import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import NotFoundError from "src/errors/NotFoundError";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { ok } from "src/utils/Returns";

const findRoom= async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const id = event.pathParameters.id;
    const database = new RoomsRepositories();

    const room = await database.findById(id);
    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");
    
    return ok(room, "message");
  };
  
  export const handler = Handler(findRoom);
