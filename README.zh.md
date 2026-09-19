# dsh-rename

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 加一个 `/rename`，不离开输入框就能改当前会话的名字。

[English](README.md)

DSH 自带重命名弹窗（侧边栏 → 会话行 → `⋯` → 重命名会话），本插件补的是键盘入口。两者调用同一个服务、写同一条 `session/title` 事件，不会出现两套名字。

## 安装

```sh
dsh plugin --profile web add dsh-rename
```

装完刷新页面即可，一般不用重启。

## 用法

```
/rename 周报初稿
```

回显的是真正被接受的标题——超长会被截断时能看出来（DSH 的 web profile 把标题限制在 80 个 UTF-8 字节）。输入为空时打印用法。

手动改过名之后标题就被钉住了，DSH 不会再用自动生成的标题覆盖它。

## 配置

只有在 `/rename` 已被别的插件占用时才需要。写进 profile 的 `cordis.patch.yml`：

```yaml
- id: dsh-rename
  config:
    command: retitle
```

## 原理

只有一次调用：`ctx.sessionTitle.rename(agent.session, title)`。文本清洗、字节上限、`session/title` 事件的持久化、以及「手动改名后不再被自动标题覆盖」的规则，全部留在 DSH 自己的标题服务里，本插件一行都没有重写。会话日志始终是唯一真源，所以侧边栏、会话列表、投影缓存都会自己跟上。

## 环境要求

dsh >= 0.1.5-rc.1 · Node >= 20 · 纯 JS，无原生依赖、无平台相关代码

## 许可

MIT
