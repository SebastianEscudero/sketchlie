import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
    private: v.optional(v.boolean()),
    folderId: v.optional(v.string()),
  })
    .index("by_org", ["orgId"])
    .index("by_folder", ["folderId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"]
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards")
  })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),
  folders: defineTable({
    name: v.string(),
    orgId: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
  }).index("by_org", ["orgId"]),
});