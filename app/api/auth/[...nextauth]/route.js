
import CognitoProvider from "next-auth/providers/cognito";
import NextAuth from 'next-auth';

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_DOMAIN
    }),
  ],

}
)

export { handler as GET, handler as POST }
