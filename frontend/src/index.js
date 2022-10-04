import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { DevProvider } from "./components/DevContext";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    redirectUri={window.location.origin + "/role"}
  >
    <DevProvider>
      <App />
    </DevProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
