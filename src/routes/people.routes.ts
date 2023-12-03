export const peopleRoutes = {
    createPerson: {
        handler:
          "src/functions/people/createPerson.handler",
        events: [
          {
            http: {
              path: "person",
              method: "post",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    findPerson: {
        handler:
          "src/functions/people/findPerson.handler",
        events: [
          {
            http: {
              path: "person/{email}",
              method: "get",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    deletePerson: {
        handler:
          "src/functions/people/deletePerson.handler",
        events: [
          {
            http: {
              path: "person/{email}",
              method: "delete",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    updatePerson: {
        handler:
          "src/functions/people/updatePerson.handler",
        events: [
          {
            http: {
              path: "person",
              method: "put",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    listPeople: {
        handler:
          "src/functions/people/listPeople.handler",
        events: [
          {
            http: {
              path: "people",
              method: "get",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    }
}