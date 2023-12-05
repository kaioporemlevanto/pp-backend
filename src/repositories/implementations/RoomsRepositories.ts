import { initializeApp } from "firebase/app";
import IRoomsRepository from "../IRoomsRepositories";
import { v4 as uuidv4 } from "uuid";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Room from "src/models/Room";

const firebaseConfig = {
  apiKey: "AIzaSyAugWyvlqfPQi0Z2COhoLv7O6JH0unUQkk",
  authDomain: "model-projeto-piloto.firebaseapp.com",
  projectId: "model-projeto-piloto",
  storageBucket: "model-projeto-piloto.appspot.com",
  messagingSenderId: "983743934853",
  appId: "1:983743934853:web:4e02f3bb3b7169cd5954ec",
  measurementId: "G-3BH6J62F3V"
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
      qtd_camas: qtd_camas
    });

    return undefined;
  }

  findAll(): Promise<Room[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Room> {
    throw new Error("Method not implemented.");
  }
  update(room_id: string, qtd_camas: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insertPerson(room: Room, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removePerson(room: Room, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default RoomsRepositories;
