import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Backgammon } from "../../src/components/Backgammon";
import { positionsPresets, themePresets } from "./presets";
import "@fontsource/open-sans";
import { DieValue, Direction, DoublingCube } from "../../src/types";

const urlParams = new URLSearchParams(window.location.search);
const position = urlParams.get("position");
const positions = positionsPresets[position!];

const themeParam = urlParams.get("theme");
const theme = themePresets[themeParam!];

const dice = (urlParams.get("dice")?.split(",").map(Number) || [1, 6]) as [
  DieValue,
  DieValue,
];
const direction = (urlParams.get("direction") || "clockwise") as Direction;
const doublingCubeValue = (urlParams.get("doublingValue") ||
  64) as DoublingCube["value"];
const doublingCubeOwner = (urlParams.get("doublingOwner") || undefined) as
  | DoublingCube["owner"]
  | undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ height: "100vh" }}>
      <Backgammon
        dice={dice}
        theme={theme}
        positions={positions}
        direction={direction}
        doublingCube={{ value: doublingCubeValue, owner: doublingCubeOwner }}
      />
    </div>
  </StrictMode>,
);
