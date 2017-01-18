sublime build system 设置
================
build system功能非常的cool, 可以直接测试有一些简单的功能，或者跑一些预编译查看结果
; 从前常做的一件事是在 chrome控制台测试简单函数，现在可以直接在sublime跑了.


快捷键
--------
`ctrl + b`  或者 `f7`

构建对应的配置
-------------
每个构建对应配置文件 \*.sublime-build

    {
        "cmd": ["command", "arguments", "--flag"],
        "selector": ["source.js"],
        "path": "user/local/bin",
        "working_dir": "/projects"
    }


+ `cmd` 
    所需命令的绝对路径, 或者 根据 `path` 环境变量查找命令
+ `file_regex`
    可选, 值为正则，表示命令执行的错误输出到哪个文件
+ `line_regex`
    可选 *file_regex*不匹配时，尝试line_regex
+ `selector` *kk:有用*
    可选，当菜单*工具/构建/自动编译*被选择，将根据后缀调用相应的构建设置
+ `working_dir`
    可选，在执行命令前，会把当前目录临时切换到这里指定的 *working_dir*
+ `encoding`
    可选, 输出内容的字符编码 默认utf-8
+ `target`
    可选，sublime将调用的命令，默认`exec`
+ `env`
    可选，json对象，将在命令执行前，合并到当前进程的环境变量中
+ `shell`
    可选，设为true 命令将在shell中运行
+ `path`
    可选，将在调用命令前，临时替换环境变量*path*
+ `variants`
    可选，选项列表，将覆盖build system的默认选项，变量`_name`将出现在命令面板中
+ `name`
    标示构建系统 在variants中可用

构建错误的捕获 file_regex
------------------
错误包含4个字段: *file, line number, column number and message*, *file, line number*是必须字段，可点击错误定位到对应文件

示例: 平台选项
----------
如下，所有平台都执行 ant 命令；但是指定window下，执行 ant.bat

    {
        "cmd": ["ant"],
        "file_regex": "^ *\\[javac\\] (.+):([0-9]+):() (.*)$",
        "working_dir": "${project_path:${folder}}",
        "selector": "source.java",

        "windows":
        {
            "cmd": ["ant.bat"]
        }
    }


示例: 变量 variants
----------------

    {
        "selector": "source.python",
        "cmd": ["date"],

        "variants": [

            { "cmd": ["ls -l *.py"],
              "name": "List Python Files",
              "shell": true
            },

            { "cmd": ["wc", "$file"],
              "name": "Word Count (current file)"
            },

            { "cmd": ["python", "-u", "$file"],
              "name": "Run"
            }
        ]
    }

`ctrl+b`会执行 `date`; `ctrl+shift+b`会执行`name: run`对应的命令；

构建系统的可用变量
---------------
*.sublime-build*中可用的变量如下:

name | desc
-----|-----
$file_path | 当前文件所在的目录 *some/dir*
$file | 当前文件的路径 *some/dir/myfile.js*
$file_name | 当前文件的文件名 *myfile.js*
$file_extension | 当前文件扩展名 *js*
$file_base_name | 当前文件的名 *myfile*
$packages | 插件包所在目录
$project | 项目文件的路径
$project_path | 项目文件的所在目录
$project_name | ..
$project_base_name | ..
$project_extension | ..

