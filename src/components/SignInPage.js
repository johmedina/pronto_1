import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    }

    onSubmit = event => {
      const { email, password } = this.state;
    };

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

                <div className="FormField">
                  <Link to = "/productlist">
                  <button className="FormField__Button mr-20" disabled={isInvalid} type="submit">
                    Sign In
                  </button>
                  </Link>
                </div>
                {error && <p>{error.message}</p>}
              </form>

            </div>
          </div>
        </div>
        );
    }
}


export default SignInPage;
