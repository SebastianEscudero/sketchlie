import { throttle } from "lodash";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { Comment, Reply, User } from "@/types/canvas";

const throttledUpdateLayer = throttle((boardId, layerId, layerUpdates) => {
  updateR2Bucket('/api/r2-bucket/updateLayer', boardId, layerId, layerUpdates);
}, 1000);

export const useUpdateValue = () => {
  return useCallback((boardId: string, id: string, layer: any, newValue: string, expired: boolean, socket: Socket, setEditableValue: (newValue: string) => void) => {
    setEditableValue(newValue);
    layer.value = newValue;
    const layerUpdates = { ...layer, value: newValue };
    if (expired !== true) {
      throttledUpdateLayer(boardId, id, layerUpdates);
      if (socket) {
        socket.emit('layer-update', id, layerUpdates);
      }
    }
  }, []);
};

export const useUpdateReplies = () => {
  return useCallback((
    boardId: string, 
    id: string, 
    layer: Comment, 
    newReply: Reply, 
    expired: boolean, 
    socket: Socket, 
  ) => {
    const updatedReplies = [...(layer.replies || []), newReply];
    const updatedLayer = { ...layer, replies: updatedReplies };
    layer.replies = updatedReplies;

    if (!expired) {
      throttledUpdateLayer(boardId, id, updatedLayer);
      if (socket) {
        socket.emit('layer-update', id, updatedLayer);
      }
    }
  }, []);
};

export const useUpdateComment = () => {
  return useCallback((
    boardId: string,
    commentId: string,
    layer: Comment,
    newContent: string,
    replyId: string | null,
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: Comment) => void
  ) => {
    let updatedLayer: Comment;

    if (replyId) {
      // Updating a reply
      const updatedReplies = layer.replies?.map(reply => 
        reply.id === replyId ? { ...reply, content: newContent } : reply
      ) || [];
      updatedLayer = { ...layer, replies: updatedReplies };
    } else {
      // Updating the main comment
      updatedLayer = { ...layer, content: newContent };
    }

    if (!expired && socket) {
      throttledUpdateLayer(boardId, commentId, updatedLayer);
      socket.emit('layer-update', commentId, updatedLayer);
    }

    forceUpdateLayerLocalLayerState(commentId, updatedLayer);
  }, []);
};

export const useDeleteReply = () => {
  return useCallback((
    boardId: string,
    commentId: string,
    replyId: string,
    layer: Comment,
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: Comment) => void
  ) => {
    const updatedReplies = layer.replies?.filter(reply => reply.id !== replyId) || [];
    const updatedLayer = { ...layer, replies: updatedReplies };

    if (!expired && socket) {
      throttledUpdateLayer(boardId, commentId, updatedLayer);
      socket.emit('layer-update', commentId, updatedLayer);
    }

    forceUpdateLayerLocalLayerState(commentId, updatedLayer);
  }, []);
};

export const useMarkCommentAsReload = () => {
  return useCallback((
    boardId: string,
    id: string,
    layer: Comment,
    currentUser: User,
    expired: boolean,
    socket: Socket | null,
  ) => {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    const updateContent = (content: string) => {
      const doc = parser.parseFromString(content, 'text/html');
      const mentions = doc.querySelectorAll(`span.mention[data-user-id="${currentUser.userId}"]`);
      mentions.forEach(mention => {
        mention.removeAttribute('data-user-id');
      });
      return serializer.serializeToString(doc.body).replace(/<\/?body>/g, '');
    };

    const updatedContent = updateContent(layer?.content || '');

    const updatedReplies = layer?.replies?.map(reply => ({
      ...reply,
      content: updateContent(reply.content)
    }));

    const updatedLayer = {
      ...layer,
      content: updatedContent,
      replies: updatedReplies
    };

    if (!expired) {
      throttledUpdateLayer(boardId, id, updatedLayer);
      if (socket) {
        socket.emit('layer-update', id, updatedLayer);
      }
    }

    return updatedLayer;
  }, []);
};


export const useHandlePaste = () => {
  return useCallback(async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  }, []);
};