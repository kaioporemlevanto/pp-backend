import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ValidationError from "src/errors/ValidationError";
import NotFoundError from "src/errors/NotFoundError";
import { ok, forbidden } from "src/utils/Returns";


const deletePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {

    const { adminID, adminSenha } = JSON.parse(event.body);
    const tryADM = new PeopleRepositories();
    if (! await tryADM.isAdministrator(adminID, adminSenha)) {
      return forbidden("Acesso não autorizado");
    }
  
    const { email  } = event.pathParameters;
    if (email === undefined)
        throw new ValidationError("Pessoa não formatada!");

    const database = new PeopleRepositories();
    const person = await database.findByEmail(email);
    if (person === undefined)
        throw new NotFoundError("Pessoa não encontrada!");

    const database2 = new RoomsRepositories();
    if (person.id_quarto !== null) {
      const room = await database2.findById (person.id_quarto);
      if (room !== undefined)
        await database2.removePerson (room, email);
    }

    database.delete(email);
        
    return ok("message", "Pessoa deletada com sucesso!");
  };
  
  export const handler = Handler(deletePerson);