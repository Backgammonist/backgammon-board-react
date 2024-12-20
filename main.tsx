import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Backgammon } from "./src/components/Backgammon";
import { PlayerType } from "./src/types";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Backgammon dice={[6, 6]} />
  </StrictMode>,
);
