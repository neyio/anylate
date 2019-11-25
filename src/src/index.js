import React from 'react';
import ReactDOM from 'react-dom';

import AnySlate from './editor/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AnySlate />, document.getElementById('root'));
serviceWorker.unregister();
