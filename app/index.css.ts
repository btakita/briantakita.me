// @formatter:off
// language=css
export default ()=>`
@tailwind base;
@tailwind components;
@tailwind utilities;
@source "../../lib/**/*.ts";
@source "../app/**/*.ts";
@source "/home/brian/work/btakita/agent-loop/src/rappstack-dev/lib/**/*.ts";
@plugin "@tailwindcss/typography";
@theme {
	--font-inter: "Inter", sans-serif;
	--font-sans: "Inter", sans-serif;
	--font-serif: "Inter", serif;
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
		tab-size: 2;
		overflow-y: scroll;
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
@media (min-width: 640px) {
	.prose :where(dd):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
		padding-inline-start: 1.625em;
	}
}
.prose a {
	color: rgb(var(--color-accent));
	font-weight: 500;
	overflow-wrap: break-word;
	text-decoration-style: dotted;
	text-underline-offset: 4px;
}
.prose blockquote {
	border-left-color: rgb(var(--color-accent));
	font-style: italic;
	opacity: .8;
}
.prose code {
	border-radius: .25rem;
	color: rgb(var(--color-text-base));
	display: inline-block;
	font-family: JetBrains Mono, monospace;
	padding: .25rem;
	word-wrap: nowrap;
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
	color: rgb(var(--color-text-base));
	opacity: .75;
}
.prose figure {
	margin-left: auto;
	margin-right: auto;
}
.prose h1 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-size: 2.25rem;
	font-weight: 400;
	line-height: 2.5rem;
	color: rgb(var(--color-text-base));
}
.prose h2 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-size: 1.5rem;
	font-weight: 400;
	line-height: 2rem;
	color: rgb(var(--color-text-base));
}
.prose h3 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-size: 1.25rem;
	font-weight: 400;
	line-height: 1.75rem;
	font-style: italic;
	color: rgb(var(--color-text-base));
}
.prose h4 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-size: 1.125rem;
	font-weight: 400;
	line-height: 1.75rem;
	color: rgb(var(--color-text-base));
}
.prose h5 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-weight: 400;
	color: rgb(var(--color-text-base));
}
.prose h6 {
	margin-top: 1.5rem;
	margin-bottom: .75rem;
	font-weight: 400;
	color: rgb(var(--color-text-base));
}
.prose hr {
	border-color: rgb(var(--color-border));
}
.prose img {
	border-color: rgb(var(--color-border));
	border-width: 2px;
	margin-left: auto;
	margin-right: auto;
	margin-top: .5rem;
}
.prose li {
	color: rgb(var(--color-text-base));
}
.prose ul > li::marker {
	color: rgb(var(--color-accent));
}
.prose ol {
	padding-left: 1.5rem;
	color: rgb(var(--color-text-base));
}
.prose p {
	color: rgb(var(--color-text-base));
}
.prose pre {
	font-family: JetBrains Mono, monospace;
	color: rgb(var(--color-text-base));
}
.prose strong {
	color: rgb(var(--color-text-base));
	font-weight: 500;
}
.prose summary {
	color: rgb(var(--color-text-base));
	cursor: pointer;
}
.prose table {
	color: rgb(var(--color-text-base));
}
.prose td {
	border-color: rgb(var(--color-border));
	border-width: 1px;
}
.prose th {
	border-color: rgb(var(--color-border));
	border-width: 1px;
	color: rgb(var(--color-text-base));
}
.prose ul {
	overflow-x: clip;
	padding-left: 2rem;
	color: rgb(var(--color-text-base));
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
