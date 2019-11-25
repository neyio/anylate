import { Editor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import initialValueAsJson from './value.json';
import plugins from './plugins';
import './themes/base.less';

const initialValue = Value.fromJSON(initialValueAsJson);
const AnySlate = (props) => {
	return (
		<Editor
			className="markdown-section"
			style={{ position: 'relative' }}
			plugins={plugins}
			placeholder="Write the code , change the world..."
			defaultValue={initialValue}
		/>
	);
};

export default AnySlate;
