import React from "react";

// @ts-ignore
const canAcquire = typeof acquireVsCodeApi !== "undefined";
// @ts-ignore
const vscode = canAcquire ? acquireVsCodeApi() : {};

console.log("EXTENSION VSCODE>", canAcquire, vscode);

// @ts-ignore
const App = React.lazy(() => import("nestgptfront/App"));

// https://44.198.154.13:28081/auth/realms/liligpt/.well-known/openid-configuration

export const NestGPTFrontend = () => {
  return (
    <React.Suspense fallback="Loading App">
      <App
        vscode={vscode}
        // authorityUrl="http://44.198.154.13:28080/auth/realms/liligpt"
        // authorityUrl="https://liligpt-frontend.giovannefeitosa.com/auth/realms/liligpt"
      />
    </React.Suspense>
  );
};
