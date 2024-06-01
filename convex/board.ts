import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    orgId: v.string(),
    title: v.string(),
    layerIds: v.optional(v.array(v.string())),
    layers: v.optional(v.any()),
  },
  handler: async (ctx, args) => {

    const userId = args.userId as string
    const userName = args.userName as string

    const randomImage = images[Math.floor(Math.random() * images.length)];

    if (!userId || !userName) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: userId,
      authorName: userName!,
      imageUrl: randomImage,
      layerIds: args.layerIds || [],
      layers: args.layers || {},
    });

    return board;
  },
});

export const remove = mutation({
  args: { 
    id: v.id("boards"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => 
        q
          .eq("userId", userId)
          .eq("boardId", args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { 
    id: v.id("boards"), 
    title: v.string(),
    userId: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters")
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { 
    id: v.id("boards"), 
    orgId: v.string(),
    userId: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => 
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});


export const unfavorite = mutation({
  args: { 
    id: v.id("boards"),
    userId: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {

    const userId = args.userId as string

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => 
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});

export const addLayer = mutation({
  args: {
    board: v.any(),
    layer: v.any(),
    layerId: v.any(),
  },
  handler: async (ctx, args) => {
    const board = args.board;
    if (!board) {
      throw new Error("Board not found");
    }

    // Ensure layerId and layer are arrays
    const layerIds = Array.isArray(args.layerId) ? args.layerId : [args.layerId];
    const layers = Array.isArray(args.layer) ? args.layer : [args.layer];

    layerIds.forEach((layerId, index) => {
      board.layers[layerId] = layers[index];
      board.layerIds.push(layerId);
    });

    // Only update the necessary fields
    await ctx.db.patch(board._id, { layers: board.layers, layerIds: board.layerIds });
    return board;
  },
});

export const deleteLayer = mutation({
  args: {
    board: v.any(),
    layerId: v.any(),
  },
  handler: async (ctx, args) => {
    const board = args.board
    if (!board) {
      throw new Error("Board not found");
    }

    // Ensure layerId is an array
    const layerIds = Array.isArray(args.layerId) ? args.layerId : [args.layerId];

    layerIds.forEach((layerId) => {
      if (!board.layers[layerId]) {
        throw new Error(`Layer ${layerId} not found`);
      }
      delete board.layers[layerId];
      const layerIndex = board.layerIds.indexOf(layerId);
      if (layerIndex !== -1) {
        board.layerIds.splice(layerIndex, 1);
      }
    });

    await ctx.db.patch(board._id, board);
    return board;
  },
});

export const updateLayer = mutation({
  args: {
    board: v.any(),
    layerId: v.any(),
    layerUpdates: v.any(),
  },
  handler: async (ctx, args) => {
    const board = args.board;
    if (!board) {
      throw new Error("Board not found");
    }

    // Ensure layerId and layerUpdates are arrays
    const layerIds = Array.isArray(args.layerId) ? args.layerId : [args.layerId];
    const layersUpdates = Array.isArray(args.layerUpdates) ? args.layerUpdates : [args.layerUpdates];

    layerIds.forEach((layerId, index) => {
      if (!board.layers[layerId]) {
        throw new Error(`Layer ${layerId} not found`);
      }
      board.layers[layerId] = { ...board.layers[layerId], ...layersUpdates[index] };
    });

    await ctx.db.patch(board._id, { layers: board.layers });
    return board;
  },
});

export const updateLayerIds = mutation({
  args: {
    board: v.any(),
    layerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const board = args.board;
    if (!board) {
      throw new Error("Board not found");
    }
    board.layerIds = args.layerIds;
    await ctx.db.patch(board._id, { layerIds: board.layerIds });
    return board;
  },
});