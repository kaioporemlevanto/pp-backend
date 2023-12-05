import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import ValidationError from "src/errors/ValidationError";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { created, forbidden } from "src/utils/Returns";

const createRoom = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { adminID, adminSenha } = JSON.parse(event.body);
  const tryADM = new PeopleRepositories();
  if (!(await tryADM.isAdministrator(adminID, adminSenha))) {
    return forbidden("Acesso não autorizado");
  }

  const { qtd_camas } = JSON.parse(event.body);

  if (!qtd_camas)
    throw new ValidationError("Quantidade de camas não definida!");

  const database = new RoomsRepositories();
  // A função retorna uma Promise, então deve usar AWAIT
  await database.create(qtd_camas);

  return created("Quarto criado com sucesso!", "message");
};

export const handler = Handler(createRoom);
