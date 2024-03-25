// @formatter:off
import { light_theme_color_fill } from '../config/index.js'
// language=css
import { dark_theme_color_fill } from '../config/index.js'
export default ()=>`
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
	:root,
	html[data-theme="light"] {
		--color-fill: ${light_theme_color_fill};
		--color-text-base: 40,39,40;
		--color-accent: 0,108,172;
		--color-card: 230,230,230;
		--color-card-muted: 205,205,205;
		--color-border: 236,233,233;
	}
	html[data-theme="dark"] {
		--color-fill: ${dark_theme_color_fill};
		--color-text-base: 234,237,243;
		--color-accent: 255,107,1;
		--color-card: 52,63,96;
		--color-card-muted: 138,51,2;
		--color-border: 171,75,8;
	}
	#sun-svg,
	html[data-theme="dark"] #moon-svg {
		display: none;
	}
	#moon-svg,
	html[data-theme="dark"] #sun-svg {
		display: block;
	}
	section,
	footer {
		@apply mx-auto max-w-3xl px-4;
	}
	a {
		@apply outline-2 outline-offset-1 outline-skin-fill focus-visible:no-underline focus-visible:outline-dashed;
	}
	html {
		tab-size: 2;
		/* ===== scrollbar ===== */
		overflow-y: scroll;
	}
	/* width */
	::-webkit-scrollbar {
		@apply w-3;
	}
	/* Track */
	::-webkit-scrollbar-track {
		@apply bg-skin-fill;
	}
	/* Handle */
	::-webkit-scrollbar-thumb {
		@apply bg-skin-card;
	}
	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		@apply bg-skin-card-muted;
	}
	code,
	blockquote {
		word-wrap: break-word;
	}
	pre > code {
		white-space: pre;
	}
}
@layer components {
	.focus-outline {
		@apply outline-2 outline-offset-1 outline-skin-fill focus-visible:no-underline focus-visible:outline-dashed;
	}
}
`
// @formatter:on
