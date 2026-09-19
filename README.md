# dsh-rename

Adds `/rename` to [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), so the current session can be retitled without leaving the composer.

[中文](README.zh.md)

DSH already ships a rename dialog (sidebar → session row → `⋯` → Rename). This plugin adds the keyboard path. Both call the same service and append the same `session/title` event, so the two can never disagree.

## Install

```sh
dsh plugin --profile web add dsh-rename
```

Then refresh the page — no restart needed in most setups.

## Use

```
/rename Weekly report draft
```

The accepted title is echoed back, which matters when it gets truncated: DSH's web profile caps titles at 80 UTF-8 bytes. Empty input prints usage.

A manual rename pins the title — DSH stops replacing it with generated ones.

## Config

Only needed if something else already owns `/rename`. In your profile's `cordis.patch.yml`:

```yaml
- id: dsh-rename
  config:
    command: retitle
```

## How it works

One call: `ctx.sessionTitle.rename(agent.session, title)`. Text normalization, the byte cap, the durable `session/title` event and the pinning rule all stay in DSH's own title service — this plugin reimplements none of it. The session log remains the single source of truth, so every view (sidebar, session list, projection cache) follows on its own.

## Requirements

dsh >= 0.1.5-rc.1 · Node >= 20 · pure JS, no native or platform-specific code

## License

MIT
