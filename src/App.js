import React from 'react';

function App() {
  return (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/carteira" component={ Wallet } />
  </Switch>);
}

export default App;
// meu deus     
