import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';



import { db, auth } from "./Firebase";
import Productlist from './Productlist';
import Category from './Category';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbSnapshot: [],
      storeInfo: [],
      
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
        
      {/* <div>
              {this.state.dbSnapshot.illustration && this.state.dbSnapshot.illustration.map((image, index) => {
                return <img src={image} key={index}/>
              })}
            </div> */}
    
    <CatWrapper>
        <div className="row">
            {this.state.dbSnapshot.map((categories) => {
                if (categories != "Info"){
                    return (
                        <Category category={categories}/>
                    )
                }
                
            })}
        </div>
    </CatWrapper>
      




      </React.Fragment>

    )
  }
}

const CatWrapper = styled.div `
.card {
  border-color: transparent;
  background: black;
  margin-left: 5rem;
  margin-top: 4rem;
  padding: 2rem 2rem;
}

&:hover{
  .card{
    border: 0.04rem solid rgba(0,0,0,2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,2);
  }
}

.names {
    background: black;
    color: white;
    font-size: 1.2rem;

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

