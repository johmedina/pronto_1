import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';


import { db, auth } from "./Firebase";
import Productlist from './Productlist';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbSnapshot: [],
      storeInfo: [],
      
    };
  }

  componentDidMount() {
    console.log(this.props.category)
  };

  render() {
    return (
      <React.Fragment>
    
        <Grid className="card"
            item xs={5}
            container
            direction="row"
            justify="space-evenly"
            alignItems="center">
                
            <Link to="/productlist">
                <Paper className="names">{this.props.category}</Paper>
            </Link>
        
        </Grid>

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

