
import { Inngest } from "inngest";
import connectDB from "@/config/db";
import User from "@/models/user";

export const inngest = new Inngest({
    id: "quickcart-next",
});

// Sync user when created
export const syncUserData = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: { event: "clerk/user.created" },
    },
    async ({ event }) => {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            primary_email_address_id,
            image_url,
        } = event.data;

        const primaryEmail = email_addresses?.find(
            (email) => email.id === primary_email_address_id
        );

        await connectDB();

        await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: `${first_name || ""} ${last_name || ""}`.trim(),
                    email: primaryEmail?.email_address || "",
                    imageUrl: image_url || "",
                },
            },
            { upsert: true, new: true, runValidators: true }
        );
    }
);

// Update user when updated
export const updateUserData = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: { event: "clerk/user.updated" },
    },
    async ({ event }) => {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            primary_email_address_id,
            image_url,
        } = event.data;

        const primaryEmail = email_addresses?.find(
            (email) => email.id === primary_email_address_id
        );

        await connectDB();

        await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: `${first_name || ""} ${last_name || ""}`.trim(),
                    email: primaryEmail?.email_address || "",
                    imageUrl: image_url || "",
                },
            },
            { upsert: true, new: true, runValidators: true }
        );
    }
);

// Delete user when deleted
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
        triggers: { event: "clerk/user.deleted" },
    },
    async ({ event }) => {
        const { id } = event.data;

        await connectDB();

        await User.findOneAndDelete({ _id: id });
    }
);
