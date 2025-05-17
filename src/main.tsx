import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { ErrorBoundary } from "./ErrorBoundary"
import App from './App.tsx'
import { AppProvider } from "./lib/Provider/AppProvider.tsx";

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  // to preconnect to a host
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
