import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";

const findPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const email = event.pathParameters.email;
    if (email === undefined)
        throw new ValidationError("Email não formatado!");

    const database = new PeopleRepositories();

    const person = await database.findByEmail(email);
    if (person === undefined)
        throw new NotFoundError("Email não encontrado!");
    
    return ok(person, "message");
  };
  
  export const handler = Handler(findPerson);