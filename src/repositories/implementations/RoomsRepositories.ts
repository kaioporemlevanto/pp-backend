import { initializeApp } from "firebase/app";
import IRoomsRepository from "../IRoomsRepositories";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Room from "src/models/Room";
import Person from "src/models/Person";
import PeopleRepositories from "./PeopleRepositories";
import ClientError from "src/errors/ClientError";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAugWyvlqfPQi0Z2COhoLv7O6JH0unUQkk",
  authDomain: "model-projeto-piloto.firebaseapp.com",
  projectId: "model-projeto-piloto",
  storageBucket: "model-projeto-piloto.appspot.com",
  messagingSenderId: "983743934853",
  appId: "1:983743934853:web:4e02f3bb3b7169cd5954ec",
  measurementId: "G-3BH6J62F3V",
};

const app = initializeApp(firebaseConfig);

class RoomsRepositories implements IRoomsRepository {
  private readonly db = getFirestore(app);

  async create(qtd_camas: number): Promise<void> {
    //Generate UUID (Universally Unique Identifier)
    // Or its just a random string
    const uuid = uuidv4();

    // Add a new document in the "quartos" collection with the generated ID
    // and set the data of the document to the object passed as parameter
    await setDoc(doc(this.db, "quartos", uuid), {
      qtd_camas: qtd_camas,
    });

    return undefined;
  }

  async findAll(): Promise<Room[]> {
    const roomCollection = collection(this.db, 'quartos');
    const roomSnapshot = await getDocs(roomCollection);
    const roomList = roomSnapshot.docs.map(doc =>
    ({
      id: doc.id,
      qtd_camas: doc.data().qtd_camas
    })
    );

    return roomList as unknown as Room[];
  }

  async findById(id: string): Promise<Room> {
    const document = await getDoc(doc(this.db, "quartos", id));
    if (!document.exists()) {
      return undefined;
    }

    const quarto = {
      id: document.id,
      qtd_camas: document.data().qtd_camas,
    };
    return quarto;
  }

  update(room_id: string, qtd_camas: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insertPerson(room: Room, email: string): Promise<void> {
    const database = new PeopleRepositories();
    const databaseRoom = new RoomsRepositories();

    const person = await database.findByEmail(email);
    if (!person) {
        return undefined;
    }
    if (person.com_quarto){
      throw new ClientError("Pessoa já está em um quarto!");
    }
    if (room.qtd_camas <= (await databaseRoom.findPeopleByRoom(room.id)).length){
      return undefined;
    }

    await setDoc(doc(this.db, "pessoas", person.email), {
      name: person.name,
      senha: person.senha,
      empresa: person.empresa,
      com_quarto: true,
      id_quarto: room.id
  });
    return undefined;
  }

  removePerson(room: Room, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    // const database = new RoomsRepositories();
    const peopleInDaRoom = await this.findPeopleByRoom(id);

    await deleteDoc(doc(this.db, "quartos", id));

    // const databasePeople = new PeopleRepositories();
    // await Promise.all(
    //   peopleInDaRoom.map(async (person) => {
    //     await databasePeople.removeRoom(person);
    //   })
    // );
    peopleInDaRoom.forEach((person) => {
      setDoc(doc(this.db, "pessoas", person.email), {
        name: person.name,
        email: person.email,
        senha: person.senha,
        empresa: person.empresa,
        com_quarto: false,
        id_quarto: null,
      });
    });

    return undefined;
  }

  async findPeopleByRoom(roomId: string): Promise<Person[]> {
    const pessoasDoc = await getDocs(
      query(collection(this.db, "pessoas"), where("id_quarto", "==", roomId))
    );
    const peopleInDaRoom: Person[] = [];

    pessoasDoc.forEach((doc) => {
      const person = {
        name: doc.data.name,
        email: doc.id,
        senha: doc.data().senha,
        empresa: doc.data().empresa,
        com_quarto: doc.data().com_quarto,
        id_quarto: doc.data().id_quarto,
      };
      peopleInDaRoom.push(person);
    });
    return peopleInDaRoom;
  }
}

export default RoomsRepositories;
