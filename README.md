# templateDemo
react+ts+vite的后台管理模板，属于自定义脚手架的内置模版
自定义脚手架：https://www.npmjs.com/package/zkz



## 出现问题

#### 1、git commit 不触发 husky 钩子问题

对于 liux 或者 macos 系统中，可能会出现 因为没有将钩子 '.husky/pre-commit' 设置为可执行 钩子被忽略。 的错误。
这是因为当前的文件没有执行权限，只需要执行 `chmod +x .husky/pre-commit `更改文件为可执行即可


#### 2、除了src文件下面的ts类型问题必须要解决,之外使用了any(特殊情况)，提交不上去时

可以使用 `git commit -m 'feat: 提交信息' --no-verify` 跳过husky的检查，提交代码
简写为 `git commit  -m 'feat: 提交信息' -n`
