import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
const { paddingLeft, paddingRight } = (typography() as any).config.theme.typography.base.css[0]['thead th']
const config:Config = {
	content: [],
	safelist: [
		// These classes are purged when NODE_ENV === 'production'
		// TODO: why?
		'group-[.is-open]/blog__header__handle__nav:opacity-0',
		'group-[.is-open]/blog__header__handle__nav:opacity-100',
		'group-[.is-open]/blog__header__handle__nav:flex',
	],
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
			typography: {
				DEFAULT: {
					css: {
						'a': {
							color: 'rgb(var(--color-accent))',
							fontWeight: '500',
							overflowWrap: 'break-word',
							textDecorationStyle: 'dotted',
							textUnderlineOffset: '4px',
						},
						'blockquote': {
							borderLeftColor: 'rgb(var(--color-accent))',
							borderOpacity: '.5',
							fontStyle: 'italic',
							opacity: '.8'
						},
						'code': {
							borderRadius: '.25rem',
							color: 'rgb(var(--color-text-base))',
							display: 'inline-block',
							fontFamily: 'JetBrains Mono,monospace',
							padding: '.25rem',
							wordWrap: 'nowrap'
						},
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						},
						'em': {
							fontStyle: 'italic'
						},
						'figcaption': {
							color: 'rgb(var(--color-text-base))',
							opacity: '.75'
						},
						'figure': {
							marginLeft: 'auto',
							marginRight: 'auto',
						},
						'h1': {
							fontSize: '1.875rem',
							lineHeight: '2.25rem',
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'h2': {
							fontSize: '1.5rem',
							lineHeight: '2rem',
							marginTop: '0',
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'h3': {
							fontSize: '1.25rem',
							lineHeight: '1.75rem',
							fontStyle: 'italic',
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'h4': {
							fontSize: '1.125rem',
							lineHeight: '1.75rem',
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'h5': {
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'h6': {
							color: 'rgb(var(--color-text-base))',
							marginBottom: '.75rem'
						},
						'hr': {
							borderColor: 'rgb(var(--color-border))',
						},
						'img': {
							borderColor: 'rgb(var(--color-border))',
							borderWidth: '2px',
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: '.5rem',
						},
						'li': {
							color: 'rgb(var(--color-text-base))',
						},
						'ul > li::marker': {
							color: 'rgb(var(--color-accent))',
						},
						'ol': {
							paddingLeft: '1.5rem',
							color: 'rgb(var(--color-text-base))',
						},
						'p': {
							color: 'rgb(var(--color-text-base))',
						},
						'pre': {
							fontFamily: 'JetBrains Mono,monospace',
							color: 'rgb(var(--color-text-base))',
						},
						'strong': {
							color: 'rgb(var(--color-text-base))',
							fontWeight: '500',
						},
						'summary': {
							color: 'rgb(var(--color-text-base))',
							cursor: 'pointer',
						},
						'table': {
							color: 'rgb(var(--color-text-base))',
						},
						'td': {
							borderColor: 'rgb(var(--color-border))',
							borderWidth: '1px',
						},
						'th': {
							borderColor: 'rgb(var(--color-border))',
							borderWidth: '1px',
							color: 'rgb(var(--color-text-base))',
						},
						'thead th:first-child': { paddingLeft },
						'thead th:last-child': { paddingRight },
						'tbody td:first-child, tfoot td:first-child': { paddingLeft },
						'tbody td:last-child, tfoot td:last-child': { paddingRight },
						'ul': {
							overflowX: 'clip',
							paddingLeft: '2rem',
							color: 'rgb(var(--color-text-base))',
						}
					}
				}
			}
		},
	},
	plugins: [typography],
}
export default config
function rgb_(variable_name:string) {
	return `rgb(var(${variable_name}))`
}
