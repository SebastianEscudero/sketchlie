import { throttle } from "lodash";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { Comment, Reply, User } from "@/types/canvas";
import { TableColumn, TableColumnType } from "../table";

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

export const useUpdateTableCell = () => {
  return useCallback((
    boardId: string,
    layerId: string,
    layer: any,
    rowIndex: number,
    columnKey: string,
    value: any,
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: any) => void
  ) => {
    const newData = [...layer.data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnKey]: value
    };

    const updatedLayer = { ...layer, data: newData };

    if (!expired && socket) {
      throttledUpdateLayer(boardId, layerId, updatedLayer);
      socket.emit('layer-update', layerId, updatedLayer);
    }

    if (forceUpdateLayerLocalLayerState) {
      forceUpdateLayerLocalLayerState(layerId, updatedLayer);
    }
  }, []);
};

const randomColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-red-100 text-red-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
];

export const useUpdateStatus = () => {
  return useCallback((
    boardId: string,
    layerId: string,
    layer: any,
    rowIndex: number,
    columnKey: string,
    value: string | null,
    currentStatuses: { label: string; color: string; }[],
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState?: (layerId: string, updatedLayer: any) => void
  ) => {
    let updatedStatuses = currentStatuses;

    // If we have a new value and it's not in current statuses, add it
    if (value && !currentStatuses.find(s => s.label === value)) {
      const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      updatedStatuses = [...currentStatuses, { label: value, color: randomColor }];
    }

    // Update both the cell value and available statuses
    const newData = [...layer.data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnKey]: value
    };

    const updatedLayer = {
      ...layer,
      data: newData,
      availableStatuses: updatedStatuses
    };

    if (!expired && socket) {
      throttledUpdateLayer(boardId, layerId, updatedLayer);
      socket.emit('layer-update', layerId, updatedLayer);
    }

    if (forceUpdateLayerLocalLayerState) {
      forceUpdateLayerLocalLayerState(layerId, updatedLayer);
    }

    return updatedStatuses;
  }, []);
};

export const useTableOperations = () => {
  const addRow = useCallback((
    boardId: string,
    layerId: string,
    layer: any,
    expired: boolean,
    socket: Socket | null,
    rowHeight: number,
    forceUpdateLayerLocalLayerState?: (layerId: string, updatedLayer: any) => void,
  ) => {
    const HEADER_HEIGHT = 76;
    const ADD_ROW_HEIGHT = 40;

    // Calculate current scale
    const currentContentHeight = layer.height - (HEADER_HEIGHT + ADD_ROW_HEIGHT);
    const currentScale = currentContentHeight / (layer.data.length * rowHeight);

    // Calculate how much height to add for new row
    const newRowScaledHeight = rowHeight * currentScale;

    const newRow = layer.columns.reduce((acc: any, col: TableColumn) => {
      acc[col.key] = "";
      return acc;
    }, {});


    const updatedLayer = {
      ...layer,
      data: [...layer.data, newRow],
      height: layer.height + newRowScaledHeight
    };

    if (!expired && socket) {
      throttledUpdateLayer(boardId, layerId, updatedLayer);
      socket.emit('layer-update', layerId, updatedLayer);
    }

    if (forceUpdateLayerLocalLayerState) {
      forceUpdateLayerLocalLayerState(layerId, updatedLayer);
    }

    return updatedLayer;
  }, []);

  const addColumn = useCallback((
    boardId: string,
    layerId: string,
    layer: any,
    columnType: TableColumnType,
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState?: (layerId: string, updatedLayer: any) => void
  ) => {
    // Generate unique key for new column
    const baseKey = columnType.toLowerCase();
    let columnKey = baseKey;
    let counter = 1;

    while (layer.columns.some((col: TableColumn) => col.key === columnKey)) {
      columnKey = `${baseKey}${counter}`;
      counter++;
    }

    const newColumn: TableColumn = {
      type: columnType,
      key: columnKey,
      title: `New ${columnType}`
    };

    // Add empty value for new column to all existing rows
    const updatedData = layer.data.map((row: any) => ({
      ...row,
      [columnKey]: ""
    }));

    const updatedLayer = {
      ...layer,
      columns: [...layer.columns, newColumn],
      data: updatedData,
      width: layer.width + 200 // Increase width for new column
    };

    if (!expired && socket) {
      throttledUpdateLayer(boardId, layerId, updatedLayer);
      socket.emit('layer-update', layerId, updatedLayer);
    }

    if (forceUpdateLayerLocalLayerState) {
      forceUpdateLayerLocalLayerState(layerId, updatedLayer);
    }

    return updatedLayer;
  }, []);

  return {
    addRow,
    addColumn
  };
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