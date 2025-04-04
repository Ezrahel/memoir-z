import {httpRouter} from "convex/server";
import { httpAction } from "./_generated/server";
import {Webhook} from "svix";
import {api} from "./_generated/api";

const http=httpRouter();


http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async(ctx, request)=>{
        const webhookSecret= process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        const svix_id=request.headers.get("svix-id");
        const svix_signature=request.headers.get("svix-signature");
        const svix_timestamp=request.headers.get("svix-timestamp");
        
        if (!svix_id || !svix_signature ||!svix_timestamp){
            return new Response("Error occured -- no svix header found", {
                status: 400,
            });
        }
        const payload= await request.json();
        const body = JSON.stringify(payload);

        const wh= new Webhook(webhookSecret);
        let evnt:any;

        //verify the webhook
        try{
            evnt=wh.verify(body,{
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp
            }) as any;
        } catch (err) {
            console.error("Error verifying webhook: ", err);
            return new Response("Error occured ", { status: 400})
            }

        const eventType = evnt.type;
        if (eventType==="user.created") {
            const {id,email_addresses,first_name,last_name,image_url, username} = evnt.data;
            const email=email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try{
                await ctx.runMutation(api.users.createUser,{
                    email,
                    fullname:name,
                    image:image_url,
                    clerkId: id,
                    username: username
                    // username: email.split("@")[0],
                })
            } catch (error) {
                console.log("Error creating uuser: ", error);
                return new Response("Error creating user", {status:500});
            }
        }
        return new Response("Webhook processed successfully", {status:200});
        
    })
})

export default http;