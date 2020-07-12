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
      dbWomen: [],
      dbMen: [],
      dbKids: [],
    };
  }

  componentDidMount() {
    // store the current brand name
    db.ref(`/stores/${auth.currentUser.uid}`).on("value", snapshot => {
      let categories= [];
      let store = [];
      snapshot.forEach(snap => {
        categories.push((snap.key));
        store.push(snap.val())
      });
      this.setState({ dbSnapshot: categories, storeInfo:store[0].shop }, function(){console.log(this.state.dbSnapshot, this.state.storeInfo)});
    });

    // get women's categories
    db.ref(`/stores/${auth.currentUser.uid}/Women`).on("value", snapshot => {
      let categories= [];
      snapshot.forEach(snap => {
        categories.push((snap.key));
      });
      this.setState({ dbWomen: categories }, function(){console.log('women', this.state.dbWomen)});
    });

    // get women's categories
    db.ref(`/stores/${auth.currentUser.uid}/Men`).on("value", snapshot => {
      let categories= [];
      snapshot.forEach(snap => {
        categories.push((snap.key));
      });
      this.setState({ dbMen: categories }, function(){console.log('men', this.state.dbMen)});
    });

    // get women's categories
    db.ref(`/stores/${auth.currentUser.uid}/Kids`).on("value", snapshot => {
      let categories= [];
      snapshot.forEach(snap => {
        categories.push((snap.key));
      });
      this.setState({ dbKids: categories }, function(){console.log('kids', this.state.dbKids)});
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
        
      {/* <div>
              {this.state.dbSnapshot.illustration && this.state.dbSnapshot.illustration.map((image, index) => {
                return <img src={image} key={index}/>
              })}
            </div> */}
    
    <CatWrapper>
        <div className="titles">
          WOMEN
        </div>
        <div className="row">
            {this.state.dbWomen.map((categories) => {
              return (
                  <Category category={categories} gender={'Women'}/>
              )
            })}
        </div>

        <div className="titles">
          MEN
        </div>
        <div className="row">
            {this.state.dbMen.map((categories) => {
              return (
                  <Category category={categories} gender={'Men'}/>
              )
            })}
        </div>

        <div className="titles">
          KIDS
        </div>
        <div className="row">
            {this.state.dbKids.map((categories) => {
              return (
                  <Category category={categories} gender={'Kids'}/>
              )
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

.titles {
    color: black;
    font-size: 1.6rem;
    margin-top: 4rem;
    text-align: center;
    font-weight: 'bold';
    letter-spacing: 0.2em;
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

.img-container:hover .edit-btn{
  transform:translate(0,0);
}

`

