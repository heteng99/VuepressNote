---
title: git 常用命令
date: 2022/07/21
author: hht
sidebar: 'auto'
tags:
 - git
categories: 
 - git
---

## 初始化 git init

初始化目录，生成 .git 目录

```bash
$ git init
```

## 本地仓库状态 git status

```bash
# 查看本地仓库的状态
$ git status
# output: 查表
$ git status -s
```
:::tip
查看[状态对照表](https://git-scm.com/docs/git-status)
:::

## 远程仓库操作 git remote

```bash
# 列出已经存在的远程仓库
$ git remote
# 列出远程仓库的详细信息，在别名后面列出URL地址
$ git remote -v
$ git remote --verbose
# 添加远程仓库
$ git remote add <远程仓库的别名> <远程仓库的URL地址>
# 修改远程仓库的别名
$ git remote rename <原远程仓库的别名> <新的别名>
# 删除指定名称的远程仓库
$ git remote remove <远程仓库的别名>
# 修改远程仓库的 URL 地址
$ git remote set-url <远程仓库的别名> <新的远程仓库URL地址>
```

## 添加至暂存区 git add

把要提交的文件的信息添加到**暂存区**中

```bash
# 把指定的文件添加到暂存区中
$ git add <文件路径>
# 添加所有修改、已删除的文件到暂存区中
$ git add -u [<文件路径>]
$ git add --update [<文件路径>]
# 添加所有修改、已删除、新增的文件到暂存区中，省略 <文件路径> 即为当前目录
$ git add -A [<文件路径>]
$ git add --all [<文件路径>]
$ git add .
# 查看所有修改、已删除但没有提交的文件，进入一个子命令系统
$ git add -i [<文件路径>]
$ git add --interactive [<文件路径>]
```

## 提交到本地仓库 git commit

将**暂存区**中的文件提交到**本地仓库**中

```bash
# 把暂存区中的文件提交到本地仓库，调用文本编辑器输入该次提交的描述信息
$ git commit
# 把暂存区中的文件提交到本地仓库中并添加描述信息
$ git commit -m "<提交的描述信息>"
# 把所有修改、已删除的文件提交到本地仓库中
# 不包括未被版本库跟踪的文件，等同于先调用了 "git add -u"
$ git commit -a -m "<提交的描述信息>"
# 修改上次提交的描述信息
# 如果有文件变更，先添加到暂存区
$ git add .
$ git commit --amend
```

## 推送至远程仓库 git push

```bash
# 把本地仓库的分支推送到远程仓库的指定分支
$ git push <远程仓库的别名> <本地分支名>:<远程分支名>
# 把所有commit推送到远程仓库
$ git push <远程仓库的别名> --all
# 删除指定的远程仓库的分支
$ git push <远程仓库的别名> :<远程分支名>
$ git push <远程仓库的别名> --delete <远程分支名>
```

## 拉取 git fetch 

从远程仓库获取最新的版本到本地的临时分支（tmp）上

```bash
# 将远程仓库所有分支的最新版本全部取回到本地
$ git fetch <远程仓库的别名>
# 将远程仓库指定分支的最新版本取回到本地
$ git fetch <远程主机名> <分支名>
```

## 拉取合并 git pull 

相当于先 `git fetch` 再 `git merge`

```bash
$ git pull --all
```

## 分支操作 git branch 

```bash
# 列出本地的所有分支，当前所在分支以 "*" 标出
$ git branch
# 列出本地的所有分支并显示最后一次提交，当前所在分支以 "*" 标出
$ git branch -v
# 创建新分支，新的分支基于上一次提交建立
$ git branch <分支名>
# 修改分支名称
# 如果不指定原分支名称则为当前所在分支
$ git branch -m [<原分支名称>] <新的分支名称>
# 强制修改分支名称
$ git branch -M [<原分支名称>] <新的分支名称>
# 删除指定的本地分支
$ git branch -d <分支名称>
# 强制删除指定的本地分支
$ git branch -D <分支名称>
# 关联本地分支和远程分支
$ git branch --set-upstream-to=<远程仓库名>/<分支名称> <远程分支名称>
```

## 切换分支 git checkout

```bash
# 切换到已存在的指定分支
$ git checkout <分支名称>
# 创建并切换到指定的分支，保留所有的提交记录
# 等同于 "git branch" 和 "git checkout" 两个命令合并
$ git checkout -b <分支名称>
# 创建并切换到指定的分支，删除所有的提交记录
$ git checkout --orphan <分支名称>
# 替换掉本地的改动，新增的文件和已经添加到暂存区的内容不受影响
$ git checkout <文件路径>
```

## 合并 git merge 

```bash
$ git merge <分支名称>
```

终止 MERGING 状态

```bash
$ git merge --abort
```

## 变基操作 git rebase
```bash
# 将当前分支的 commits 变基到目标分支
$ git rebase <目标分支> [<源分支>]

# 取出 client 分支，找出它从 server 分支分歧之后的补丁
# 然后把这些补丁在 master 分支上重放一遍
# 让 client 看起来像直接基于 master 修改一样
$ git rebase --onto master server client
```

## 显示信息 git log

```bash
$ git log [--oneline] [--graph] [-<指定数量>]
```

## 重置提交 git reset

```bash
# 重置暂存区，但文件不受影响
# 相当于将用 "git add" 命令更新到暂存区的内容撤出暂存区，可以指定文件
# 没有指定 commit ID 则默认为当前 HEAD
$ git reset [<文件路径>]
$ git reset --mixed [<文件路径>]
# 将 HEAD 的指向改变，撤销到指定的提交记录，文件未修改
$ git reset <commit ID>
$ git reset --mixed <commit ID>
# 将 HEAD 的指向改变，撤销到指定的提交记录，文件未修改
# 相当于调用 "git reset --mixed" 命令后又做了一次 "git add"
$ git reset --soft <commit ID>
# 将 HEAD 的指向改变，撤销到指定的提交记录，文件也修改了
$ git reset --hard <commit ID>
```

## 撤回提交 git revert

生成一个**新的提交**来撤销某次提交

```bash
# 生成一个新的提交来撤销某次提交
$ git revert <commit ID>
```

## 标签 git tag

```bash
# 打印所有的标签
$ git tag
# 添加轻量标签，指向提交对象的引用，可以指定之前的提交记录
$ git tag <标签名称> [<commit ID>]
# 添加带有描述信息的附注标签，可以指定之前的提交记录
$ git tag -a <标签名称> -m <标签描述信息> [<commit ID>]
# 切换到指定的标签
$ git checkout <标签名称>
# 查看标签的信息
$ git show <标签名称>
# 删除指定的标签
$ git tag -d <标签名称>
# 将指定的标签提交到远程仓库
$ git push <远程仓库的别名> <标签名称>
# 将本地所有的标签全部提交到远程仓库
$ git push <远程仓库的别名> –-tags
```

## 获取最新代码并覆盖

```bash
$ git fetch
# Remove untracked files from the working tree
$ git clean -f
$ git reset --hard <远程仓库>/<远程分支>
```