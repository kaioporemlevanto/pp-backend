export const roomRoutes = {
  createRoom: {
    handler:
      "src/functions/rooms/createRoom.handler",
    events: [
      {
        http: {
          path: "room",
          method: "post",
          cors: true
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
          cors: true
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
          cors: true
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
          cors: true
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
          cors: true
        },
      },
    ],
  },
  deleteRoom: {
    handler: "src/functions/rooms/deleteRoom.handler",
    events: [
      {
        http: {
          path: "room/{id}",
          method: "delete",
          cors: true
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
          path: "room/{email}",
          method: "put",
          cors: true
        },
      },
    ],
  },
}
