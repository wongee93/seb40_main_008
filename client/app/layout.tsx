import { Noto_Sans_KR } from '@next/font/google';
import NavBar from '../components/Navbar/NavBar';
import SessionContainer from '../components/Providers/SessionProvider';
import '../styles/globals.css';
import { unstable_getServerSession } from 'next-auth';
import { getSession } from '../utils/helper/session';
import { cookies, headers } from 'next/headers';

const noto = Noto_Sans_KR({
	weight: '400',
	fallback: ['Roboto'],
	subsets: ['latin'],
});

const RootLayout = async ({ children }: any) => {
	const { segment } = children.props.childProp;
	const session = await getSession(headers().get('cookie') ?? '');
	const nextCookies = cookies();
	return (
		<html className={noto.className}>
			<head>
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<title>asdf</title>
			</head>
			<body>
				<SessionContainer session={session}>
					<div className="main">
						{/* @ts-expect-error Server Component */}
						{segment !== 'login' ? <NavBar /> : null}
						{children}
					</div>
				</SessionContainer>
			</body>
		</html>
	);
};

export default RootLayout;
