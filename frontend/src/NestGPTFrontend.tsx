import React from "react";

// @ts-ignore
const vscode = typeof acquireVsCodeApi !== 'undefined' ? acquireVsCodeApi() : {};

// @ts-ignore
const App = React.lazy(() => import("nestgptfront/App"));

export const NestGPTFrontend = () => {
  return (
    <React.Suspense fallback="Loading App">
      <App vscode={vscode} name="minifront" />
    </React.Suspense>
  );
};
