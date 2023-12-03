import Person from "src/models/Person";

interface IPeopleRepositories {
    /**
     * Create a new person
     * @param name Name of the person
     * @param email Email of the person
     * @param password password of the person
     */
    create(name: string, email: string, password: string, empresa: string): Promise<void>;

    /**
     * Find a person by name
     * @param email Email of the person
     * @returns A person with the given name
     */
    findByEmail(email: string): Promise<Person>;

    /**
     * List all people
     */
    list(): Promise<Person[]>;

    /**
     * Update a person
     * @param Person Person to be updated
     * @param new_password new password
     */
    updatePassword(Person: Person, new_password: string): Promise<void>;

    /**
     * Delete a person
     * @param email Email of the person
     */
    delete(email: string): Promise<void>;


    /**
     * Clean its "id_quarto" field and set "com_quarto" to false
     * @param Person Person to be removed
     */
    removeRoom (Person: Person): Promise<void>;

    /**
     * Check if the person is an administrator
     * @param adminId Email of the person
     * @param adminPass Password of the person
     * @returns true if the person is an administrator
    */
    isAdministrator (adminId: string, adminPass: string): Promise<boolean>;
}

export {IPeopleRepositories};