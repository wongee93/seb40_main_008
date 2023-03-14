import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
// import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from "next-auth/providers/kakao"

// const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
// const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;

// if (!googleClientId || !googleClientSecret) {
// 	throw new Error('Google provider credentials not found');
// }

if (!kakaoClientId || !kakaoClientSecret) {
	throw new Error('Kakao provider credentials not found');
}

export default NextAuth({
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
		// 	clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
		// }),
		KakaoProvider({
			clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
	jwt: {
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		// async jwt(params) {
		// 	console.log(params);
		// 	return params;
		// },
		async session({ session, token, user }) {
			// console.log('session', session);
			console.log('token', token);
			// console.log('user', user);

			return session;
		}
	}
});

// next cookies next-auth.session-token.

async function refreshAccessToken(token: JWT) {

}