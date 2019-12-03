import React from 'react';
import {componentClassName}

import UrlInput from './UrlInput';
export default class EmbedComponent extends React.Component {
	ref = React.createRef();
	onChange = (url) => {
		const { node, editor } = this.props;
		editor.setNodeByKey(node.key, { data: { url } });
	};

	onClick = (e) => {
		e.stopPropagation();
	};

	render() {
		const { isSelected } = this.props;

		return (
			<div {...this.props.attributes} ref={this.ref}>
				{this.renderView()}
				{isSelected ? this.renderInput() : null}
			</div>
		);
	}

	renderView = () => {
		const { node, isFocused } = this.props;
		const url = node.data.get('url');

		const wrapperStyle = {
			position: 'relative',
			outline: isFocused ? '2px solid blue' : 'none'
		};

		const maskStyle = {
			display: isFocused ? 'none' : 'block',
			position: 'absolute',
			top: '0',
			left: '0',
			height: '100%',
			width: '100%',
			cursor: 'cell',
			zIndex: 1
		};

		const iframeStyle = {
			display: 'block'
		};

		return (
			<div style={wrapperStyle}>
				<div style={maskStyle} />
				<iframe
					
					id="ytplayer"
					type="text/html"
					width="640"
					height="476"
					src={url}
					frameBorder="0"
					style={iframeStyle}
					title="website"
				/>
			</div>
		);
	};

	renderInput = () => {
		const { node } = this.props;
		const url = node.data.get('url');
		const style = {
			marginTop: '5px',
			boxSizing: 'border-box',
			width: '100%',
			background: '#eee',
			lineHeight: '2rem',
			fontSize: '1.5rem',
			outline: 'none',
			color: '#333'
		};

		return <UrlInput defaultValue={url} onChange={this.onChange} onClick={this.onClick} style={style} />;
	};
}
