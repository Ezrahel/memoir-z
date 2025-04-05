import { mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
  args: { 
    email: v.string(),
    username: v.string(),
    fullname:v.string(),
    bio: v.optional(v.string()),
    image:v.string(),
    clerkId: v.string()
   },
  handler: async (ctx, args) => {
    const existingUser= await ctx.db.query("users")
    .withIndex("by_clerk_id", (q)=> q.eq("clerkId", args.clerkId)).first()

    if (existingUser) return
    const newTaskId = await ctx.db.insert("users", {
        email: args.email,
        username: args.username,
        fullname: args.fullname, 
        bio: args.bio,
        image: args.image,
        clerkId: args.clerkId,
        followers: 0,
        following: 0,
        posts:0,
    });
    return newTaskId;
  },
});

export async function getAuthenticatedUser(ctx:QueryCtx | MutationCtx){
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const currentUser = await ctx.db.query("users").withIndex("by_clerk_id", (q)=>q.eq("clerkId", identity.subject)).first();
    if (!currentUser) throw new Error("User not found");
    return currentUser
}