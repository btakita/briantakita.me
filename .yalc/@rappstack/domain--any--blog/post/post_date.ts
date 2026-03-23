import { is_server_ } from 'ctx-core/env'
export function post_date_(datetime:string|Date) {
  return (
		new Date(
			typeof datetime === 'string' && is_server_()
				? datetime.replace(/Z$/, '')
				: datetime
		)
	)
}
