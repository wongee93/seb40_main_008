const { truncate } = require('fs');

/** @type {import('next').NextConfig} */
const withPwa = require('next-pwa')({
	dest: 'public',
});

const settings = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: { appDir: true },
	// fontLoaders is not a proper key
	// fontLoaders: [{ loader: '@next/font/google' }],
	images: {
		domains: ['k.kakaocdn.net', 'lh3.googleusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	env: {
		EXP: process.env.EXP,
		// 원하는 환경변수 여러개 추가 가능.
	},
};

/*
const settings = {
	// BUG: Strict mode true makes video streaming network be severed during request.
	// reactStrictMode: true,
	reactStrictMode: false,
	swcMinify: true,
	experimental: { appDir: true },
	// fontLoaders is not a proper key
	// fontLoaders: [{ loader: '@next/font/google' }],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};
*/

// module.exports =
// 	process.env.NODE_ENV === 'development' ? settings : withPwa(settings);

module.exports = settings;
// module.exports = {
	// env: {
	// 	EXP: process.env.EXP,
	// 	// 원하는 환경변수 여러개 추가 가능.
	// },
// };

//picsum.photos/seed/picsum/200/300
