export const roomRoutes = {
  createRoom: {
    handler: "src/functions/rooms/createRoom.handler",
    events: [
      {
        http: {
          path: "room",
          method: "post",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
  findRoomById: {
    handler: "src/functions/rooms/findRoom.handler",
    events: [
      {
        http: {
          path: "room/{id}",
          method: "get",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
  insertPerson: {
    handler: "src/functions/rooms/insertPerson.handler",
    events: [
      {
        http: {
          path: "room/{id}/{email}",
          method: "put",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
};
