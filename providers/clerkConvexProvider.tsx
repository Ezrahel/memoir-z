import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { tokenCache } from '@clerk/clerk-expo/token-cache';

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
const publishableKey= process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey){
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function ClerkAndConvexProvider ({children}: {children: React.ReactNode} ){ 

return(
   
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
       <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <ClerkLoaded>
     
     {children}
      </ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
 
);
}

