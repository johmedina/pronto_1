import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Product from './Product';
import Additem from './Additem';
import {ProductConsumer} from '../context';


export default class Productlist extends Component {
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
        Virgin Megastore
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
            return <Product key="product.id" product={product} />
          })
        }}
        </ProductConsumer>
      </div>




      </React.Fragment>

    )
  }
}
