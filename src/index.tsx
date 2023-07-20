import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "reducers/store";
import { userActions } from "reducers/user";
import { IconContext } from "react-icons";

function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(userActions.saveUser(JSON.parse(user)));
  } catch (e) {
    console.log("localStorage is not working");
    console.log(e);
  }
}

loadUser();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <IconContext.Provider value={{ className: "react-icons", size: "1rem" }}>
      <App />
    </IconContext.Provider>
  </Provider>
  // </React.StrictMode>
);
