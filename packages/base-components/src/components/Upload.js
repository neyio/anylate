import React, { useRef } from 'react';
import { css, cx } from 'emotion';
const Uploader = (props) => {
	const ref = useRef({});
	const {
		upload = () => {
			console.warn('you must implement upload action');
		}
	} = props;
	return (
		<div
			className={css`
				display: flex;
				position: relative;
				flex-direction: row;
				height: 2rem;
				align-items: center;
				padding: 0.5rem 0 0.5rem 0.8rem;
				background: var(--theme-color-light, #eee);
				color: var(--theme-color-text-lighten, #666);
				border-radius: 3px;
				border: 2px solid transparent;
				cursor: pointer;
				&:hover {
					border: 2px solid var(--theme-color-primary, #eee);
				}
			`}
			onClick={() => {
				ref.current.click();
			}}
		>
			<span className={cx('iconfont icon-editor-upload', css`font-size: 1.5rem;`)} />
			<div
				className={css`
					display: flex;
					flex: 1;
					position: relative;
					padding-left: 1rem;
				`}
			>
				<span className={css`color: var(--theme-color-helper, #666);`}>点击上传</span>
				<input
					ref={ref}
					type="file"
					style={{ display: 'none' }}
					accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
					onChange={(e) => {
						const reader = new FileReader();
						console.log(e, e.target.files);
						let blob = null;
						reader.readAsDataURL(e.target.files[0]);
						reader.onload = (e) => {
							if (typeof e.target.result === 'object') {
								blob = new Blob([ e.target.result ]);
							} else {
								blob = e.target.result;
							}
							upload(blob);
						};
					}}
				/>
			</div>
		</div>
	);
};

export default Uploader;
