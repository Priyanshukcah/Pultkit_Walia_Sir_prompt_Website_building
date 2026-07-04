# Part 2 — Combined Handbook (Mega Prompt + Prompts + Training Guide)

All formats are generated from the same source markdown:
- `../Part 2/mega-prompt.md`
- `../Part 2/prompts.md`
- `../Part 2/training-guide.md`

| File | Use it for |
|---|---|
| `Part2-Combined.pdf` | Hand-out / print / WhatsApp share / email attachment (color-coded, syntax-highlighted, 40+ pages, clickable TOC) |
| `Part2-Combined.docx` | Edit in MS Word / Google Docs (keeps syntax highlighting and TOC) |
| `Part2-Combined.html` | Open in any browser; same source, lighter weight, easy to host |
| `Part2-Combined.epub` | Read on Kindle / Apple Books / Google Play Books on phone or tablet |
| `Part2-Combined-Bundle.zip` | One file containing **all four** above — easiest single-click share |

## Re-build

```bash
bash build.sh
```

Requires `pandoc` (`brew install pandoc`) and Google Chrome (used in headless mode for PDF). All other rendering (TOC, syntax highlighting, embedded CSS) is handled by pandoc.

## Customise the look

Edit `style.css` (controls PDF + HTML) or `cover.html` (cover page), then re-run `build.sh`.
