import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { forbidden, ok } from "src/utils/Returns";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";

const updateRoom = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const { adminID, adminSenha } = JSON.parse(event.body);
    const tryADM = new PeopleRepositories();
    if (! await tryADM.isAdministrator(adminID, adminSenha)) {
      return forbidden("Acesso não autorizado");
    }
    const { room_id, qtd_camas } = JSON.parse(event.body);
    if (room_id === undefined || qtd_camas === undefined)
        throw new ValidationError("Quarto não formatado!");

    const database = new RoomsRepositories();
    const room = await database.findById(room_id);

    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    await database.update(room_id, qtd_camas);

    return ok("Quarto atualizado com sucesso!", "message");
};

export const handler = Handler(updateRoom);
