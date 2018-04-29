# 文件目录介绍

`m.hzshuangmei.com` 是移动端网站
`www.hzshuangmei.com` 是PC端网站
`static.hzshuangmei.com` 存放双端静态资源，包含JS，CSS和前台上传的图片（非编辑后台上传） 

PS：编辑后台上传的文件依然存放在网站根目录的`uploads`目录下，绑定的域名是`uploads.hzshuangmei.com`

**考虑到一个仓库只有1024M的存储空间，因此，请定期清理不再使用的文件，特别是图片文件**

增加主机配置文件备份`ngx_conf`

`http2_push` 内是server push 配置文件
`pagespeed` 内是ngx_pagespeed 配置文件
`platform` 内是PC与M端页面跳转配置
`rewrite` 跳转规则
`vhost` 各网站配置主文件
`anti_spam_bots.conf` 防止垃圾蜘蛛爬取配置
`guard_dedecms.conf` 针对dedecms系统的防护配置


`xzh.hzshuangmei.com` 是熊掌号网站（一体化响应式）
