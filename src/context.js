import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

//create a new context object
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state={
    products:storeProducts,
    detailProduct: detailProduct
  }
  handleDetail = () => {
    console.log('hello from detail');
  }
  handleDelete = (id) => {
    console.log(`hello from delete item ${id}`);
  }
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail:this.handleDetail,
        handleDelete: this.handleDelete
      }}>
        {this.props.children}
      </ProductContext.Provider>

    )
  };
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
