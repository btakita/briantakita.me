import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { footnote__sup_, footnote_list__div_ } from '@btakita/ui--server--blog/footnote'
import { atb_ctx_core_ } from '@btakita/ui--server--briantakita/anchor'
import { type request_ctx_T } from 'rebuildjs/server'
import { tag_vector_toc_c_ } from '../tag_vector/index.js'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2023-10-20T05:00:00.020Z',
	title: `Tag Vector: Part 0: Introduction`,
	slug: 'tag-vector-0-introduction',
	tag_a1: [
		'tag vector',
		'tag graph',
		'domain driven design',
		'software engineering',
		'machine learning',
		'vector database',
	],
	description:
		`tag vector is a name convention, will eventually be a formal name system, where names are composed of tags connected by a 1 dimensional vector. It can be used for naming variables, functions, components, network apis, low code apps, even in plain text.`,
	featured: true,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(`
This series about Tag Vector will go over a technique that I have iterated on since 2016 in ${atb_ctx_core_()}	& in other (mostly client) projects.

> There are only two hard things in Computer Science: cache invalidation and naming things.
> -- Phil Karlton

Tag Vector aims to be a tool to solve the two hard things in Computed Science by providing a name convention & eventually a formalized system with tools to:

* work with existing source code
* show how tags are connected by using a 1 dimensional vector
* understand the context of an abstraction just by looking at the tag vector
* the data structure shape of the abstraction can be encoded in the tag vector
* immutable names to allow a simple text search to find all usages of tags & tag vectors
* compose multi-dimension tag vectors
* show the directional arrow of a tag vector in source code & text using font ligatures${
	footnote__sup_({ ctx, id: 'font-ligatures' }, `The underscore arrow font ligatures will be developed in new fonts forked from popular existing fonts`)
}
* store the tag vector in a vector database & automate querying tag graphs
* tag graphs can enable linking to & a vector search for other usages of the tag, machine leaning algorithms, & domain-specific analysis.
* write prose with an editor that understands the tag vector with tools that parse & act on the tag vector, rendering components & performing api calls${
	footnote__sup_({ ctx, id: 'tag-vector-editor-prototype' }, `A prototype of the document editor with Tag Vector is in the works`)
}

The Tag Vector system can provide profound benefits to computer science, programming, api design, domain design, low-code tooling, machine learning, even plain text. The Tag Vector convention feels familiar to existing code conventions & can be used with existing source code.

${tag_vector_toc_c_()}

${footnote_list__div_({ ctx })}
`.trim())
// @formatter:on
