
import { serve } from "inngest/next";
import {
    inngest,
    syncUserData,
    syncUserDeletion,
    updateUserData,
} from "@/config/inngest";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        syncUserData,
        syncUserDeletion,
        updateUserData,
    ],
});
