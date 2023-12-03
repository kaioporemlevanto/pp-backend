import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import ValidationError from "src/errors/ValidationError";
import { created } from "src/utils/Returns";

/**
 * FUNÇÃO COM CORREÇÂO DE ERROS
 */

const createPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { nome, email, empresa, senha  } = JSON.parse(event.body);

    /**
     * Dá para evitar vários ifs para validação de dados, por exemplo usando Joi ou Zod que são validadores de schema
     * 
     */

    // if (nome === undefined || email === undefined || empresa === undefined || senha === undefined)
    //     throw new ValidationError("Algum campo não definido!");

    // Uma maneira de verificar se um campo é inválido, é apenas fazendo a negação (!), para quem programou em C, o efeito é igual

    if(!nome || !email || !empresa || !senha)
        throw new ValidationError("Algum campo não definido!");

    const database = new PeopleRepositories();
    const exist = await database.findByEmail(email);
    if (exist !== undefined)
        throw new ClientError("Email já cadastrado!");

    // A função retorna uma Promise, então deve usar AWAIT
    await database.create(nome, email, senha, empresa);
        
    return created("message", "Pessoa criada com sucesso!");
  };
  
  export const handler = Handler(createPerson);