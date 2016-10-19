专题页面性能分析
==================

当前页面加载时间
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

通过对比，就DOMContentLoaded的时间而言会比京东，淘宝慢1s, 首字节时间也相差比较多; 静态资源大部分为图片; DNS查找比较耗时,如图:

![DNS 1](images/dns1.png)

![DNS 2](images/dns2.png)


