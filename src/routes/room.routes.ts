export const roomRoutes = {
  createRoom: {
    handler:
      "src/functions/rooms/createRoom.handler",
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

  findAll: {
    handler:
      "src/functions/rooms/listRooms.handler",
    events: [
      {
        http: {
          path: "room",
          method: "get",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
  updateRoom: {
    handler:
      "src/functions/rooms/updateRoom.handler",
    events: [
      {
        http: {
          path: "room",
          method: "put",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },

  findRoomById: {
    handler:
      "src/functions/rooms/findRoom.handler",
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
removePerson: {
    handler:
      "src/functions/rooms/removePerson.handler",
    events: [
      {
        http: {
          path: "room",
          method: "put",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
}
