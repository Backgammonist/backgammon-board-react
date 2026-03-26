# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-03-26

Initial public release.

### Added

- `Backgammon` component — the main board component accepting a `BoardState` prop
- `direction` prop (`"clockwise"` | `"anticlockwise"`) to control which way the player moves (#8)
- Bar component to display hit checkers (#6)
- Dice display via `dice` prop — supports one or two dice values (#1)
- Doubling cube display via `doublingCube` prop with owner and value (#1)
- Pip counter in the sidebar (#1)
- `preset` prop with 7 built-in themes: `default`, `felt`, `coral`, `forest`, `rose`, `arctic`, `sand` (#10)
- `theme` prop for fully custom theming via a `Theme` object
- `positions` prop to render checker positions on the board
- SVG-based rendering for crisp display at any size
- Full TypeScript types exported (`BoardState`, `Theme`, `Position`, `DoublingCube`, `DieValue`, `Direction`, `PlayerType`)
- ESM and UMD builds with type declarations
- Peer dependency support for React 17, 18, and 19
