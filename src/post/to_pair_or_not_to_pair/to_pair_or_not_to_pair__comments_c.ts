import { tb_a_ } from '@rappstack/ui--server--blog/anchor'
import { type relement_env_T } from 'relementjs'
import { a_, div_, em_, h3_, img_, li_, p_, span_, ul_ } from 'relementjs/html'
import './to_pair_or_not_to_pair__comments_c.css'
export function to_pair_or_not_to_pair__comments_c_<env_T extends relement_env_T>() {
	return (
		div_({ id: 'comments' }, [
			h3_('3 Comments'),
			ul_([
				li_([
					div_({ class: 'gravatar' }, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/d5fa38c6dc1cd61b01397e11b30425d7',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						})
					]),
					div_({ class: 'comment' }, [
						span_({ class: 'commentauthor' }, [
							a_({
								href: 'https://web.archive.org/web/20120513132750/http://40withegg.com/',
								rel: 'external nofollow',
								class: 'url'
							}, 'Joe Moore'),
							' says...'
						]),
						span_({ class: 'commentdate' }, 'Comment on March 10, 2010 at 7:55 am'),
						div_({ class: 'commenttext' }, [
							p_(
								'Keep us posted as to how your move away from pair programming fairs. For example, if you find that morebugs are introduced and thus the soloing benefits are canceled out… or if that ',
								em_('doesn’t'),
								' happen,too.')
						])
					])
				]),
				li_([
					div_({ class: 'gravatar' }, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/2475563a3ba1da4018af64f964ab45b0',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						})
					]),
					div_({ class: 'comment' }, [
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
							class: 'commentdate'
						}, 'Comment on March 10, 2010 at 8:08 pm'),
						div_({
							class: 'commenttext'
						}, [
							p_('But who’s gonna call YAGNI on you, Brian?'),
							p_([
								'Not that You’re Ever Gonna Need That',
								img_({
									src: '/assets/images/icon_wink.gif',
									alt: ';)',
									class: 'wp-smiley'
								})
							]),
							p_('– Chad')
						])
					])
				]),
				li_([
					div_({ class: 'gravatar' }, [
						img_({
							alt: '',
							src: 'http://www.gravatar.com/avatar/10dcd7cf4ff4b679c284cedf7be4f68f',
							class: 'avatar avatar-50 photo',
							height: '50',
							width: '50'
						}),
					]),
					div_({ class: 'comment' }, [
						span_({ class: 'commentauthor' }, [
							tb_a_({
								href: 'https://web.archive.org/web/20120513132750/http://www.honk.com/',
								rel: 'external nofollow',
								class: 'url'
							}, 'Brian'),
							' says...'
						]),
						span_({ class: 'commentdate' }, 'Comment on March 23, 2010 at 9:27 am'),
						div_({ class: 'commenttext' }, [
							p_([
								'Thanks. Yeah, I still need YAGNI at times ',
								img_({
									src: '/assets/images/icon_smile.gif',
									alt: ':-)',
									class: 'wp-smiley'
								}),
								'.'
							]),
							p_(
								'The developers here seem to like the autonomy. We are still in an open workspace and we talk to' +
								' each other regarding our changes.'),
							p_(
								'I’m not sure yet what effect this has on our velocity and defect rate. The types of changes vary' +
								' from major release to major release.'),
							p_(
								'There have not been major issues (that I’m aware of) due to lack of pairing so far. Our history of' +
								' pairing has helped in giving us a unified development direction/idioms.'),
							p_(
								'One side-note, we have an awesome pair here from Blazing Cloud (Jen-Mei Wu and Ali Crockett).' +
								' Jen-Meiis an experienced Rubyist and Ali is new to Ruby but experienced in other technologies.'),
							p_(
								'Pairing totally makes sense here as the knowledge transfer is high and it better enables developers' +
								' tobe productive on a new codebase.')
						])
					])
				])
			])
		])
	)
}
