# 前端工程化
## npm

### 切换源
```sh
npm config set registry https://registry.npmmirror.com
```
### 还原源
```sh
npm config set registry https://registry.npmjs.org/
```
### 查看源
```sh
npm config get registry
```

### 无法加载文件 D:\SoftWare\NodeJS\node_global\cnpm.ps1，因为在此系统上禁止运行脚本。
```sh
set-ExecutionPolicy RemoteSigned
```

### 更新依赖
#### 安装ncu

```sh
npm install -g npm-check-updates
```
#### 查看有可以更新的依赖

```sh
ncu
```

#### 更新依赖
其中 `-u` 表示直接更新 package.json 文件，运行完毕后需要重新安装依赖
```sh
npx ncu -u
```
### npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
运行npm命令提示
解决：
找到node的安装目录下面的 `npm.cmd` 文件修改
`prefix-g`  改为  `prefix --location=global`

## yarn 

切换源
```sh
yarn config set registry http://registry.npmmirror.com
```

### 文件名、目录名或卷标语法不正确
因为yarn bin目录和安装的模块在不同的硬盘分区里面导致的

### 查看 yarn bin 目录的位置：
```sh
yarn global bin
```
### 查看 yarn 的全局安装位置：
```sh
yarn global dir
```
发现，yarn 的全局安装位置与 bin 目录的位置并不一致，于是去修改 yarn 的全局安装位置和缓存位置：
#### 改变yarn全局安装的位置
```sh
yarn config set global-folder "D:\software\yarn\global"
```
#### 改变yarn缓存位置
```sh
yarn config set cache-folder "D:\software\yarn\cache"
```

## NodeJs

### 安装
1、在【系统变量】下新建【NODE_PATH】
添加 
D:\software\nodejs\node_global\node_modules

2、在【用户变量】下的【Path】新建添加node全局文件夹【D:\software\nodejs\node_global】，之后点击确定。

3、安装的文件夹下新建俩个文件夹【node_global】和【node_cache】;

4、修改全局模块下载路径 
Cmd运行
```sh
npm config set prefix "D:\software\nodejs\node_global"
npm config set cache "D:\software\nodejs\node_cache"
```

## nvm

nvm是一个NodeJs版本管理器

### 查看当前安装的nodejs版本
```sh
nvm ls
```
### 安装NodeJs
```sh
nvm install [版本号]
```
### 切换版本
```sh
nvm use [版本号]
```