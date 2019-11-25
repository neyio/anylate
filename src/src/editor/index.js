import { Editor } from 'slate-react';
import { Value } from 'slate';

import React, { useState } from 'react';
import initialValueAsJson from './value.json';
import plugins from './plugins';
import './themes/base.less';
import { theme } from './theme.js';
import { cx } from 'emotion';

const initialValue = Value.fromJSON(initialValueAsJson);
const AnySlate = (props) => {
	const [ currentTheme, setTheme ] = useState(theme.light);
	return (
		<React.Fragment>
			<button
				onClick={() => {
					setTheme(theme.dark);
				}}
			>
				dark
			</button>
			<button
				onClick={() => {
					setTheme(theme.light);
				}}
			>
				light
			</button>
			<Editor
				className={cx(theme.base, currentTheme)}
				plugins={plugins}
				placeholder="Write the code , change the world..."
				defaultValue={initialValue}
			/>
		</React.Fragment>
	);
};

export default AnySlate;
