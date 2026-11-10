// src/inngest/client.ts
import { Inngest } from "inngest";
import { connectDB } from "@/utils/db";
import User from "@/models/user";

export const inngest = new Inngest({ id: "quickcart-next" });

//ingest fuction to save user data to the database when a user is created
export const snycUserData = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event: 'clerk.user/user.created',
    },

   async({event})=>{
   const{id,first_name,last_name,email_address,image_url} = event.data;
   const userData = {
       _id: id,
       email: email_addreses[0].email_address,
       name: `${first_name} ${last_name}`,
       imageUrl: image_url,
    }
    await connectDB();
    await User.create(userData);
   }
)
//ingest function to update user data in the database when a user is updated
export const updateUserData = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {
        event: 'clerk.user/user.updated',
    },
    async({event})=>{
        const{id,first_name,last_name,email_address,image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addreses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
        };
        await connectDB();
        await User.findOneAndUpdate({ _id: id }, userData, { new: true });
    }
);

//ingest function to delete user data from the database when a user is deleted
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {
        event: 'clerk.user/user.deleted',
    },
    async({event})=>{
        const{id} = event.data;
        await connectDB();
        await User.findOneAndDelete({ _id: id });
    }
);
