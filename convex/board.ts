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
    private: v.optional(v.boolean()),
    folderId: v.optional(v.string())
  },
  handler: async (ctx, args) => {

    const userId = args.userId as string
    const userName = args.userName as string
    const isPrivate = true;

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
      private: isPrivate,
      folderId: args.folderId
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

export const updateBoardsFolder = mutation({
  args: { 
    boardIds: v.array(v.id("boards")),
    folderId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { boardIds, folderId, userId } = args;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const updatePromises = boardIds.map(boardId => 
      ctx.db.patch(boardId, { folderId: folderId })
    );

    await Promise.all(updatePromises);

    return { success: true };
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

export const togglePrivate = mutation({
  args: { 
    id: v.id("boards"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    // Toggle the private status
    const updatedBoard = await ctx.db.patch(args.id, {
      private: !board.private,
    });

    return updatedBoard;
  },
});