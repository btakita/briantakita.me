import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { footnote__sup_, footnote_list__div_ } from '@btakita/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2023-11-06T14:43:00Z',
	title: 'Log 2023-11-06',
	slug: 'log-2023-11-06',
	tags: [
		'data',
		'philosophy',
	],
	description: `Data layer definitions`,
}
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md_c_(`
A Data ontology I saw ${footnote__sup_({ ctx, id: 'clif-high-data' }, tb_a_({ href: 'https://youtu.be/z78fcGbtZ94?si=JznGhvjrl0EvgBPj&t=639' }, `SCI-FI WORLD LUNACY - EXPLORERS' GUIDE TO SCIFI WORLD`))}

* **Datum**: A single piece of information
* **Data**: A collection of individual data points
* **Database**: A structured collection of data, or a collection of datasets
* **Metadata**: Information about the data (like data definitions, structures, or characteristics)
* **Entia-data**: Data pertaining to the beings or entities that are collecting & aggregating the data
* **Omnia-Exemplar-data**: Data related to the overarching universal model or the paradigmatic structure of the
universe in which these beings **think/believe** they operate

${footnote_list__div_({ ctx })}
`.trim())
// @formatter:on
