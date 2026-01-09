// import { NextAuthOptions, User, getServerSession } from "next-auth";
// // import {useSession} 

// import { CredentialsProvider } from "next-auth/providers";
// import { GoogleProvider } from "next-auth/providers/google"
// import { GithubProvider } from "next-auth/providers/github"



// export const authconfig: NextAuthOptions= {
//     providers: [
//         CredentialsProvider({
//             name: "sign in",
//             credentials: {
//                 email:{
//                     label: "Email",
//                     type: "email",
//                     placeholder: "example@gmail.com",
//                 },
//                 password:{ label: "Password", type: "password" },
//             },
//             async authorize(credentials){
//                 if (!credentials || !credentials.email || !credentials.password) 
//                     return null;
//             }
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID as string,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//         }),
//     ],
//  }; 