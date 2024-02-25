import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
export const meta_ = ()=>post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2004-09-21T12:32:00Z',
	title: `The Third Sector`,
	slug: 'the-third-sector',
	description:
		`Jeremy Rifkin wrote a book about how the private and public sector is unable to support productivity growth caused by technology. There is an abundance of unskilled and semiskilled laborers who find that their jobs are made redundant by advances in machinery and general productivity. There are not enough service and "silicon collared" jobs being created to balance the regular loss of jobs in the manufacturing and farming sector.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(` ${blog_post__top_note__p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190308/http://geekswithblogs.net/btakita/archive/2004/09/21/11444.aspx' }, 'geekswithblogs.net'))}

Jeremy Rifkin wrote a book about how the private and public sector is unable to support productivity growth caused by technology. There is an abundance of unskilled and semiskilled laborers who find that their jobs are made redundant by advances in machinery and general productivity. There are not enough service and "silicon collared" jobs being created to balance the regular loss of jobs in the manufacturing and farming sector.

He proposes strengthening the Third sector, or volunteer organizations, as the means to care for the displaced and to create work. Indeed, the third sector is, perhaps, the foundation that brought success to America, yet it is underrated in today's religions of free market capitalism and big government.

Rifkin briefly mentions a "social" economy based on volunteer work where the currency is how much one spends time helping other people. Kind of like communities looking out for each other on a national level. To do this the role of communities must be strengthened.

Its hard to imagine such a life where work is not paid for. How can this coexist with capitalism? Probably taxing the corporations and using the gains in productivity and profits to subsidize the Third sector. Not a bad idea, but it would take a grassroots paradigm shift. After all, our media is saturated with capitalists perpetuating their
dogma of consumerism and their rationalization that only corporations bring innovation. It also flies in the face of the individualistic tendencies of America.

The government cant lead such a project because it would die in red tape from the massive bureaucracy. A decentralized effort will provide agile solutions to societal problems that continue to plague the world. The world matters very much to America: case in point as September 11. But this is greater than just reducing terrorism, this is a chance for us to tendency to stop exploiting and start empowering other peoples. If we see other people as not competition for the world's resources, but as partners, we can usher in an age where everybody mutually benefits. Such a world is richer than all of DeBeers diamonds and the Saudi Arabia's oil.

I admit this is idealistic, but it is a good ideal to move toward. It certainly beats consumerism.
`.trim())
// @formatter:on
