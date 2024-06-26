import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__inline_raw_, md__raw_ } from '@rappstack/ui--any/md'
import { lines_, nl } from '@rappstack/ui--any/string'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
import { tag_vector_toc_c_ } from '../tag_vector/index.js'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2023-10-20T05:00:00.020Z',
	updated_date: '2023-10-29T09:13:00Z',
	title: `Tag Vector: Part 1: Tag Vector Convention`,
	slug: 'tag-vector-1-tag-vector-convention',
	tag_a1: [
		'tag vector',
		'tag graph',
		'domain driven design',
		'software engineering',
		'machine learning',
		'vector database',
	],
	description: `A technical description of the Tag Name Convention`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, lines_(
	`${tag_vector_toc_c_({ ctx })}`,
	nl,
	`Tag Vector is a system to connect "tags" with vector arrows. The vector demonstrates the contextual relationship between tags. The tags are in relation to each other. The relationships between tags are relative to each other on inference levels. A tag in a vector has a higher \`↑\`, lower \`↓\`$, or the same inference level compared to other tags. ${no_up_down_arrow_ligatures_footnote_c_(ctx)}.`,
	nl,
	'The tag `person` has a higher inference level than `name` as `name` is an attribute of `person`.',
	nl,
	'```ts',
	`const person_name = 'Elon Musk'`,
	`// person & name are connected as a 1 dimensional right-arrow vector: person->name`,
	`// person & name are tags`,
	'```',))
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	['# Inferred vectors can also run left `<-`', [
		`Is inference, vectors can also be in the left direction:`,
		nl,
		'```ts',
		`const name_person = 'Elon Musk'`,
		`// name is inferred to be downstream of person`,
		`// The vector is name<-person`,
		'```',]],
	[`# Default Direction when tags are on the same inferential level`, [
		'If two tags are on the same inferential level, such as `person` & `company`, the vector arrow will be `->` by default.',
		nl,
		'```ts',
		`const person_company = { name: 'SpaceX' }`,
		`// person->company`,
		'```',
		nl,
		'The default direction can also be `<-` (left). A `<-` default direction should be documented. Future tooling will include the default direction for code & text analysis.',
		nl,
		'```ts',
		`// <- default`,
		`const company_company = { name: 'SpaceX' }`,
		`// company<-person`,
		'```',
		()=>[
			[`## Overriding the Default Direction`, [
				`The default direction can be overridden in code with a comment above or before the statement.`,
				nl,
				'```ts',
				`// <-`,
				`const company_company = { name: 'SpaceX' }`,
				`// company<-person`,
				'```',]],
			[`## Tag Vectors with 3 or more tags`, [
				`A tag vector composes of any number of tags. Apply the inference level rules to the first & last tag. In the following case:`,
				nl,
				'```ts',
				`const company_person_name = 'Elon Musk'`,
				`// inferred as company->person->name`,
				'```',
				nl,
				`Infer the \`company\` & \`name\` tags against each other. \`company\` has a higher inference level than \`name\` so the inferred direction is \`->\`. Conversely:`,
				nl,
				'```ts',
				`const name_person_company = 'Elon Musk'`,
				`// inferred as name<-person<-company`,
				'```',
				nl,
				`is in the \`<-\` direction from inferring \`name\` having a lower inference level than \`company\`.`,
				nl,
				`An ambiguous inference level follows the same rules above:`,
				nl,
				'```ts',
				`const person_registry_company = { name: 'SpaceX' }`,
				`// person->registry->company`,
				'```',
				nl,
				`or`,
				nl,
				'```ts',
				`// <- default`,
				`const company_registry_person = { name: 'SpaceX' }`,
				`// company<-registry<-person`,
				'```',
				()=>[
					[`### multi-dimension tag vectors`, [
						`Compose tag vectors into a multi-dimension tag vector.`,
						nl,
						'```ts',
						`const highest_net_worth__company_person_name = 'Elon Musk'`,
						`// highest->net->worth-->company->person->name`,
						'```',
						nl,
						`The multi-vector is composed to two vectors \`highest->net->worth\` & \`company->person->name\` with a \`-->\`. Note there are two underscores \`__\` used to join the single underscore \`_\` tag vectors.`,
						nl,
						`Additional dimensions can be chained together:`,
						nl,
						'```ts',
						`const as_of_2023__highest_net_worth__company_person_name = 'Elon Musk'`,
						`// as->of->2023-->highest->net->worth-->company->person->name`,
						'```',
						nl,
						`The inference levels of the name vectors are compared, with the more abstract has a higher inference level than the concrete. In grammar, the predicate \`as->of->2023\` has a higher inference level than the subject \`company->person->name\`.`,
						nl,
						`Continuing with inference levels in grammar; an adjective, adverb, preposition, or conjunction \`as\` would be more abstract than a noun \`2023\`.`,]],],]],
			[`## Data Structure Shape`, [
				`The Tag Vector Convention can encode the shape of the data structure.`,
				()=>[
					[`### Array`, [
						'```ts',
						`const company_person_name_a = [`,
						`	 'Elon Musk',`,
						`	 'Mark Zuckerberg',`,
						`]`,
						`// company->person->name->a(array)`,
						'```',
						()=>[
							[`#### Multi-dimensional Array`, [
								'```ts',
								`const company_a_person_name_aa = [`,
								`	 ['Elon Musk', 'Zachary Kirkhorn'],`,
								`	 ['Mark Zuckerberg', 'Susan Li'],`,
								`]`,
								`// company->a->person_name->aa`,
								`// A 2-dimensional array, company x person_name`,
								'```',
								nl,
								`Higher dimensions can also use a number to express the dimensionality.`,
								nl,
								'```ts',
								`const d1_a_d2_a2_d3_a3_d4_a4:number[][][][] =`,
								`  [ // d1`,
								`    [ // d2`,
								`      [ // d3`,
								`        [ // d4`,
								`          1`,
								`        ]`,
								`      ]`,
								`    ]`,
								`  ]`,
								'```',
							]],],]],
					[`### Record`, [
						'```ts',
						`const company_id_R_ceo_name:Record<string, string> = {`,
						`  'tesla': 'Elon Musk',`,
						`  'facebook': 'Mark Zuckerberg',`,
						`}`,
						'```',]],
					[`### Map`, [
						'```ts',
						`const company_id_M_ceo_name:Map<string, string> = new Map([`,
						`  ['tesla', 'Elon Musk'],`,
						`  ['facebook', 'Mark Zuckerberg'],`,
						`])`,
						'```',]],],]],],]],
])
// @formatter:on
function no_up_down_arrow_ligatures_footnote_c_(ctx:request_ctx_T) {
	// @formatter:off
	// language=md
	return footnote__sup_({ ctx, id: 'no_up_down_arrow_ligatures' }, [
		`Unfortunately, there are no font ligatures for the up & down arrows so the utf-8 characters \`↑ (0x2191)\` & \`↓ (0x2193)\` are used.`,])
	// @formatter:on
}
