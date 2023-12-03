import { APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import { ok } from "src/utils/Returns";


const listPeople = async (): Promise<APIGatewayProxyResult> => {
  
    const database = new PeopleRepositories();

    const list = await database.list();
        
    return ok (list, "message");
  };
  
  export const handler = Handler(listPeople);