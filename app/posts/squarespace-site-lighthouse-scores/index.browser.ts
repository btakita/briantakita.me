window.addEventListener('load', ()=>{
	const lazy__iframe_a1 = Array.from(document.querySelectorAll('iframe[loading="lazy"]'))
	let observer = new IntersectionObserver((entries, observer)=>{
		for (const entry of entries) {
			if (entry.isIntersecting) {
				let lazy__iframe = <HTMLIFrameElement>entry.target
				lazy__iframe.src = lazy__iframe.dataset.src!
				observer.unobserve(lazy__iframe)
			}
		}
	})
	for (const lazy__iframe of lazy__iframe_a1) {
		observer.observe(lazy__iframe)
	}
})
