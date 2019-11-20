import * as React from 'react';
import ImageZoom from 'react-medium-image-zoom';
// import TextareaAutosize from 'react-autosize-textarea';
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

	handleClick = (e) => {
		e.stopPropagation();
	};

	handleError = () => {
		this.setState({ hasError: true });
	};

	render() {
		const { attributes, node, isSelected, readOnly } = this.props;
		const isLoading = node.data.get('loading');
		const caption = node.data.get('alt') || '';
		const src = node.data.get('src');
		const showCaption = !readOnly || caption;

		return (
			<CenteredImage contentEditable={false}>
				{this.state.hasError ? (
					<React.Fragment>
						<ErrorImg as="div" isSelected={isSelected} />
						<ErrorMessage>Could not load image</ErrorMessage>
					</React.Fragment>
				) : (
					<div style={{ border: isSelected ? '2px solid #eee' : '2px solid transparent' }}>
						{!readOnly ? (
							<StyledImg
								{...attributes}
								style={{
									marginTop: '1rem',
									marginBottom: '1rem',
									maxWidth: '100%'
								}}
								src={src}
								alt={caption}
								isSelected={isSelected}
								isLoading={isLoading}
								loading="lazy"
							/>
						) : (
							<ImageZoom
								image={{
									src,
									alt: caption,
									style: {
										maxWidth: '100%'
									},
									...attributes
								}}
								shouldRespectMaxDimension
							/>
						)}
						{showCaption &&
						isSelected && (
							<div>
								<Caption
									type="text"
									style={{ outline: 'none', minWidth: '414px', border: '0', paddingLeft: '3rem' }}
									placeholder="可以在这里添加图片题注"
									onKeyDown={this.handleKeyDown}
									onChange={this.handleChange}
									onClick={this.handleClick}
									defaultValue={caption}
									contentEditable={false}
									disabled={readOnly}
									tabIndex={-1}
									async
								/>
							</div>
						)}
					</div>
				)}
			</CenteredImage>
		);
	}
}

const ErrorMessage = styled.div`
	position: absolute;
	text-align: center;
	transform: translate3d(-50%, -50%, 0);
	top: 50%;
	left: 50%;

	color: ${(props) => props.theme.text};
	background: ${(props) => props.theme.imageErrorBackground};
	display: block;
	margin: 0 auto;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 14px;
`;

// This wrapper allows us to pass non-standard HTML attributes through to the DOM element
// https://www.styled-components.com/docs/basics#passed-props
const Img = React.forwardRef(({ isLoading, isSelected, ...props }, ref) => (
	<div ref={ref}>
		<img alt={props.alt} {...props} />
	</div>
));

const StyledImg = styled(Img)`
  max-width: 100%;
  box-shadow: ${(props) => (props.isSelected ? `0 0 0 2px ${props.theme.selected}` : 'none')};
  border-radius: ${(props) => (props.isSelected ? `2px` : '0')};
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

const ErrorImg = styled(StyledImg)`
  width: 200px;
  height: 100px;
  margin: 0 auto;
`;

const CenteredImage = styled.div`
	display: block;
	text-align: center;
	position: relative;
	width: 100%;
`;

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
