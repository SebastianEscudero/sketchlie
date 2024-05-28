import { Layers, User } from "@/types/canvas";
import React, { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface RoomContextValue {
  roomId: string;
  socket: Socket | null;
  expired: boolean;
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
const RoomContext = createContext<RoomContextValue>({ roomId: "", socket: null, expired: false});

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
  userInfo: any;
  board: any;
}

export const Room = React.memo(({ children, roomId, fallback, userInfo, board }: RoomProps) => {

  const orgId = board?.orgId;
  const org = userInfo.organizations.find((org: any) => org.id === orgId);
  const role = org.users.find((user: any) => user.id === userInfo.id).role

  let expired = false
  if (org.subscription) {
    const now = new Date().getTime();
    const expiration = new Date(org.subscription.mercadoPagoCurrentPeriodEnd).getTime();
    expired = now > expiration;
  }

  if (role === 'Guest') {
    expired = true;
  }

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

    //todo correctly remove on ipads and mobile

    return () => {
      socket.off('users');
      socket.emit('user-disconnect', User.userId); // Emit 'user-disconnect' event when cleaning up
    };
  }, [socket, User]);

  useEffect(() => {
    const newSocket = io('https://sketchlie-server-little-resonance-2329.fly.dev', {
      query: { roomId }
    });
    setSocket(newSocket);

    newSocket.on('layer-update', (layerIds, layers) => {
      // Ensure layerIds and layers are arrays
      layerIds = Array.isArray(layerIds) ? layerIds : [layerIds];
      layers = Array.isArray(layers) ? layers : [layers];
    
      setLiveLayers(prevLayers => {
        let newLayers = { ...prevLayers };
        layerIds.forEach((layerId: string, index: any) => {
          newLayers[layerId] = { ...newLayers[layerId], ...layers[index] };
        });
        return newLayers;
      });
    
      setLiveLayerIds(prevLayerIds => {
        let newLayerIds = [...prevLayerIds];
        layerIds.forEach((layerId: string) => {
          if (!newLayerIds.includes(layerId)) {
            newLayerIds.push(layerId);
          }
        });
        return newLayerIds;
      });
    });

    newSocket.on('layer-delete', (layerId) => {
      // Ensure layerId is an array
      layerId = Array.isArray(layerId) ? layerId : [layerId];
    
      setLiveLayers(layers => {
        const newLayers = { ...layers };
        layerId.forEach((id: string) => {
          delete newLayers[id];
        });
        return newLayers;
      });
    
      setLiveLayerIds(layerIds => layerIds.filter(id => !layerId.includes(id)));
    });

    newSocket.on('layer-send', (newLayerIds) => {
      setLiveLayerIds(newLayerIds);
    });

    return () => {
      newSocket.close();
    };
  }, [roomId]);

  return (
    <RoomContext.Provider value={{ roomId, socket, expired }}>
      <LayerContext.Provider value={{ liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, User, setUser, otherUsers, setOtherUsers, org, board }}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </LayerContext.Provider>
    </RoomContext.Provider>
  );
});

Room.displayName = 'Room'

export const useRoom = () => {
  const roomContext = useContext(RoomContext);
  const layerContext = useContext(LayerContext);
  if (!roomContext || !layerContext) {
    throw new Error('useRoom must be used within a RoomContext.Provider and a LayerContext.Provider');
  }
  return { ...roomContext, ...layerContext };
};