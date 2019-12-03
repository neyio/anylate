/* 
  this file copy from 
  https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup 
  and add some custom changes
*/

import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
/* eslint-disable import/no-unresolved*/
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import less from 'rollup-plugin-less';
import { uglify } from 'rollup-plugin-uglify';
import { pkgPrefix } from '../buildInConfig';

/**
 * Return a Rollup configuration for a `pkg` with `env` and `target`.
 *
 * @param {Object} pkg
 * @param {String} env
 * @param {String} format
 * @return {Object}
 */

function configure(pkg, env, target) {
	const isProd = env === 'production';
	const isModule = target === 'module';
	const realPkgName = (pkgPrefix && pkg.name.replace(pkgPrefix, '')) || pkg.name;
	const input = `packages/${realPkgName}/src/index.js`;
	const deps = []
		.concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
		.concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

	const plugins = [
		resolve({
			browser: true
		}),

		// isUmd &&
		commonjs({
			exclude: [ `packages/${realPkgName}/src/**` ],
			namedExports: {
				esrever: [ 'reverse' ],
				immutable: [ 'List', 'Map', 'Record', 'OrderedSet', 'Set', 'Stack', 'is' ],
				'react-dom': [ 'findDOMNode' ],
				'react-dom/server': [ 'renderToStaticMarkup' ]
			}
		}),

		json(),
		less({
			output: `./packages/${realPkgName}/lib/index.css`
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		// Register Node.js builtins for browserify compatibility.
		builtins(),

		// Use Babel to transpile the result, limiting it to the source code.
		babel({
			include: [ `packages/${realPkgName}/src/**` ],
			babelrc: false,
			presets: [ [ '@babel/preset-env', { modules: false } ], '@babel/preset-react' ],
			plugins: [ 'transform-class-properties' ].filter(Boolean)
		}),

		// Register Node.js globals for browserify compatibility.
		globals()

		// Only minify the output in production, since it is very slow. And only
		// for UMD builds, since modules will be bundled by the consumer.
		// isUmd && isProd && uglify()
	].filter(Boolean);

	if (isModule) {
		return {
			plugins,
			input,
			output: [
				{
					file: `packages/${realPkgName}/${pkg.module}`,
					format: 'es',
					sourcemap: true
				},
				{
					file: `packages/${realPkgName}/${pkg.main}`,
					format: 'cjs',
					exports: 'named',
					sourcemap: true
				}
			],
			// We need to explicitly state which modules are external, meaning that
			// they are present at runtime. In the case of non-UMD configs, this means
			// all non-Slate packages.
			external: (id) => {
				return !!deps.find((dep) => dep === id || id.startsWith(`${dep}/`));
			},
			watch: {
				include: `packages/${realPkgName}/src/**`,
				clearScreen: true,
				chokidar: true
			}
		};
	} else {
		console.error('you need to view history and support umd or it will be down!');
	}
}

function factory(pkg) {
	// const isProd = process.env.NODE_ENV === 'production';
	return [
		configure(pkg, 'development', 'module')
		// isProd && configure(pkg, 'development', 'modules'),
		// isProd && configure(pkg, 'production', 'umd'),
	].filter(Boolean);
}

export default factory;
