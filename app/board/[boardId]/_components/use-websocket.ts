import io, { Socket } from "socket.io-client";
import { useState, useEffect, useCallback } from 'react';
import { User } from "@/types/canvas";

const RECONNECTION_INTERVAL = 5000; // 5 seconds

function useWebSocket(url: string, roomId: string, user: User) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    const newSocket = io(url, {
      query: { roomId },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: RECONNECTION_INTERVAL,
      reconnectionDelayMax: RECONNECTION_INTERVAL,
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      newSocket.emit('register', user.userId, user.connectionId, user.information.name, user.information.picture, user.information.role);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    });

    newSocket.io.on("reconnect", () => {
      console.log('Reconnected to WebSocket');
      setIsConnected(true);
      newSocket.emit('register', user.userId, user.connectionId, user.information.name, user.information.picture, user.information.role);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url, roomId, user]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  // Ping the server periodically to keep the connection alive
  useEffect(() => {
    if (!socket) return;

    const intervalId = setInterval(() => {
      if (socket.connected) {
        socket.emit('ping');
      } else {
        socket.connect();
      }
    }, RECONNECTION_INTERVAL);

    return () => clearInterval(intervalId);
  }, [socket]);

  return { socket, isConnected };
}

export default useWebSocket;