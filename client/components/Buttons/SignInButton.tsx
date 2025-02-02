'use client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import styles from './Button.module.css';
import kakaologo from '../../public/img/kakaologo.png';
import googlelogo from '../../public/img/googlelogo.webp';

interface SignInButtonProps {
	isSignIn: boolean;
}

const SignInButton = ({ isSignIn }: SignInButtonProps) => {
	return isSignIn ? (
		<button onClick={() => signOut()}>sign out</button>
	) : (
		<div className={styles.loginbtnWrapper}>
			<button className={styles.googlebtn}>
				<a href="https://pioneroroom.com/oauth2/authorization/google">
					<div className={styles.googlebtnWrapper}>
						<Image
							sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
							className={styles.googlelogo}
							src={googlelogo}
							alt="google logo"
							width={25}
						/>
						<p className={styles.btn_p}>구글로 로그인</p>
					</div>
				</a>
			</button>

			<button className={styles.kakaobtn}>
				<a href="https://pioneroroom.com/oauth2/authorization/kakao">
					<div className={styles.kakaobtnWrapper}>
						<Image
							sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
							className={styles.kakaologo}
							src={kakaologo}
							alt="kakao logo"
							width={30}
						/>
						<p className={styles.btn_p}>카카오 로그인</p>
					</div>
				</a>
			</button>

			{/* <button className={styles.naverbtn}>
				<a href="https://pioneroroom.com/oauth2/authorization/naver">
					<div className={styles.naverbtnWrapper}>
						<Image
							sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
							className={styles.naverlogo}
							src={naverlogo}
							alt="naver logo"
							width={50}
						/>
						<p className={styles.btn_naver_p}>네이버 로그인</p>
					</div>
				</a>
			</button> */}
		</div>
	);
};

export default SignInButton;
