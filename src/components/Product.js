import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';


export default class Product extends Component {
  render() {
    const {colors, title, illustration, price, itemID, gender} = this.props.product;
    console.log(this.props.product)
    return (
      <ProductWrapper className="col-12 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div className="img-container p-5" onClick={()=>console.log('clicked')}>
            <img src={illustration} key={itemID} alt="prod" className="card-img-top" />

            <Link to = {{ pathname:"/edititem", state:{product: itemID, category:this.props.category, gender:gender} }}>
              <button className="edit-btn" onClick={()=>{console.log('edit pls')}}>
                Edit Item
              </button>
            </Link>
          </div>

          {/*card footer */}
          <div className="card-footer">
            <p className="align-self-center mb-0">
            {title}
            </p>
            <h5 className="footer-text"> <span className="mr-1"> QR</span> {price} </h5>
          </div>
        </div>
      </ProductWrapper>
    )
  }
}

// Product.propTypes = {
//   product:PropTypes.shape({
//     id:PropTypes.number,
//     img:PropTypes.string,
//     title: PropTypes.string,
//     price: PropTypes.number,
//     inCart: PropTypes.bool
//   }).isRequired
// };

const ProductWrapper = styled.div `
.card {
  border-color: transparent;
  transition: all 1s linear;
  height: 450px;
  width: 100%;
}

.card-footer {
  background: transparent;
  border-top: black;
  transition: all 1s linear;
  justify-content: space-between;
  alignSelf: center;
  flexDirection: row;
  flex: 1;
  position: absolute;
  top: 365px;
  left: 30%;
}
&:hover{
  .card{
    border: 0.04rem solid rgba(0,0,0,2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,2);
  }
}

.footer-text {
  right: 20px;
}

.img-container{
  position:relative;
  overflow: hidden;
}
.card-img-top{
  transition: all 1s liner;
}
.image-container:hover .card-img-top {
  transform: scale(1,2);
}

.edit-btn{
  position:absolute;
  top:0;
  right:0;
  padding: 0.2rem 0.4rem;
  background: transparent;
  color: black;
  font-size: 0.8rem;
  border-radius:0.5 0 0 0;
  transform: translate(100%, 100%);
  transition: all 1s liner;

}
.img-container:hover .edit-btn{
  transform:translate(0,0);
}

.edit-btn:hover{
  color:black;
  cursor:pointer;
}
`
