import { ccrcorp__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2004-09-19T03:21:00Z',
	title: `Deploy Any File Type using Whidbey Click Once`,
	slug: 'deploy-any-file-type-using-whidbey-click-once',
	description:
		`ClickOnce can be used to not only deploy .NET applications, but also to deploy files. Yesterday, I deployed an Access adp application to our organization.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_({ ctx }, `
${blog_post__top_note__p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190258/http://geekswithblogs.net/btakita/archive/2004/09/18/11352.aspx', nofollow: true }, 'geekswithblogs.net'))}

One of the great things about Whidbey is ClickOnce Deployment. At ${ccrcorp__tb_a_()}, I use it to deploy rich client internal applications.

ClickOnce can be used to not only deploy .NET applications, but also to deploy files. Yesterday, I deployed an Access adp application to our organization. To do so, I simply...

- Create a Console Application
- Add the adp file to the project and set it as Content
- Write a bootstrapper application in the Main method
- ${tb_a_({ href: 'https://learn.microsoft.com/en-us/visualstudio/deployment/clickonce-security-and-deployment?view=vs-2022', nofollow: true }, 'Configure'), ` the ClickOnce deployment`}

Here is the bootstrap&hellip;

\`\`\`cs
#region Using directives
	using System;
	using System.Diagnostics;
#endregion

namespace AdpApplication {
	class Program {
			static void Main(string[] args) {
			System.Diagnostics.Process p = new Process();
			p.StartInfo.FileName = "./file.adp";
			p.Start();
		}
	}
}
\`\`\`

Nice and easy. Also, if you are using a web server to deploy the file, remember to set the MIME type.
`.trim())
// @formatter:on
