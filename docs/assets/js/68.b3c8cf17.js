(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{398:function(t,s,a){"use strict";a.r(s);var e=a(43),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"安全"}},[t._v("安全")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("[Doc]")]),t._v(" Crypto (加密)")]),t._v(" "),a("li",[a("code",[t._v("[Doc]")]),t._v(" TLS/SSL")]),t._v(" "),a("li",[a("code",[t._v("[Doc]")]),t._v(" HTTPS")]),t._v(" "),a("li",[a("code",[t._v("[Point]")]),t._v(" XSS")]),t._v(" "),a("li",[a("code",[t._v("[Point]")]),t._v(" CSRF")]),t._v(" "),a("li",[a("code",[t._v("[Point]")]),t._v(" 中间人攻击")]),t._v(" "),a("li",[a("code",[t._v("[Point]")]),t._v(" Sql/Nosql 注入攻击")])]),t._v(" "),a("h2",{attrs:{id:"crypto"}},[t._v("Crypto")]),t._v(" "),a("p",[t._v("Node.js 的 "),a("code",[t._v("crypto")]),t._v(" 模块封装了诸多的加密功能, 包括 OpenSSL 的哈希、HMAC、加密、解密、签名和验证函数等.")]),t._v(" "),a("p",[t._v("Node.js 的加密貌似有点问题, 某些算法算出来跟别的语言 (比如 Python) 不一样. 具体情况还在整理中 (时间不定), 欢迎补充.")]),t._v(" "),a("blockquote",[a("p",[t._v("加密是如何保证用户密码的安全性?")])]),t._v(" "),a("p",[t._v("在客户端加密, 是增加传输的过程中被第三方嗅探到密码后破解的成本. 对于游戏, 在客户端加密是防止外挂/破解等. 在服务端加密 (如 md5) 是避免管理数据库的 DBA 或者攻击者攻击数据库之后直接拿到明文密码, 从而提高安全性.")]),t._v(" "),a("h2",{attrs:{id:"tls-ssl"}},[t._v("TLS/SSL")]),t._v(" "),a("p",[t._v("早期的网络传输协议由于只在大学内使用, 所以是默认互相信任的. 所以传统的网络通信可以说是没有考虑网络安全的. 早年的浏览器大厂网景公司为了应对这个情况设计了 SSL (Secure Socket Layer), SSL 的主要用途是:")]),t._v(" "),a("ol",[a("li",[t._v("认证用户和服务器, 确保数据发送到正确的客户机和服务器;")]),t._v(" "),a("li",[t._v("加密数据以防止数据中途被窃取;")]),t._v(" "),a("li",[t._v("维护数据的完整性, 确保数据在传输过程中不被改变.")])]),t._v(" "),a("p",[t._v("存在三个特性:")]),t._v(" "),a("ul",[a("li",[t._v("机密性：SSL协议使用密钥加密通信数据")]),t._v(" "),a("li",[t._v("可靠性：服务器和客户都会被认证, 客户的认证是可选的")]),t._v(" "),a("li",[t._v("完整性：SSL协议会对传送的数据进行完整性检查")])]),t._v(" "),a("p",[t._v("1999年, SSL 因为应用广泛, 已经成为互联网上的事实标准. IETF 就在那年把 SSL 标准化/强化. 标准化之后的名称改为传输层安全协议 (Transport Layer Security, TLS). 很多相关的文章都把这两者并列称呼 (TLS/SSL), 因为这两者可以视作同一个东西的不同阶段.")]),t._v(" "),a("h2",{attrs:{id:"https"}},[t._v("HTTPS")]),t._v(" "),a("p",[t._v("在网络上, 每个网站都在各自的服务器上, 想要确保你访问的是一个正确的网站, 并且访问到这个网站正确的数据 (没有被劫持/篡改), 除了需要传输安全之外, 还需要安全的认证, 认证不能由目标网站进行, 否则恶意/钓鱼网站也可以自己说自己是对的, 所以为了能在网络上维护网络之间的基本信任, 早期的大厂们合力推动了一项名为 PKI 的基础设施, 通过第三方来认证网站.")]),t._v(" "),a("p",[t._v("公钥基础设施 (Public Key Infrastructure, PKI) 是一种遵循标准的, 利用公钥加密技术为电子商务的开展提供一套安全基础平台的技术和规范. 其基础建置包含认证中心 (Certification Authority, CA) 、注册中心 (Register Authority, RA) 、目录服务 (Directory Service, DS) 服务器.")]),t._v(" "),a("p",[t._v("由 RA 统筹、审核用户的证书申请, 将证书申请送至 CA 处理后发出证书, 并将证书公告至 DS 中. 在使用证书的过程中, 除了对证书的信任关系与证书本身的正确性做检查外, 并透过产生和发布证书废止列表 (Certificate Revocation List, CRL) 对证书的状态做确认检查, 了解证书是否因某种原因而遭废弃. 证书就像是个人的身分证, 其内容包括证书序号、用户名称、公开金钥 (Public Key) 、证书有效期限等.")]),t._v(" "),a("p",[t._v("在 TLS/SSL 中你可以使用 OpenSSL 来生成 TLS/SSL 传输时用来认证的 public/private key. 不过这个 public/private key 是自己生成的, 而通过 PKI 基础设施可以获得权威的第三方证书 (key) 从而加密 HTTP 传输安全. 目前博客圈子里比较流行的是 "),a("a",{attrs:{href:"https://imququ.com/post/letsencrypt-certificate.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Let's Encrypt 签发免费的 HTTPS 证书"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("p",[t._v("需要注意的是, 如果 PKI 受到攻击, 那么 HTTPS 也一样不安全. 可以参见 "),a("a",{attrs:{href:"https://www.zhihu.com/question/22795329",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTTPS 劫持 - 知乎讨论"),a("OutboundLink")],1),t._v(" 中的情况, 证书由 CA 机构签发, 一般浏览器遇到非权威的 CA 机构是会告警的 (参见 "),a("a",{attrs:{href:"https://kyfw.12306.cn/otn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("12306"),a("OutboundLink")],1),t._v("), 但是如果你在某些特殊的情况下信任了某个未知机构/证书, 那么也可能被劫持.")]),t._v(" "),a("p",[t._v("此外有的 CA 机构以邮件方式认证, 那么当某个网站的邮件服务收到攻击/渗透, 那么攻击者也可能以此从 CA 机构获取权威的正确的证书.")]),t._v(" "),a("h2",{attrs:{id:"xss"}},[t._v("XSS")]),t._v(" "),a("p",[t._v("跨站脚本 (Cross-Site Scripting, XSS) 是一种代码注入方式, 为了与 CSS 区分所以被称作 XSS. 早期常见于网络论坛, 起因是网站没有对用户的输入进行严格的限制, 使得攻击者可以将脚本上传到帖子让其他人浏览到有恶意脚本的页面, 其注入方式很简单包括但不限于 JavaScript / VBScript / CSS / Flash 等.")]),t._v(" "),a("p",[t._v("当其他用户浏览到这些网页时, 就会执行这些恶意脚本, 对用户进行 Cookie 窃取/会话劫持/钓鱼欺骗等各种攻击. 其原理, 如使用 js 脚本收集当前用户环境的信息 (Cookie 等), 然后通过 img.src, Ajax, onclick/onload/onerror 事件等方式将用户数据传递到攻击者的服务器上. 钓鱼欺骗则常见于使用脚本进行视觉欺骗, 构建假的恶意的 Button 覆盖/替换真实的场景等情况 (该情况在用户上传 CSS 的时候也可能出现, 如早期淘宝网店装修, 使用 CSS 拼接假的评分数据等覆盖在真的评分数据上误导用户).")]),t._v(" "),a("blockquote",[a("p",[t._v("过滤 Html 标签能否防止 XSS? 请列举不能的情况?")])]),t._v(" "),a("p",[t._v("用户除了上传")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xss'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("还可以使用图片 url 等方式来上传脚本进行攻击")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("table")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("background")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("javascript:alert(/xss/)"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("table")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("javascript:alert("),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("xss"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(")"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("还可以使用各种方式来回避检查, 例如空格, 回车, Tab")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("javas cript:\nalert("),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("xss"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(")"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("还可以通过各种编码转换 (URL 编码, Unicode 编码, HTML 编码, ESCAPE 等) 来绕过检查")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<img%20src=%22javascript:alert('xss');%22>\n<img src=\"javascrip&#116&#58alert(/xss/)\">\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h3",{attrs:{id:"csp-策略"}},[t._v("CSP 策略")]),t._v(" "),a("p",[t._v("在百般无奈, 没有统一解决方案的情况下, 厂商们推出了 CSP 策略.")]),t._v(" "),a("p",[t._v("以 Node.js 为例, 计算脚本的 hashes 值:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const crypto = require('crypto');\n\nfunction getHashByCode(code, algorithm = 'sha256') {\n  return algorithm + '-' + crypto.createHash(algorithm).update(code, 'utf8').digest(\"base64\");\n}\n\ngetHashByCode('console.log(\"hello world\");'); // 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])]),a("p",[t._v("设置 CSP 头:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("content-security-policy: script-src 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello geemo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 不执行 --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 执行 --\x3e")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("策略指令可以参见 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSP Policy Directives"),a("OutboundLink")],1),t._v("以及"),a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2016/09/csp.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰的博文"),a("OutboundLink")],1),t._v(", "),a("a",{attrs:{href:"https://imququ.com/post/content-security-policy-reference.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("屈大神的博文"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"csrf"}},[t._v("CSRF")]),t._v(" "),a("p",[t._v("跨站请求伪造 (Cross-Site Request Forgery, CSRF, https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet) 是一种伪造跨站请求的攻击方式. 例如利用你在 A 站 (攻击目标) 的 cookie / 权限等, 在 B 站 (恶意/钓鱼网站) 拼装 A 站的请求.")]),t._v(" "),a("p",[t._v("比如 Q 君是某论坛管理员. 已知这个论坛 A 删除的接口是 post 到某个地址, 并指定一个帖子的 id.  那么我可以在自己的博客 B 上组织一个 CSRF 请求. 然后诱使 Q 君来访问我的博客. 就可以在 Q 君不知情的情况下删除掉我想删的某个帖子.")]),t._v(" "),a("p",[t._v("钓鱼方式包括但不限于公开网站 (xss), 攻击者的恶意网站, email 邮件, 微博, 微信, 短信等及时消息.")]),t._v(" "),a("p",[t._v("同源策略是最早用于防止 CSRF 的一种方式, 即关于跨站请求 (Cross-Site Request) 只有在同源/信任的情况下才可以请求. 但是如果一个网站群, 在互相信任的情况下, 某个网站出现了问题:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("a.public.com\nb.public.com\nc.public.com\n...\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("以上情况下, 如果 c.public.com 上没有预防 xss 等情况, 使得攻击者可以基于此站对其他信任的网站发起 CSRF 攻击.")]),t._v(" "),a("p",[t._v("另外同源策略主要是浏览器来进行验证的, 并且不同浏览器的实现又各自不同, 所以在某些浏览器上可以直接绕过, 而且也可以直接通过短信等方式直接绕过浏览器.")]),t._v(" "),a("p",[t._v("预防:")]),t._v(" "),a("ol",[a("li",[t._v("A 站 (预防站) 检查 http 请求的 header 确认其 origin")]),t._v(" "),a("li",[t._v("检查 CSRF token")])]),t._v(" "),a("h3",{attrs:{id:"_1-同源检查"}},[t._v("1.同源检查")]),t._v(" "),a("p",[t._v("通过检查来过滤简单的 CSRF 攻击, 主要检查一下两个 header:")]),t._v(" "),a("ul",[a("li",[t._v("Origin Header")]),t._v(" "),a("li",[t._v("Referer Header")])]),t._v(" "),a("h3",{attrs:{id:"_2-csrf-token"}},[t._v("2.CSRF token")]),t._v(" "),a("p",[t._v("简单来说, 对需要预防的请求, 通过特别的算法生成 token 存在 session 中, 然后将 token 隐藏在正确的界面表单中, 正式请求时带上该 token 在服务端验证, 避免跨站请求.")]),t._v(" "),a("h2",{attrs:{id:"中间人攻击"}},[t._v("中间人攻击")]),t._v(" "),a("p",[t._v("中间人 (Man-in-the-middle attack, MITM) 是指攻击者与通讯的两端分别创建独立的联系, 并交换其所收到的数据, 使通讯的两端认为他们正在通过一个私密的连接与对方直接对话, 但事实上整个会话都被攻击者完全控制. 在中间人攻击中, 攻击者可以拦截通讯双方的通话并插入新的内容.")]),t._v(" "),a("p",[t._v("目前比较常见的是在公共场所放置精心准备的免费 wifi, 劫持/监控通过该 wifi 的流量. 或者攻击路由器, 连上你家 wifi 攻破你家 wifi 之后在上面劫持流量等.")]),t._v(" "),a("p",[t._v("对于通信过程中的 MITM, 常见的方案是通过 PKI / TLS 预防, 及时是通过存在第三方中间人的 wifi 你通过 HTTPS 访问的页面依旧是安全的. 而 HTTP 协议是明文传输, 则没有任何防护可言.")]),t._v(" "),a("p",[t._v("不常见的还有强力的互相认证, 你确认他之后, 他也确认你一下; 延迟测试, 统计传输时间, 如果通讯延迟过高则认为可能存在第三方中间人; 等等.")]),t._v(" "),a("h2",{attrs:{id:"sql-nosql-注入"}},[t._v("SQL/NoSQL 注入")]),t._v(" "),a("p",[t._v("注入攻击是指当所执行的一些操作中有部分由用户传入时, 用户可以将其恶意逻辑注入到操作中. 当你使用 eval, new Function 等方式执行的字符串中有用户输入的部分时, 就可能被注入攻击. 上文中的 XSS 就属于一种注入攻击. 前面的章节中也提到过 Node.js 的 child_process.exec 由于调用 bash 解析, 如果执行的命令中有部分属于用户输入, 也可能被注入攻击.")]),t._v(" "),a("h3",{attrs:{id:"sql"}},[t._v("SQL")]),t._v(" "),a("p",[t._v("Sql 注入是网站常见的一种注入攻击方式. 其原因主要是由于登录时需要验证用户名/密码, 其执行 sql 类似:")]),t._v(" "),a("div",{staticClass:"language-sql line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" users "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" usernae "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'myName'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("AND")]),t._v(" password "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mySecret'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("其中的用户名和密码属于用户输入的部分, 那么在未做检查的情况下, 用户可能拼接恶意的字符串来达到其某种目的, 例如上传密码为 "),a("code",[t._v("'; DROP TABLE users; --")]),t._v(" 使得最终执行的内容为:")]),t._v(" "),a("div",{staticClass:"language-sql line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" users "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" usernae "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'myName'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("AND")]),t._v(" password "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DROP")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TABLE")]),t._v(" users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("--';")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("其能实现的功能, 包括但不限于删除数据 (经济损失), 篡改数据 (密码等), 窃取数据 (网站管理权限, 用户数据) 等. 防治手段常见于:")]),t._v(" "),a("ul",[a("li",[t._v("给表名/字段名加前缀 (避免被猜到)")]),t._v(" "),a("li",[t._v("报错隐藏表信息 (避免被看到, 12306 早期就出现过的问题)")]),t._v(" "),a("li",[t._v("过滤可以拼接 SQL 的关键字符")]),t._v(" "),a("li",[t._v("对用户输入进行转义")]),t._v(" "),a("li",[t._v("验证用户输入的类型 (避免 limit, order by 等注入)")]),t._v(" "),a("li",[t._v("等...")])]),t._v(" "),a("h3",{attrs:{id:"nosql"}},[t._v("NoSQL")]),t._v(" "),a("p",[t._v("看个简单的情况:")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pass"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("query"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\ndb"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("collection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pass"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  $where"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[t._v("`this.age >= ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("age"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("那么这里的 age 就可以注入了. 另外 GET/POST 还可以传递深层结构 (比如 ?name[0]=alan 传递上来), 通过 qs 之类的模块解析后导致注入, 如 "),a("a",{attrs:{href:"https://github.com/cnodejs/nodeclub/commit/0f6cc14f6bcbbe6b4de3199c6896efaec637693e",target:"_blank",rel:"noopener noreferrer"}},[t._v("cnodejs 遭遇 mongodb 注入"),a("OutboundLink")],1),t._v(".")])])},[],!1,null,null,null);n.options.__file="security.md";s.default=n.exports}}]);