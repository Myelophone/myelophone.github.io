import { defineConfig } from "vitepress";
import { pagefindPlugin } from "vitepress-plugin-pagefind";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "docs.MyelophOne",
	description: "MyelophOne dev stack docs",
	vite: {
		plugins: [pagefindPlugin()],
	},
	sitemap: {
		hostname: "https://docs.myeloph.one",
	},
	head: [
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		[
			"link",
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
			},
		],
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
			},
		],
		["link", { rel: "icon", type: "image/png", href: "/favicon.png" }],
		[
			"link",
			{
				rel: "preload",
				href: "/myelophone_eng_white.png",
				as: "image",
			},
		],
		["link", { rel: "preload", href: "/myelophone_eng.png", as: "image" }],
		["link", { rel: "preload", href: "/logo.png", as: "image" }],
		["link", { rel: "preload", href: "/logocolor.png", as: "image" }],
		[
			"script",
			{},
			`
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-NRFQKD48');
	  `,
		],
		[
			"script",
			{},
			`
		if(document.body) {if(document.documentElement.lang === "ru" || document.documentElement.lang === "ru-RU"){ var s = document.createElement( 'script' ); s.setAttribute( 'src', 'https://code.jivo.ru/widget/uOsW0qD46w' ); s.async = true; document.body.appendChild( s ); } else { var s = document.createElement( 'script' ); s.setAttribute( 'src', 'https://code.jivo.ru/widget/G0xACcBTvE' ); s.async = true; document.body.appendChild( s ); }; };
	  `,
		],
		["script", { src: "/logo-switcher.js" }],
	],
	themeConfig: {
		logo: "/myelophone_eng.png",

		editLink: {
			pattern:
				"https://github.com/myelophone/myelophone.github.io/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		nav: [
			//{ text: "Home", link: "/" },
			{ text: "Blog", link: "https://studio.myeloph.one/blog" },
			{ text: "Examples", link: "/markdown-examples" },
		],

		sidebar: [
			{
				text: "Examples",
				items: [
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" },
		],

		footer: {
			copyright:
				"Copyright © 2020 - " +
				new Date().getFullYear() +
				' <a href="https://aleksivanov.me" target="_blank">Aliaksandr Ivanou</a>',
		},

		search: {
			provider: "local",
		},
	},
	cleanUrls: true,
	locales: {
		root: {
			label: "English",
			lang: "en",
		},
		ru: {
			label: "Русский",
			lang: "ru",
		},
	},
	transformHead({ assets }) {
		const myFontFile = assets.find((file) => /font-name\.\w+\.woff2/);
		if (myFontFile) {
			return [
				[
					"link",
					{
						rel: "preload",
						href: myFontFile,
						as: "font",
						type: "font/woff2",
						crossorigin: "anonymous",
					},
				],
			];
		}
	},
});
