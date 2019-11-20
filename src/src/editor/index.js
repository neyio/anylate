import { Editor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import initialValueAsJson from './value.json';
import plugins from './plugins';
import renderBlock from './renderBlock';
import renderMark from './renderMark';
import renderInline from './renderInline';
import schema from './schema';
const initialValue = Value.fromJSON(initialValueAsJson);

const AnySlate = (props) => {
	return (
		<div className="markdown-section">
			<Editor
				style={{ position: 'relative' }}
				schema={schema}
				plugins={plugins}
				renderBlock={renderBlock}
				renderMark={renderMark}
				renderInline={renderInline}
				placeholder="Enter some text..."
				defaultValue={initialValue}
			/>
		</div>
	);
};

export default AnySlate;
