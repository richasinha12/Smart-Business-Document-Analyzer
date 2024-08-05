import React from "react";
import Home from "@components/Home";
import { Toaster } from "react-hot-toast";
import { QueryContextProvider } from "./store/QueryContext";
const App = () => {
  return (
    <QueryContextProvider>
      <Toaster />
      <Home />
    </QueryContextProvider>
  );
};

export default App;
