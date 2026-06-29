// @formatter:off
// language=css
export default ()=>`
@tailwind base;
@tailwind components;
@tailwind utilities;
@source "../../lib/**/*.ts";
@source "../app/**/*.ts";
@source "../../../../rappstack-dev/lib/**/*.ts";
@plugin "@tailwindcss/typography";
@theme {
	--font-inter: "Inter", sans-serif;
	--font-sans: "Inter", sans-serif;
	--font-serif: Charter, "Bitstream Charter", "Sitka Text", Cambria, serif;
	--font-mono: "JetBrains Mono", monospace;
	--color-highlight: rgb(var(--color-accent));
	--shadow-highlight: 0 0 10px rgb(var(--color-accent));
}
@utility text-skin-base { color: rgb(var(--color-text-base)); }
@utility text-skin-accent { color: rgb(var(--color-accent)); }
@utility text-skin-inverted { color: rgb(var(--color-fill)); }
@utility bg-skin-fill { background-color: rgb(var(--color-fill)); }
@utility bg-skin-accent { background-color: rgb(var(--color-accent)); }
@utility bg-skin-inverted { background-color: rgb(var(--color-text-base)); }
@utility bg-skin-card { background-color: rgb(var(--color-card)); }
@utility bg-skin-card-muted { background-color: rgb(var(--color-card-muted)); }
@utility outline-skin-fill { outline-color: rgb(var(--color-accent)); }
@utility border-skin-line { border-color: rgb(var(--color-border)); }
@utility border-skin-fill { border-color: rgb(var(--color-text-base)); }
@utility border-skin-accent { border-color: rgb(var(--color-accent)); }
@utility fill-skin-base { fill: rgb(var(--color-text-base)); }
@utility fill-skin-accent { fill: rgb(var(--color-accent)); }
@utility fill-transparent { fill: transparent; }
@layer base {
	h1, h2, h3, h4, h5, h6, hr, p, pre {
		margin: 0;
	}
	section,
	footer {
		@apply mx-auto max-w-3xl px-4;
	}
	a {
		@apply outline-hidden outline-offset-1 focus-visible:outline-skin-fill focus-visible:no-underline focus-visible:outline-dashed;
	}
	html {
		background-color: rgb(var(--color-fill));
		color-scheme: light dark;
		tab-size: 2;
		overflow-y: scroll;
	}
	html[data-color-scheme="light"] {
		color-scheme: light;
	}
	html[data-color-scheme="dark"] {
		color-scheme: dark;
	}
	body {
		background-color: rgb(var(--color-fill));
		font-feature-settings: "kern";
		text-rendering: optimizeLegibility;
	}
	::-webkit-scrollbar {
		@apply w-3;
	}
	::-webkit-scrollbar-track {
		@apply bg-skin-fill;
	}
	::-webkit-scrollbar-thumb {
		@apply bg-skin-card;
	}
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
		@apply outline-hidden outline-offset-1 focus-visible:outline-skin-fill focus-visible:no-underline focus-visible:outline-dashed;
	}
}
.prose :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
	padding-inline-start: 0;
}
.prose {
	color: rgb(var(--color-text-base));
	font-size: 1.0625rem;
	letter-spacing: 0;
	line-height: 1.75;
	max-width: min(100%, 68ch);
}
.prose.prose,
.blog_post__main.prose,
article.prose {
	max-width: min(100%, 68ch);
}
@media (min-width: 640px) {
	.prose {
		font-size: 1.125rem;
	}
	.prose :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
		padding-inline-start: 1.625em;
	}
}
.prose a {
	color: rgb(var(--color-accent));
	font-weight: 600;
	overflow-wrap: break-word;
	text-decoration-style: dotted;
	text-decoration-thickness: .08em;
	text-underline-offset: .2em;
}
.prose a:hover {
	text-decoration-style: solid;
}
.prose blockquote {
	background-color: rgb(var(--color-card));
	border-left-color: rgb(var(--color-accent));
	border-left-width: .25rem;
	border-radius: .375rem;
	color: rgb(var(--color-text-base));
	font-style: normal;
	margin-bottom: 1.75rem;
	margin-top: 1.75rem;
	opacity: 1;
	padding: .75rem 1rem;
}
.prose blockquote p {
	color: rgb(var(--color-text-base));
	margin-bottom: .5rem;
	margin-top: .5rem;
}
.prose :where(p, li, blockquote, dd, td, figcaption):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
	font-family: var(--font-serif);
	line-height: 1.78;
}
.prose :where(:not(pre) > code):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
	background-color: rgb(var(--color-inline-code-fill));
	border: 1px solid rgb(var(--color-border));
	border-radius: .25rem;
	color: rgb(var(--color-inline-code-text));
	display: inline;
	font-family: var(--font-mono);
	font-size: .86em;
	padding: .08rem .28rem;
	overflow-wrap: break-word;
	word-break: break-word;
}
.prose code::before {
	content: "";
}
.prose code::after {
	content: "";
}
.prose em {
	font-style: italic;
}
.prose figcaption {
	color: rgb(var(--color-text-muted));
	font-size: .9em;
	line-height: 1.55;
	margin-top: .75rem;
}
.prose figure {
	margin-bottom: 2rem;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
}
.prose h1 {
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-size: 2.25rem;
	font-weight: 800;
	line-height: 1.12;
	margin-bottom: 1rem;
	margin-top: 2rem;
}
.prose h2 {
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-size: 1.625rem;
	font-weight: 700;
	line-height: 1.25;
	margin-bottom: .75rem;
	margin-top: 2.25rem;
}
.prose h3 {
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-size: 1.25rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.35;
	margin-bottom: .6rem;
	margin-top: 1.85rem;
}
.prose h4 {
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-size: 1.125rem;
	font-weight: 700;
	line-height: 1.4;
	margin-bottom: .5rem;
	margin-top: 1.5rem;
}
.prose h5 {
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-weight: 700;
	margin-bottom: .5rem;
	margin-top: 1.5rem;
}
.prose h6 {
	color: rgb(var(--color-text-muted));
	font-family: var(--font-sans);
	font-weight: 700;
	margin-bottom: .5rem;
	margin-top: 1.5rem;
}
.prose hr {
	border-color: rgb(var(--color-border));
	margin-bottom: 2rem;
	margin-top: 2rem;
}
.prose img {
	border-color: rgb(var(--color-border));
	border-radius: .375rem;
	border-width: 1px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 1rem;
}
.prose li {
	color: rgb(var(--color-text-base));
	margin-bottom: .35rem;
	margin-top: .35rem;
	padding-left: .15rem;
}
.prose ul > li::marker {
	color: rgb(var(--color-accent));
}
.prose ol > li::marker {
	color: rgb(var(--color-text-muted));
	font-family: var(--font-sans);
	font-weight: 600;
}
.prose ol {
	color: rgb(var(--color-text-base));
	margin-bottom: 1.15rem;
	margin-top: 1.15rem;
	padding-left: 1.5rem;
}
.prose p {
	color: rgb(var(--color-text-base));
	margin-bottom: 1.15em;
	margin-top: 1.15em;
}
.prose pre {
	background-color: rgb(var(--color-code-fill));
	border: 1px solid rgb(var(--color-border));
	border-radius: .5rem;
	color: #e6e6e6;
	font-family: var(--font-mono);
	font-size: .875rem;
	line-height: 1.6;
	margin-bottom: 1.75rem;
	margin-top: 1.75rem;
	overflow-x: auto;
	padding: 1rem;
}
.prose pre code {
	background: transparent;
	border: 0;
	color: inherit;
	display: block;
	font-family: var(--font-mono);
	font-size: inherit;
	overflow-wrap: normal;
	padding: 0;
	white-space: pre;
	word-break: normal;
}
.prose strong {
	color: rgb(var(--color-text-base));
	font-weight: 700;
}
.prose summary {
	color: rgb(var(--color-text-base));
	cursor: pointer;
	font-family: var(--font-sans);
	font-weight: 600;
}
.prose table {
	border-collapse: collapse;
	color: rgb(var(--color-text-base));
	display: block;
	font-size: .95em;
	line-height: 1.55;
	margin-bottom: 1.75rem;
	margin-top: 1.75rem;
	overflow-x: auto;
	width: 100%;
}
.prose td {
	border-color: rgb(var(--color-border));
	border-width: 1px;
	padding: .55rem .7rem;
	vertical-align: top;
}
.prose th {
	background-color: rgb(var(--color-card));
	border-color: rgb(var(--color-border));
	border-width: 1px;
	color: rgb(var(--color-text-base));
	font-family: var(--font-sans);
	font-weight: 700;
	padding: .55rem .7rem;
	text-align: left;
	vertical-align: bottom;
}
.prose ul {
	color: rgb(var(--color-text-base));
	margin-bottom: 1.15rem;
	margin-top: 1.15rem;
	overflow-x: clip;
	padding-left: 1.35rem;
}
.prose > :first-child {
	margin-top: 0;
}
.prose > :last-child {
	margin-bottom: 0;
}
/* Tailwind v3 compat — not generated by v4 */
.border-opacity-40 { --tw-border-opacity: 0.4; }
.scrolled .blog__header .nav-container {
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
}
.scrolled .blog__header .logo {
	font-size: 1rem;
}
.scrolled .blog__header .logo svg,
.scrolled .blog__header .logo img {
	width: 2.5rem;
	height: 1.5rem;
}
.scrolled .sticky h1 {
	font-size: 1.25rem;
	line-height: 1.75rem;
}
.scrolled .sticky h2 {
	font-size: 1.125rem;
	line-height: 1.5rem;
}
.scrolled .Breadcrumbs {
	margin-top: 0;
	margin-bottom: 0;
	top: 2.5rem;
}
.scrolled .blog__header > div:last-child {
	display: none;
}
.scrolled .sticky[class*="top-"][class*="z-[48]"] {
	top: 3.75rem;
}
.scrolled .sticky[class*="top-"][class*="z-[47]"] {
	top: 5.75rem;
}
.scrolled .sticky[class*="top-"][class*="z-[46]"] {
	top: 7.75rem;
}
.scrolled .sticky[class*="top-"][class*="z-[45]"] {
	top: 9.25rem;
}
.scrolled .sticky[class*="top-"][class*="z-[44]"] {
	top: 10.75rem;
}
.scrolled .sticky[class*="top-"][class*="z-[43]"] {
	top: 12.25rem;
}
`
// @formatter:on
