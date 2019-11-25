import * as React from 'react';
import styled from 'styled-components';

class Image extends React.Component {
	state = {
		hasError: false
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
		// const isLoading = node.data.get('loading');
		const caption = node.data.get('alt') || '';
		const src = node.data.get('src');
		const showCaption = !readOnly || caption;

		return (
			<React.Fragment>
				<div
					contentEditable={false}
					style={{
						margin: '1rem 0 ',
						padding: '1rem',
						border: isSelected ? '2px solid var(--theme-color, #42b983)' : '2px solid transparent'
					}}
				>
					<img
						contentEditable={false}
						style={{
							marginTop: '1rem',
							marginBottom: '1rem',
							maxWidth: '100%',
							maxHeight: '200px'
						}}
						src={src}
						alt={caption}
						onClick={(e) => {
							console.log(e);
							editor.moveToRangeOfNode(node);
						}}
					/>
					<div style={{ textAlign: 'center', minHeight: '19px' }} contentEditable={false}>
						{showCaption &&
						isSelected && (
							<Caption
								type="text"
								style={{
									outline: 'none',
									minWidth: '414px',
									textAlign: 'center',
									border: '0',
									fontSize: '0.8rem',
									color: '#333'
								}}
								placeholder="可以在这里添加图片题注"
								onKeyDown={this.handleKeyDown}
								onChange={this.handleChange}
								// onClick={this.handleClick}
								defaultValue={caption}
								contentEditable={false}
								disabled={readOnly}
								// autoFocus={isSelected}
								// async
							/>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const Caption = styled.input`
	border: 0;
	display: block;
	font-size: 13px;
	font-style: italic;
	color: ${(props) => props.theme.textSecondary};
	padding: 2px 0;
	line-height: 16px;
	text-align: center;
	width: auto;

	outline: none !important;
	background: #000;
	resize: none;
	&::placeholder {
		color: ${(props) => props.theme.placeholder};
	}
`;

export default Image;
