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
}