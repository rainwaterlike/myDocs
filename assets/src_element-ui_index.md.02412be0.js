import{_ as s,c as a,o as n,R as e}from"./chunks/framework.82ea6e11.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"src/element-ui/index.md","filePath":"src/element-ui/index.md","lastUpdated":1725029549000}'),l={name:"src/element-ui/index.md"},p=e(`<h2 id="el-tree-setcheckedkeys无效" tabindex="-1">el-tree setCheckedKeys无效 <a class="header-anchor" href="#el-tree-setcheckedkeys无效" aria-label="Permalink to &quot;el-tree setCheckedKeys无效&quot;">​</a></h2><p>因为id有重复的，手动设置一个不重复的id给node-key就可以了</p><h2 id="element-表格错位" tabindex="-1">element 表格错位 <a class="header-anchor" href="#element-表格错位" aria-label="Permalink to &quot;element 表格错位&quot;">​</a></h2><p>参考资料：<a href="https://www.jb51.net/article/256462.htm" target="_blank" rel="noreferrer">https://www.jb51.net/article/256462.htm</a></p><p>例如 使用了<code>keep-alive</code>切换页面后表格错位了，需要使用<code>doLayout</code>方法重新布局一下</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">activated</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$refs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tableRef</span><span style="color:#89DDFF;">?.</span><span style="color:#82AAFF;">doLayout</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="element-form对upload组件进行校验" tabindex="-1">element form对upload组件进行校验 <a class="header-anchor" href="#element-form对upload组件进行校验" aria-label="Permalink to &quot;element form对upload组件进行校验&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">uploadRules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#FFCB6B;">file</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> required</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> validator</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">validateFiles</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">请上传附件</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> trigger</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">change</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#82AAFF;">validateFiles</span><span style="color:#A6ACCD;">(rule</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> callback) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">files</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$refs</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">file</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">uploadFiles</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">files</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">callback</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Error</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">请选择要上传的文件！</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">callback</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="父容器是flex布局-导致element-table没有自适应宽度" tabindex="-1">父容器是flex布局，导致element table没有自适应宽度 <a class="header-anchor" href="#父容器是flex布局-导致element-table没有自适应宽度" aria-label="Permalink to &quot;父容器是flex布局，导致element table没有自适应宽度&quot;">​</a></h2><p>element table的父容器设置 <code>display:grid</code>把flex顶掉就行</p>`,10),o=[p];function t(r,c,F,y,i,D){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
