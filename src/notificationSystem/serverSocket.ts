import { Server, Socket } from 'socket.io'

const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST']
}

class Websocket extends Server {
  private static io: any

  constructor (httpServer:any) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    })
  }

  public initializeHandlers (socketHandlers: Array<any>) {
    socketHandlers.forEach(element => {
      const namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket)
      })

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation)
      }
    })
  }

  public static getInstance (httpServer?: any): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer)
    }

    return Websocket.io
  }
}

export default Websocket
