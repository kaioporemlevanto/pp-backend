import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ClientError from "src/errors/ClientError";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { notFound, ok } from "src/utils/Returns";

const insertPerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const databaseRoom = new RoomsRepositories();

  const id = event.pathParameters.id;
  const email = event.pathParameters.email;
  const room = await databaseRoom.findById(id);

  if (room === undefined) return notFound("Quarto não encontrado!");

  if (room.qtd_camas <= (await databaseRoom.findPeopleByRoom(room.id)).length) {
    throw new ClientError("Quarto cheio! Falha ao inserir pessoa");
  }

  await databaseRoom.insertPerson(room, email);

  return ok("Pessoa inserida com sucesso", "message");
};

export const handler = Handler(insertPerson);
