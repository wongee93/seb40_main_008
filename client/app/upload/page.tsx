'use client';
import styles from './upload.module.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import SignInButton from '../../components/Buttons/SignInButton';
import BaseNavbar from '../../components/BaseNavBar/BaseNavbar';
import Image from 'next/image';
import {
	initialClass,
	UploadClassType,
	UploadImage,
} from '../../types/uploadclass';

const formData = new FormData();

const UploadPage = () => {
	const session = useSession();
	const fileInput = useRef<HTMLInputElement>(null);
	const reader = new FileReader();
	const [values, setValues] = useState<UploadClassType>(initialClass);
	const [imageFile, setImageFile] = useState<UploadImage | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
		//formData.append(`"${e.target.name}"`, e.target.value);
	};

	const handleOptionChange = (e: React.FormEvent<HTMLSelectElement>) => {
		setValues({
			...values,
			categories: e.currentTarget.value,
		});
	};

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		formData: FormData
	) => {
		e.preventDefault();
		console.log('formData: ', formData);
		console.log('formData.get(`thumbnail`): ', formData.get('thumbnail'));
		fetch('api/temp', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			//body: JSON.stringify(formData),
			body: formData,
		});
	};

	useEffect(() => {
		console.log('formData: ', formData.get('thumbnail'));
	}, [imageFile]);

	const handleClickFileInput = () => {
		fileInput.current?.click();
	};

	const uploadfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);

			formData.append('thumbnail', fileList[0]);

			console.log('form get thumbnail', formData.get('thumbnail'));

			setImageFile({
				file: fileList[0],
				thumbnail: url,
				type: fileList[0].type.slice(0, 5),
			});

			setValues({
				...values,
				thumbnail: fileList[0],
			});
		}
	};

	const showImage = useMemo(() => {
		if (!imageFile && imageFile == null) {
			return <p>비어있는 프로필</p>;
		}

		return (
			<Image
				className={styles.thumbnail}
				src={imageFile.thumbnail ?? ''}
				alt={imageFile.type ?? ''}
				width={300}
				height={220}
				onClick={handleClickFileInput}
				style={{ objectFit: 'contain', borderRadius: '4px' }}
			/>
		);
	}, [imageFile]);

	if (session.status === 'loading') return <p>loading</p>;
	if (session.status === 'unauthenticated')
		return (
			<>
				<p> you are not authorized</p> <SignInButton isSignIn={false} />
			</>
		);
	if (!session) return <p>null</p>;

	if (session.status === 'authenticated')
		return (
			<>
				<BaseNavbar />
				<section className={styles.uploadpage}>
					<form
						onSubmit={(e) => handleSubmit(e, formData)}
						className={styles.form}
					>
						<p className={styles.classtitle}>클래스명</p>
						<input
							type="text"
							name="title"
							onChange={handleChange}
							className={styles.classnameinput}
						></input>
						<p className={styles.title}>카테고리</p>
						<select
							id="category"
							name="categories"
							onChange={handleOptionChange}
							className={styles.select}
						>
							<option value="choice">-- 선택하세요 --</option>
							<optgroup
								label="----------------개발전용----------------"
								className={styles.label}
							>
								<option value="drawing">디지털드로잉</option>
								<option value="success_mind">성공 마인드</option>
								<option value="baking">베이킹</option>
							</optgroup>
							<optgroup
								label="-------------선택하지 마세요------------"
								className={styles.label}
							>
								<option value="money">금융,재테크</option>
								<option value="startup">창업,부업</option>
								<option value="programming">프로그래밍</option>
								<option value="Exercise">운동</option>
								<option value="life style">라이프스타일</option>
								<option value="photo">사진</option>
								<option value="music">음악</option>
							</optgroup>
						</select>

						<p className={styles.title}>강의 가격</p>
						<input
							type="number"
							name="price"
							onChange={handleChange}
							className={styles.classPrice}
						/>
						{values.price % 1000 === 0 ? null : (
							<div className={styles.alertMessage}>
								1,000원 단위로 입력 해주세요.
							</div>
						)}
						{values.price <= 50000 ? null : (
							<div className={styles.alertMessage}>
								50,000원 이하로 입력 해주세요.
							</div>
						)}

						<p className={styles.title}>강의 소개</p>
						<input
							type="text"
							name="details"
							onChange={handleChange}
							className={styles.introduceClass}
						></input>
						<p className={styles.title}>강사 소개</p>
						<input
							type="text"
							name="tutorDetail"
							onChange={handleChange}
							className={styles.introduceInstructor}
						></input>

						<div className={styles.filebox}>
							<p className={styles.title}>클래스 썸네일</p>
							<input
								type="file"
								accept="image/jpg, image/jpeg, image/png"
								name="thumbnail"
								ref={fileInput}
								id="ex_file"
								style={{ display: 'none' }}
								onChange={uploadfile}
							/>
							<button
								className={styles.uploadbtn}
								type="button"
								onClick={handleClickFileInput}
							>
								업로드
							</button>
						</div>

						<div className={styles.uploadimg}>{showImage}</div>

						<button type="submit" className={styles.openclassbtn}>
							강좌 개설하기
						</button>
					</form>
				</section>
			</>
		);
};

export default UploadPage;
