/** @type {import('tailwindcss').Config}*/
const { skeleton } = require('@skeletonlabs/tw-plugin');
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			fontFamily: {
				'jost': ['Jost', 'sans-serif']
			  },
		},
	},
	plugins: [
		skeleton({
			themes: { preset: [ "skeleton", "wintry", "modern", "crimson", "hamlindigo", "gold-nouveau", "rocket", "vintage", "sahara", "seafoam" ] }
		}),
		forms
	]
}
