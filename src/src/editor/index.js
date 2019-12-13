import { cx } from 'emotion';
import React, { useState } from 'react';
import { theme } from '@anylate/themes';
import initialValueAsJson from './value.json';
import Anylate, { Value } from '@anylate/editor';

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
			<Anylate
				className={cx(theme.base, currentTheme)} //any-theme-base any-theme-dark
				// plugins={plugins}
				placeholder="Write the code , change the world..."
				defaultValue={initialValue}
			/>
		</React.Fragment>
	);
};

export default AnySlate;
