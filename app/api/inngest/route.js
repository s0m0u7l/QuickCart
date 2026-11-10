import { serve } from "inngest/next";
import { inngest, snycUserData, updateUserData,syncUserDeletion } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    snycUserData,
    updateUserData,
    syncUserDeletion
  ],
});