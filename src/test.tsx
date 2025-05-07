
import React from "react";
import { createRoot } from 'react-dom/client';
import TestRoot from "./TestRoot";

createRoot(document.querySelector("#app") as HTMLBodyElement).render(<TestRoot />);