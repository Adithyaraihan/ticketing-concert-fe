import environment from "@/libs/config/environment";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IJWTExtended, IUserExtended, ISessionExtended } from "@/types/Auth";
import authServices from "@/services/auth.services";

const config: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: { label: "identifier", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { identifier, password } = credentials;
                
                try {
                    const result = await authServices.login({ identifier, password });
                    const accessToken = result.data.data;

                    const me = await authServices.getProfileWithToken(accessToken);
                    const user = me.data.data;

                    if (
                        accessToken && 
                        result.status === 200 &&
                        user._id &&
                        me.status === 200
                    ) {
                        user.accessToken = accessToken;
                        return user;
                    } else {
                        return null;
                    }
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || error.message || "Login failed";
                    if (errorMessage === "user not found" || errorMessage === "password not match") {
                        throw new Error("Email or Username and password do not match with your password");
                    }
                    throw new Error(errorMessage);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                (token as IJWTExtended).user = user as IUserExtended;
            }
            return token;
        },
        async session({ session, token }) {
            const extendedToken = token as IJWTExtended;
            if (extendedToken.user) {
                (session as ISessionExtended).user = extendedToken.user;
                (session as ISessionExtended).accessToken = extendedToken.user.accessToken;
            }
            return session;
        }
    }
};

export default NextAuth(config);
