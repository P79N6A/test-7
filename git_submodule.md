git submodule
====================

简述
-------------

对于一些比较大的工程，为了便于复用，常常需要抽取子项目。
submodule项目和它的父项目本质上是2个独立的git仓库。只是父项目存储了它依赖的submodule项目的版本号信息而已。

如果你的同事更新了submodule，然后更新了父项目中依赖的版本号(submodule's commit id)。你需要在git pull之后，调用 git submodule update来更新submodule信息(*根据新的submodule's commit id, 为submodule 拉取该commit id对应的代码， 注意:若 sumodule的当前分支并没有该commit id, 则会形成所谓游离的HEAD, 执行git branch可知当前HEAD不在任何分支上*)。

更复杂一些，如果你的submodule又依赖了submodule(*层层嵌套的submodule结构*)，那么很可能你需要在git pull 和 git submodule update之后，再分别到每个submodule中再执行一次git submodule update，这里可以使用 **git submodule foreach**命令来实现： `git submodule foreach git submodule update`

git submodule update 
---------------------
有些时候你需要对submodule做一些修改，很常见的做法就是切到submodule的目录，然后做修改，然后commit和push 如：

    #同事A
    cd subrepo
    git checkout dev
    # do some change
    git add .
    git commit -m "change subrepo from branch dev"
    cd .. #回到mainrepo
    git status
    git add .
    git commit -m "update subrepo's commit id which is on dev branch"
    git push 

    #同事B
    git pull origin mainrepo #获取到submodule最新的commit id, 但同事B的subreop目录，处于master分支下，而master分支又没有这个commit id，那么问题就来了。
    git submodule update #同事B此时会把subrepo's master分支，更新到与其无关联的commit id上. 

 
注意：**默认git submodule update并不会将submodule切到任何branch**，所以，默认下submodule的HEAD是处于游离状态的(‘detached HEAD’ state)。所以同事A在修改前，记得一定要用git checkout master将当前的submodule分支切换到master，然后才能做修改和提交。

### git cherry-pick

如果同事A不慎忘记切换到master分支，又做了提交，同事B可以用cherry-pick命令挽救。具体做法如下：
1.用 git checkout master 将HEAD从游离状态切换到 master 分支, 这时候，git会报Warning说有一个提交没有在branch上，记住这个提交的change-id（假如change-id为 aaaa)
2.用 git cherry-pick aaaa 来将刚刚的提交作用在master分支上(*相当于在master上回放aaa这次提交的内容*)
3.用 git push 将更新提交到远程版本库中
 
以下是相关命令的操作示范和命令行输出结果：

    1. ui_common git:(df697f9) git checkout master
    2.Warning: you are leaving 1 commit behind, not connected to
    3.any of your branches:
    4.
    5.  df697f9 forget to check out master
    6.
    7.If you want to keep them by creating a new branch, this may be a good time
    8.to do so with:
    9.
    10. git branch new_branch_name df697f911e5a0f09d883f8f360977e470c53d81e
    11.
    12.Switched to branch 'master'
    13. ui_common git:(master) git cherry-pick df697f9


git submodule 使用实例
----------------------------

    1. 在本地创建远程仓库
    mkdir submd/repos
    cd submd/repos
    git --git-dir=lib1.git init --bare
    git --git-dir=lib2.git init --bare
    git --git-dir=prj1.git init --bare
    git --git-dir=prj2.git init --bare

    2. 创建本地仓库
    mkdir submd/ws
    cd submd/ws
    git clone ../repos/prj1.git 
    cd prj1
    echo "project1 here" > readme.txt
    git add .
    git commit -m "init project1"
    git push origin master
    #同样方式 创建prj2
    ...
    #初始化lib1
    git clone ../repos/lib1.git
    cd lib1
    echo "i am lib1" > hello-lib1.txt
    git add .
    git commit -m "init lib1"
    git push origin master
    #同样方式 创建lib2

    #为主项目添加submodule




---------------------

submodule是固定commit的clone,默认为head
执行git submodule add (*submodule信息写入.gitmodules*)或对于新clone下来宿主项目执行 git submodule update后，得到的submodule的clone是处于头指针脱离状态，
在其目录中执行git branch可以看到当前没有指向任何分支。去.git/modules/xxx中查看HEAD文件，其内容为commit id而不是通常的ref。

你可以在本地的子模块中进行checkout改变分支指向，比如git checkout master使得子模块工作区改为master分支，并且可以在其中修改文件并提交和push。如果子模块工作区的提交改变了，宿主工作区中使用git diff可以看到子模块的提交id改变了：

    $ git diff
    diff --git a/liba b/liba
    index 7670a59..dfde1a8 160000
    --- a/liba
    +++ b/liba
    @@ -1 +1 @@
    -Subproject commit 7670a59e37273cdcab931df28d4c9904743e7f19
    +Subproject commit dfde1a8bf4672e8fb6626da6fb5d5f6f1bb80ed7


如果你在宿主工作区执行git add和git commit，就是修改子模块的提交id为你刚刚执行的提交。并且你可以对宿主进行git push。但是别的机子执行git pull 和git submodule update后子模块工作区的指向还是固定的提交id（你最新提交的那个）而不是master，

因此，git的子模块就是指向固定的提交id，当然这个提交id可以改变的。

一般情况下，使用子模块的项目的程序员不会修改子模块项目，因为子模块的项目往往是由外部的团队维护的，所以宿主项目的程序需要做的是当子模块的项目版本更新时更新子模块的提交ID，可以通过tag来管理子模块的更新：
当维护子模块的程序员给子模块对应的项目在master分支上打了一个tag,并把tag push到服务器上的共享库中。宿主项目的主程序需要在本机进入子模块工作区，执行git tag来查看tag列表。执行git checkout tagX 将子模块的工作区切换到tagX对应的提交id上，然后再推出到上层宿主项目工作区，使用git diff查看是否子模块的提交id改变了，如果改变了执行git add, git commit更新子模块对应的提交id。

分支和submodule:
submodule是属于分支的，不同的分支可以设定submodule不同的提交id, check out到新分支需要执行git submodule update来更新submodule

------------------

git submodule 使用：

+ git submodule init: 
    执行`git submodule add` 会创建 `.gitmodules` 或新增內容，此时需用 `git submodule init` 更新你的 `.git/config` 创建子项目目录和增加 submodule 的 remote URL。

+ git submodule update: 
    在 init 完有新的submodule commit id 后，就可以拉取对应的代码。若其他人更新 submodule造成你拿到新的 commit id 时，你可以直接用 gitsubmodule update 做更新即可(不需要做任何 add 或commit 的操作)！

+ 修改 Submodule 的內容

    有时自己也是Submodule 的 Owner，碰到要改 Code 时，要我切回原本的 Git 开发目录有点麻烦... 不如直接改到 Submodule 目录修改！

        1. 到 submodule 目录去做些修改：
        2. $ cd static/platform
        3. $ vim README # 做些修改
        4.   接著就是 git add , git commit, git push
        5. $ git add README
        6. $ git commit -m "Addcomments"
        7. $ git push
        8.   push 完回到根目录git status 看一下
        9. $ git status
        10.     # On branch master
        11.     # Changed but not updated:
        12.     #   (use "git add ..." to update whatwill be committed)
        13.     #   (use "git checkout -- ..." todiscard changes in working directory)
        14.     #
        15.     #       modified:   static/platform
        16.     # no changes added to commit (use "git add" and/or "gitcommit -a")
        17. 这里也需要再做一次 Commit 喔！
        18.     $ git add static/platform
        19.     $ git commit -m 'Submodule updated'
        20.     $ git push

    > 这里有一点非常需要注意，因为 Submodule 的更新只记录 commit id，所以你必须先在 submodule 內做 commit、push 后，再到 parent git 做 push，不然出现些版本错乱的问题。

如何移除 Submodule
这点非常不直观，不是想像中 git submodule remove [欲删除的目录] 这么简单...

    1.先修改 .gitmodules，将相关内容移除：
      $ vim .gitmodules
    2.再砍掉目录：
      $ git rm --cached [待删除的目录]
      $ rm -rf [待删除的目录] 将相关内容删除
    3.再修改 .git/config
      $ vim .git/config 将相关内容删除
    4.最后再 commit，改变整个 Repository。
    5. $ git add .gitmodules
    6. $ git commit -m "Remove a submodule"
    7.安全起见在执行一下 sync：
    $ git submodule sync