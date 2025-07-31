
const BASE_URL = "ws://localhost:8080";

export class SocketManager{
   private static instance: SocketManager;
   private socket: WebSocket | null = null;
   private isReady: boolean = false

    private constructor() {
     this.socket = new WebSocket(BASE_URL);
     this.socket.onopen = () => console.log("connected");
     
    }

    public static getInstance() {
        if(!this.instance) {
         this.instance = new SocketManager();
        }

        return this.instance;
    }

    public sendMessage(data: string) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(data);
            console.log("sent message")
          } else {
            console.warn("WebSocket not ready");
          }
    }

    public onMessage(callback: (data: any) => void) {
        if(!this.socket) {
            console.error("websocket not connected")
            return;
        }

        console.log("yes")
        this.socket.onmessage = (msg) => {
            const data = JSON.parse(msg.data);

            console.log(data)
      
            if (!Array.isArray(data) && data.length <= 0){
              return
            }

            callback(data)
        }
    }

    public close() {
        this.socket?.close();
    }
}