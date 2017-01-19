
**************************************************

你不小心，写错了提交的注视/信息，该如何处理呢。理论上，SCM是不应该修改历史的信息的，提交的注释也是。 
  不过在Git中，其commit提供了一个--amend参数，可以修改最后一次提交的信息.但是如果你已经push过了，那么其历史最后一次，永远也不能修改了。 
  我使用git commit --amend已经push过的，截图如下，我那个"fixes #3"永远的在版本历史中了。
 git commit --amend
的用法，，，
# git commit --amend
然后在出来的编辑界面，直接编辑 注释的信息。。
===========================================================================================================
===========================================================================================================
git修改历史提交
2011-06-16 17:58
       git使用amend选项提供了最后一次commit的反悔。但是对于历史提交呢，就必须使用rebase了。
       git rebase -i HEAD~3
       表示要修改当前版本的倒数第三次状态。
        这个命令出来之后，会出来三行东东：
        pick:*******
        pick:*******
        pick:*******
        如果你要修改哪个，就把那行的pick改成edit，然后退出。
 
        这时通过git log你可以发现，git的最后一次提交已经变成你选的那个了，这时再使用：
        git commit --amend
        来对commit进行修改。
        修改完了之后，要回来对不对？
        使用git rebase --continue
        OK，一切都搞定了。

==============================================================
Git修改前一次提交的方法(特别注意保持Change-Id不变)
2011年8月8日sinojelly发表评论阅读评论
如果发现上一次提交的内容存在问题，就需要修改了。
基本概念
Change:
Gerrit中的一个Change就是一个Review任务，它对应一个commit。
每个commit，应该是为了一个目的的完整修改。如果某一次修改不完全，就需要修正该commit。
每一次修正之前的commit，重新提交时，都应该保持Change-Id不变，这样就不会产生新的Change，而是在原有的Change下产生一个新的Patch Set。
所有的Patch Set中，只有最新的一个是真正有用的，能够合并的。
图1：Change和Change-Id


图2：Patch Set


修改前一次提交的方法
方法一：用–amend选项
#修改需要修改的地方。
git add .
git commit –amend
注：这种方式可以比较方便的保持原有的Change-Id，推荐使用。

方法二：先reset，再修改
这是可以完全控制上一次提交内容的方法。但在与Gerrit配合使用时，需特别注意保持同一个commit的多次提交的Change-Id是不变的。
否则，就需要Abondon之前的Change，产生一些垃圾不说，操作得不对，会使得简单的事情复杂化，甚至无法合并。
git reset HEAD^
#重新修改
git add .
git commit -m “MSG”
特别注意：为了保持提交到Gerrit的Change不变，需要复制对应的Change-Id到commit msg的最后，可以到Gerrit上对应的Change去复制，参见图1。

方法三：只是修改作者
如果email不对，会无法提交到Gerrit，所以这个命令也可能用到。
git commit –amend –author=<user-email>
注：如果该email地址从未有过成功的提交，这个修改会不成功。在别的分支做一次成功提交之后，就可以修改了。




=========================================================
1. // 查看修改

git rebase -i master~1 //最后一次
git rebase -i master~5 //最后五次

2. // 显示结果如下，修改 pick 为 edit ，并 :wq 保存退出

pick 92b495b 2009-08-08: ×××××××

# Rebase 9ef2b1f..92b495b onto 9ef2b1f
#
# Commands:
#  pick = use commit
#  edit = use commit, but stop for amending //改上面的 pick 为 edit
#  squash = use commit, but meld into previous commit
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#


3. 命令行显示：

Rebasing (1/1)
You can amend the commit now, with

git commit --amend


4. 使用 git commit --amend 进行修改，完成后 :wq 退出

5. 使用 git rebase --continue 完成操作

-----------------
#从仓库删除文件
git rm -- yourfile  

--------
git diff --name-only HEAD^ HEAD # 查看上次提交的文件列表

git log --name-only -1 # 同上

--------
git submodule add 仓库地址 路径
其中，仓库地址是指子模块仓库地址，路径指将子模块放置在当前工程下的路径。 
注意：路径不能以 / 结尾（会造成修改不生效）、不能是现有工程已有的目录（不能順利 Clone）
命令执行完成，会在当前工程根路径下生成一个名为“.gitmodules”的文件，其中记录了子模块的信息。添加完成以后，再将子模块所在的文件夹添加到工程中即可。

删除
submodule的删除稍微麻烦点：首先，要在“.gitmodules”文件中删除相应配置信息。然后，执行“git rm –cached ”命令将子模块所在的文件从git中删除。

下载的工程带有submodule
当使用git clone下来的工程中带有submodule时，初始的时候，submodule的内容并不会自动下载下来的，此时，只需执行如下命令：
git submodule update --init --recursive
即可将子模块内容下载下来后工程才不会缺少相应的文件。

----
抽取项目公共模块，多项目共用，必然会使用到Git submodule命令。 
项目中submodule的管理，无外乎添加，更新，删除等操作。

1. submodule 添加

进入到git项目根目录下，输入命令:

git submodule add [-b master ] [URL to Git repo] [local path]
其中，[-b master] 为submodule的默认分支，[local path]为submodule的本地路径。

命令执行完成，会在当前工程根路径下生成一个名为“.gitmodules”的文件，其中记录了子模块的信息，
cat -n .gitmodules  #查看子模块信息

[submodule "libraries/pushserver"]
 path = libraries/pushserver                //本地路径
 url = git@*****/android-library-push.git   //仓库地址
 branch = master                            //默认分支

2. submodule 更新

若项目中包含.gitmodules, 进入到git项目根目录下，输入命令, .gitmodules中的所有项目都会进行更新:

git clone 父项目.git 
git submodule init 
git submodule update (update时，submodule分支必须已在正确分支上)

submodule远程分支发生变更后，直接使用git submodule update是不会进行更新操作的。必须依次进入到各个submodule的目录，进行git pull操作，如果submodule数目很多，每次发版本时必须进入所有目录进行git pull，这将是噩梦。不过有个更简单的方法，

git submodule foreach git checkout master 
git submodule foreach git pull

3. submodule 删除

删除submodule会麻烦些，仅仅删除submodule模块内容，是无法彻底从git中删除掉。还需要到git相关配置文件中删除条目。

删除 [项目根目录/.gitmodules] 中对应的条目
删除 [项目根目录/.git/config] 中对应的条目
删除 [项目根目录/.git/modules] 目录下的对应的submodule文件夹
执行 git rm –cached [modulename] 命令
删除 submodule 模块内容


-----

git clean #删除那些未被跟踪(untracked)的文件

-n 显示 将要 删除的 文件 和  目录

-f 删除 文件，-df 删除 文件 和 目录


git clean -n

git clean -df

git clean -f


git rm #把一个文件从硬盘删除，并从git仓库移除。但是注意最后要执行git commit才真正提交到git仓库

git rm 1.txt  #删除1.txt文件，并把它从git的仓库管理系统中移除。

git rm -r myFolder #删除文件夹myFolder，并把它从git的仓库管理系统中移除。

git cherry-pick
--------------------

git cherry-pick用于把另一个本地分支的commit修改应用到当前分支。

> 实际问题：在本地 master 分支上做了一个commit ( 38361a68138140827b31b72f8bbfd88b3705d77a ) ， 如何把它放到 本地 old_cc 分支上？

使用 cherry-pick, 对已经存在的commit 进行apply (可以理解为再次提交）
简单用法：

  git cherry-pick <commit id>
  git checkout old_cc
  git cherry-pick 38361a68


git stash
---------------

备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。

git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stas中读取内容并恢复。
git stash list: 显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。
git stash clear: 清空Git栈。此时使用gitg等图形化工具会发现，原来stash的哪些节点都消失了。

关于Git Stash的详细解释，适用场合，这里做一个说明：
使用git的时候，我们往往使用branch解决任务切换问题，例如，我们往往会建一个自己的分支去修改和调试代码, 如果别人或者自己发现原有的分支上有个不得不修改的bug，我们往往会把完成一半的代码 commit提交到本地仓库，然后切换分支去修改bug，改好之后再切换回来。这样的话往往log上会有大量不必要的记录。其实如果我们不想提交完成一半或者不完善的代码，但是却不得不去修改一个紧急Bug，那么使用'git stash'就可以将你当前未提交到本地（和服务器）的代码推入到Git的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修 Bug，等到修完Bug，提交到服务器上后，再使用'git stash apply'将以前一半的工作应用回来。也许有的人会说，那我可不可以多次将未提交的代码压入到栈中？答案是可以的。当你多次使用'git stash'命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑，'git stash list'命令可以将当前的Git栈信息打印出来，你只需要将找到对应的版本号，例如使用'git stash apply stash@{1}'就可以将你指定版本号为stash@{1}的工作取出来，当你将所有的栈都应用回来的时候，可以使用'git stash clear'来将栈清空。
在这里顺便提下git format-patch -n , n是具体某个数字， 例如 'git format-patch -1' 这时便会根据log生成一个对应的补丁，如果 'git format-patch -2' 那么便会生成2个补丁，当然前提是你的log上有至少有两个记录。

看过上面的信息，就可以知道使用场合了：当前工作区内容已被修改，但是并未完成。这时Boss来了，说前面的分支上面有一个Bug，需要立即修复。可是我又不想提交目前的修改，因为修改没有完成。但是，不提交的话，又没有办法checkout到前面的分支。此时用Git Stash就相当于备份工作区了。然后在Checkout过去修改，就能够达到保存当前工作区，并及时恢复的作用。



1. 本地分支重命名

Git branch -m oldbranchname newbranchname

2. 远程分支重命名 (假设本地分支和远程对应分支名称相同)

a. 重命名远程分支对应的本地分支

git branch -m old-local-branch-name new-local-branch-name

b. 删除远程分支

git push origin  :old-local-branch-name

c. 上传新命名的本地分支

git push origin  new-local-branch-name: new-local-branch-name

