import React from 'react';
import { css } from 'emotion';

class CheckListItem extends React.Component {
	onChange = event => {
		const checked = event.target.checked;
		const { editor, node } = this.props;
		editor.setNodeByKey(node.key, { data: { checked } });
	};

	render() {
		const { attributes, children, node, readOnly } = this.props;
		const checked = node.data.get('checked');
		return (
			<div
				{...attributes}
				className={css`
					display: flex;
					flex-direction: row;
					align-items: center;
					& + & {
						margin-top: 0;
					}
				`}
			>
				<span
					contentEditable={false}
					className={css`
						margin-right: 0.75em;
					`}
				>
					<input type="checkbox" checked={checked} onChange={this.onChange} />
				</span>
				<span
					contentEditable={!readOnly}
					suppressContentEditableWarning
					className={css`
						flex: 1;
						opacity: ${checked ? 0.666 : 1};
						text-decoration: ${checked ? 'line-through' : 'none'};
						&:focus {
							outline: none;
						}
					`}
				>
					{children}
				</span>
			</div>
		);
	}
}

export default CheckListItem;
