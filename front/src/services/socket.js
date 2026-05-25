import { io } from "socket.io-client";

let socket = null;

export const createSocketConnection = (serverIp, role) => {

    if (socket) socket.disconnect();


    socket = io(`http://${serverIp}:5000`,
        {
            autoConnect: true,
            auth: { role }
        }
    );

    return socket;
};

export const getSocket = () => socket;