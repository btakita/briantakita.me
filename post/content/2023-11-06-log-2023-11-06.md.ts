import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { site__author_, site__author_img_url_ } from '@rappstack/domain--server/site'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate({
	author: site__author_(ctx)!,
	author_img_url: site__author_img_url_(ctx)!,
	pub_date: '2023-11-06T14:43:00Z',
	title: 'Log 2023-11-06',
	slug: 'log-2023-11-06',
	tag_a1: [
		'data',
		'philosophy',
	],
	description: `Data layer definitions`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(`
A Data ontology I saw ${footnote__sup_({ ctx, id: 'clif-high-data' }, tb_a_({ href: 'https://youtu.be/z78fcGbtZ94?si=JznGhvjrl0EvgBPj&t=639', nofollow: true }, `SCI-FI WORLD LUNACY - EXPLORERS' GUIDE TO SCIFI WORLD`))}

* **Datum**: A single piece of information
* **Data**: A collection of individual data points
* **Database**: A structured collection of data, or a collection of datasets
* **Metadata**: Information about the data (like data definitions, structures, or characteristics)
* **Entia-data**: Data pertaining to the beings or entities that are collecting & aggregating the data
* **Omnia-Exemplar-data**: Data related to the overarching universal model or the paradigmatic structure of the
universe in which these beings **think/believe** they operate
`.trim())
// @formatter:on
