import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { createRoot } from 'react-dom/client';
import { NestGPTFrontend } from "./NestGPTFrontend";
const container = document.getElementById('root-frontend');
// @ts-ignore
createRoot(container).render(<NestGPTFrontend />);
