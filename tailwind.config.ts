import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
const config:Config = {
	content: [],
	theme: {
		textColor: {
			skin: {
				base: rgb_('--color-text-base'),
				accent: rgb_('--color-accent'),
				inverted: rgb_('--color-fill'),
			},
		},
		backgroundColor: {
			skin: {
				fill: rgb_('--color-fill'),
				accent: rgb_('--color-accent'),
				inverted: rgb_('--color-text-base'),
				card: rgb_('--color-card'),
				'card-muted': rgb_('--color-card-muted'),
			},
		},
		outlineColor: {
			skin: {
				fill: rgb_('--color-accent'),
			},
		},
		borderColor: {
			skin: {
				line: rgb_('--color-border'),
				fill: rgb_('--color-text-base'),
				accent: rgb_('--color-accent'),
			},
		},
		fill: {
			skin: {
				base: rgb_('--color-text-base'),
				accent: rgb_('--color-accent'),
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
				highlight: rgb_('--color-accent'),
			},
			boxShadow: {
				highlight: `0 0 10px ${rgb_('--color-accent')}`
			},
		},
	},
	plugins: [typography],
}
export default config
function rgb_(variable_name:string) {
	return `rgb(var(${variable_name}))`
}
