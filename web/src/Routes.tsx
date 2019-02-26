import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubscripeUser from "./modules/account/SubscripeUser";
import { LoginView } from "./modules/user/LoginView";
import { MeView } from "./modules/user/MeView";
import { RegisterView } from "./modules/user/RegisterView";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/me" component={MeView} />
        <Route path="/subscription" component={SubscripeUser} />
      </Switch>
    </Router>
  );
};
