import React from 'react';
import { cx, css } from 'emotion';
import { componentClassName } from '../themeAdapter';

class CheckListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: (this.props.node && this.props.node.data && this.props.node.data.get('checked')) || false
		};
	}
	onChange = (event) => {
		const checked = event.target.checked;
		const { editor, node } = this.props;
		editor.setNodeByKey(node.key, { data: { checked } });
		event.stopPropagation();
		this.setState({
			checked: !this.state.checked
		});
	};

	render() {
		const { attributes, children, readOnly } = this.props;
		const { checked } = this.state;
		return (
			<li {...attributes} className={componentClassName.ToDoItem}>
				<span contentEditable={false}>
					<input
						type="checkbox"
						checked={checked}
						onChange={this.onChange}
						className={cx(componentClassName.ToDoItemCheckbox)}
						// style={{ margin: '2px 18px 0 -10px', fontSize: '18px', height: '18px' }}
					/>
				</span>
				<span
					contentEditable={!readOnly}
					suppressContentEditableWarning
					className={cx(
						css`
							opacity: ${checked ? 0.666 : 1};
							text-decoration: ${checked ? 'line-through' : 'none'};
							&:focus {
								outline: none;
							}
						`,
						componentClassName.ToDoItemContent
					)}
				>
					{children}
				</span>
			</li>
		);
	}
}

export default CheckListItem;
