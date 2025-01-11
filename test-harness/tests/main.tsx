import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Backgammon } from "../../src/components/Backgammon";
import { presets } from "./presets";

const urlParams = new URLSearchParams(window.location.search);
const preset = urlParams.get("preset");
const positions = presets[preset!];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Backgammon dice={[6, 6]} positions={positions} />
  </StrictMode>,
);
