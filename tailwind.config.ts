import { type Config } from 'tailwindcss'
const config:Config = {
	content: ['../../*/*/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		// Remove the following screen breakpoint or add other breakpoints
		// if one breakpoint is not enough for you
		screens: {
			sm: '640px',
		},
		// Uncomment the following extend
		// if existing Tailwind color palette will be used
		// extend: {
		textColor: {
			skin: {
				base: withOpacity('--color-text-base'),
				accent: withOpacity('--color-accent'),
				inverted: withOpacity('--color-fill'),
			},
		},
		backgroundColor: {
			skin: {
				fill: withOpacity('--color-fill'),
				accent: withOpacity('--color-accent'),
				inverted: withOpacity('--color-text-base'),
				card: withOpacity('--color-card'),
				'card-muted': withOpacity('--color-card-muted'),
			},
		},
		outlineColor: {
			skin: {
				fill: withOpacity('--color-accent'),
			},
		},
		borderColor: {
			skin: {
				line: withOpacity('--color-border'),
				fill: withOpacity('--color-text-base'),
				accent: withOpacity('--color-accent'),
			},
		},
		fill: {
			skin: {
				base: withOpacity('--color-text-base'),
				accent: withOpacity('--color-accent'),
			},
			transparent: 'transparent',
		},
		fontFamily: {
			sans: ['Atkinson Hyperlegible'],
			serif: ['Atkinson Hyperlegible'],
			mono: ['JetBrains Mono', 'monospace'],
		},
		extend: {
			colors: {
				highlight: withOpacity('--color-accent'),
			},
			boxShadow: {
				highlight: `0 0 10px ${withOpacity('--color-accent')}`
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
export default config
function withOpacity(variableName:string) {
	return ({ opacityValue }:{ opacityValue:number|string })=>{
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`
		}
		return `rgb(var(${variableName}))`
	}
}