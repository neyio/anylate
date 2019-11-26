import * as React from 'react';
import { css } from 'emotion';
// import Portal from './Portal';

// const Viewer = ({ children, visible }) => {
// 	return <Portal visible={visible}>{children}</Portal>;
// };

class Image extends React.Component {
	state = {
		visible: false
	};
	handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			e.preventDefault();
			const { editor, node } = this.props;
			return editor.moveToRangeOfNode(node).moveToStartOfNextBlock().focus();
		}
	};

	handleChange = (e) => {
		e.stopPropagation();
		const alt = e.target.value;
		const { editor, node } = this.props;
		const data = node.data.toObject();
		editor.setNodeByKey(node.key, { data: { ...data, alt } });
	};

	render() {
		const { node, isSelected, readOnly, editor } = this.props;
		const caption = node.data.get('alt') || '';
		const src = node.data.get('src');
		const showCaption = !readOnly || caption;

		return (
			<React.Fragment>
				<div
					contentEditable={false}
					className={css`
						display: flex;
						flex-direction: row;
						justify-content: center;
					`}
				>
					<div
						className={css`
							display: flex;
							flex-direction: column;
							align-items: center;
							flex: 1;
						`}
						// onClick={() => this.setState({ visible: !this.state.visible })}
					>
						<img
							contentEditable={false}
							className={css`
								max-width: 100%;
								max-height: 100%;
							`}
							style={{
								border: isSelected
									? '2px solid var(--theme-color-primary-lighten, #42b983)'
									: '2px solid transparent'
							}}
							src={src}
							alt={caption}
							onClick={(e) => {
								console.log(e);
								editor.moveToRangeOfNode(node);
							}}
						/>
						<div
							className={css`
								position: absolute;
								bottom: 1rem;
								left: calc(50% - 100px);
								text-align: left;
								margin-top: 0.5rem;
								width: 200px;
							`}
							contentEditable={false}
						>
							{showCaption &&
							isSelected && (
								<input
									className={css`
										border: 0;
										display: block;
										color: var(--theme-color-primary, #1a2);
										font-size: 1rem;
										padding: 0.25rem 0.5rem;
										line-height: 1.5rem;
										text-align: center;
										width: 200px;
										min-width: 200px;
										text-align: left;
										border: 1px solid #eee;
										border-radius: 3px;
										color: #333;
										outline: none;
										resize: none;
										&::placeholder {
											color: var(--theme-color-text-lighten, #eee);
										}
									`}
									type="text"
									placeholder="可以在这里添加图片题注"
									onKeyDown={this.handleKeyDown}
									onChange={this.handleChange}
									defaultValue={caption}
									contentEditable={false}
									disabled={readOnly}
								/>
							)}
						</div>
					</div>
				</div>
				{/* <Viewer visible={this.state.visible}>
					<div
						className={css`
							position: fixed;
							width: 100vw;
							height: 100vh;
							background: rgba(0, 0, 0, .7);
							z-index: 100;
							overflow: hidden;
							transition: background-color .2s ease-in-out;
							top: 0;
							left: 0;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
						`}
						onClick={() => this.setState({ visible: !this.state.visible })}
					>
						<img
							contentEditable={false}
							className={css`
								max-width: 150%;
								max-height: 150%;
								width: 75%;
							`}
							src={src}
							alt={caption}
						/>
					</div>
				</Viewer> */}
			</React.Fragment>
		);
	}
}

export default Image;
