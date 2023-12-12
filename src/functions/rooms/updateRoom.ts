import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";

const updateRoom = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const { room_id, qtd_camas } = JSON.parse(event.body);
    if (room_id === undefined || qtd_camas === undefined)
        throw new ValidationError("Quarto não formatado!");

    const database = new RoomsRepositories();
    const room = await database.findById(room_id);

    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    await database.update(room_id, qtd_camas);

    return ok("message", "Quarto atualizado com sucesso!");
};

export const handler = Handler(updateRoom);
