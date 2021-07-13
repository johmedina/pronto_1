import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { storage, db, auth } from "./Firebase";
import Toggle from 'react-toggle';
import CSVReader from 'react-csv-reader';

export default class AddItemsV2 extends Component {
    //each table needs their own state
    constructor(props){
        super(props);
        this.state = {
            items: [], //array of item objects to post
            store: '', //currently  logged in user
            storeId: '',
            sizes: [],
            colors: [],
            tags:[],
            images: [],
            item_name: '',
            description: '',
            price: '',
            in_stock: true,
            gender:0,
            on_sale: false, 
            sale_price: '',
            sale_percent: '',
            main_category: '',
            main_image: '',

        }
        // this.fetchStoreInfo = this.fetchStoreInfo.bind(this);

    
    }

   
    // componentDidMount = () => {
    //     var user = auth.currentUser;
    //     console.log('user', user.uid)
    //     this.fetchStoreInfo(user.uid)
    //     // auth.onAuthStateChanged(function(user){
    //     //   if (user) {
    //     //     console.log('user is: ', user.uid)  
    //     //     this.fetchStoreInfo(user.uid)
            
    //     //   }


    //     // })
        
    // };

    // fetchStoreInfo = (uid) => {
    //     fetch(`http://localhost:5000/api/stores/uid/${uid}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             //'Content-Type': 'application/json'
    //         },
    //         body: null
    //         })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //         console.log('fetch response:', responseJson)
    //         this.setState({store: responseJson.name, storeId: responseJson.id})
    //         })
    //         .catch((error) => {console.error(error)})
    // };

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
  
        this.setState({
          [name]: value
        });

    };

    handleSubmit = () => {
        var item = {
            id: 0,
            store_id: this.state.storeId,
            item_name: this.state.item_name,
            description: this.state.description,
            gender: this.state.gender,
            in_stock: true,
            price: this.state.price,
            on_sale: false,
            sale_price: '',
            sale_percent: '',
            created_at: new Date(),
            color: 1,
            new_in: true,
            main_category: this.state.main_category,
            main_image: '',
            modified: new Date(),

        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify([
          {
            "id": 0,
            "storeId": 1,
            "gender": 2,
            "inStock": true,
            "itemName": "abayaaaaaaa",
            "description": "abaya basic",
            "price": "500",
            "onSale": false,
            "salePrice": 0,
            "salePercent": "",
            "createdAt": "2021-06-24T17:55:46.851Z",
            "color": 0,
            "newIn": true,
            "mainCategory": "clothes",
            "mainImage": "string",
            "modified": "2021-06-24T17:55:46.851Z"
          }
        ]);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:5000/api/items", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

    render(){
        return(
        <React.Fragment>
        <div className="HeaderUp">
          <Link to='/home'>
            <img className="Small_Logo"
            src="https://live.staticflickr.com/65535/48713562801_2b7787f5b8_o.png"
            alt="logo"/>
          </Link>
        </div>

        <div className="MyTitle">ADD ITEM </div>
        <div style={{justifyContent:'center', display:'flex'}}>
          {/* Create a form for item details */}
          <div className="App__Form2">
            <div className="FormCenter">
                <form className="FormField">
                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="name">Item Name</label>
                    <input type="text" id="name" className="FormField__Input2" placeholder="Enter item name"
                      name="name" value={this.state.name} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="description">Description</label>
                    <input type="text" id="description" className="FormField__Input2" placeholder="Enter item description"
                      name="description" value={this.state.description} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="main_category">Main Category</label>
                    <input type="text" id="main_category" className="FormField__Input2" placeholder="Clothing / Accessories / Footwear"
                      name="main_category" value={this.state.main_category} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="gender">Gender</label>
                    <input type="text" id="gender" className="FormField__Input2" placeholder="Women / Men/ Unisex"
                      name="gender" value={this.state.gender} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="price">Price</label>
                    <input type="text" id="price" className="FormField__Input2" placeholder="Enter item price"
                      name="price" value={this.state.price} onChange={this.handleChange} />
                  </div>

                  {/* <div className="FormField">
                    <label className="FormField__Label2" htmlFor="description">Description</label>
                    <input type="text" id="description" className="FormField__Input2" placeholder="Enter item description"
                      name="description" value={this.state.description} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="availability">Availability</label>
                    <input type="text" id="availability" className="FormField__Input2" placeholder="Enter availability per branch"
                      name="availability" value={this.state.availability} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="sizes">Sizes</label>
                    <input type="text" id="sizes" className="FormField__Input2" placeholder="Enter size options"
                      name="sizes" value={this.state.sizes} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="colors">Colors</label>
                    <input type="text" id="colors" className="FormField__Input2" placeholder="Enter color options"
                      name="colors" value={this.state.colors} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="tags">Tags</label>
                    <input type="text" id="tags" className="FormField__Input2" placeholder="Enter item tags"
                      name="tags" value={this.state.tags} onChange={this.handleChange} />
                  </div> */}

                  
                  {/* <div className="FormField">
                    <label className="FormField__Label2" htmlFor="sale">On Sale</label>
                    <Toggle
                      id='onSale'
                      defaultChecked={this.state.onSale}
                      onChange={this.handleSale} />

                    <div style={{flexDirection:'row'}}> 
                      <input type="text" id="saleDiscount" className="FormField__Input3" placeholder="Enter discount off"
                        name="saleDiscount" value={this.state.saleDiscount} onChange={this.handleChange} />    

                      <input type="text" id="salePrice" className="FormField__Input3" placeholder="Enter new price"
                        name="salePrice" value={this.state.salePrice} onChange={this.handleChange} />   
                    </div>  
                    
                    
                  </div> */}

                </form>
                <div>
                  <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => this.handleCSV(data)}
                  />


                  <div className="FormField__Label2"> Upload Photos </div>
                  <div onSubmit={this.onFormSubmit} className="UploadButtons">
                    <input type="file" name="file1" onChange={(e)=>this.onChange(e)} />
                  </div>

                  <div onSubmit={this.onFormSubmit} className="UploadButtons">
                    <input type="file" name="file2" onChange={(e)=>this.onChange(e)} />
                  </div>

                  <div onSubmit={this.onFormSubmit} className="UploadButtons">
                    <input type="file" name="file3" onChange={(e)=>this.onChange(e)} />
                  </div>

                  <div onSubmit={this.onFormSubmit} className="UploadButtons">
                    <input type="file" name="file4" onChange={(e)=>this.onChange(e)} />
                  </div>

                </div>
                  
                <button className="FormField__Button2 mr-20 mt-4" onClick={this.handleSubmit}>Save</button>
                {/* <Link to="/productlist" className="FormField__Button2">Save</Link> */}
                <button className="FormField__Button3 mr-20" onClick={this.props.history.goBack}>Cancel</button>
                {/* <Link to="/productlist" className="FormField__Button3 mr-60">Cancel</Link> */}

              </div>
            </div>
          </div>
      </React.Fragment>
        )
    }


}