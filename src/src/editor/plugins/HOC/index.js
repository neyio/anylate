import React from 'react';
import renderInline from './renderInline';
import onPaste from './onPaste';
const Editor = ({ children, editor, hocs, readOnly }) => {
	return (
		<React.Fragment>
			{children}
			{hocs &&
				hocs.length &&
				hocs.map((hoc) => {
					return !readOnly && hoc(editor);
				})}
		</React.Fragment>
	);
};

//要求options.HOC = [(editor,readOnly)=>HighOrderComponent] ,HighOrderComponent为一个接受editor为参数的方法，输出为React.component
export default (options = {}) => {
	if (Array.isArray(options.plugins)) {
		return {
			renderEditor: (props, editor, next) => {
				const children = next();
				return (
					<Editor editor={editor} readOnly={props.readOnly} hocs={options.plugins}>
						{children}
					</Editor>
				);
			},
			renderInline,
			onPaste
		};
	} else
		return {
			renderEditor: (props, editor, next) => {
				const children = next();
				return <React.Fragment>{children}</React.Fragment>;
			},
			renderInline,
			onPaste
		};
};
