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

        for(let i = 0; i < data.length; i++){
            var item = {
                id: 0,
                store_id: 0,
                item_name: '',
                description: '',
                gender: 0,
                in_stock: 0,
                price: '',
                on_sale: 0,
                sale_price: '',
                sale_percent: '',
                created_at: new Date(),
                color: 0, // get the name of the color from csv, map it to dbo.colors
                new_in: 0,
                main_category: '',
                main_image: '',
                modified: new Date(),
            }

            let pics = []
          
            if(data[i].image1){pics = [...pics, data[i].image1]}
            if(data[i].image2){pics = [...pics, data[i].image2]}
            if(data[i].image3){pics = [...pics, data[i].image3]}
            if(data[i].image4){pics = [...pics, data[i].image4]}

            

        }
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
    render(){
        return(
            <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => this.handleCSV(data)}
                  />
        );

    };
}