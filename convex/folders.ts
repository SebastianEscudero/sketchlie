import { v } from "convex/values";
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const folders = await ctx.db
      .query("folders")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    return folders;
  },
});

export const create = mutation({
  args: {
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    orgId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string
    const userName = args.userName as string

    if (!userId || !userName) {
      throw new Error("Unauthorized");
    }

    const newFolder = await ctx.db.insert("folders", {
      name: args.name,
      orgId: args.orgId,
      createdBy: userId,
      createdAt: Date.now(),
    });

    return newFolder;
  },
});

export const deleteFolder = mutation({
  args: {
    folderId: v.id("folders"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId as string

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_folder", (q) => q.eq("folderId", args.folderId))
      .collect();

    for (const board of boards) {
      await ctx.db.delete(board._id);
    }

    // Delete the folder
    await ctx.db.delete(args.folderId);

    return { success: true };
  },
});

export const update = mutation({
  args: { 
    id: v.id("folders"), 
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
      name: args.title,
    });

    return board;
  },
});