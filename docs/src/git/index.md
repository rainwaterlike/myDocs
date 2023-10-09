## github项目添加ssh密钥

### 生成密钥
```sh
ssh-keygen -t ed25519 -C "XXX@qq.com"
```

### 启动ssh-agent
```sh
eval "$(ssh-agent -s)"
```

### 添加新密钥到ssh-agent
```sh
ssh-add ~/.ssh/id_ed25519
```

- 把生成的`id_ed25519.pub`复制一下。

- 在 GitHub 网站上，点击你的头像，然后选择`Settings`。

- 在左侧菜单中，选择`SSH and GPG keys`。

- 点击`New SSH key`按钮。

- 在`Title`字段中输入一个描述性的名称，例如`My SSH key`。

- 在`Key`字段中粘贴你复制的公钥。

- 点击`Add SSH key`按钮。

## 设置username和email
```sh
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```