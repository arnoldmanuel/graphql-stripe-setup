import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Account } from "./modules/account/Account";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";
import { Header } from "./shared/Header";

export const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <div>
                  <Route path="/register" component={RegisterView} />
                  <Route path="/account" component={Account} />
                  <Route
                    exact={true}
                    path="/"
                    render={() => <div>Homepage</div>}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};
