import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
export const generateUploadUrl=mutation(async(ctx) => {
    const identity= await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
});

export const createPost= mutation({
    args:{
        caption: v.optional(v.string()),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);  
        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if (!imageUrl)  throw new Error("Image does not exist");
        
       const postId = await ctx.db.insert("posts", {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            caption:args.caption,
            likes:0,
            comment:0
        });

        await  ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1
        })

        return postId
    },
});

export const getFeedPosts= query({
    handler: async(ctx)=>{
        const currentUser= await getAuthenticatedUser(ctx);
        const posts= await ctx.db.query("posts").order("desc").collect()

        if(posts.length===0) return [];

        //enhance post and user interaction
        const postsWithInfo = await Promise.all(
            posts.map(async (post)=>{
                const postAuthor=await ctx.db.get(post.userId);

                const like = await ctx.db.query("likes").withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)
            ).first();
            const bookMark = await ctx.db.query("bookmarks").withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)
                ).first();
                return{
                    ...post,
                    author:{
                        _id:postAuthor?._id,
                        username: postAuthor?.username,
                        image:postAuthor?.image
                    },
                    isLiked: !!like,
                    isBookmarked:!!bookMark
                }
                })
        
        );
        return postsWithInfo;
    },
})