import{_ as a,c as s,o as e,R as n}from"./chunks/framework.82ea6e11.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"src/git/index.md","filePath":"src/git/index.md","lastUpdated":1725029549000}'),l={name:"src/git/index.md"},o=n(`<h2 id="github项目添加ssh密钥" tabindex="-1">github项目添加ssh密钥 <a class="header-anchor" href="#github项目添加ssh密钥" aria-label="Permalink to &quot;github项目添加ssh密钥&quot;">​</a></h2><h3 id="生成密钥" tabindex="-1">生成密钥 <a class="header-anchor" href="#生成密钥" aria-label="Permalink to &quot;生成密钥&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ed25519</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">XXX@XXX.com</span><span style="color:#89DDFF;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="启动ssh-agent" tabindex="-1">启动ssh-agent <a class="header-anchor" href="#启动ssh-agent" aria-label="Permalink to &quot;启动ssh-agent&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">eval</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">ssh-agent</span><span style="color:#C3E88D;"> -s</span><span style="color:#89DDFF;">)&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="添加新密钥到ssh-agent" tabindex="-1">添加新密钥到ssh-agent <a class="header-anchor" href="#添加新密钥到ssh-agent" aria-label="Permalink to &quot;添加新密钥到ssh-agent&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ssh-add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_ed25519</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><p>把生成的<code>id_ed25519.pub</code>复制一下。</p></li><li><p>在 GitHub 网站上，点击你的头像，然后选择<code>Settings</code>。</p></li><li><p>在左侧菜单中，选择<code>SSH and GPG keys</code>。</p></li><li><p>点击<code>New SSH key</code>按钮。</p></li><li><p>在<code>Title</code>字段中输入一个描述性的名称，例如<code>My SSH key</code>。</p></li><li><p>在<code>Key</code>字段中粘贴你复制的公钥。</p></li><li><p>点击<code>Add SSH key</code>按钮。</p></li></ul><h2 id="设置username和email" tabindex="-1">设置username和email <a class="header-anchor" href="#设置username和email" aria-label="Permalink to &quot;设置username和email&quot;">​</a></h2><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user.name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Your Name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user.email</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">your.email@example.com</span><span style="color:#89DDFF;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="合并代码" tabindex="-1">合并代码 <a class="header-anchor" href="#合并代码" aria-label="Permalink to &quot;合并代码&quot;">​</a></h2><p>省流：自己的分支先提交以及同步更改，然后切换到master分支拉取代码，然后再切换回自己的分支，合并分支，选择master，处理冲突后再进行同步更改。</p><h3 id="_1、首先-在vscode中打开你的项目" tabindex="-1">1、首先，在VSCode中打开你的项目 <a class="header-anchor" href="#_1、首先-在vscode中打开你的项目" aria-label="Permalink to &quot;1、首先，在VSCode中打开你的项目&quot;">​</a></h3><p>切换到 <code>master</code> 分支：在源代码管理( <code>SOURCE CONTROL</code> )视图或者终端中输入命令 <code>git checkout master</code> 。 <code>git branch --set-upstream-to=origin/master master</code></p><p>设置完再拉取代码</p><h3 id="_2、合并-master-分支到-dev-分支" tabindex="-1">2、合并 master 分支到 dev 分支 <a class="header-anchor" href="#_2、合并-master-分支到-dev-分支" aria-label="Permalink to &quot;2、合并 master 分支到 dev 分支&quot;">​</a></h3><h4 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h4><p>切换到自己的dev分支 再进行merge</p><h4 id="具体操作" tabindex="-1">具体操作 <a class="header-anchor" href="#具体操作" aria-label="Permalink to &quot;具体操作&quot;">​</a></h4><p>切换到自己的dev分支 vscode-源代码视图-分支-合并，选择 <code>master</code> ，等价于 <code>git merge master</code></p><p>处理冲突文件 提交到自己的分支上</p><p>gitlab申请合并到master分支 指派人：自己 审核者：领导 接受合并请求时删除源分支不要勾选</p>`,22),t=[o];function r(p,c,i,d,h,u){return e(),s("div",null,t)}const y=a(l,[["render",r]]);export{C as __pageData,y as default};
