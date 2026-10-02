## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

<!-- new-project:begin (managed by /new-project; edits inside are overwritten) -->
## Standing rules
- When updating or fixing an existing script, return the complete updated file with all changes integrated. No snippets, diffs, or find-and-replace instructions.
- Use current, non-deprecated methods and syntax for the target OS or framework version.
- Review syntax, dependencies, and logic before output so the code runs as delivered.
- Apply the installed design skills (Emil Kowalski, Impeccable, Taste, UI UX Pro Max) to all UI work.
- Verify UI changes with Playwright MCP (screenshots at mobile and desktop widths) before declaring the work done.
<!-- new-project:end -->
