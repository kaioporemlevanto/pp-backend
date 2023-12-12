import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ValidationError from "src/errors/ValidationError";
import NotFoundError from "src/errors/NotFoundError";
import { ok, forbidden } from "src/utils/Returns";


const removePerson = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const { adminID, adminSenha } = JSON.parse(event.body);
    const tryADM = new PeopleRepositories();
    if (! await tryADM.isAdministrator(adminID, adminSenha)) {
        return forbidden("Acesso não autorizado");
    }

    const { email } = event.pathParameters;
    if (email === undefined)
        throw new ValidationError("Pessoa não formatada!");

    const database = new PeopleRepositories();
    const person = await database.findByEmail(email);
    const database1 = new RoomsRepositories();
    const room = await database1.findById(person.id_quarto);

    if (person === undefined)
        throw new NotFoundError("Email não encontrada!");

    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    await database1.removePerson(room, email);
    return ok("Pessoa removida com sucesso!", "message");
};

export const handler = Handler(removePerson);
