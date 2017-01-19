fiddler
==========

quickExec
-----------
+ `select keyword` 选择response的content-type包含指定关键字的会话

		select javascript //选择response content-type包含javascript的会话
		select css  //同上 选择 content-type 包含css的会话
		select html
		
+ `? keyword` 搜索包含指定关键字的会话

		? script.min.js //搜索url包含script.min.js的会话
		
+ `bpu keyword` 设置url匹配keyword的断点

		bpu www.baidu.com //访问www.baidu.com则会中断 这是before request的断点
		bpu  //不加keyword 取消断点设置