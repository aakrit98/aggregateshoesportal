import React from "react";
import ReactDOM from "react-dom";
//import "./index.css"; // Import Tailwind CSS
import { BrowserRouter } from "react-router-dom";
import "./talwind.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode> 
    <Provider store={store}>
    <BrowserRouter> 
      <App />
    </BrowserRouter> 
    </Provider>
  
  </React.StrictMode>,
  document.getElementById("root")
);
