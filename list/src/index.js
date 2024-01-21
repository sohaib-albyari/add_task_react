import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ListProvider, { ListContext } from "./context/ListContext";

import { Appprovider } from "./context2/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Appprovider>
        <App />
      </Appprovider>
    </BrowserRouter>
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ListProvider>
//         <App />
//       </ListProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
