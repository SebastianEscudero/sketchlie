import { Layers, User } from "@/types/canvas";
import React, { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { NotPartOfOrg } from "./auth/board-not-part-of-org-loading";
import { addUserToOrganization } from "@/actions/accept-invite";
import { useCurrentUser } from "@/hooks/use-current-user";
import useWebSocket from "@/app/board/[boardId]/_components/use-websocket";

interface RoomContextValue {
  roomId: string;
  socket: Socket | null;
  expired: boolean;
  isConnected: boolean;
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
const RoomContext = createContext<RoomContextValue>({ roomId: "", socket: null, expired: false, isConnected: false });

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
  board: any;
  layers: Layers;
  layerIds: string[];
}

const defaultRole = "Member";

export const Room = React.memo(({ children, roomId, fallback, board, layers, layerIds }: RoomProps) => {
  const userInfo = useCurrentUser();
  const [org, setOrg] = useState<any>(null);
  const [isUserPartOfOrg, setIsUserPartOfOrg] = useState<boolean>(false);
  const [role, setRole] = useState<string>("Guest");
  const [expired, setExpired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [liveLayers, setLiveLayers] = useState<Layers>({});
  const [liveLayerIds, setLiveLayerIds] = useState<string[]>([]);
  const [User, setUser] = useState<User>({} as User);
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    if (role === "Guest") {
      setExpired(true);
    } else {
      setExpired(false);
    }
  }, [role]);

  useEffect(() => {
    if (!userInfo || !board) return;

    const checkOrganizationAccess = async () => {
      const foundOrg = userInfo.organizations.find((org: any) => org.id === board?.orgId);
      
      if (foundOrg) {
        setOrg(foundOrg);
        const userRole = foundOrg.users.find((user: any) => user.id === userInfo.id)?.role || "Guest";
        setRole(userRole);
        setIsUserPartOfOrg(true);

        if (foundOrg.subscription) {
          const now = new Date().getTime();
          const expiration = new Date(foundOrg.subscription.mercadoPagoCurrentPeriodEnd).getTime();
          if (userRole !== "Guest") {
            setExpired(now > expiration);
          }
        }
      } else if (!board.private) {
        try {
          await addUserToOrganization(board.orgId, userInfo.id, defaultRole, board.orgId)
          .then(({ org }) => {
            setOrg(org);
            setRole("Guest");
            setIsUserPartOfOrg(true);

            if (org?.subscription) {
              const now = new Date().getTime();
              const expiration = org.subscription.mercadoPagoCurrentPeriodEnd
                ? new Date(org.subscription.mercadoPagoCurrentPeriodEnd).getTime()
                : 0;
              setExpired(now > expiration);
            }
          });
        } catch (error) {
          console.error("Error adding user to organization:", error);
          setIsUserPartOfOrg(false);
          setExpired(true);
        }
      } else {
        setIsUserPartOfOrg(false);
        setExpired(true);
      }
      setIsLoading(false);
    };

    checkOrganizationAccess();
  }, [userInfo, board]);
  
  useEffect(() => {
    if (layers && layerIds) {
      setLiveLayers(layers);
      setLiveLayerIds(layerIds);
    }

    if (userInfo) {
      setUser({
        userId: userInfo.id,
        connectionId: Math.floor(Math.random() * 1000000),
        presence: null,
        information: {
            role: role,
            name: userInfo.name || "Teammate",
            picture: userInfo.image || undefined,
          }
      });
    }
  }, []);

  useEffect(() => {
    setUser(prevUser => ({
      ...prevUser,
      information: { ...prevUser.information, role }
    }));
  }, [role]);

  const { socket, isConnected } = useWebSocket(
    'https://sketchlie-server-little-resonance-2329.fly.dev',
    roomId,
    User
  );

  useEffect(() => {
    if (!socket) return;

    socket.on('users', (users: User[]) => {
      setOtherUsers(users.filter(user => user.userId !== User.userId));
    });

    socket.on('layer-update', (layerIds, layers) => {
      layerIds = Array.isArray(layerIds) ? layerIds : [layerIds];
      layers = Array.isArray(layers) ? layers : [layers];
    
      setLiveLayers(prevLayers => {
        const newLayers = { ...prevLayers };
        layerIds.forEach((layerId: string, index: number) => {
          newLayers[layerId] = { ...newLayers[layerId], ...layers[index] };
        });
        return newLayers;
      });
    
      setLiveLayerIds(prevLayerIds => {
        const newLayerIds = [...prevLayerIds];
        layerIds.forEach((layerId: string) => {
          if (!newLayerIds.includes(layerId)) {
            newLayerIds.push(layerId);
          }
        });
        return newLayerIds;
      });
    });

    socket.on('layer-delete', (layerId) => {
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

    socket.on('layer-send', (newLayerIds) => {
      setLiveLayerIds(newLayerIds);
    });

    socket.on('role-update', (updatedUserId: string, newRole: string) => {
      if (updatedUserId === User.userId) {
        setRole(newRole);
      } else {
        setOtherUsers(prevUsers => 
          prevUsers.map(user => 
            user.userId === updatedUserId 
              ? { ...user, information: { ...user.information, role: newRole } }
              : user
          )
        );
      }
    });

    return () => {
      socket.off('users');
      socket.off('layer-update');
      socket.off('layer-delete');
      socket.off('layer-send');
      socket.off('role-update');
    };
  }, [socket, User]);

  if (isLoading) {
    return <NotPartOfOrg label="Joining organization..."/>;
  }

  if (!isUserPartOfOrg) {
    return <NotPartOfOrg label="You are not part of this organization"/>;
  }

  if (!isConnected) {
    return <NotPartOfOrg label="Connecting to room..."/>;
  }

  return (
    <RoomContext.Provider value={{ roomId, socket, expired, isConnected }}>
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