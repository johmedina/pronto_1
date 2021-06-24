import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { storage, db, auth } from "./Firebase";
import Toggle from 'react-toggle';
import CSVReader from 'react-csv-reader';

export default class Additem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: '',
      itemcode: '',
      category: '',
      gender: '',
      price: '',
      description: '',
      availability: '',
      sizes: '',
      colors: '',
      tags: '',
      illustration:[],
      progress: '',
      images: [],
      storeInfo: '',
      onSale: false, 
      saleDiscount: '',
      salePrice: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imagesToStorage = this.imagesToStorage.bind(this);
    this.updateDb = this.updateDb.bind(this);
    this.handleSale = this.handleSale.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }


  componentDidMount() {
    var user = auth.currentUser;
    auth.onAuthStateChanged(function(user){
      if (user) {
        console.log('user is: ', user.uid)  
        db.ref(`/stores/${auth.currentUser.uid}`).on("value", snapshot => {
          let store = [];
          snapshot.forEach(snap => {
            store.push(snap.val())
          });
          this.setState({ storeInfo:store[0].shop }, function(){console.log(this.state.storeInfo)});
        });
      }
    }.bind(this))
    
  };

  onChange = e => {
    let files=e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
      console.log("img data", e.target.result)
    }

    if (files[0]) {
      console.log(files[0])
      var newArray = this.state.images.concat(files[0])
      this.setState({images: newArray}, function(){
        console.log(this.state.images)
      });
    }

  };

  handleSubmit = () => {
    // e.preventDefault();
    // Uploding images to Firebase storage 
    
    console.log('Handling submit')
    // console.log(this.state.images)
    
    // setTimeout(()=>{this.imagesToStorage()}, 30000)
    // this.imagesToStorage()
    var ilen = this.state.images.length;
    var i = 0;
    var image = "";
    var setOfImages = [];
    for(i; i<ilen; i++){
      console.log('inside for loop')
      image = this.state.images[i]
      this.imagesToStorage(image, this.state.illustration)
    }
    // this.updateDb()
    // Timeout is needed for illustrations to load before uploading to the database
    setTimeout(()=>{console.log('wait for images to store')}, 20000)
    setTimeout(()=>{this.updateDb()}, 21000)

    
    
  
  };

  imagesToStorage = (image, setOfImages) => {
      var uploadTask = storage.ref(`images/${auth.currentUser.uid}/${this.state.gender}/${this.state.category}/${this.state.itemcode}/${image.name}`).put(image);
      console.log(image)
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot)
        },
        error => {
          console.log(error);
        },
        () => {
          console.log(image.name)
          storage
            .ref(`images/${auth.currentUser.uid}/${this.state.gender}/${this.state.category}/${this.state.itemcode}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url)
              setOfImages = this.state.illustration.concat(url)
              this.setState({illustration: setOfImages}, function(){console.log('imagesToStorage illustrations', this.state.illustration)})
            });
        }
      );

  }

  updateDb = () => {
    console.log('updateDb illustrations', this.state.illustration)
    var path = `/stores/${auth.currentUser.uid}/${this.state.gender}/${this.state.category}/${this.state.itemcode}`;
    console.log(path)
    //Updating the realtime database 
    db.ref(`/stores/${auth.currentUser.uid}/${this.state.gender}/${this.state.category}/${this.state.itemcode}`)
    .set({
      title: this.state.title,
      illustration: this.state.illustration,
      desc: this.state.description,
      price: this.state.price,
      colors: this.state.colors,
      malls: this.state.availability,
      sizes: this.state.sizes,
      itemID: this.state.itemcode,
      gender: this.state.gender,
      shop: this.state.storeInfo,
      path: path,
      tags: this.state.tags,
      onSale: this.state.onSale,
      saleDiscount: this.state.saleDiscount,
      salePrice: this.state.salePrice
    })
    .then(() => this.props.history.goBack())
    // Check if this is needed (I removed this because of issues with uploading CSV -- page restarts and outputs error)
    console.log('end db')

  };

  handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });

      // console.log('after', this.state.title)
      // console.log('after', this.state.category)
  };

  handleSale(){
    this.setState({onSale: !this.state.onSale}, function(){console.log(this.state.onSale)})
  };

  handleDbUpload = () => {
     
  }

  handleUpload(data){
    console.log(data)
    for (let i = 0;  i < data.length-1; i++){
      let pics = []
      if(data[i].illustration0){pics = [...pics, data[i].illustration0]}
      if(data[i].illustration1){pics = [...pics, data[i].illustration1]}
      if(data[i].illustration2){pics = [...pics, data[i].illustration2]}
      if(data[i].illustration3){pics = [...pics, data[i].illustration3]}

      let is_onsale = false
      if (data[i].onSale == "TRUE"){is_onsale = true}
      let disc = ""
      if (data[i].saleDiscount){disc = data[i].saleDiscount}
      let sprice= ""
      if (data[i].salePrice){sprice = data[i].salePrice}
      this.setState({
        title: data[i].title,
        malls: data[i].malls,
        itemcode: data[i].itemID,
        category: data[i].category,
        gender: data[i].gender,
        price: data[i].price,
        description: data[i].description,
        availability: data[i].availability,
        sizes: data[i].sizes,
        colors: data[i].colors,
        tags: data[i].tags,
        illustration: pics,
        onSale: is_onsale,
        saleDiscount: disc,
        salePrice: sprice},
        function(){this.updateDb()})
   }
  };

  render() {
    return (
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
                    <label className="FormField__Label2" htmlFor="title">Item Title</label>
                    <input type="text" id="title" className="FormField__Input2" placeholder="Enter item title"
                      name="title" value={this.state.title} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="itemcode">Item Code</label>
                    <input type="text" id="itemcode" className="FormField__Input2" placeholder="Enter item code"
                      name="itemcode" value={this.state.itemcode} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="category">Category</label>
                    <input type="text" id="category" className="FormField__Input2" placeholder="Enter item category"
                      name="category" value={this.state.category} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="category">Women / Men / Kids</label>
                    <input type="text" id="gender" className="FormField__Input2" placeholder="Enter item section"
                      name="gender" value={this.state.gender} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="price">Price</label>
                    <input type="text" id="price" className="FormField__Input2" placeholder="Enter item price"
                      name="price" value={this.state.price} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
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
                  </div>

                  
                  <div className="FormField">
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
                    
                    
                  </div>

                </form>
                <div>
                  <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => this.handleUpload(data)}
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