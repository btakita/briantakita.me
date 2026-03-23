export interface Post {
	id:string
	slug:string
	body:string
	collection:string
	data:{
		author:string
		title:string
		description:string
		pubDate:Date // astro compatibility
		updated_date?:Date
		hero_image?:string
		tags:string[]
		slug?:string
		featured?:boolean
		draft?:boolean
		canonical_url?:string
		video_url?:string
		playlist_url?:string
	}
}
