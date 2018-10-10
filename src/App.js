import React, { Fragment } from 'react';
// let scholar = require('google-scholar')
// import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Tree} />
        <Route exact path="/archived/" component={Archive} />
        {/* <Route exact path="/saved/:id" component={Detail} /> */}
        <Route component={NoMatch} />
      </Switch>

    </Fragment>
  </Router>

);

export default App;
