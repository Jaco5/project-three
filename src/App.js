import React, { Fragment } from "react";
import Tree from "./Pages/Tree";
import Archive from "./Pages/Archive";
import NoMatch from "./Pages/NoMatch";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Tree} />
        <Route exact path="/archive/" component={Archive} />
        {/* <Route exact path="/archive/:id" component={Detail} /> */}
        <Route component={NoMatch} />
      </Switch>

    </Fragment>
  </Router>

);

export default App;
