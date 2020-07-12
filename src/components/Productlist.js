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
      dbSnapshot: [],
      storeInfo: [],
      itemIDs: [],
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.category)
    var currentCategory = this.props.location.state.category
    var currentGender = this.props.location.state.gender
    // fetch the shop name
    db.ref(`/stores/${auth.currentUser.uid}`).on("value", snapshot => {
      let store = [];
      snapshot.forEach(snap => {
        store.push(snap.val())
      });
      this.setState({ storeInfo:store[0].shop }, function(){console.log(this.state.storeInfo)});
    });

    // fetch the items to be displayed
    db.ref(`/stores/${auth.currentUser.uid}/${currentGender}/${currentCategory}`).on("value", snapshot => {
      let items= [];
      let itemIDs = [];
      snapshot.forEach(snap => {
        items.push(snap.val())
        itemIDs.push(snap.key)
      });
      this.setState({ dbSnapshot: items, itemIDs: itemIDs}, function(){console.log('snapshot', this.state.dbSnapshot, this.state.itemIDs)});
    });
    
  };


  render() {
    return (
      <React.Fragment>
      <div className="Home_App">
      {/*Logo in the upper left corner*/}
      <Link to="/home">
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
        {/* <ProductConsumer>
        { value => {
          return value.products.map(product =>{
            // key should be the product id of one product - product should come from the database
            return <Product key="product.id" product={product} />
          })
        }}
        </ProductConsumer> */}
        {this.state.dbSnapshot.map((items) => {  
          console.log('productlist items: ', items)  
          return (
              <Product product={items} category={this.props.location.state.category}/>
          )
                
        })}
      </div>




      </React.Fragment>

    )
  }
}
