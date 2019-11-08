1. dom react原理 
2. css布局 
3. js原型链继承
4. fetch取消

在项目开发中会遇到用户在一个页面中多次点击之后，再点击下一个页面。但是会遇到上一个页面的接口请求还在pending当中，第二个页面的接口请求会排队等待。这样就会非常影响用户的体验，所以要做到离开一个页面的同时也中止这个页面上所有尚未完成的接口请求。

问题解决：
构造函数

AbortController.AbortController()创建一个新的AbortController 对象实例。

属性

AbortController.signal 只读返回一个AbortSignal对象实例，它可以用来 with/abort 一个DOM请求

方法

AbortController.abort()中止一个尚未完成的DOM请求。这能够中止fetch 请求，任何响应Body的消费者和流。

具体使用（react中）：
1、在componentDidMount中实例化
``` js
  componentDidMount =() =>{
    if ("AbortController" in window) {
      window.controller = new AbortController();
      this.setState({
        signal: controller.signal,
      })
    }
}
```
2、请求时添加一个请求对象 { signal }
```js
resetVehicleRedis =()=>{
    let HostFormData = new FormData();
    HostFormData.append('key','diuber2017');
    HostFormData.append("secret_key", '09e8b1b88e615f0d9650886977af33e9');
    request('/api/web/admin_setting/resetVehicleRedis',{
      method:'POST',
      body:HostFormData,
      credentials: 'include',
      signal:this.state.signal,
    }).then((data)=> {}).catch(()=>{})
  }
```
3、离开页面中止请求
```js
  componentWillUnmount = ()=>{
    if ("AbortController" in window) {
      window.controller.abort();
    }
  }
```
5. eventloop
6. instanceof
7. promise封装setstate
8. redux基本组成和设计单向数据流
9. https协议的过程
10. https获取加密密钥的过程
11. http的方法有哪几种,每种方法的有用途
12. 类式继承的方案
13. prototype继承的实现
14. 数字千分位处理，正则和非正则都要实现
```js
    function numFormat(num) {
        if (num.toString().indexOf ('.') !== -1)  {
            var b = num.toLocaleString();
            return b;
        } else {
            var c = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        }
    }
```
15. 借用构造继承，几种组合继承方式
16. 看编程代码说出运行结果：
      Process.nextTick，setImmediate 和promise.then 的优先级
      Process.nextTick，pronise, setImmediate的优先级
17. 实现一个bind函数
18. 千位加逗号
19. 三个继承方式的优缺点  优化列出代码
20. nodejs的事件循环
21. bfc
22. css实现正方形div水平垂直居中
23. koa1的原理,继承
24. 最后是一个写代码 处理有依赖的异步任务 加重试

25. diff的原理
26. es6箭头函数
27. import和requre的区别
28. symbol
29. 函数实现正面模板
30. 正方形实现，三角形实现
31. CSS考了 伪类
32. 实现布局header,content,footer，上中下布局；当content 超出窗口可视区，不显示footer；当content 没超出可视区时，固定footer 在最下面
33. 算法:背包问题、闭包问题、函数柯里化
34. 宽是高的一半的垂直居中，里面有字体也要垂直居中类数组
35. promise async settimeout先后次序
36.  event类 on once灯方法
37. ==的隐式转化
38. 什么是闭包，
39. 最长子序列
40. 二叉树中序遍历
41. http握手原理
42. react 新版本的特性
43. 多空格字符串格式化为数组
44. bind函数运行结果
45. 点击table的td显示td内容
46. 数字千分位处理
47. 固定日期与当前时间格式化处理
48. 上中下三栏布局
49. 实现一个子类实例可以继承父类的所有方法
50. Jsonp跨域，js原型继承 & 原型链，promise，二叉树搜寻算法，算法：前端做并发请求控制
51. 杭州一面:
     节流函数
     Koa中间件机制及代码实现
     React Fiber原理以及为什么componentWillRecievedProps会废弃
     给定一个数组，一个期望值，找到数组中两个相加等于期望值
52. 深圳前端一面：
         react生命周期 deepClone 回流重绘 canvas
53. 深圳前端一面：
     1. 数组去重
     2. React Hook原理
     3. 列表diff中key的作用
     4. Vue v-model原理
     5. 场景题：Vue CheckBoxGroup/CheckBox设计
     6. Vue双向绑定原理
54. 成都前端：
     1. 换行字符串格式化
     2. 屏幕占满和未占满的情况下，使footer固定在底部，尽量多种方法。
     3. 日期转化为2小时前，1分钟前等
     4. 多个bind连接后输出的值
     5. 原码，补码，反码
     6. 事件委托
55. 成都前端：
     1. React Hook, Fiber Reconciler ,新的生命周期 getDerivedStateFromPros 为什么是Static
     2. redux 异步
     3. redux 异步中间件原理
     4. express koa 中间件原理
56.北京前端一面：
  1. 宏任务微任务
  2. libUA
  3. express ctx 中间键代码实现
  4. vue 发布订阅和虚拟dom代码实现
  5. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数      控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接        使用 fetch 即可 

57. 南京前端1面：
     1. 事件循环
     2. react diff算法，key的作用，setData的机制，事件合成
     3. vue的v-model原理
     4. 实现一个方法，参数是一个generator函数，执行结果是执行完所有generator中的yield
     5. 获取页面所有img并且下载
     6. 两个同源tab之间的交互，数据同步
 
58. 上海前端一面：
1. 怎么将一个异步方法promise化，以及实现promise.all()方法
2. vue单页多页的区别，vue路由实现原理
3. vue数据驱动视图原理？更新视图的过程是否是同步的操作？
4. nodejs相关的应用（答：开发命令行工具、web服务，ssr，数据库操作等）
5. vue项目开发环境如何配置？wepack-dev-server 热更新功能实现原理
6. express、koa、redis等技术相关应用
7. [1,2,3].map(parseInt) 执行结果

59. 北京前端一面题：
64. css 如何实现元素a距离屏幕10px，高度无论宽度怎么改变都是其.5
65. 隐式转换，会问为什么这样
66. 同步异步输出的顺序
67. argument是数组吗，如果不是怎么变为数组
68. 如何实现for循环内定时器依次输出123
69. bind实现
70. 函数节流
71. 动态规划算法


59. 北京前端一面：
     1. function request(urls, maxNumber, callback) 要求编写函数实现，根据urls数组内的url地址进行并发网络请求，最大并发数maxNum   ber,当所有请求完毕后调用callback函数(已知请求网络的方法可以使用fetch api)

    2. throttle函数实现

     3.requestAnimationFrame 和 setTime、setInterval的区别，requestAnimationFrame 可以做什么

    4.二叉树路径总和（leetcode 112）

    5. 给定一个不含重复数字的数组arr,指定个数n,目标和sum,判断是否含有由n个不同数字相加得到sum的情况（leetcode 40 变种， 数   字不得重复使用）
60. 上海前端一面：
     websocket 原理
     http2如何实现多路复用

1. 冒泡算法
2. 前端安全 ， DOS
3. 前端缓存、回话机制
4. 跨域
5. 计算机网络知识 TCP UDP
6. 测试 单测、集成测试
7. 自动化集成
8. Docker 应用
9. Nodejs express koa

62. 成都前端笔试：
1. 输入一个日期 返回几秒前 几天前或者几月前；
2. 153812.7  转化153,812.7；
3. 用两种方法 一种是正则；
4. 还有关于 bind的一道题；

63. 北京前端一面
①['a','b'],['A','B'],['1','0']，输出['aA1','aA0','aB1','aB0','bA1','bA0','bB1','bB0']，算法的排列组合问题
②vue-router路由监听的原理
③webpack打包的原理，webpack有没有针对打包过程做一些优化提升打包速度
④请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数，控制请求的并发度，实现max个请求执行完之后再执行下max个请求，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接 使用 fetch 即可
⑤vue双向绑定的原理
64.深圳抖音
写一个eventBus，元素水平垂直居中，vuex mobox，小程序架构优化 日志系统

二轮:
1. 主要是围绕你的项目经历和技术，有一定的深度，主要还是要对项目全面熟悉；还有一个就是函数     柯理化的编码实现
2. 函数柯里化、Web安全、react性能优化、react算法原理
3. 上来直接让写一个autocomplete 组件，可能是想考察业务思考点；
4. 后续的问题主要会接着业务场景问 扣实际场景 不问知识理论；
5. http网络协议 ；
6. tcp为什么是可靠的；
7. js设计模式；
8. solid原则；
9. 柯里化；
10. curry函数实现
    https原理
      webpack打包原理
       babel原理
      node相关基础问题
  

11.深圳二面：
       1，一千个棋子，甲先取乙后取，每次最多取七个最少取一个，问是否有一个方案让甲一定赢
        2，3×7的格子，从左上角到右下角，只能往右或者往下，有多少种走法，
        3，一个不均匀硬币，如何抛出均匀概率
        4，然后有一个生成0到13随机数的算法，如何用它均匀生成0到9随机数
        5，两千万高考生成绩如何排序
        6，用链表表示的大数求和
12.杭州二面
   1. css 单行和多行截断
   2. 给一个由域名组成的字符串进行按子域名分组的反转，比如 news.toutiao.com 反转成 com.toutiao.news 需要 in place 做，                        3.其他技术问题都是穿插在我的业务项目里面的，有点针对实际情景给解决方案

13.深圳抖音二面：
最近在做项目（痛点，难点，怎么解决），ssr（ssr csr混合怎么处理），小程序架构（带来的优缺点），状态管理，异步编程（各个优缺点）

三轮：
1.自己做得最有成就的项目
2.自己主动承担并是核心的项目
3.项目深度:比如现场实现vue的数据代理等
4.技术广度:什么是微前端等
5.职业发展
6.  1. js实现依赖注入
    2. 接口攻击的方式和防御措施
    3. https握手过程
    4. 设计模式
    5. redux和 mobx的区别
    6. js多线程如何共享大的数据
