## github项目添加ssh密钥

### 生成密钥

```sh
ssh-keygen -t ed25519 -C "XXX@XXX.com"
```

### 启动ssh-agent

```sh
eval "$(ssh-agent -s)"
```

### 添加新密钥到ssh-agent

```sh
ssh-add ~/.ssh/id_ed25519
```

* 把生成的`id_ed25519.pub`复制一下。

* 在 GitHub 网站上，点击你的头像，然后选择`Settings`。

* 在左侧菜单中，选择`SSH and GPG keys`。

* 点击`New SSH key`按钮。

* 在`Title`字段中输入一个描述性的名称，例如`My SSH key`。

* 在`Key`字段中粘贴你复制的公钥。

* 点击`Add SSH key`按钮。

## 设置username和email

```sh
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 合并代码

省流：自己的分支先提交以及同步更改，然后切换到master分支拉取代码，然后再切换回自己的分支，合并分支，选择master，处理冲突后再进行同步更改。

### 1、首先，在VSCode中打开你的项目

切换到 `master` 分支：在源代码管理( `SOURCE CONTROL` )视图或者终端中输入命令 `git checkout master` 。
 `git branch --set-upstream-to=origin/master master`

设置完再拉取代码

### 2、合并 master 分支到 dev 分支

#### 概述

切换到自己的dev分支
再进行merge

#### 具体操作

切换到自己的dev分支
vscode-源代码视图-分支-合并，选择 `master` ，等价于 `git merge master`

处理冲突文件
提交到自己的分支上

gitlab申请合并到master分支
指派人：自己
审核者：领导
接受合并请求时删除源分支不要勾选
