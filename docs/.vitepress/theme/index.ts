// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((registration) => {
			console.log(
				'Service Worker registered with scope:',
				registration.scope
			);
		})
		.catch((error) => {
			console.error('Service Worker registration failed:', error);
		});
}

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app, router, siteData }) {
		// ...
	},
} satisfies Theme;
