专题页面性能分析
==================

wifi网络环境1--页面加载时间
--------------
1. [专题1](http://mst.vip.com/356726.php)

   ![netwrok 1](images/network1.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 567ms

2. [专题2](http://mst.vip.com/359326.php)

   ![network 2](images/network2.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 559ms

3. [京东类专题页](http://sale.jd.com/m/act/kmRjHY1UNoPAagbL.html?share=yes&jd_pop=5f92bec2-c4df-49a4-8692-8cf3a6cc6419&abt=1)

   ![network 3](images/network3.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 26ms

4. [淘宝类专题页](https://market.m.taobao.com/apps/mchi/mchi/index?spm=a1z5n.7782591.categorylist.1)   

   ![network 4](images/network4.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 33ms

### 网络环境1 专题页DNS查找时间

![DNS 1](images/dns1.png)

![DNS 2](images/dns2.png)


网络环境2(chrome模拟wifi)--页面加载时间
------------------
1. [专题1](http://mst.vip.com/356726.php)

   ![netwrok 1](images/vip_network1.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间, 首字节时间 见图

2. [专题2](http://mst.vip.com/359326.php)

   ![network 2](images/vip_network2.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间 首字节时间 见图

3. [京东类专题页](http://sale.jd.com/m/act/kmRjHY1UNoPAagbL.html?share=yes&jd_pop=5f92bec2-c4df-49a4-8692-8cf3a6cc6419&abt=1)

   ![network 3](images/vip_network3.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 26ms

4. [淘宝类专题页](https://market.m.taobao.com/apps/mchi/mchi/index?spm=a1z5n.7782591.categorylist.1)   

   ![network 4](images/vip_network4.png)

   禁用浏览器缓存 首屏首次访问，DOMContentLoaded, Load事件的时间见图，首字节时间 33ms

### 网络环境2 专题页DNS查找时间

![DNS 1](images/vip_dns1.png)

![DNS 2](images/vip_dns2.png)

### 图片资源域少，请求等待

![pic domain](images/picDomain.png)


### 耗时分析

![加载过程](images/seeloads.png)


### 测试对比结果

1. **首字节时间优化**: html页面首字节时间较大，导致DOMContentLoaded的时间而言会比京东，淘宝慢1s
2. **增加图片域**: 图片资源域只有2个，导致请求并发少，后续请求只能串行
3. **图片优化**：静态资源大部分为图片, 可考虑优化图片大小和数量 (需加载的图片提前打印，提前加载, 不等待组件初始化才加载)
4. DNS预获取: 具体的网络环境下 DNS查找比较耗时，可尝试 meta dns-prefetch
5. JS请求合并：静态资源服务器能否合并多个请求(static.com/a.js?b.js -> ab.js)














<script>

window.onload = function() {
    document.body.style.width = '80%';
};

window.onload();
</script>