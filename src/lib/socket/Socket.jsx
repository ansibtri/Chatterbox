import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  path: "/socket.io",
  withCredentials: true,        // ✅ if you use cookies/auth
});

export { socket };
