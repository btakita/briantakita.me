import type { Thing } from '@btakita/schema-dts'
export const schema_org_rdfa_vocab = 'http://schema.org'
export type schema_org_rdfa_vocab_T = typeof schema_org_rdfa_vocab
export type schema_org_rdfa_typeof_T = type_union__infer<Thing>
type type_union__infer<T> =
	T extends { '@type':infer U }
		? U
		: never
export type schema_org_rdfa_props_T = {
	vocab: schema_org_rdfa_vocab_T,
	typeof: schema_org_rdfa_typeof_T
}
