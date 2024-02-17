import { tb_a_ } from '@rappstack/ui--any/anchor'
import { class_ } from 'ctx-core/html'
import { type relement_env_T } from 'relementjs'
import { a_, div_, em_, h3_, img_, li_, p_, span_, ul_ } from 'relementjs/html'
import icon_smile_gif from '../../public/assets/images/icon_smile.gif'
import icon_wink_gif from '../../public/assets/images/icon_wink.gif'
export function to_pair_or_not_to_pair__comments__div_<env_T extends relement_env_T>() {
	return (
		div_({ id: 'comments' }, [
			h3_('3 Comments'),
			ul_([
				li_({
					class: 'flex'
				}, [
					div_({
						class: class_(
							'grow-0',
							'min-w-[50px]'),
					}, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/d5fa38c6dc1cd61b01397e11b30425d7',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						})
					]),
					div_({ class: 'ml-4' }, [
						span_({ class: 'commentauthor' }, [
							a_({
								href: 'https://web.archive.org/web/20120513132750/http://40withegg.com/',
								rel: 'external nofollow',
								class: 'url'
							}, 'Joe Moore'),
							' says...'
						]),
						span_({ class: 'block' }, 'Comment on March 10, 2010 at 7:55 am'),
						div_({ class: 'commenttext' }, [
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'Keep us posted as to how your move away from pair programming fairs. For example, if you find that morebugs are introduced and thus the soloing benefits are canceled out… or if that ',
								em_('doesn’t'),
								' happen,too.'
							])
						])
					])
				]),
				li_({
					class: 'flex'
				}, [
					div_({
						class: class_(
							'grow-0',
							'min-w-[50px]')
					}, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/2475563a3ba1da4018af64f964ab45b0',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						})
					]),
					div_({ class: 'ml-4' }, [
						span_({
							class: 'commentauthor'
						}, [
							tb_a_({
								href: 'http://thewoolleyweb.com/',
								rel: 'external nofollow',
								class: 'url'
							}, 'Chad Woolley'),
							' says...'
						]),
						span_({
							class: 'block'
						}, 'Comment on March 10, 2010 at 8:08 pm'),
						div_({
							class: 'commenttext'
						}, [
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, 'But who’s gonna call YAGNI on you, Brian?'),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'Not that You’re Ever Gonna Need That',
								img_({
									src: icon_wink_gif,
									alt: ';)',
									class: class_(
										'wp-smiley',
										'inline',
										'border-0',
										'leading-4',
										'm-0')
								})
							]),
							p_('– Chad')
						])
					])
				]),
				li_({
					class: 'flex'
				}, [
					div_({
						class: class_(
							'grow-0',
							'min-w-[50px]')
					}, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/10dcd7cf4ff4b679c284cedf7be4f68f',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						}),
					]),
					div_({ class: 'ml-4' }, [
						span_({ class: 'commentauthor' }, [
							tb_a_({
								href: 'https://web.archive.org/web/20120513132750/http://www.honk.com/',
								rel: 'external nofollow',
								class: 'url'
							}, 'Brian'),
							' says...'
						]),
						span_({ class: 'block' }, 'Comment on March 23, 2010 at 9:27 am'),
						div_({ class: 'commenttext' }, [
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'Thanks. Yeah, I still need YAGNI at times ',
								img_({
									src: icon_smile_gif,
									alt: ':-)',
									class: class_(
										'wp-smiley',
										'inline',
										'border-0',
										'leading-4',
										'm-0')
								}),
								'.'
							]),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'The developers here seem to like the autonomy. We are still in an open workspace and we talk to' +
								' each other regarding our changes.'
							]),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'I’m not sure yet what effect this has on our velocity and defect rate. The types of changes vary' +
								' from major release to major release.'
							]),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'There have not been major issues (that I’m aware of) due to lack of pairing so far. Our history of' +
								' pairing has helped in giving us a unified development direction/idioms.'
							]),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'One side-note, we have an awesome pair here from Blazing Cloud (Jen-Mei Wu and Ali Crockett).' +
								' Jen-Meiis an experienced Rubyist and Ali is new to Ruby but experienced in other technologies.'
							]),
							p_({
								class: class_(
									'leading-snug',
									'mb-4')
							}, [
								'Pairing totally makes sense here as the knowledge transfer is high and it better enables developers' +
								' tobe productive on a new codebase.'
							])
						])
					])
				])
			])
		])
	)
}
