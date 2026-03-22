# backgammon-board-react

A React component library for rendering a backgammon board. Displays positions, dice, and the doubling cube as a scalable SVG. Fully typed with TypeScript.

## Installation

```bash
npm install backgammon-board-react
# or
pnpm add backgammon-board-react
# or
yarn add backgammon-board-react
```

**Peer dependencies** — make sure these are already in your project:

```bash
npm install react react-dom
```

Supports React 17, 18, and 19.

## Quick start

```tsx
import { Backgammon } from "backgammon-board-react";

export default function App() {
  return (
    <Backgammon
      positions={[
        { position: 1, playerType: "opponent", numberOfCheckers: 2 },
        { position: 6, playerType: "player", numberOfCheckers: 5 },
        { position: 8, playerType: "player", numberOfCheckers: 3 },
        { position: 12, playerType: "opponent", numberOfCheckers: 5 },
        { position: 13, playerType: "player", numberOfCheckers: 5 },
        { position: 17, playerType: "opponent", numberOfCheckers: 3 },
        { position: 19, playerType: "opponent", numberOfCheckers: 5 },
        { position: 24, playerType: "player", numberOfCheckers: 2 },
      ]}
      dice={[3, 5]}
    />
  );
}
```

## Board layout

Positions follow the standard backgammon numbering from the **player's** perspective:

```
  13 14 15 16 17 18 | BAR | 19 20 21 22 23 24
  ──────────────────────────────────────────
  12 11 10  9  8  7 |     |  6  5  4  3  2  1
```

- **`1–24`** — points on the board
- **`0`** — player's home/off (checkers borne off by player)
- **`25`** — opponent's home/off (checkers borne off by opponent)
- **`"bar"`** — the centre bar; both players can have checkers here

## Props

### `<Backgammon>`

| Prop           | Type                                       | Default       | Description                                          |
| -------------- | ------------------------------------------ | ------------- | ---------------------------------------------------- |
| `positions`    | `Position[]`                               | `[]`          | Checker placement on the board                       |
| `dice`         | `[DieValue, DieValue] \| [DieValue] \| []` | `[]`          | Dice to display (1–6 each)                           |
| `doublingCube` | `DoublingCube`                             | —             | Doubling cube state                                  |
| `direction`    | `'clockwise' \| 'anticlockwise'`           | `'clockwise'` | Direction the player moves checkers around the board |
| `preset`       | `'default' \| 'warm'`                      | `'default'`   | Built-in colour theme                                |
| `theme`        | `Theme`                                    | —             | Custom colour theme (overrides `preset`)             |

### `Position`

```ts
type Position = {
  playerType:       'player' | 'opponent';
  position:         0 | 1 | 2 | ... | 24 | 25 | 'bar';
  numberOfCheckers: 1 | 2 | ... | 15;
};
```

### `DoublingCube`

```ts
type DoublingCube = {
  value: 2 | 4 | 8 | 16 | 32;
  owner?: "player" | "opponent" | null; // null = centre (unclaimed)
};
```

### `Theme`

```ts
type Theme = {
  backgroundColor: string;
  borderColor: string;
  pointColor: string;
  pointNumberColor: string;
  altPointColor: string;
  playerCheckerColor: string;
  playerCheckerBorderColor: string;
  opponentCheckerColor: string;
  opponentCheckerBorderColor: string;
  doublingCubeColor: string;
};
```

## Examples

### Using a built-in theme preset

```tsx
<Backgammon preset="warm" positions={positions} dice={[6, 6]} />
```

Available presets: `'default'` (light tan, teal points) and `'warm'` (burlap, dark red points).

### Custom theme

```tsx
<Backgammon
  positions={positions}
  theme={{
    backgroundColor: "#1a1a2e",
    borderColor: "#16213e",
    pointColor: "#0f3460",
    pointNumberColor: "#e94560",
    altPointColor: "#533483",
    playerCheckerColor: "#e94560",
    playerCheckerBorderColor: "#ffffff",
    opponentCheckerColor: "#ffffff",
    opponentCheckerBorderColor: "#e94560",
    doublingCubeColor: "#e94560",
  }}
/>
```

### Checkers on the bar

```tsx
<Backgammon
  positions={[
    { position: "bar", playerType: "player", numberOfCheckers: 1 },
    { position: "bar", playerType: "opponent", numberOfCheckers: 2 },
  ]}
/>
```

### Borne-off checkers

Use position `0` for the player and `25` for the opponent:

```tsx
<Backgammon
  positions={[
    { position: 0, playerType: "player", numberOfCheckers: 3 },
    { position: 25, playerType: "opponent", numberOfCheckers: 1 },
  ]}
/>
```

### Doubling cube

```tsx
<Backgammon
  positions={positions}
  doublingCube={{ value: 4, owner: "player" }}
/>
```

### Controlled game state

The component is intentionally stateless — it renders whatever you pass as props. Wire it to your own state or game engine:

```tsx
import { useState } from "react";
import { Backgammon } from "backgammon-board-react";
import type { Position } from "backgammon-board-react";

const INITIAL_POSITIONS: Position[] = [
  { position: 1, playerType: "opponent", numberOfCheckers: 2 },
  { position: 6, playerType: "player", numberOfCheckers: 5 },
  { position: 8, playerType: "player", numberOfCheckers: 3 },
  { position: 12, playerType: "opponent", numberOfCheckers: 5 },
  { position: 13, playerType: "player", numberOfCheckers: 5 },
  { position: 17, playerType: "opponent", numberOfCheckers: 3 },
  { position: 19, playerType: "opponent", numberOfCheckers: 5 },
  { position: 24, playerType: "player", numberOfCheckers: 2 },
];

export default function Game() {
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [dice, setDice] = useState<[number, number]>([1, 1]);

  const roll = () =>
    setDice([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)] as [
      number,
      number,
    ]);

  return (
    <>
      <Backgammon positions={positions} dice={dice} />
      <button onClick={roll}>Roll</button>
    </>
  );
}
```

## Next.js

The package ships with a `'use client'` directive banner. You can import it directly inside a Client Component without any additional configuration:

```tsx
// app/game/page.tsx
"use client";

import { Backgammon } from "backgammon-board-react";

export default function GamePage() {
  return <Backgammon preset="default" />;
}
```

## TypeScript

All types are exported from the package entry point:

```ts
import type {
  Position,
  PlayerType,
  DieValue,
  DoublingCube,
  Direction,
  Theme,
} from "backgammon-board-react";
```

## License

MIT
