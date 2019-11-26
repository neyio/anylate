import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, appendElementId, visible }) => {
	const root = appendElementId ? window.document.getElementById(appendElementId) : window.document.body;
	return ReactDOM.createPortal(visible ? children : null, root);
};

export default Portal;
