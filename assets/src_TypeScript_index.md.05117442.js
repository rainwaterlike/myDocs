import{_ as s,c as a,o as n,R as l}from"./chunks/framework.82ea6e11.js";const A=JSON.parse('{"title":"学习ts","description":"","frontmatter":{},"headers":[],"relativePath":"src/TypeScript/index.md","filePath":"src/TypeScript/index.md","lastUpdated":1710178177000}'),o={name:"src/TypeScript/index.md"},p=l(`<h1 id="学习ts" tabindex="-1">学习ts <a class="header-anchor" href="#学习ts" aria-label="Permalink to &quot;学习ts&quot;">​</a></h1><p><a href="https://24kcs.github.io/vue3_study/chapter2/1_type.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80" target="_blank" rel="noreferrer">文档</a></p><p><a href="https://www.zhihu.com/education/video-course/1487063043724566528" target="_blank" rel="noreferrer">视频</a></p><h2 id="ts提示不存在某个属性" tabindex="-1">ts提示不存在某个属性 <a class="header-anchor" href="#ts提示不存在某个属性" aria-label="Permalink to &quot;ts提示不存在某个属性&quot;">​</a></h2><p>使用类型断言</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useToggleShowBack </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">to</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">RouteLocationNormalized</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">store</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useStore</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//第一种写法</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">isShowBack</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">to</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">matched</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">default</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">showBack</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//第二种写法</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">tore</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">isShowBack</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#F07178;">&gt;</span><span style="color:#A6ACCD;">to</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">matched</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">default</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">showBack</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,6),e=[p];function t(r,c,y,F,i,D){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
