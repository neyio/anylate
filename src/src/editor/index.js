import { Editor } from 'slate-react';
import { Value } from 'slate';
import { cx } from 'emotion';
import React, { useState } from 'react';

import initialValueAsJson from './value.json';
import plugins from './plugins';

const theme = {
	base: 'any-theme-base',
	dark: 'any-theme-dark'
};

const initialValue = Value.fromJSON(initialValueAsJson);
const AnySlate = (props) => {
	const [ currentTheme, setTheme ] = useState(theme.base);
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
				className={cx(theme.base, currentTheme)} //any-theme-base any-theme-dark
				plugins={plugins}
				placeholder="Write the code , change the world..."
				defaultValue={initialValue}
			/>
		</React.Fragment>
	);
};

export default AnySlate;
