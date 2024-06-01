import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { nl } from '@rappstack/ui--any/string'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import { type request_ctx_T } from 'rebuildjs/server'
import { hr_ } from 'relementjs/html'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2019-04-15T20:20:00Z',
	title: `Multi Underscore Tag Naming Convention Analysis`,
	slug: 'multi-underscore-tag-naming-convention-analysis',
	tag_a1: [
		'ctx-core',
		'tag vector',
		'name convention',
		'domain driven design',
	],
	description: `Naming Convention that utilizes underscores to articulate relationships to tags.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ blog_post__top_note__p_(`Note: I am primarily a practitioner & have not amassed a large reservoir of bibliographic references. Apologies for ideas have been previously published without being reference. I do not include them due to my ignorance or lack of a bibliographic system. I gratefully accept any bibliographic references to ideas that I may present.`)
+ hr_()
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## Scope`, [
		`This article is primarily scoped to the Ontology of the "Multi Underscore Tag Naming Convention". In it, the name of this method will be deconstructed, along with the methodology. There will be some treatment into why or the implications of design choices as well, but that will be limited to keep the scope focused on the Ontology. Emergent Properties or Gestalt resulting from the combination of multiple elements in this methodology will be given limited treatment, with future posts giving fuller treatments.`,]],
	[`## Deconstructing "Multi Underscore Tag Naming Convention"`, [
		`A phrase can be treated as a series of tags, which create the context for meaning.`,
		nl,
		`Ordinally, the phrase "Multi Underscore Tag Naming Convention" can be read left to right, right to left, or from other combinations of ways. The progression of reading each word builds a context. The order (left to right/right to left) of read words, generates a graph of progressive contextual development.`,
		()=>[
			[`### Left to Right: Multi Underscore Tag Naming Convention`, [
				`This sequence follows the English rules of Grammar for a phrase.`,
				nl,
				`The object is "${tb_a_({ href: 'https://en.wiktionary.org/wiki/convention', nofollow: true }, 'Convention')}": A practice or procedure widely observed in a group, especially to facilitate social interaction; a custom.`,
				nl,
				`The prepositions are:`,
				`- Multi Underscore - implying multiple underscore characters \`_\``,
				`- ${tb_a_({ href: 'https://en.wiktionary.org/wiki/tag', nofollow: true }, 'Tag')}`,
				`  - A keyword, term, or phrase associated with or assigned to data, media, and/or information enabling keyword-based classification; often used to categorize content.`,
				`- ${tb_a_({ href: 'https://en.wiktionary.org/wiki/naming', nofollow: true }, 'Naming')}`,
				`  - The process of giving names to things.`,
				nl,
				`The vector can be used:`,
				nl,
				`⟨Multi, Underscore, Tag, Naming, Convention⟩`,
				nl,
				`Subvectors can also be extracted:`,
				nl,
				`⟨⟨Multi, Underscore⟩, ⟨Tag, ⟨Naming, Convention⟩⟩⟩`,]],
			[`### Right to Left: Convention Naming Tag Underscore Multi`, [
				`If one reads the phrase right to left, while applying the rules of grammar, a different meaning is built from the reversed phrase.`,
				nl,
				`However, if one treats each word as a Tag, then the mix of Tags, can yield a set of derivative meanings, often related to the primary order of these tags. To stay on scope, this will be left as an exercise to the reader.`,
				nl,
				`(Multi, Underscore, Tag, Naming, Convention)`,]],],]],
	[`## Constituent Parts`, [
		`What makes a variable name? The rules of the Javascript language will be used as a primary example, with treatments for other languages.`,
		nl,
		`Javascript allows the alphanumeric characters, \`_\`, & \`$\` as valid characters to represent the names of variables (which include functions, classes, etc.). The variable name may not begin with a number. The regex for a valid name is \`/^[a-zA-Z_\\$][a-zA-Z0-9_\\$]*/\`.`,
		nl,
		`Other programming languages may use other characters (e.g. Ruby utilizes \`@\` to represent an instance variable) or not utilize some characters (e.g. \`$\`). Most modern programming languages allow alphanumeric characters & underscores \`_\` to be used for variable or Type names.`,
		()=>[
			[`### Tag`, [
				`A tag (T) is composed of a vector of tags or a word.`,
				nl,
				'```',
				`T = ⟨T⟩`,
				'```',
				nl,
				'```',
				`T<sub>0...i</sub> = ⟨T<sub>0</sub>,...,T<sub>i</sub>⟩`,
				'```',
				nl,
				'```',
				`T = ⟨⟨Multi, Underscore⟩, ⟨Tag, ⟨Naming, Convention⟩⟩⟩`,
				'```',]],
			[`### Underscores`, [
				`A vector of \`_\` characters have different meanings.`,]],
			[`### Single Underscore, \`_\``, [
				`The Multi Underscore Tag Naming Convention build on the single underscore naming convention. A single underscore represents a linkage of words into a single tag. This series reads from general to specific, where the instance type is the last segment, while the contextual tags are in the beginning segments.`,
				nl,
				`For example \`customer_id\` has the context being \`customer\` and the \`id\` being the instance type.`,
				nl,
				`A leading single underscore, \`_\`, represents a function that returns the value represented by a Tag.`,
				nl,
				'```',
				'`_` = f',
				'```',
				nl,
				'```',
				`f(...) = O<sub>T</sub>`,
				'```',
				nl,
				'```',
				`customer = _customer()`,
				'```',
				nl,
				`If there are multiple segments, one can think of a series where each word is passed to the next word.`,
				nl,
				'```',
				`my_customer_id`,
				`T = ⟨my, customer, id⟩`,
				'```',]],
			[`### Double Underscore, \`__\``, [
				`A double underscore, \`__\`, represents an arrow relation between Tags.`,
				nl,
				'```',
				`R = {⟨T<sub>0</sub>, T<sub>1</sub>⟩,...,⟨T<sub>i-1</sub>, T<sub>i</sub>⟩}`,
				'```',
				nl,
				`A Set of Relations can be reduced into a single Relation.`,
				nl,
				'```',
				`R<sub>0,i</sub> = {R<sub>0,1</sub>,...,R<sub>i-1,i</sub>}`,
				'```',
				nl,
				`Where:`,
				nl,
				'```',
				`R = T<sub>0</sub>__T<sub>1</sub>__T<sub>2<sub>0</sub></sub>_T<sub>2<sub>1</sub></sub>__T<sub>3<sub>0</sub></sub>__T<sub>3<sub>1</sub></sub>`,
				'```',
				()=>[
					[`#### Direction of \`__\``, [
						`The Tags are related from specific (i.e. instance) to general (i.e. context).`,
						nl,
						'```',
						`R<sub>i<sub>specific</sub>,i<sub>general</sub></sub>`,
						'```',
						nl,
						`For example:`,
						nl,
						'```',
						`a1__customer__active`,
						'```',
						nl,
						`Is a 1-dimensional array (instance) of customer that is of active context.`,
						()=>[
							[`##### Considerations for specific to general ordering`, [
								`When working with a value, the instance is the interface to the concept. As demonstrated with "Left to Right" & "Right to Left" deconstruction of the title, Order affects meaning & building of context. Order also has Temporal & Proximal characteristics.`,]],
							[`##### Temporal reasons for specific to general ordering`, [
								`If one models an agent reading the code at the rate of one Tag per cycle, the \`T<sub>0</sub>\` is read & processed in 1 cycle & further context is built over subsequent cycles.`,
								nl,
								`This requires the fewest number of cycles to model the type of instance & related local context.`,
								nl,
								`Where \`n\` is the number of unique Tags in Scope \`S\`.`,
								nl,
								'```',
								`S = (T<sub>0</sub>,...,T<sub>n</sub>)`,
								'```',
								nl,
								`If the local programmatic scope is using a set of Tags with different instance types but the same contextual type:`,
								'```',
								`T<sub>0,0</sub> ≠ T<sub>1,0</sub>`,
								`...`,
								`T<sub>0,i-1</sub> = T<sub>1,i-1</sub>`,
								`T<sub>0,i</sub> = T<sub>1,i</sub>`,
								'```',
								nl,
								`the programmer can distinguish the different Tags in\`log n\` time (vs \`n\` time for \`R<sub>i<sub>general</sub>,i<sub>specific</sub></sub>\`).`,
								nl,
								`If the local programmatic scope is using a set of Tags with the same instance type but different contextual types:`,
								nl,
								'```',
								`T<sub>0,0</sub> = T<sub>1,0</sub>`,
								`...`,
								`T<sub>0,i-1</sub> = T<sub>1,i-1</sub>`,
								`T<sub>0,i</sub> ≠ T<sub>1,i</sub>`,
								'```',
								nl,
								`it would be \`n\` time to distinguish the ordering (vs \`log n\` time for \`R<sub>i<sub>general</sub>, i<sub>specific</sub></sub>\`).`,
								nl,
								`In this case, it would be faster \`log n\` to reverse the Tag reading from context to instance (right to left).`,
								nl,
								`The effect is the programmer has quick access to the instance type, when reading the Tag forward, while having quick access to the context, when reading the Tag backward.`,]],
							[`##### Proximal reasons for specific to general ordering`, [
								`When setting a local variable from a Tag, the programmer can use the specific subTag, \`T<sub>i<sub>specific</sub></sub>\` as the local variable name. This enables shorter local variable	names, assuming local variable names are unique.`,
								nl,
								`\`T<sub>i<sub>specific</sub></sub>\` is proximally closer to the beginning of the lineor the operator token (\`=\`, \`<\`, \`>\`). Since \`T<sub>i<sub>specific</sub></sub>\` is proximally closer, the programmer is more likely to see \`T<sub>i<sub>specific</sub></sub>\` without having to scan across the line of code. \`T<sub>i<sub>specific</sub></sub>\` is more relevant to the runtime, as it expresses instance Types.`,]],],]],
					[`#### Open Ended Double Underscore \`__\``, [
						`An open ended \`__\` is composed of a subset of the Tags connected to a general context.`,
						nl,
						`The relation seen above can be reduced in either direction:`,
						nl,
						`Setting a variable including \`T<sub>i<sub>specific</sub></sub>\` means the variable is an value of the instance type.`,
						nl,
						'```',
						`T<sub>0</sub>__ = T<sub>0</sub>__T<sub>1</sub>__T<sub>2<sub>0</sub></sub>_T<sub>2<sub>1</sub></sub>__T<sub>3<sub>0</sub></sub>__T<sub>3<sub>1</sub></sub>`,
						'```',
						nl,
						`Setting a variable including \`T<sub>i<sub>general</sub></sub>\` means the variable is an value tagged with the general type.`,
						nl,
						'```',
						`__T<sub>3<sub>0</sub></sub>__T<sub>3<sub>1</sub></sub> = T<sub>0</sub>__T<sub>1</sub>__T<sub>2<sub>0</sub></sub>_T<sub>2<sub>1</sub></sub>__T<sub>3<sub>0</sub></sub>__T<sub>3<sub>1</sub></sub>`,
						'```',]],],]],
			[`### Higher order Underscores`, [
				`It is logically possible to have more than 2 underscores have additional meaning. While I have not encountered a situation where I used more than 2 underscores, it is worth the thought experiment to consider what more that 2 underscores could mean.`,
				nl,
				`One could relate \`nth\` order of logic is the \`n<sub>underscore</sub>\``,
				nl,
				'```',
				`n<sub>order</sub> = n<sub>underscore</sub> - 1`,
				'```',
				nl,
				`- Relating to 1st order logic (\`_\`) is an individual Tag.`,
				`- Relating to 2nd order logic (\`__\`) is a Vector of Tags.`,
				`- Relating to 3rd order logic (\`___\`) is a Vector of Vectors of Tags.`,
				nl,
				`It becomes decreasingly practical to a human to use higher order underscores. One way to mitigate is to use a number representing order logic. For example \`a1_\` could represent a 1 dimensional array, \`a3_\` could represent 3-dimensional array.`,]],
			[`### Triple Underscore \`___\``, [
				`If we treat 3 underscores as the combination of 1 & 2 underscores, we can model it as a factory of relations, which includes an array (\`___ball\`) and a dimension in a matrix (\`ball__red___cube__green\`).`,
				nl,
				'```',
				`___ball`,
				`ball__red__sally___cube__green__bob`,
				'```',
				nl,
				`As noted previously, more than 2 underscores are difficult for a human to interpret, so this usage will probably not be common.`,]],
			[`### Abbreviations`, [
				`Abbreviations can be used for common types, programmatic, or mathematical notation.`,
				()=>[
					[`#### a[0-9]+`, [
						`\`a[0-9]+\` represents an nth dimensional array.`,
						nl,
						`For example \`a1__vehicle\` represents a 1 dimensional array of vehicles, while \`a2__vehicle\` represents a 2 dimensional array (array of arrays) of vehicles.`,]],
					[`#### arr`, [
						`\`arr\` represents a single dimensional array. \`arr\` can be join with additional \`arr\` to represent higher dimensional arrays. For example, \`arr__vehicle\` represent a 1 dimensional array of vehicles, while \`arr__arr__vehicle\` represents a 2 dimensional array (array of arrays) of vehicles.`,]],
					[`#### ctx`, [
						`\`ctx\` represents a context object holding data related to the following Tag context.`,]],
					[`#### fn`, [
						`\`fn\` represents a function. It is synonymous with a leading \`_\`, and used to explicitly mean a function in cases of ambiguity.`,]],
					[`#### idx`, [
						`\`idx\` represents an index, of type integer.`,]],],]],
			[`### txt`, [
				`\`txt\` represents text.`,]],],]],
])
// @formatter:on
