import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";

const updatePassword = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
  const { email, nova_senha } = JSON.parse(event.body);
  if (email === undefined || nova_senha === undefined)
      throw new ValidationError("Pessoa não formatada!");
      
  const database = new PeopleRepositories();
  const person = await database.findByEmail(email);

  if (person === undefined)
      throw new NotFoundError("Email não encontrado!");

  await database.updatePassword(person, nova_senha);
    
  return ok("message", "Senha atualizada com sucesso!");
  };
  
  export const handler = Handler(updatePassword);