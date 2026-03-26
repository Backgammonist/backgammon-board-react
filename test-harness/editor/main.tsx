import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Editor } from "./Editor";
import "@fontsource/open-sans";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Editor />
  </StrictMode>,
);
