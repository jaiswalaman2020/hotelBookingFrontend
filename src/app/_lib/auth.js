// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { createGuest, getGuest } from "./data-service";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       console.log("triggered authorized callback");
//       return !!auth?.user;
//     },
//     async signIn({ user, account, profile }) {
//       try {
//         console.log(user);
//         const existingGuest = await getGuest(user.email);
//         console.log("existingGuest", existingGuest);

//         if (!existingGuest) {
//           console.log("creating guest");
//           await createGuest({ email: user.email, fullName: user.name });
//         }

//         return true;
//       } catch (error) {
//         console.error("CAUGHT ERROR", error);
//         return false;
//       }
//     },
//     async session({ session, user }) {
//       const guest = await getGuest(session.user.email);
//       session.user.guestId = guest.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);
