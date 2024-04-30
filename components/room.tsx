import { Layers, User } from "@/types/canvas";
import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface RoomContextValue {
  roomId: string;
  socket: Socket | null;
}

interface LayerContextValue {
  liveLayers: Layers;
  liveLayerIds: string[];
  setLiveLayers: React.Dispatch<React.SetStateAction<Layers>>;
  setLiveLayerIds: React.Dispatch<React.SetStateAction<string[]>>;
  User: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  otherUsers: User[];
  setOtherUsers: React.Dispatch<React.SetStateAction<User[]>>;
  org: any;
  board: any;
}

const LayerContext = createContext<LayerContextValue | undefined>(undefined);
const RoomContext = createContext<RoomContextValue>({ roomId: "", socket: null });

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
  userInfo: any;
  board: any;
}

export const Room = ({ children, roomId, fallback, userInfo, board }: RoomProps) => {
  const orgId = board?.orgId;
  const org = userInfo.organizations.find((org: any) => org.id === orgId);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveLayers, setLiveLayers] = useState<Layers>({});
  const [liveLayerIds, setLiveLayerIds] = useState<string[]>([]);
  const [User, setUser] = useState<User>({
    userId: userInfo.id,
    presence: null,
    information: {
      name: userInfo.name || "Teammate",
      picture: userInfo.image || undefined,
    }
  });
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    if (board) {
      setLiveLayers(board.layers || {});
      setLiveLayerIds(board.layerIds || {});
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('users', (users: User[]) => {
      setOtherUsers(users.filter(user => user.userId !== User.userId));
    });

    socket.emit('register', User.userId, User.information.name, User.information.picture);

    window.onbeforeunload = () => {
      socket.emit('user-disconnect', User.userId);
    }

    return () => {
      socket.off('users');
      socket.emit('user-disconnect', User.userId); // Emit 'user-disconnect' event when cleaning up
    };
  }, [socket, User]);

  useEffect(() => {
    if (!process.env.SKETCHLIE_SERVER) {
      throw new Error("no server");
    }

    const newSocket = io(process.env.SKETCHLIE_SERVER, {
      query: { roomId }
    });
    setSocket(newSocket);

    newSocket.on('layer-update', (layerId, layer) => {
      setLiveLayers(layers => ({ ...layers, [layerId]: layer }));
      setLiveLayerIds(layerIds => {
        if (!layerIds.includes(layerId)) {
          return [...layerIds, layerId];
        }
        return layerIds;
      });
    });

    newSocket.on('layer-delete', (layerId) => {
      setLiveLayers(layers => {
        const newLayers = { ...layers };
        delete newLayers[layerId];
        return newLayers;
      });
      setLiveLayerIds(layerIds => layerIds.filter(id => id !== layerId));
    });

    newSocket.on('layer-send', (newLayerIds) => {
      setLiveLayerIds(newLayerIds);
    });

    return () => {
      newSocket.close();
    };
  }, [roomId]);

  return (
    <RoomContext.Provider value={{ roomId, socket }}>
      <LayerContext.Provider value={{ liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, User, setUser, otherUsers, setOtherUsers, org, board }}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </LayerContext.Provider>
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const roomContext = useContext(RoomContext);
  const layerContext = useContext(LayerContext);
  if (!roomContext || !layerContext) {
    throw new Error('useRoom must be used within a RoomContext.Provider and a LayerContext.Provider');
  }
  return { ...roomContext, ...layerContext };
};