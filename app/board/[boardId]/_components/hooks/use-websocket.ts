import io, { Socket } from "socket.io-client";
import { useState, useEffect, useCallback } from 'react';
import { User } from "@/types/canvas";

const RECONNECTION_INTERVAL = 5000; // 5 seconds
const MAX_RETRIES = 5;
const TIMEOUT = 10 // seconds

function useWebSocket(url: string, roomId: string, user: User, isUserPartOfOrg: boolean) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (!user?.userId || !isUserPartOfOrg) {
      console.log('Waiting for user data or organization access...');
      return () => {};
    }

    const newSocket = io(url, {
      query: { roomId },
      reconnection: true,
      reconnectionAttempts: MAX_RETRIES,
      reconnectionDelay: RECONNECTION_INTERVAL,
      reconnectionDelayMax: RECONNECTION_INTERVAL,
      timeout: TIMEOUT * 1000,
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
  }, [url, roomId, user, isUserPartOfOrg]);

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