import { Editor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import initialValueAsJson from './value.json';
import plugins from './plugins';

const initialValue = Value.fromJSON(initialValueAsJson);

const AnySlate = props => {
	return (
		<Editor
			style={{ position: 'relative' }}
			plugins={plugins}
			placeholder="Enter some text..."
			defaultValue={initialValue}
		/>
	);
};

export default AnySlate;
