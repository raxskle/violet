import React, { type FC } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./App.scss";
import Home from "./pages/Home/Home";

const App: FC<unknown> = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
};

export default App;
