import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

class Room {
  users: User[];

  constructor() {
    this.users = [];
  }

  registerUser(user: User) {
    this.users.push(user);
  }

  removeUser(userId: string) {
    this.users = this.users.filter(user => user.userId !== userId);
  }

  getUser(userId: string) {
    return this.users.find(user => user.userId === userId);
  }

  getUsers() {
    return this.users;
  }
}

type Color = {
    r: number;
    g: number;
    b: number;
  };

type Presence = {
    cursor?: { x: number, y: number } | null,
    selection?: string[];
    pencilDraft?: [x: number, y: number, pressure: number][] | null;
    penColor?: Color | null;
  };

type User = {
    userId: string;
    connectionId: number;
    presence: Presence | null;
    information?: {
        role: string;
        name?: string;
        picture?: string;
      };
  };

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

let rooms: { [roomId: string]: Room } = {};
let socketToUserId: { [socketId: string]: string } = {};

io.on('connection', (socket: Socket) => {
  const roomId = socket.handshake.query.roomId;

  if (typeof roomId === 'string') {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = new Room();
    }

    socket.on('role-update', (userId: string, newRole: string) => {
      const user = rooms[roomId].getUser(userId);
      if (user && user.information) {
        user.information.role = newRole;
        socket.to(roomId).emit('role-update', userId, newRole);
      }
    });

    socket.on('register', (userId, connectionId, name, picture, role) => {   
      let user = rooms[roomId].getUser(userId);
      if (!user) {
        user = {
          userId: userId,
          connectionId: connectionId,
          presence: null,
          information: {
            role: role,
            name: name,
            picture: picture
          }
        };
        rooms[roomId].registerUser(user);
        socketToUserId[socket.id] = userId;
      }
      io.to(roomId).emit('users', rooms[roomId].getUsers());
    });

    socket.on('presence', (presence: Presence, userId) => {
      const user = rooms[roomId].getUser(userId);
      if (user) {
        user.presence = presence;
      }
      io.to(roomId).emit('users', rooms[roomId].getUsers());
    });

    socket.on('disconnect', () => {
      if (rooms[roomId]) {
        const userId = socketToUserId[socket.id]; // Find the userId using the socket.id
        if (userId) {
          rooms[roomId].removeUser(userId);
          io.to(roomId).emit('users', rooms[roomId].getUsers());
          delete socketToUserId[socket.id]; // Remove the mapping for the disconnected user
        }
      }
    });

    socket.on('layer-update', (layerIds, layers) => {
        socket.to(roomId).emit('layer-update', layerIds, layers);
    });

    socket.on('layer-delete', (layerIds, layers) => {
        socket.to(roomId).emit('layer-delete', layerIds, layers);
    });

    socket.on('layer-send', (layerIds) => {
      io.to(roomId).emit('layer-send', layerIds);
    });

    }
});

server.listen(3000, () => {
  console.log('✔️ Server is running on port 3000');
})