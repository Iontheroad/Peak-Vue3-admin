## 简介

Peak-Vue3-Admin 一个功能简洁的免费开源的后台模板, 基于 Vite5 + Vue3.x + Setup + TypeScript + Element-Plus + Pinia + Mockjs 等目前最新技术栈开发, 参考了各种后台项目的优点并对移动端进行了适配，对项目整体逻辑、结构、样式重构梳理，具备了一定规范的模块化开发。本项目对代码进行了友好的注释，大大降低了开发和学习的成本，既可以学习又可以基于模板功能二次开发。

## 功能

- 使用 Vite5 构建项目、Vue3.x + TypeScript 并使用了 setup 语法糖方式书写
- 支持 i18n 国际化、页面结构主题色配置等
- 集成 Prettier、 ESLint、Stylelint 代码规范
- 实现 VueRouter 配置动态路由(扁平和嵌套两种注入方式)、页面按钮权限, KeepAlive 组件实现页面缓存
- 各种业务级自定义指令和功能函数
- 基于ThreeJS 加载 fbx 模型组件
- 基于业务功能场景的各种表格组件功能实现
- 仿掘金评论区结构(模拟评论区所需数据结构)
- 全景图实现方案(photo-sphere-viewer 或 Krpano)
- 拖动组件，ECharts 可视化图表封装切换
- 功能模块不断迭代增加...

## 代码仓库

- Gitee(https://gitee.com/Iontheroad/peak-vue3-admin)
- GitHub(https://github.com/Iontheroad/Peak-Vue3-admin)

## 演示地址

- http://iontheroad.gitee.io/peak-vue3-admin

## 安装

[^注意事项]: node 版本 16 以上

```shell
git clone https://gitee.com/Iontheroad/peak-vue3-admin.git
pnpm install
pnpm dev
```

## 分支管理

**处于开发状态，预览项目请切换 dev_zgf**

- main: 主分支(代码相对 dev_zgf 落后较大)
- dev_zgf: 功能开发迭代分支(最新)
- pages: 静态资源部署

## 规范 TODO

**任务相关:**

- BUG: 用来标记 BUG 或者问题~

- FIXME: 用来标记一些需要修复的位置，可以快速定位(已知的无法运行的代码)。

- TODO: 用来标记待办的地方,当天没有完成第二天需要继续的任务。

- NOTE: 添加一些说明文字。

- TAG: 用来创建一些标记。

- RESOLVED:已解决的 bug 等问题。

**优化和改进相关:**

- HACK: 用来标记可能需要更改的地方。在写代码的时候，有的地方我们并不确定他是正确的，可能未来有所更改，这时候可以使用 HACK 标记。

- XXX: 用来标记一些草率实现的地方。在写代码的时候，有些地方需要频繁修改，这时候使用 XXX 标记。

- OPTIMIZE: 需要优化的代码或需要进一步优化的方案。

- QUESTION: 标记需要回答的问题或需要进一步确认的事项。

- IDEA: 代码中的新想法或新方案，需要进一步讨论或实现。

## Git 提交规范

**Git 提交规范可以使用以下格式：**

```git
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中，`<type>`和`<subject>`是必填项，其他为可选项。

- `<type>`：提交的类型，建议使用以下类型之一：

  - `feat`：新功能
  - `fix`：修复问题
  - `docs`：修改文档
  - `style`：修改代码格式，不影响代码逻辑
  - `refactor`：重构代码，既不修复问题也不添加新功能
  - `test`：添加或修改测试代码
  - `chore`：修改构建流程或辅助工具

- `<scope>`：修改的范围，可以是文件名、模块名等等

- `<subject>`：简短描述修改的内容

- `<body>`：详细描述修改的内容，可以分多行

- `<footer>`：一些备注信息，例如关联的 issue 编号等

例如：

```shell
feat(login): 添加邮箱登录功能
添加了用户可以使用邮箱登录的功能，同时更新了登录页面的UI
Closes #123
```

这样的提交规范可以帮助团队更好地管理和维护代码库，提高代码质量和可读性。

#### 提交示例

在命令行中提交使用这种规范，可以先在本地仓库中进行修改和提交，然后使用以下命令进行提交：

```shell
git commit -m "<type>(<scope>): <subject>" -m "<body>" -m "<footer>"
```

**其中，**`-m`**选项表示提交信息中的一行，需要使用多次**`-m`**选项来添加多行信息。**

例如，我们使用以下命令提交一个新功能的修改：

```shell
git commit -m "feat(login): 添加邮箱登录功能" -m "添加了用户可以使用邮箱登录的功能，同时更新了登录页面的UI." -m "Closes #123"
```

这样就可以将修改提交到本地仓库中了。如果需要将修改推送到远程仓库，可以使用`git push`命令。
