原文链接：https://juejin.im/post/5cebfb915188251a115f4175
NVM是什么？
nvm (Node Version Manager) 是Nodejs版本管理器，可对不同的node版本快速进行切换。

为什么要用NVM？
基于node的工具和项目越来越多，但是每个项目使用的node版本可能不一致，就会出现一些奇怪的问题。比如：自己电脑安装的是最新版的node,接手的项目使用的是低版本的node。那么我只有切换到低版本的node再进行操作才不会报错。而NVM就是用来帮助我们快速切换node版本的。

nvm在linux中安装过程
打开github中nvm的地址: github.com/nvm-sh/nvm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

此时你用nvm list时会告诉你这个nvm不存在

 解决办法: source ~/.bashrc
接着执行nvm list可以看到

nvm的常用命令
nvm list 或者 nvm ls 查看node的安装版本

nvm install 6.9.0 安装一个6.9.0版本的node

nvm use 6.9.0 使用这个6.9.0版本的node

nvm uninstall 6.9.0 删除6.9.0版本的node

nvm ls-remote 罗列远程的node版本

nvm current 查看当前正在使用的node版本

nvm alias default v4.3.0 切换v.4.3.0为默认版本,每次新建的命令行中就是默认的版本了

npm list --depth=0 -g 查看全局都安装了那些npm的包