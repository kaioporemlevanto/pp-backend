import { APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { ok } from "src/utils/Returns";


const listRooms = async (): Promise<APIGatewayProxyResult> => {

    const database = new RoomsRepositories();

    const list = await database.findAll();

    return ok(list, "message");
};

export const handler = Handler(listRooms);
