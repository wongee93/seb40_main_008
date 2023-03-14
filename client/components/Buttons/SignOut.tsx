'use client';
import React from 'react';
import OrangeButton from './orangeButton';
import { deleteCookie, getCookie, removeCookies } from 'cookies-next';
import { useRouter } from 'next/navigation';

// accesstoken파기하고 redirect home

export const SignOut = () => {
	const router = useRouter();

	// const token = getCookie("accessToken");

	const handleSignout = async () => {
		try {
			// const res = await fetch('/api/logout');
			removeCookies('accessToken');

			const cookie = getCookie('accessToken');
			console.log('cookie', cookie);

			if (!getCookie('accessToken')) {
				router.push(`/`);
			}

		} catch (error) {
			console.log('err', error);
		}
	};

	return (
		<OrangeButton
			handleClick={handleSignout}
			name={'로그 아웃'}
		></OrangeButton>
	);
};
