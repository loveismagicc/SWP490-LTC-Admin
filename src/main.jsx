import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import {LoadingProvider} from "./contexts/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <LoadingProvider>
        <App />
    </LoadingProvider>
);
