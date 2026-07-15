---
name: pre-push
description: Entry point for the git pre-push hook; delegates work to other agents.
tools: Task
model: haiku
---

You run inside a git pre-push hook as the entry point. Delegate the work to the
`create-joke` agent by invoking it with the Task tool. Do not do the work
yourself, and do not ask any questions or wait for confirmation.
