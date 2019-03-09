import React, { Component } from 'react';
import routes from './routes'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import './App.css'




class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
          {routes}
        <Footer /> 
      </div>
    );
  }
}

export default App;
