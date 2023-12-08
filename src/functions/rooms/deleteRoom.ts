import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { forbidden, ok } from "src/utils/Returns";

const deleteRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {

    const { adminID, adminSenha } = JSON.parse(event.body);
    const tryADM = new PeopleRepositories();
    if (! await tryADM.isAdministrator(adminID, adminSenha)) {
      return forbidden("Acesso não autorizado");
    }
    const id = event.pathParameters.id;
    const database = new RoomsRepositories();

    await database.delete(id);
    
    return ok("Quarto deletado com sucesso!", "message");
};

export const handler = Handler(deleteRoom);