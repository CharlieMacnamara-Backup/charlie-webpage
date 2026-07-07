# Helix Cheat Sheet — MD/MDX Content Editing

## Movement

| Key | Description |
|-----|-------------|
| `h/j/k/l` | Left / Down / Up / Right |
| `w/b/e` | Next word start / Prev word start / Next word end |
| `W/B/E` | Same but by WORD (punctuation included) |
| `f<char>` | Jump forward to next `<char>` |
| `F<char>` | Jump backward to previous `<char>` |
| `t<char>` | Jump till before next `<char>` |
| `gg` / `G` | Start / End of file |
| `<n>gg` | Go to line `<n>` |
| `Ctrl-u` / `Ctrl-d` | Half page up / down |
| `Ctrl-i` / `Ctrl-o` | Jump forward / backward in jumplist |
| `Alt-.` | Repeat last `f`/`t`/`m` motion |

## Editing

| Key | Description |
|-----|-------------|
| `i` / `a` | Insert before / after cursor |
| `I` / `A` | Insert at line start / end |
| `o` / `O` | Open new line below / above |
| `d` | Delete selection |
| `c` | Change selection (delete + insert) |
| `y` | Yank (copy) selection |
| `p` / `P` | Paste after / before selection |
| `u` / `U` | Undo / Redo |
| `.` | Repeat last insert |
| `r<char>` | Replace character |
| `>` / `<` | Indent / Unindent |
| `Ctrl-a` / `Ctrl-x` | Increment / Decrement number |

## Selection & Multiple Cursors

| Key | Description |
|-----|-------------|
| `v` | Enter select (extend) mode |
| `x` | Select current line (press again to extend) |
| `%` | Select entire file |
| `s<regex>` | Select all regex matches in selection |
| `C` | Add cursor below (copy selection to next line) |
| `Alt-C` | Add cursor above |
| `,` | Keep only primary selection |
| `;` | Collapse to single cursor |
| `K<regex>` | Keep only matching selections |
| `Alt-K<regex>` | Remove matching selections |
| `Space + h` | Select references of symbol under cursor |

## Search & Replace

| Key | Description |
|-----|-------------|
| `/` | Search forward |
| `?` | Search backward |
| `n` / `N` | Next / Previous match |
| `*` | Search word under cursor |
| `s<regex><ret>c<text><esc>` | Find & replace in selection |

## Formatting (MD/MDX)

| Key | Description |
|-----|-------------|
| `=` | Format selection via LSP/formatter |
| `:fmt` | Format entire file |
| `:format` | Same as above |

## File & Buffer

| Key | Description |
|-----|-------------|
| `:w` | Save file |
| `:q` | Quit |
| `:q!` | Force quit |
| `:wq` | Save and quit |
| `:o <file>` | Open file |
| `Space + f` | File picker at workspace root |
| `Space + F` | File picker at current dir |
| `Space + b` | Buffer picker |
| `Space + /` | Global search in workspace |

## Splits & Windows

| Key | Description |
|-----|-------------|
| `Ctrl-w v` | Vertical split |
| `Ctrl-w s` | Horizontal split |
| `Ctrl-w h/j/k/l` | Move to left/down/up/right split |
| `Ctrl-w q` | Close current window |
| `Ctrl-w o` | Keep only current window |
| `:hsplit <file>` / `:vsplit <file>` | Open file in split |

## Space Mode (Common)

| Key | Description |
|-----|-------------|
| `Space + f` | File picker |
| `Space + b` | Buffer picker |
| `Space + s` | Document symbol picker |
| `Space + S` | Workspace symbol picker |
| `Space + /` | Global search |
| `Space + k` | Hover docs (LSP) |
| `Space + r` | Rename symbol (LSP) |
| `Space + a` | Code actions (LSP) |
| `Space + c` | Comment/uncomment |
| `Space + d` | Document diagnostics (LSP) |
| `Space + y` | Yank to clipboard |
| `Space + p` | Paste from clipboard |
| `Space + ?` | Command palette |

## Shell

| Key | Description |
|-----|-------------|
| <code>\|</code> | Pipe selection through shell command |
| `!` | Insert shell output before selection |
| `Ctrl-z` | Suspend Helix (resume with `fg`) |

## Goto Mode (`g`)

| Key | Description |
|-----|-------------|
| `gg` | Start of file |
| `ge` | End of file |
| `gd` | Go to definition (LSP) |
| `gr` | Go to references (LSP) |
| `gn` | Next buffer |
| `gp` | Previous buffer |
| `gh` | Start of line |
| `gl` | End of line |
| `gs` | First non-whitespace on line |

## Match Mode (`m`)

| Key | Description |
|-----|-------------|
| `mm` | Go to matching bracket |
| `ms<char>` | Surround selection with `<char>` |
| `mr<from><to>` | Replace surround |
| `md<char>` | Delete surround |
| `mi<object>` | Select inside textobject |
| `ma<object>` | Select around textobject |

## Unimpaired (`[` / `]`)

| Key | Description |
|-----|-------------|
| `]d` / `[d` | Next / Previous diagnostic (LSP) |
| `]f` / `[f` | Next / Previous function |
| `]p` / `[p` | Next / Previous paragraph |
| `] Space` / `[ Space` | Add newline below / above |

## Tips for MD/MDX

- Use `Space + /` for full-text search across all content files
- Use `s<regex>` inside selection for targeted find-and-replace
- Use `*` to search for word under cursor and `n`/`N` to cycle
- Format with `:fmt` to clean up Prettier-formatted content
- Use `f`/`t` to navigate quickly inside long paragraphs
- `Alt-o` / `Alt-i` expands/shrinks selection by syntax tree
- Multiple cursors with `C` and `s<regex>` are great for bulk edits
