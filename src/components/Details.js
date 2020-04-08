import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';

export default class Details extends Component {
  render() {
    return (
      <React.Fragment>
      <Link to='/productlist'>
        <img className="Small_Logo"
        src="https://live.staticflickr.com/65535/48325753247_fdd89ba8e2_b.jpg"
        alt="logo"/>
      </Link>

      <ProductConsumer>
        {(value)=> {
          const {id, company, img, info, price, title} =
          value.detailProduct;
          return (
            <div className="container py-5">
            {/* title */}
              <div className ="row">
                <div className="col-10 mx-auto text-center text-slanted my-5">
                  <h1>{title}</h1>
                </div>
              </div>
            {/* end title */}
            {/* Product info */}
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3">
                <img src={img} className="img-fluid" alt="prod" />
              </div>
              {/* product text */}
              <div className="col-10 mx-auto col-md-6 my-3
              text-capitalize">
                <h2>Model: {title} </h2>
                <h4 className="text-title text-uppercase text-muted
                mt-3 mb-2">
                  Made by: <span className="text-uppercase">
                  {company}
                  </span>
                </h4>
                <h4>
                  <strong> Price:
                    <span> QR </span>
                    {price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                 Description:
                </p>
                <p className="text-muted lead"> {info} </p>
              </div>
            </div>
            {/* end of product info */}

            </div>
          )
        }}
      </ProductConsumer>

      </React.Fragment>
    )
  }
}
