import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AdminLogin from "./components/Auth/AdminLogin";
import Dashboard from "./components/pages/Dashboard";
import MenuManagement from "./components/pages/MenuManagement";
import ViewOrders from "./components/pages/ViewOrders";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/menu" component={MenuManagement} />
        <Route path="/viewOrders" component={ViewOrders} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
