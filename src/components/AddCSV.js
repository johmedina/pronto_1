import React, { Component, Text } from 'react';
import {Link} from 'react-router-dom';
import { storage, db, auth } from "./Firebase";
import Toggle from 'react-toggle';
import CSVReader from 'react-csv-reader';

export default class AddCSV extends Component {
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
        this.fetchStoreInfo = this.fetchStoreInfo.bind(this);
    }
    
    fetchStoreInfo = (uid) => {
        fetch(`http://localhost:5000/api/stores/uid/${uid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json'
            },
            body: null
            })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log('fetch response:', responseJson)
            this.setState({store: responseJson.name, storeId: responseJson.id})
            })
            .catch((error) => {console.error(error)})
    };

   
    handleCSV(data){

        //[{item1}, {item2}, ...]
        let item_data = []

        for(let i = 0; i < data.length - 1; i++){
            var item = {
                "id": 0,
                "storeId": 1,
                "gender": 2,
                "inStock": true,
                "itemName": "",
                "description": "",
                "price": "",
                "onSale": false,
                "salePrice": 0,
                "salePercent": "",
                "createdAt": "2021-06-24T17:55:46.851Z",
                "color": 0,
                "newIn": true,
                "mainCategory": "",
                "mainImage": "",
                "modified": "2021-06-24T17:55:46.851Z"
            }

            // pics = [{image1, image2..}, {image1, image2, ...}]
            let pics = []
          
            if(data[i].image1){pics[i] = [...pics[i], data[i].image1]}
            if(data[i].image2){pics[i] = [...pics[i], data[i].image2]}
            if(data[i].image3){pics[i] = [...pics[i], data[i].image3]}
            if(data[i].image4){pics[i] = [...pics[i], data[i].image4]}
           
            // item.store_id = data[i].store_id;
            item.itemName =  data[i].item_name;
            // item.gender = data[i].gender;
            item.price = data[i].price;
            //item.on_sale = data[i].on_sale;
            //item.color = data[i].color; // get the name of the color from csv, map it to dbo.colors
            item.mainCategory= data[i].main_category;
            item.mainImage = data[i].main_image;
            
            if (data[i].description){item.description = data[i].description};
            // if (data[i].in_stock){item.in_stock = data[i].in_stock};
            if (data[i].salePrice){item.sale_price = data[i].sale_price};
            if (data[i].salePercent){item.sale_percent = data[i].sale_percent};
            //if (data[i].new_in){item.new_in = data[i].new_in};
            
            item_data = [...item_data, item];
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(item_data);

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
        // post items to dbo.items
        
    
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
    render(){
        return(
            <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => this.handleCSV(data)}
                  />
        );

    };
}