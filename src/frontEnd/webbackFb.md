<a target="_blank" href="https://zhuanlan.zhihu.com/p/66212922">原文地址</a>

前言
随着前端代码需要处理的业务越来越繁重，我们不得不面临的一个问题是前端的代码体积也变得越来越庞大。这造成无论是在调式还是在上线时都需要花长时间等待编译完成，并且用户也不得不花额外的时间和带宽下载更大体积的脚本文件。

然而仔细想想这完全是可以避免的：在开发时难道一行代码的修改也要重新打包整个脚本？用户只是粗略浏览页面也需要将整个站点的脚本全部下载下来？所以趋势必然是按需的、有策略性的将代码拆分和提供给用户。最近流行的微前端某种意义上来说也是遵循了这样的原则（但也并不是完全基于这样的原因）

幸运的是，我们目前已有的工具已经完全赋予我们实现以上需求的能力。例如 Webpack 允许我们在打包时将脚本分块；利用浏览器缓存我们能够有的放矢的加载资源。

在探寻最佳实践的过程中，最让我疑惑的不是我们能不能做，而是我们应该如何做：我们因该采取什么样的特征拆分脚本？我们应该使用什么样的缓存策略？使用懒加载和分块是否有异曲同工之妙？拆分之后究竟能带来多大的性能提升？最重要的是，在面多诸多的方案和工具以及不确定的因素时，我们应该如何开始？这篇文章就是对以上问题的梳理和回答。文章的内容大体分为两个方面，一方面在思路制定模块分离的策略，另一方面从技术上对方案进行落地。

本文的主要内容翻译自 The 100% correct way to split your chunks with Webpack。 这篇文章循序渐进的引导开发者步步为营的对代码进行拆分优化，所以它是作为本文的线索存在。同时在它的基础上，我会对 Webpack 及其他的知识点做纵向扩展，对方案进行落地。

以下开始正文

根据 Webpack 术语表，存在两类文件的分离。这些名词听起来是可以互换的，但实际上不行：

打包分离 (Bundle splitting)：为了更好的缓存创建更多、更小的文件（但仍然以每一个文件一个请求的方式进行加载）
代码分离 (Code splitting)：动态加载代码，所以用户只需要下载当前他正在浏览站点的这部分代码
第二种策略听起来更吸引人是不是？事实上许多的文章也假定认为这才是唯一值得将 JavaScript 文件进行小文件拆分的场景。

但是我在这里告诉你第一种策略对许多的站点来说才更有价值，并且应该是你首先为页面做的事

让我们来深入理解

Bundle VS Chunk VS Module
在正式开始编码之前，我们还是要明确一些概念。例如我们贯穿全文的“块”(chunk) ，以及它和我们常常提到的“包”(bundle)以及“模块”(module) 到底有什么区别。

遗憾的事情是即使在查阅了很多资料之后，我仍然没法得到一个确切的标准答案，所以这里我选择我个人比较认可的定义在这里做一个分享，重要的还是希望能起到统一口径的作用

首先对于“模块”(module)的概念相信大家都没有异议，它指的就是我们在编码过程中有意识的封装和组织起来的代码片段。狭义上我们首先联想到的是碎片化的 React 组件，或者是 CommonJS 模块又或者是 ES6 模块，但是对 Webpack 和 Loader 而言，广义上的模块还包括样式和图片，甚至说是不同类型的文件

而“包”(bundle) 就是把相关代码都打包进入的单个文件。如果你不想把所有的代码都放入一个包中，你可以把它们划分为多个包，也就是“块”(chunk) 中。从这个角度上看，“块”等于“包”，它们都是对代码再一层的组织和封装。如果必须要给一个区分的话，通常我们在讨论时，bundle 指的是所有模块都打包进入的单个文件，而 chunk 指的是按照某种规则的模块集合，chunk 的体积大于单个模块，同时小于整个 bundle

（但如果要仔细的深究，Chunk是 Webpack 用于管理打包流程中的技术术语，甚至能划分为不同类型的 chunk。我想我们不用从这个角度理解。只需要记住上一段的定义即可）

打包分离 (Bundle splitting)
打包分离背后的思想非常简单。如果你有一个体积巨大的文件，并且只改了一行代码，用户仍然需要重新下载整个文件。但是如果你把它分为了两个文件，那么用户只需要下载那个被修改的文件，而浏览器则可以从缓存中加载另一个文件。

值得注意的是因为打包分离与缓存相关，所以对站点的首次访问者来说没有区别

（我认为太多的性能讨论都是关于站点的首次访问。或许部分原因是因为第一映像很重要，另一部分因为这部分性能测量起来简单和讨巧）

当谈论到频繁访问者时，量化性能提升会稍有棘手，但是我们必须量化！

这将需要一张表格，我们将每一种场景与每一种策略的组合结果都记录下来

我们假设一个场景：

Alice 连续 10 周每周访问站点一次
我们每周更新站点一次
我们每周更新“产品列表”页面
我们也有一个“产品详情”页面，但是目前不需要对它进行更新
在第 5 周的时我们给站点新增了一个 npm 包
在第 8 周时我们更新了现有的一个 npm 包
当然包括我在内的部分人希望场景尽可能的逼真。但其实无关紧要，我们随后会解释为什么。

性能基线
假设我们的 JavaScript 打包后的总体积为 400KB, 将它命名为 main.js，然后以单文件的形式加载它

我们有一个类似如下的 Webpack 配置（我已经移除了无关的配置项）：

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
};
当只有单个入口时，Webpack 会自动把结果命名为main.js

（对那些刚接触缓知识的人我解释一下：每当我我提及main.js的时候，我实际上是在说类似于main.xMePWxHo.js这种包含一堆带有文件内容哈希字符串的东西。这意味着当你应用代码发生更改时新的文件名会生成，这样就能迫使浏览器下载新的文件）

所以当每周我向站点发布新的变更时，包的contenthash就会发生更改。以至于每周 Alice 访问我们站点时不得不下载一个全新的 400KB 大小的文件


连续十周也就是 4.12MB

我们能做的更好

哈希（hash）与性能
不知道你是否真的理解上面的表述。有几点需要在这里澄清：

为什么带哈希串的文件名会对浏览器缓存产生影响？
为什么文件名里的哈希后缀是contenthash？如果把contenthash替换成hash或者chunkhash有什么影响？
为了每次访问时不让浏览器都重新下载同一个文件，我们通常会把这个文件返回的 HTTP 头中的Cache-Control设置为max-age=31536000，也就是一年（秒数的）时间。这样以来，在一年之内用户访问这个文件时，都不会再次向服务器发送请求而是直接从缓存中读取，直到或者手动清除了缓存。

如果我中途修改了文件内容必须让用户重新下载怎么办？修改文件名就好了，不同的文件（名）对应不同的缓存策略。而一个哈希字符串就是根据文件内容产生的“签名”，每当文件内容发生更改时，哈希串也就发生了更改，文件名也就随之更改。这样一来，旧版本文件的缓存策略就会失效，浏览器就会重新加载新版本的该文件。当然这只是其中一种最基础的缓存策略，更复杂的场景请参考我之前的一篇文章：设计一个无懈可击的浏览器缓存方案：关于思路，细节，ServiceWorker，以及HTTP/2

所以在 Webpack 中配置的 filename: [name]:[contenthash].js 就是为了每次发布时自动生成新的文件名。

然而如果你对 Webpack 稍有了解的话，你应该知道 Webpack 还提供了另外两种哈希算法供开发者使用：hash和chunkhash。那么为什么不使用它们而是使用contenthash？这要从它们的区别说起。原则上来说，它们是为不同目的服务的，但在实际操作中，也可以交替使用。

为了便于说明，我们先准备以下这段非常简单的 Webpack 配置，它拥有两个打包入口，同时额外提取出 css 文件，最终生成三个文件。filename配置中我们使用的是hash标识符、在 MinCssExtractPlugin中我们使用的是contenthash，为什么会这样稍后会解释。

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    module_a: "./src/module_a.js",
    module_b: "./src/module_b.js"
  },
  output: {
    filename: "[name].[hash].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};
hash

hash针对的是每一次构建（build）而言，每一次构建之后生成的文件所带的哈希都是一致的。它关心的是整体项目的变化，只要有任意文件内容发生了更改，那么构建之后其他文件的哈希也会发生更改。

很显然这不是我们需要的，如果module_a文件内容发生了更改，module_a的打包文件的哈希应该发生变化，但是module_b不应该。这会导致用户不得不重新下载没有发生变化的module_b打包文件

chunkhash

chunkhash基于的是每一个 chunk 内容的改变，如果是该 chunk 所属的内容发生了变化，那么只有该 chunk 的输出文件的哈希会发生变化，其它的不会。这听上去符合我们的需求。

在之前我们对 chunk 进行过定义，即是小单位的代码聚合形式。在上面的例子中以entry入口体现，也就是说每一个入口对应的文件就是一个 chunk。在后面的例子中我们会看到更复杂的例子

contenthash
顾名思义，该哈希根据的是文件的内容。从这个角度上说，它和chunkhash是能够相互代替的。所以在“性能基线”代码中作者使用了contenthash

不过特殊之处是，或者说我读到的关于它的使用说明中，都指示如果你想在ExtractTextWebpackPlugin或者MiniCssExtractPlugin中用到哈希标识，你应该使用contenthash。但就我个人的测试而言，使用hash或者chunkhash也都没有问题（也许是因为 extract 插件是严格基于 content 的？但难道 chunk 不是吗？）

分离第三方类库（vendor）类库
让我们把打包文件划分为main.js和vendor.js

很简单，类似于：

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
在你没有告诉它你想如何拆分打包文件的情况下， Webpack 4 在尽它最大的努力把这件事做的最好

这就导致一些声音在说：“太惊人了，Webpack 做的真不错！”

而另一些声音在说：“你对我的打包文件做了什么！”

无论如何，添加optimization.splitChunks.chunks = 'all'配置也就是在说：“把所有node_modules里的东西都放到vendors~main.js的文件中去”

在实现基本的打包分离条件后，Alice 在每次访问时仍然需要下载 200KB 大小的 main.js 文件， 但是只需要在第一周、第五周、第八周下载 200KB 的 vendors.js脚本


也就是 2.64MB

体积减少了 36%。对于配置里新增的五行代码来说结果还不错。在继续阅读之前你可以立刻就去试试。如果你需要将 Webpack 3 升级到 4，也不要着急，升级不会带来痛苦（而且是免费的！）

分离每一个 npm 包
我们的 vendors.js 承受着和开始 main.js 文件同样的问题——部分的修改会意味着重新下载所有的文件

所以为什么不把每一个 npm 包都分割为单独的文件？做起来非常简单

让我们把我们的react，lodash，redux，moment等分离为不同的文件

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};
这份文档 非常好的解释了这里做的事情，但是我仍然需要解释一下其中精妙的部分，因为它们花了我相当长的时间才搞明白

Webpack 有一些不那么智能的默认“智能”配置，比如当分离打包输出文件时只允许最多3个文件，并且最小文件的尺寸是30KB（如果存在更小的文件就把它们拼接起来）。所以我把这些配置都覆盖了
cacheGroups是我们用来制定规则告诉 Webpack 应该如何组织 chunks 到打包输出文件的地方。我在这里对所有加载自node_modules里的 module 制定了一条名为 "vendor" 的规则。通常情况下，你只需要为你的输出文件的 name定义一个字符串。但是我把name定义为了一个函数（当文件被解析时会被调用）。在函数中我会根据 module 的路径返回包的名称。结果就是，对于每一个包我都会得到一个单独的文件，比如npm.react-dom.899sadfhj4.js
为了能够正常发布npm 包的名称必须是合法的URL，所以我们不需要encodeURI对包的名词进行转义处理。但是我遇到一个问题是.NET服务器不会给名称中包含@的文件提供文件服务，所以我在代码片段中进行了替换
整个步骤的配置设置之后就不需要维护了——我们不需要使用名称引用任何的类库
Alice 每周都要重新下载 200KB 的 main.js 文件，并且再她首次访问时仍然需要下载 200KB 的 npm 包文件，但是她再也不用重复的下载同一个包两次


也就是2.24MB

相对于基线减少了 44%，这是一段你能够从文章里粘贴复制的非常酷的代码。

我好奇我们能超越 50%？

那不是很棒吗

稍等，那段 Webpack 配置代码究竟是怎么回事
此时你的疑惑可能是，optimization 选项里的配置怎么就把 vendor 代码分离出来了？

接下来的这一小节会针对 Webpack 的 Optimization 选项做讲解。我个人并非 Webpack 的专家，配置和对应的描述功能也并非一一经过验证，也并非全部都覆盖到，如果有纰漏的地方还请大家谅解。

optimization配置如其名所示，是为优化代码而生。如果你再仔细观察，大部分配置又在splitChunk字段下，因为它间接使用 SplitChunkPlugin 实现对块的拆分功能（这些都是在 Webpack 4 中引入的新的机制。在 Webpack 3 中使用的是 CommonsChunkPlugin，在 4 中已经不再使用了。所以这里我们也主要关注的是 SplitChunkPlugin 的配置）从整体上看，SplitChunksPlugin 的功能只有一个，就是split——把代码分离出来。分离是相对于把所有模块都打包成一个文件而言，把单个大文件分离为多个小文件。

在最初分离 vendor 代码时，我们只使用了一个配置

splitChunks: {
  chunks: 'all',
},
chunks有三个选项：initial、async和all。它指示应该优先分离同步（initial）、异步（async）还是所有的代码模块。这里的异步指的是通过动态加载方式（import()）加载的模块。

这里的重点是优先二字。以async为例，假如你有两个模块 a 和 b，两者都引用了 jQuery，但是 a 模块还通过动态加载的方式引入了 lodash。那么在 async 模式下，插件在打包时会分离出lodash~for~a.js的 chunk 模块，而 a 和 b 的公共模块 jQuery 并不会被（优化）分离出来，所以它可能还同时存在于打包后的a.bundle.js和b.bundle.js文件中。因为async告诉插件优先考虑的是动态加载的模块

接下来聚焦第二段分离每个 npm 包的 Webpack 配置中

maxInitialRequests和minSize确实就是插件自作多情的杰作了。插件自带一些分离 chunk 的规则：如果即将分离的 chunk 文件体积小于 30KB 的话，那么就不会将该 chunk 分离出来；并且限制并行下载的 chunk 最大请求个数为 3 个。通过覆盖 minSize 和 maxInitialRequests 配置就能够重写这两个参数。注意这里的maxInitialRequests和minSize是在splitChunks根目录中的，我们暂且称它为全局配置

cacheGroups配置才是最重要，它允许自定义规则分离 chunk。并且每条cacheGroups规则下都允许定义上面提到的chunks和minSize字段用于覆盖全局配置（又或者将cacheGroups规则中enforce参数设为true来忽略全局配置）

cacheGroups里默认自带vendors配置来分离node_modules里的类库模块，它的默认配置如下：

cacheGroups: {
  vendors: {
    test: /[\\/]node_modules[\\/]/,
    priority: -10
  },
如果你不想使用它的配置，你可以把它设为false又或者重写它。这里我选择重写，并且加入了额外的配置name和enforce:

vendors: {
  test: /[\\/]node_modules[\\/]/,
  name: 'vendors',
  enforce: true,
},
最后介绍以上并没有出现但是仍然常用的两个配置：priority和reuseExistingChunk

reuseExistingChunk: 该选项只会出现在cacheGroups的分离规则中，意味重复利用现有的 chunk。例如 chunk 1 拥有模块 A、B、C；chunk 2 拥有模块 B、C。如果 reuseExistingChunk 为 false 的情况下，在打包时插件会为我们单独创建一个 chunk 名为 common~for~1~2，它包含公共模块 B 和 C。而如果该值为true的话，因为 chunk 2 中已经拥有公共模块 B 和 C，所以插件就不会再为我们创建新的模块
priority: 很容易想象到我们会在cacheGroups中配置多个 chunk 分离规则。如果同一个模块同时匹配多个规则怎么办，priority解决的这个问题。注意所有默认配置的priority都为负数，所以自定义的priority必须大于等于0才行
小结
截至目前为止，我们已经看出了一套分离代码的模式：

首先决定我们想要解决什么样的问题（避免用户在每次访问时下载额外的代码）；
再决定使用什么样的方案（通过将修改频率低、重复的代码分离出来，并配上恰当的缓存策略）；

把应用代码进行分离
现在让我们把目光转向 Alice 一遍又一遍下载的 main.js 文件

我之前提到过我们的站点里又两个完全不同的部分：一个产品列表页面和一个详情页面。每个页面独立的代码提及大概是 25KB（共享 150KB 的代码）

我们的“产品详情”页面目前不会进行更改，因为它非常的完美。所以如果我们把它划分为独立文件，大部分时候它都能够从缓存中进行加载

你知道我们还有一个用于渲染 icon 用的 25KB 的几乎不发生修改的 SVG 文件吗？我们应该对它做些什么

我们手动的增加一些 entry 入口，告诉 Webpack 给它们都创建独立的文件：

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    ProductList: path.resolve(__dirname, 'src/ProductList/ProductList.js'),
    ProductPage: path.resolve(__dirname, 'src/ProductPage/ProductPage.js'),
    Icon: path.resolve(__dirname, 'src/Icon/Icon.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};
并且 Webpack 自动为它们之间的共享代码也创建了独立的文件，也就是说ProductList和ProductPage不会拥有重复的代码

这回 Alice 在大多数周里都会节省下 50KB 的下载量


只有 1.815MB 了

我们已经为 Alice 节省了 56% 的下载量，并且会持续下去（在我们的理论场景中）

所有这些都是通过修改 Webapck 配置实现的——我们还没有修改任何一行应用程序的代码。

我之前提到测试之下是什么样具体的场景并不重要。因为无论你遇见的是什么场景，结论始终是一致的：把你的代码划分为更多更有意义的小文件，用户需要下载的代码也就越少

很快我们就将谈到“代码分离”——另一种分割文件的方式——但是首先我想首先解决你现在正在考虑的问题

网络请求变多的时候是不是会变得更慢？
答案非常明确是否定的

在 HTTP/1.1 的情况下确实会如此，但是在 HTTP/2 中不会

尽管如此，这篇来自 2016 年的文章和来自于Khan Academy 2015 年的文章都得出结论说即使有 HTTP/2 下载太多文件的话仍然会导致变慢。但是在这两篇文章里“太多”意味着上百个文件。所以只要记住如果你有上百个文件，你或许达到了并行的上限

如果你在好奇如何在 Windows 10 的 IE11 上支持 HTTP/2。我对那些还在使用古董机器的人做了调查，他们出奇一致的让我放心他们根本不关心网站的加载速度

每一个 webpack 打包后的文件里会不会有多余的模板代码？
有的

但什么是“模板代码”？

想象一下如果整个项目只有文件app.js，那么最终的输出的打包文件也只是app.js的文件内容而已。

但是如果app.js文件内容是空的话（一行代码都没有），那么最终的打包文件也是空的吗？

不是，Webpack 为了实现编译之后的模块化，它会将你的代码进行一次封装，这些用于封装的代码会占用一部分体积，是每个模块都必须存在的，所以成为模板代码

如果我有多个小文件的话是不是压缩的效果就减弱了
是的

事实确实是：

多文件 = 多 Webpack 模板代码
多文件 = 压缩减小
让我们把其中的损耗的都明确下来

我刚刚做了一个测试，一个 190 KB 的站点文件被划分为了19个文件，发送给浏览器的字节数大概多了 2%

所以……首次访问的文件提及增加了 2% 但是直到世界末日其他的每次访问文件体积都减小了 60%

所以损耗的正确数字是：一点都不。

当我在测试 1 个文件对比 19 个文件情况时，我想我应该赋予测试一些不同的网络环境，包括 HTTP/1.1

下面这张表格给予了“文件越多越好”的有力支持


在 3G 和 4G 的情况下当有19个文件时加载时间减少了 30%

但真的是这样吗？

这份数据看上去“噪点”很多，举个例子，在 4G 场景下第二次运行时，网站加载花费了 646ms，但是之后的第二轮运行则花费了 1116ms——时间增加了73% 。所以宣称 HTTP/2 快了 30% 有一些心虚

我创建这张表格是为了试图量化 HTTP/2 究竟能带来多大的差异，但是我唯一能说的是“并没有太大的区别”

真正令人惊喜的是最后两行，旧版本的 Windows 和 HTTP/1.1 我本以为会慢非常多。我猜我需要更慢的网络环境用于进行验证

故事时间！我从微软网站下载了一个 Windows 7 的虚拟机来测试这些东西

我想把默认的 IE8 升级至 IE9

所以我前往微软下载 IE9 的页面然后发现：


最后提一句 HTTP/2，你知道它已经集成进 Node 中了吗？如果你想尝试，我用100行写了一段 HTTP/2 服务，能够为你的测试带来缓存上的帮助

以上就是我想说的关于打包分离的一切。我想这个实践唯一的坏处是需要说服人们加载如此多的小文件是没有问题的

代码分离（不必加载你不需要的代码）
这个特殊的实践只对某些站点有效

我乐意重申一下我发明的 20/20 理论：如果站点的某些部分只有 20% 用户会访问，并且这部分的脚本量大于你整个站点的 20% 的话，你就应该考虑按需加载代码了

你可以对数值进行调整来适配更复杂的场景。重点是保持平衡，需要决策将对站点无意义的代码分离出来

如何决策
假设你有拥有一个购物网站，你在纠结是否应该把“结账”功能的代码分离出来，因为只有 30% 的用户会走到那一步

首先是要让卖的更好

其次计算出“结账”功能的独立代码有多少。因为在做“代码分离”之前你常常做“打包文件分离”，你或许已经知道了这部分代码量有多少

（它可能比你想象的还要小，所以计算之后你可能获得惊喜。如果你有一个 React 站点，你的 store，reducer，routing，actions 可能会被整个网站共享，独立的部分可能大部分是组件和帮助类库）

假设你注意到结算页面独立代码一共只有 7KB，其他部分的代码 300KB。看到这种情况我会建议不把这些代码分开，有以下几个原因

它并不会让加载变得更慢。记得你之前并行的加载这些文件，你可以试着记录加载 300KB 和 307KB 的文件是否有变化
如果你延迟加载这部分代码，用户在点击“付款”之后仍然需要等待文件的加载——你并不希望在这关键时刻给用户带来任何的阻力
代码分离会导致程序代码的更改，这需要将之前同步逻辑的地方改为异步逻辑。这并不复杂，但是对于改善用户体验这件事的性价比来说还是过于复杂了
这些就是我说的“这项令人振奋的技术或许不适合你”

让我们看看两个代码分离的例子

回滚方案（Polyfills）
我们从这个例子开始是因为它适用于大多数站点，并且是一个非常好的入门

我给我的站点使用了一堆酷炫的功，所以我使用了一个文件导入了我需要的所有回滚方案。它只需要八行代码：

require('whatwg-fetch');
require('intl');
require('url-polyfill');
require('core-js/web/dom-collections');
require('core-js/es6/map');
require('core-js/es6/string');
require('core-js/es6/array');
require('core-js/es6/object');
我在我的入口文件index.js顶部引入了这个文件

import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render(); // yes I am pointless, for now
在 Webpack 配置关于打包分离的小节配置中，我的回滚代码会自动被分为四个不同的文件因为有四个 npm 包。它们一共大小 25KB 左右，并且 90% 的浏览器都不需要它们，所以它们值得动态的进行加载。

在 Webpack 4 以及 import() 语法（不要和import语法混淆了）的支持下，有条件的加载回滚代码变得非常简单了

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (
  'fetch' in window &&
  'Intl' in window &&
  'URL' in window &&
  'Map' in window &&
  'forEach' in NodeList.prototype &&
  'startsWith' in String.prototype &&
  'endsWith' in String.prototype &&
  'includes' in String.prototype &&
  'includes' in Array.prototype &&
  'assign' in Object &&
  'entries' in Object &&
  'keys' in Object
) {
  render();
} else {
  import('./polyfills').then(render);
}
现在是不是更有意义了？如果浏览器支持所有的新特性，那么渲染页面。否则加载回滚代码渲染页面。当代码在运行在浏览器中时，Webpack 的运行时会负责这四个包的加载，并且当它们被下载并且解析完毕时，render()函数才会被调用，并且其它工作继续运行

（顺便说一声，如果需要使用import()的话，你需要 Babel 的 dynamic-import 插件 。并且如 Webpack 文档解释的，import()使用 Promises，所以你需要把这部分的回滚代码独立出来）

非常简单不是吗？

有一些更棘手的场景

基于路由的动态加载（针对 React）
回到 Alice 的例子，假设网站现在多了一个“管理”页面，产品的卖家可以登陆并且管理他们售卖的产品

这个页面有很多有用的功能，很多的图表，需要安装一个来自 npm 的表单类库。因为我已经实现了打包代码分离，目测至少已经节省了100KB 的大小文件

现在我设置了一份当用户访问呢/admin时渲染AdminPage的路由。当 Webpack 把一切都打包完毕之后，它会去查找import AdminPage from './AdminPage.js'，并且说“嘿，我需要把它包含到初始化的加载文件中”

但是我们不想这么做，我们希望在动态加载中加载管理页面，比如import('./AdminPage.js')，这样 Webpack 就知道需要动态加载它。

非常酷，不需要任何的配置

与直接引用AdminPage不同，当用户访问/admin时我使用另外一个组件用于实现如下功能：

核心思想非常简单，当组件加载时（也就意味着用户访问/admin时），我们动态的加载./AdminPage.js然后在组件 state 中保存对它的引用

在渲染函数中，在等待AdminPage加载的过程中我们简单的渲染出<div>Loading...</div>，一旦加载成功则渲染出AdminPage

为了好玩我想自己实现它，但是在真实的世界里你只需要像React 关于代码分离的文档描述的那样使用 react-loadable即可

以上就是所有内容了。以上我说的每一个观点，还能说的更精简吗？

如果人们会不止一次的访问你的站点，把你的代码划分为不同的小文件
如果你的站点有很大一部分用户不会访问到，动态的加载它们
谢谢阅读，祝你有愉快的一天

完蛋了我忘记提 CSS 了

关于开发体验
以上我们都是在针对 production 对代码进行分割。但事实上我们在开发过程中也会面临同样的问题：当代码量增多时，打包的时间也在不断增长。但是例如 node_modules 里的代码千年不变，完全不需要被重新编译。这部分我们也可以通过代码分离的思想对代码进行分离。比如 DLL 技术

通常我们说的 DLL 指的是 Windows 系统的下的动态链接库文件，它的本意是将公共函数库提取出来给大家公用以减少程序体积。我们的 DLL 也是借助了这种思想，将公共代码分离出来。

使用 DLL 简单来说分为两步：

输出 DLL 文件
我们将我们需要分离的文件到打包为 DLL 文件，以分离 node_modules 类库为例，关键配置如下。注意这段配置仅仅是用于分离 dll 文件，并非打包应用脚本

module.exports = {
   entry: {
      library: [
         'react',
         'redux',
         'jquery',
         'd3',
         'highcharts',
         'bootstrap',
         'angular'
      ]
   },
   output: {
      filename: '[name].dll.js',
      path: path.resolve(__dirname, './build/library'),
      library: '[name]'
   }，
   plugins: [
    new webpack.DllPlugin({
        name: '[name]',
        path: './build/library/[name].json'
    })
  ]
};
关键在于使用 DLLPlugin 输出的 json 文件，用于告诉 webpack 从哪找到预编译的类库代码

引入 DLL 文件
在正式打包应用脚本的 Webpack 配置中引入 DLL 即可：

plugins: [
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./build/library/library.json')
  })
]
不过美中不足的是，你仍然需要在你最终的页面里引入 dll 文件

如果你的觉得手动配置 dll 仍然觉得繁琐，那么可以尝试使用 AutoDllPlugin

