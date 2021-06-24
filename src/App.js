import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInPage from './components/SignInPage';
import Details from './components/Details';
import Default from './components/Default';
import Productlist from './components/Productlist';
import Additem from './components/Additem';
import EditItem from './components/Edititem';
import HomePage from './components/Homepage';
import AddItemsV2 from './components/AddItemsV2'



class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
    };
  }
  
  render() {
    return (
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={SignInPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/productlist" component={Productlist} />
            <Route path="/details" component={Details} />
            <Route path="/additem" component={AddItemsV2} />
            <Route path="/edititem" component={EditItem} />
            <Route component={Default} />

          </Switch>

        </React.Fragment>
    );
  }

}

export default App;
