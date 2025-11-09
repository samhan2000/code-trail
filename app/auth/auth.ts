import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers/oauth";

const NestOIDCProvider = {
    id: "nest-oidc",
    name: "Internal Login",
    type: "oauth",
    issuer: process.env.NEST_OIDC_ISSUER,
    clientId: process.env.NEST_CLIENT_ID,
    clientSecret: process.env.NEST_CLIENT_SECRET,

    wellKnown: `${process.env.NEST_OIDC_ISSUER}/.well-known/openid-configuration`,
    authorization: {
        url: `${process.env.NEST_OIDC_ISSUER}/authorize`,
        params: { scope: "openid profile email" },
    },
    token: `${process.env.NEST_OIDC_ISSUER}/token`,
    userinfo: `${process.env.NEST_OIDC_ISSUER}/userinfo`,

    profile(profile) {
        console.log(profile, "Profile")
        return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
        };
    },
} satisfies OAuthConfig<any>;

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        NestOIDCProvider,
    ],

    session: { strategy: "jwt" },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.provider = account.provider;
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.userId = profile?.sub
            }
            return token;
        },
        async session({ session, token }) {
            const { accessToken, idToken, provider } = token as {
                accessToken?: string;
                idToken?: string;
                provider?: string;
            };

            session.accessToken = accessToken;
            session.idToken = idToken;
            session.provider = provider;

            if (session.user) {
                session.user.userId = token.userId
            }

            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
        newUser: "/code-trail/dashboard"
    },

    debug: process.env.NODE_ENV === "development",
};
