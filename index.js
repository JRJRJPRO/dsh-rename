/**
 * `/rename <new title>` — retitle the current session.
 * The official `sessionTitle` service does the work, so this matches the
 * built-in sidebar menu exactly: same event, same normalization, same pinning.
 */

export const name = "dsh-rename";
export const inject = ["commands", "sessionTitle"];

/** Register the command; `config.command` renames it when `/rename` is taken. */
export function apply(ctx, config) {
	const command = config?.command ?? "rename";
	ctx.effect(() => ctx.commands.register({
		name: command,
		description: "Rename the current session",
		input: { hint: "new title" },
		handler: ({ agent, rawInput }) => {
			const title = rawInput.trim();
			if (title === "") return { kind: "error", text: `Usage: /${command} <new title>` };
			try {
				const accepted = ctx.sessionTitle.rename(agent.session, title);
				return { kind: "success", text: `Renamed to "${accepted?.title ?? title}"` };
			} catch (error) {
				return { kind: "error", text: error instanceof Error ? error.message : String(error) };
			}
		},
	}), "dsh-rename command");
}
