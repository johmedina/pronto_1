import React, { Component } from 'react';
import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';
// import { withFirebase } from './Firebase';
// import { compose } from 'recompose';
import { storage, db, auth } from "./Firebase";
import '../App.css';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    

    onSubmit = event => {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log(this.state.email, this.state.password)
        console.log('Success?????')
        this.props.history.push("/productlist")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };




    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';

      return (
      <div className="App">
        {/*Split the window into two colors */}
        <div className="App__Aside">
          <img className="Logo"
            src="https://live.staticflickr.com/65535/48325753247_fdd89ba8e2_b.jpg"
            alt="logo"/>
        </div>
        <div className="App__Form">
            <div className="FormTitle"> Sign-In </div>
            <div className="FormCenter">
              <form onSubmit={this.onSubmit}>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="FormField__Input"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="FormField__Input"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                {/* <div className="FormField">
                  <Link to = "/productlist">
                  <button className="FormField__Button mr-20" disabled={isInvalid} type="submit" onClick={this.onSubmit}>
                    Sign In
                  </button>
                  </Link>
                </div> */}
                {error && <p>{error.message}</p>}
              </form>

              <div className="FormField">
                <button className="FormField__Button mr-20" disabled={isInvalid} type="submit" onClick={this.onSubmit}>Sign In</button>
              </div>
              

            </div>
          </div>
        </div>
        );
    }
}

// const SignInPage = compose(
//   withRouter,
//   withFirebase,
// )(SignInFormBase);

export default SignInPage;