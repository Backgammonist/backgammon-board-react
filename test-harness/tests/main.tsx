import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Backgammon } from "../../src/components/Backgammon";
import { positionsPresets, themePresets } from "./presets";

const urlParams = new URLSearchParams(window.location.search);
const position = urlParams.get("position");
const positions = positionsPresets[position!];

const themeParam = urlParams.get("theme");
const theme = themePresets[themeParam!];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Backgammon dice={[6, 6]} theme={theme} positions={positions} />
  </StrictMode>,
);
