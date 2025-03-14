import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    userId: v.optional(v.string()),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
    folderId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    
    const userId = args.userId as string

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) => 
          q
            .eq("userId", userId)
            .eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((b) => b.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board: any) => ({
        ...board,
        isFavorite: true,
      }));
    }

    const title = args.search as string;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) => 
          q
            .search("title", title)
            .eq("orgId", args.orgId)
        )
        .collect();
      } else if (args.folderId) {
        // If folderId is provided, fetch boards for that specific folder
        boards = await ctx.db
          .query("boards")
          .withIndex("by_folder", (q) => q.eq("folderId", args.folderId))
          .order("desc")
          .collect();
      } else {
        // Fetch all boards for the organization
        boards = await ctx.db
          .query("boards")
          .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
          .order("desc")
          .collect();
      }

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) => 
          q
            .eq("userId", userId)
            .eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavoriteBoolean;
  },
});

export const updateFolder = mutation({
  args: {
    boardId: v.id("boards"),
    folderId: v.optional(v.id("folders")),
  },
  handler: async (ctx, args) => {
    const { boardId, folderId } = args;

    await ctx.db.patch(boardId, { folderId });

    return { success: true };
  },
});