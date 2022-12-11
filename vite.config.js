import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	define: {
		global: {}
	},
	plugins: [sveltekit()]
};

export default config;
