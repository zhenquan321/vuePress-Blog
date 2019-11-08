# HTTP协议



---

## HTTP有哪些方法？

* HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法
* HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT

## 这些方法的具体作用是什么？

* GET: 通常用于请求服务器发送某些资源
* HEAD: 请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源
* OPTIONS: 用于获取目的资源所支持的通信选项
* POST: 发送数据给服务器
* PUT: 用于新增资源或者使用请求中的有效负载替换目标资源的表现形式
* DELETE: 用于删除指定的资源
* PATCH: 用于对资源进行部分修改
* CONNECT: HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
* TRACE: 回显服务器收到的请求，主要用于测试或诊断

## GET和POST有什么区别？

* 数据传输方式不同：GET请求通过URL传输数据，而POST的数据通过请求体传输。
* 安全性不同：POST的数据因为在请求主体内，所以有一定的安全性保证，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息。
* 数据类型不同：GET只允许 ASCII 字符，而POST无限制
* GET无害： 刷新、后退等浏览器操作GET请求是无害的，POST可能重复提交表单
* 特性不同：GET是安全（这里的安全是指只读特性，就是使用这个方法不会引起服务器状态变化）且幂等（幂等的概念是指同一个请求方法执行多次和仅执行一次的效果完全相同），而POST是非安全非幂等

## PUT和POST都是给服务器发送新增资源，有什么区别？

PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。

除此之外还有一个区别，通常情况下，PUT的URI指向是具体单一资源，而POST可以指向资源集合。

举个例子，我们在开发一个博客系统，当我们要创建一篇文章的时候往往用`POST https://www.jianshu.com/articles`，这个请求的语义是，在articles的资源集合下创建一篇新的文章，如果我们多次提交这个请求会创建多个文章，这是非幂等的。

而`PUT https://www.jianshu.com/articles/820357430`的语义是更新对应文章下的资源（比如修改作者名称等），这个URI指向的就是单一资源，而且是幂等的，比如你把『刘德华』修改成『蔡徐坤』，提交多少次都是修改成『蔡徐坤』

> ps: 『POST表示创建资源，PUT表示更新资源』这种说法是错误的，两个都能创建资源，根本区别就在于幂等性

## PUT和PATCH都是给服务器发送修改资源，有什么区别？

PUT和PATCH都是更新资源，而PATCH用来对已知资源进行局部更新。

比如我们有一篇文章的地址`https://www.jianshu.com/articles/820357430`,这篇文章的可以表示为:

```js
article = {
    author: 'dxy',
    creationDate: '2019-6-12',
    content: '我写文章像蔡徐坤',
    id: 820357430
}
```

当我们要修改文章的作者时，我们可以直接发送`PUT https://www.jianshu.com/articles/820357430`，这个时候的数据应该是:

```js
{
    author:'蔡徐坤',
    creationDate: '2019-6-12',
    content: '我写文章像蔡徐坤',
    id: 820357430
}
```

这种直接覆盖资源的修改方式应该用put，但是你觉得每次都带有这么多无用的信息，那么可以发送`PATCH https://www.jianshu.com/articles/820357430`，这个时候只需要:

```js
{
    author:'蔡徐坤',
}
```

## http的请求报文是什么样的？

请求报文有4部分组成:

* 请求行
* 请求头部
* 空行
* 请求体

![2019-06-14-11-24-10]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/6bb3600c998901243aa7b3934e5c7ffc.png)

* 请求行包括：请求方法字段、URL字段、HTTP协议版本字段。它们用空格分隔。例如，GET /index.html HTTP/1.1。
* 请求头部:请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔

1. User-Agent：产生请求的浏览器类型。
2. Accept：客户端可识别的内容类型列表。
3. Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。

* 请求体: post put等请求携带的数据

![2019-06-14-11-33-37]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/f74d9c7bbeb932e276450f52874da21a.png)

## http的响应报文是什么样的？

请求报文有4部分组成:

* 响应行
* 响应头
* 空行
* 响应体

![2019-06-14-11-37-02]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/1b6f58868e31fb23d0688b8ca0ca619f.png)

* 响应行： 由协议版本，状态码和状态码的原因短语组成，例如`HTTP/1.1 200 OK`。
* 响应头：响应部首组成
* 响应体：服务器响应的数据

## 聊一聊HTTP的部首有哪些？

> 内容很多，重点看标『✨』内容

通用首部字段（General Header Fields）：请求报文和响应报文两方都会使用的首部

* Cache-Control  控制缓存 ✨
* Connection 连接管理、逐条首部 ✨
* Upgrade  升级为其他协议
* via 代理服务器的相关信息
* Wraning 错误和警告通知
* Transfor-Encoding 报文主体的传输编码格式 ✨
* Trailer 报文末端的首部一览
* Pragma 报文指令
* Date 创建报文的日期

请求首部字段（Reauest Header Fields）:客户端向服务器发送请求的报文时使用的首部

* Accept 客户端或者代理能够处理的媒体类型 ✨
* Accept-Encoding 优先可处理的编码格式
* Accept-Language 优先可处理的自然语言
* Accept-Charset 优先可以处理的字符集
* If-Match 比较实体标记（ETage） ✨
* If-None-Match 比较实体标记（ETage）与 If-Match相反 ✨
* If-Modified-Since 比较资源更新时间（Last-Modified）✨
* If-Unmodified-Since比较资源更新时间（Last-Modified），与 If-Modified-Since相反 ✨
* If-Rnages 资源未更新时发送实体byte的范围请求
* Range 实体的字节范围请求 ✨
* Authorization web的认证信息 ✨
* Proxy-Authorization 代理服务器要求web认证信息
* Host 请求资源所在服务器 ✨
* From 用户的邮箱地址
* User-Agent 客户端程序信息 ✨
* Max-Forwrads 最大的逐跳次数
* TE 传输编码的优先级
* Referer 请求原始放的url
* Expect 期待服务器的特定行为

响应首部字段（Response Header Fields）:从服务器向客户端响应时使用的字段

* Accept-Ranges 能接受的字节范围
* Age 推算资源创建经过时间
* Location 令客户端重定向的URI ✨
* vary  代理服务器的缓存信息
* ETag 能够表示资源唯一资源的字符串 ✨
* WWW-Authenticate 服务器要求客户端的验证信息
* Proxy-Authenticate 代理服务器要求客户端的验证信息
* Server 服务器的信息 ✨
* Retry-After 和状态码503 一起使用的首部字段，表示下次请求服务器的时间

实体首部字段（Entiy Header Fields）:针对请求报文和响应报文的实体部分使用首部

* Allow 资源可支持http请求的方法 ✨
* Content-Language 实体的资源语言
* Content-Encoding 实体的编码格式
* Content-Length 实体的大小（字节）
* Content-Type 实体媒体类型
* Content-MD5 实体报文的摘要
* Content-Location 代替资源的yri
* Content-Rnages 实体主体的位置返回
* Last-Modified 资源最后的修改资源 ✨
* Expires 实体主体的过期资源 ✨

## 聊一聊HTTP的状态码有哪些？

2XX 成功

* 200 OK，表示从客户端发来的请求在服务器端被正确处理 ✨
* 201 Created 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立
* 202 Accepted 请求已接受，但是还没执行，不保证完成请求
* 204 No content，表示请求成功，但响应报文不含实体的主体部分
* 206 Partial Content，进行范围请求 ✨

3XX 重定向

* 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
* 302 found，临时性重定向，表示资源临时被分配了新的 URL ✨
* 303 see other，表示资源存在着另一个 URL，应使用 GET 方法丁香获取资源
* 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
* 307 temporary redirect，临时重定向，和302含义相同

4XX 客户端错误

* 400 bad request，请求报文存在语法错误 ✨
* 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息 ✨
* 403 forbidden，表示对请求资源的访问被服务器拒绝 ✨
* 404 not found，表示在服务器上没有找到请求的资源 ✨
* 408 Request timeout, 客户端请求超时
* 409 Confict, 请求的资源可能引起冲突

5XX 服务器错误

* 500 internal sever error，表示服务器端在执行请求时发生了错误 ✨
* 501 Not Implemented 请求超出服务器能力范围，例如服务器不支持当前请求所需要的某个功能，或者请求是服务器不支持的某个方法
* 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求
* 505 http version not supported 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本

## 同样是重定向307，303，302的区别？

302是http1.0的协议状态码，在http1.1版本的时候为了细化302状态码又出来了两个303和307。

303明确表示客户端应当采用get方法获取资源，他会把POST请求变为GET请求进行重定向。
307会遵照浏览器标准，不会从post变为get。

## HTTP的keep-alive是干什么的？

在早期的HTTP/1.0中，每次http请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就需要重用连接。在后来的HTTP/1.0中以及HTTP/1.1中，引入了重用连接的机制，就是在http请求头中加入Connection: keep-alive来告诉对方这个请求响应完成后不要关闭，下一次咱们还用这个请求继续交流。协议规定HTTP/1.0如果想要保持长连接，需要在请求头中加上Connection: keep-alive。

keep-alive的优点：

* 较少的CPU和内存的使用（由于同时打开的连接的减少了）
* 允许请求和应答的HTTP管线化
* 降低拥塞控制 （TCP连接减少了）
* 减少了后续请求的延迟（无需再进行握手）
* 报告错误无需关闭TCP连

## 为什么有了HTTP为什么还要HTTPS？

https是安全版的http，因为http协议的数据都是明文进行传输的，所以对于一些敏感信息的传输就很不安全，HTTPS就是为了解决HTTP的不安全而生的。

## HTTPS是如何保证安全的？

过程比较复杂，我们得先理解两个概念

对称加密：即通信的双方都使用同一个秘钥进行加解密，比如特务接头的暗号，就属于对称加密

对称加密虽然很简单性能也好，但是无法解决首次把秘钥发给对方的问题，很容易被黑客拦截秘钥。

非对称加密：

1. 私钥 + 公钥= 密钥对
2. 即用私钥加密的数据,只有对应的公钥才能解密,用公钥加密的数据,只有对应的私钥才能解密
3. 因为通信双方的手里都有一套自己的密钥对,通信之前双方会先把自己的公钥都先发给对方
4. 然后对方再拿着这个公钥来加密数据响应给对方,等到到了对方那里,对方再用自己的私钥进行解密

非对称加密虽然安全性更高，但是带来的问题就是速度很慢，影响性能。

解决方案：

那么结合两种加密方式，将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

此时又带来一个问题，中间人问题：

如果此时在客户端和服务器之间存在一个中间人,这个中间人只需要把原本双方通信互发的公钥,换成自己的公钥,这样中间人就可以轻松解密通信双方所发送的所有数据。

所以这个时候需要一个安全的第三方颁发证书（CA），证明身份的身份，防止被中间人攻击。

证书中包括：签发者、证书用途、使用者公钥、使用者私钥、使用者的HASH算法、证书到期时间等

![2019-06-14-12-30-18]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/66bc3fc4f003205c419dd6ada8ae8392.png)

但是问题来了，如果中间人篡改了证书，那么身份证明是不是就无效了？这个证明就白买了，这个时候需要一个新的技术，数字签名。

数字签名就是用CA自带的HASH算法对证书的内容进行HASH得到一个摘要，再用CA的私钥加密，最终组成数字签名。

当别人把他的证书发过来的时候,我再用同样的Hash算法,再次生成消息摘要，然后用CA的公钥对数字签名解密,得到CA创建的消息摘要,两者一比,就知道中间有没有被人篡改了。

这个时候就能最大程度保证通信的安全了。

## HTTP2相对于HTTP1.x有什么优势和特点？

### 二进制分帧

帧：HTTP/2 数据通信的最小单位消息：指 HTTP/2 中逻辑上的 HTTP 消息。例如请求和响应等，消息由一个或多个帧组成。

流：存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数ID

HTTP/2 采用二进制格式传输数据，而非 HTTP 1.x 的文本格式，二进制协议解析起来更高效。

### 头部压缩

HTTP/1.x会在请求和响应中中重复地携带不常改变的、冗长的头部数据，给网络带来额外的负担。

* HTTP/2在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送
* 首部表在HTTP/2的连接存续期内始终存在，由客户端和服务器共同渐进地更新;
* 每个新的首部键－值对要么被追加到当前表的末尾，要么替换表中之前的值。

> 你可以理解为只发送差异数据，而不是全部发送，从而减少头部的信息量

![2019-06-14-12-52-59]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/33caf22f81643e1ec11f0f46b50e2155.png)

### 服务器推送

服务端可以在发送页面HTML时主动推送其它资源，而不用等到浏览器解析到相应位置，发起请求再响应。例如服务端可以主动把JS和CSS文件推送给客户端，而不需要客户端解析HTML时再发送这些请求。

服务端可以主动推送，客户端也有权利选择是否接收。如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送RST_STREAM帧来拒收。主动推送也遵守同源策略，服务器不会随便推送第三方资源给客户端。

### 多路复用

HTTP 1.x 中，如果想并发多个请求，必须使用多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8个的TCP链接请求限制。

HTTP2中：

* 同域名下所有通信都在单个连接上完成。
* 单个连接可以承载任意数量的双向数据流。
* 数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装

![2019-06-14-12-58-50]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/823eb09ae4446ba7dc9c06f4e39372e8.png)

> 拓展阅读：[HTTP/2特性及其在实际应用中的表现](https://zhuanlan.zhihu.com/p/30166894)

## HTTP的缓存的过程是怎样的？

通常情况下的步骤是:

1. 客户端向服务器发出请求，请求资源
2. 服务器返回资源，并通过响应头决定缓存策略
3. 客户端根据响应头的策略决定是否缓存资源（这里假设是），并将响应头与资源缓存下来
4. 在客户端再次请求且命中资源的时候，此时客户端去检查上次缓存的缓存策略，根据策略的不同、是否过期等判断是直接读取本地缓存还是与服务器协商缓存

![2019-06-14-19-56-32]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/0718a83e37b6ab7d8da67ada5c36834b.png)

## 什么时候会触发强缓存或者协商缓存？

### 强缓存

强缓存离不开两个响应头`Expires`与`Cache-Control`

* Expires：Expires是http1.0提出的一个表示资源过期时间的header，它描述的是一个绝对时间，由服务器返回，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效

`Expires: Wed, 11 May 2018 07:20:00 GMT`

* Cache-Control: Cache-Control 出现于 HTTP / 1.1，优先级高于 Expires ,表示的是相对时间

`Cache-Control: max-age=315360000`

目前主流的做法使用`Cache-Control`控制缓存，除了`max-age`控制过期时间外，还有一些不得不提

* Cache-Control: public可以被所有用户缓存，包括终端和CDN等中间代理服务器
* Cache-Control: private只能被终端浏览器缓存，不允许中继缓存服务器进行缓存
* Cache-Control: no-cache,先缓存本地，但是在命中缓存之后必须与服务器验证缓存的新鲜度才能使用
* Cache-Control: no-store，不会产生任何缓存

![2019-06-15-00-08-57]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/b6dfe07b73d4fd62d167e6024d6fa2e1.png)

在缓存有效期内命中缓存，浏览器会直接读取本地的缓存资源，当缓存过期之后会与服务器进行协商。

### 协商缓存

当第一次请求时服务器返回的响应头中没有Cache-Control和Expires或者Cache-Control和Expires过期抑或它的属性设置为no-cache时，那么浏览器第二次请求时就会与服务器进行协商。

如果缓存和服务端资源的最新版本是一致的，那么就无需再次下载该资源，服务端直接返回304 Not Modified 状态码，如果服务器发现浏览器中的缓存已经是旧版本了，那么服务器就会把最新资源的完整内容返回给浏览器，状态码就是200 Ok。

服务器判断缓存是否是新鲜的方法就是依靠HTTP的另外两组信息

#### Last-Modified/If-Modified-Since

客户端首次请求资源时，服务器会把资源的最新修改时间`Last-Modified:Thu, 19 Feb 2019 08:20:55 GMT`通过响应部首发送给客户端，当再次发送请求是，客户端将服务器返回的修改时间放在请求头`If-Modified-Since:Thu, 19 Feb 2019 08:20:55 GMT`发送给服务器，服务器再跟服务器上的对应资源进行比对，如果服务器的资源更新，那么返回最新的资源，此时状态码200，当服务器资源跟客户端的请求的部首时间一致，证明客户端的资源是最新的，返回304状态码，表示客户端直接用缓存即可。

#### ETag/If-None-Match

ETag的流程跟Last-Modified是类似的，区别就在于ETag是根据资源内容进行hash，生成一个信息摘要，只要资源内容有变化，这个摘要就会发生巨变，通过这个摘要信息比对，即可确定客户端的缓存资源是否为最新，这比Last-Modified的精确度要更高。

> 响应头

![2019-06-15-00-51-13]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/be24a51fb3b4c5052cd4b26010d2789f.png)

因此整体的缓存流程图如下：

![缓存](https://user-images.githubusercontent.com/25027560/38223505-d8ab53da-371d-11e8-9263-79814b6971a5.png)

> 图片来源于[博客](https://github.com/amandakelake/blog/issues/41)

---

TODO：

http的整个流程，涉及tcp/ip协议

---
参考：

* 图解HTTP
* HTTP权威指南
* [HTTP缓存策略](https://foofish.net/http-cache-policy.html)

---

