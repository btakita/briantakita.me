// @formatter:off
// language=css
export default ()=>`
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
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
	.prose :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
		padding-inline-start: 0;
	}
	@media (min-width: 640px) {
		.prose :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
			padding-inline-start: 1.625em;
		}
	}
}
@layer components {
	.focus-outline {
		@apply outline-2 outline-offset-1 outline-skin-fill focus-visible:no-underline focus-visible:outline-dashed;
	}
}
`
// @formatter:on
