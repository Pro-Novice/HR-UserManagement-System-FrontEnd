// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './pages/Navbar';
//import Content from './pages/content';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/layout/Home';
// import footer from './components/footer';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path = '/' component={ Home } />
      <section className='container'>
          <Switch>
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />
          </Switch>
      </section>
      {/* <Content /> */}
      {/* <Footer /> */}
    </div>
    </Router>
  );
}

export default App;
