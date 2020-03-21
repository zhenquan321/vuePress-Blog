const currentDateUTC = new Date().toUTCString()

module.exports = {
	// base:"/lmongo/",
	title: '忙 · 南易',
	dest: './docs',
	themeConfig: {
		repo: 'https://github.com/zhenquan321',
		repoLabel: 'Git',
		editLinks: true,
		editLinkText: 'Found a bug? Help me improve this page!',
		nav: [
			// { text: '大前端', link: '/frontEnd/' },
			{
				text: 'node',
				link: '/node/'
			},
			{
				text: 'offer之道',
				link: '/offer/'
			},
			{
				text: '大厂真题',
				link: '/interviewQuestions/bytedance'
			},
			// { text: '随笔', link: '/blog/' },
			// { text: '支持', link: '/support/' }
		],
		logo: '/logo.png',
		docsDir: 'src',
		pageSize: 10,
		startPage: 0,
		sidebar: {
			'/frontEnd/': renderFontEndSiderBar(),
			'/node/': renderNodeSiderBar(),
			'/offer/': renderOfferSiderBar(),
			'/interviewQuestions/': [
				['bytedance', "字节跳动"],
			],
			'/blog/': [
				'',
				'my-first-post',
				'my-second-post'
			],
			// fallback
			'support': [
				'', /* / */
			]
		}

	},
	plugins: [
		[
			'@vuepress/google-analytics',
			{
				ga: '' // UA-00000000-0
			}
		],
		[
			'vuepress-plugin-rss',
			{
				base_url: '/',
				site_url: 'https://vuepressblog.org',
				filter: frontmatter => frontmatter.date <= new Date(currentDateUTC),
				count: 20
			}
		],
		'vuepress-plugin-reading-time',
		'vuepress-plugin-janitor'
	],
	markdown: {
		lineNumbers: true,
		// markdown-it-anchor 的选项
		anchor: {
			permalink: false
		},
		// markdown-it-toc 的选项
		toc: {
			includeLevel: [1, 2]
		},
	},
	head: [
		['link', {
			rel: 'apple-touch-icon',
			sizes: '128x128',
			href: '/favicon_128.ico'
		}],
		['link', {
			rel: 'manifest',
			href: '/site.webmanifest'
		}],
		['link', {
			rel: 'mask-icon',
			href: '/safari-pinned-tab.svg',
			color: '#5bbad5'
		}],
		['meta', {
			name: 'msapplication-TileColor',
			content: '#da532c'
		}],
		['meta', {
			name: 'theme-color',
			content: '#ffffff'
		}]
	]
}

function renderNodeSiderBar() {
	return (
		[
			{
				title: '前言',
				collapsable: true, 
				children: [
					['',"简介"],
					['koa2/1.1Node.js的安装与配置',"Node.js的安装与配置"],
					['koa2/1.2Node.js基础概览',"Node.js基础概览"],
				],  
			},
			{
				title: 'node后端通识',
				collapsable: true,
				children: [
					['module', "模块"],
					['event-async', "事件/异步"],
					['process', "进程"],
					['io', "IO"],
					['network', "Network"],
					['error', "错误处理/调试"],
					['test', "测试"],
					['util', "util"],
					['storage', "存储"],
					['security', "安全"],
				]
			},
			{
				title: 'koa2制作博客教程',
				collapsable: true,
				children:[
					'koa2/2.1Koa2初体验',
					'koa2/2.2MongoDB安装及使用',
					'koa2/3.1开发前的项目配置',
					'koa2/3.2把项目跑起来',
					'koa2/3.3操作数据库',
					'koa2/3.4用户注册与登录',
					'koa2/3.5koa2中间件开发',
					'koa2/3.6文章增删改查',
					'koa2/3.7用户权限控制',
					'koa2/3.8评论功能',
					'koa2/3.9一些安全问题',
					'koa2/3.10文章分类',
					'koa2/3.11分页功能',
					'koa2/3.12koa2错误处理及404',
					'koa2/4.1域名与服务器',
					'koa2/4.2登录服务器',
					'koa2/4.3在Ubuntu上搭建Node.js环境',
					'koa2/4.4使用Nginx反向代理',
				]
			},
		]
	)
}


function renderOfferSiderBar() {
	return (
		[   {
				title: '前言',
				collapsable: false,
				children: [
					'',
				]
			},
			{
				title: '面试技巧',
				collapsable: true,
				children: [
					'resume',
					'project',
					'hr',
				]
			},
			{
				title: '推荐',
				collapsable: true,
				children: [
					'book'
				]
			},
			{
				title: '前端基础',
				collapsable: true,
				children: [
					'htmlBasic',
					'cssBasic',
					'jsBasic',
					"es6-7-8",
					'browser',
					'dom',
					// 'designPatterns',
				]
			},
			{
				title: '前端基础笔试',
				collapsable: true,
				children: [
					'httpWritten',
					'jsWritten',
				]
			},
			{
				title: '前端原理详解',
				collapsable: true,
				children: [
					'hoisting',
					'eventLoop',
					'immutable',
					'memory',
					'deepclone',
					'event',
					'mechanism',
				]
			},
			{
				title: '计算机基础',
				collapsable: true,
				children: [
					'http',
					'tcp',
				]
			},
			{
				title: '数据结构与算法',
				collapsable: true,
				children: [
					'algorithm',
					'string',
				]
			},
			{
				title: '前端框架',
				collapsable: true,
				children: [
					'framework',
					'vue',
					'react',
				]
			},
			{
				title: '框架原理详解',
				collapsable: true,
				children: [
					'virtualDom',
					'devsProxy',
					'setState',
					'router',
					'redux',
					'fiber',
					'abstract',
					'reactHook',
				]
			},
			{
				title: '框架实战技巧',
				collapsable: true,
				children: [
					'componentCli',
					'component',
					'carousel',
				]
			},
			{
				title: '性能优化',
				collapsable: true,
				children: [
					'load',
					'execute',
				]
			},
			{
				title: '工程化',
				collapsable: true,
				children: [
					'webpack',
					'engineering',
				]
			},
			{
				title: '工程化原理',
				collapsable: true,
				children: [
					'ast',
					'WebpackHMR',
					'webpackPlugin',
					'webpackPluginDesign',
					'webpackMoudle',
					'webpackLoader',
					'babelPlugin',
				]
			},
			{
				title: '安全',
				collapsable: true,
				children: [
					'security',
				]
			},
		]
	)
}

function renderFontEndSiderBar() {
	return (

		[
			['', "前言"],
			['html', "html"],
			['css', "css"],
			['JS-ch', "JavaScript"],
			['typescript', "TypeScript"],
			['regular', "正则"],
			['Network-zh', "网络"],
			['git-zh', "Git"],
			{
				title: '框架',
				collapsable: true,
				children: [
					['framework-zh', "通识"],
					['vue-zh', "vue"],
					['react-zh', "react"],
				]
			},
		]
	)
}