import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Product from './Product';
import Additem from './Additem';
import {ProductConsumer} from '../context';

import { db, auth } from "./Firebase";

export default class Productlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbSnapshot: {},
      
    };
  }

  componentDidMount() {
    db.ref(`${auth.currentUser.uid}`).on("value", snapshot => {
      let categories= [];
      let store = [];
      snapshot.forEach(snap => {
        categories.push((snap.key));
        store.push(snap.val())
      });
      this.setState({ dbSnapshot: categories, storeInfo:store[1].shop }, function(){console.log(this.state.dbSnapshot, this.state.storeInfo)});
    });
  };


  render() {
    return (
      <React.Fragment>
      <div className="Home_App">
      {/*Logo in the upper left corner*/}
      <Link to="/productlist">
        <img className="Small_Logo"
        src="https://live.staticflickr.com/65535/48713562801_2b7787f5b8_o.png"
        alt="logo"/>
      </Link>

        <div className="Store_Name">
          {this.state.storeInfo}
        </div>

        <div>
          <input type="text" id="Search" className="Search_Input" placeholder="Search" name="item" />
        </div>

        <div>
          <Link to="/additem">
            <button className="MyButton"> Add Item </button>
          </Link>
        </div>
      </div>

      <div className="row">
        <ProductConsumer>
        { value => {
          return value.products.map(product =>{
            // key should be the product id of one product - product should come from the database
            return <Product key="product.id" product={product} />
          })
        }}
        </ProductConsumer>
      </div>




      </React.Fragment>

    )
  }
}
