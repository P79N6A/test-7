network面板按特定条件筛选记录
-----------------------------


+ scheme：协议规定。如 HTTPS
+ domain：资源所在的域，即url中的域名部分。如 domain:api.github.com
+ method：使用何种HTTP请求方式。如 GET
+ status-code：HTTP响应头的状态码
+ mime-type：也写作content-type，是资源类型的标识符。如 text/html

---------

+ has-response-header：资源是否存在响应头，无论其值是什么。如 has-response-header：Access-Control-Allow-Origin
+ is：当前时间点在执行的请求。当前可用值：running
+ larger-than：显示大于指定值大小规格的资源。单位是字节(B),但是K(kB)和M(MB)也是可以的~ 如larger-than:150K
+ set-cookie-name：服务器设置的cookies名称
+ set-cookie-value：服务器设置的cookies的值
+ set-cookie-domain：服务器设置的cookies的域

