import * as React from 'react';
import { css, cx } from 'emotion';
import { componentClassName } from '@anylate/themes';

class Embed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			url: props.node.data.get('url') || null
		};
	}

	handleKeyDown = (e) => {
		editor.focus();
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			e.preventDefault();
			const { editor, node } = this.props;
			this.setState({ url: e.target.value });
			return editor.moveToRangeOfNode(node).moveToStartOfNextBlock().focus();
		}
	};

	handleChange = (e) => {
		e.stopPropagation();
		const url = e.target.value;
		const { editor, node } = this.props;
		const data = node.data.toObject();
		editor.setNodeByKey(node.key, { data: { ...data, url } });
	};

	render() {
		const { node, isSelected, readOnly, editor } = this.props;
		const caption = node.data.get('url') || '';
		// const url = node.data.get('url');
		const { url } = this.state;

		return (
			<div
				contentEditable={false}
				className={cx(
					componentClassName.Embed,
					css`
						display: flex;
						flex-direction: row;
						justify-content: center;
						border-radius: 4px;
					`
				)}
			>
				<div
					className={css`
						display: flex;
						flex-direction: column;
						align-items: center;
						flex: 1;
					`}
				>
					<iframe
						contentEditable={false}
						className={css`
							width: 100%;
							height: 50vh;
							max-width: 100%;
							max-height: 50vh;
							padding-top: 50px;
							background: #fff;
							border-radius: 3px;
						`}
						style={{
							border: isSelected
								? '2px solid var(--theme-color-primary-lighten, #42b983)'
								: '2px solid transparent'
						}}
						src={url}
						alt={caption}
					/>
					<div
						className={css`
							position: absolute;
							top: 0;
							left: 80px;
							text-align: left;
							margin-top: 0.5rem;
							width: calc(100% - 130px);
							display: block;
						`}
						contentEditable={false}
					>
						<input
							className={css`
								border: 0;
								display: block;
								color: var(--theme-color-primary, #1a2);
								font-size: 1rem;
								padding: 0.25rem 1rem;
								line-height: 1.5rem;
								text-align: center;
								width: calc(100% - 40px);
								max-width: calc(100% - 40px);
								text-align: left;
								border: 1px solid #eee;
								border-radius: 17px;
								color: #333;
								outline: none;
								resize: none;
								&::placeholder {
									color: var(--theme-color-text-lighten, #eee);
								}
							`}
							type="text"
							placeholder="修改链接地址"
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							defaultValue={caption}
							contentEditable={false}
							disabled={readOnly}
						/>
						<span
							onClick={() => {
								editor.removeNodeByKey(node.key);
							}}
							className={cx(
								'iconfont',
								'icon-delete',
								{ hidden: readOnly },
								css`
									position: absolute;
									right: -2.5rem;
									padding: 0.5rem;
									top: -0.25rem;
									font-size: 20px;
									color: #999;
									background: var(--theme-color-container-primary, #eee);
									color: var(--theme-color-title-lighten, #fff);
									opacity: 0.8;
									border-radius: 50%;
									&.hidden {
										display: none;
									}
									&:hover {
										background: var(--theme-color-danger, #ed7163);
										cursor: pointer;
										color: #fff;
									}
								`
							)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Embed;
