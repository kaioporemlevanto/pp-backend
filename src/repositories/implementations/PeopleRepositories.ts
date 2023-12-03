import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; 
import Person from "src/models/Person";
import { IPeopleRepositories } from "../IPeopleRepositories";

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

class PeopleRepositories implements IPeopleRepositories {

    private readonly db = getFirestore(app);

    
    findByName(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(name: string, email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

    async create(name: string, email: string, password: string, empresa: string): Promise<void> {
        await setDoc(doc(this.db, "pessoas", email), {
            name,
            senha: password,
            empresa,
            com_quarto: false, // Define como false por padrão
            id_quarto: null
        });

        return undefined;
    }

    async findByEmail(email: string): Promise<Person> {
        const document = await getDoc(doc(this.db, "pessoas", email));
        if (!document.exists()) {
            return undefined;
        }

        const person = {
            name: document.data().name,
            email: document.id,
            senha: document.data().senha,
            empresa: document.data().empresa,
            com_quarto: document.data().com_quarto,
            id_quarto: document.data().id_quarto
        }
        return person;
    }

    async list(): Promise<Person[]> {
        const peopleCollection = collection(this.db, 'pessoas');
        const peopleSnapshot = await getDocs(peopleCollection);

        const personList = peopleSnapshot.docs.map(doc => 
            ({
                name: doc.data().name,
                email: doc.id,
                senha: doc.data().senha,
                empresa: doc.data().empresa,
                com_quarto: doc.data().com_quarto,
                id_quarto: doc.data().id_quarto
            })
        );

        return personList as unknown as Person[];
    }

    async updatePassword(Person: Person, new_password: string): Promise<void> {
        await setDoc(doc(this.db, "pessoas", Person.email), {
            name: Person.name,
            senha: new_password,
            empresa: Person.empresa,
            com_quarto: Person.com_quarto,
            id_quarto: Person.id_quarto
        });
        return undefined;
    }

    async delete(email: string): Promise<void> {
        const docRef = doc(this.db, "pessoas", email);
        await deleteDoc(docRef);
        return undefined;
    }

    async removeRoom (Person: Person): Promise<void> {
        await setDoc(doc(this.db, "pessoas", Person.email), {
            name: Person.name,
            email: Person.email,
            senha: Person.senha,
            empresa: Person.empresa,
            com_quarto: false,
            id_quarto: null
        });
        return undefined;
    }

    async isAdministrator (adminId: string, adminPass: string): Promise<boolean> {
        const ADMIN_ID = "ADMIN";
        const ADMIN_PASSWORD = "CTJUNIOR>>>";
        
        if ( adminId === ADMIN_ID && adminPass === ADMIN_PASSWORD)
            return true;
        return false;
      };
}

export default PeopleRepositories;