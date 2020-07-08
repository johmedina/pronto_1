import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { storage, db, auth } from "./Firebase";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Carousel from 'react-images';


export default class Edititem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: '',
      itemcode: '',
      category: '',
      price: '',
      description: '',
      availability: '',
      sizes: '',
      colors: '',
      illustration:[],
      progress: '',
      images: [],
      dbSnapshot: {},
      dbProduct: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imagesToStorage = this.imagesToStorage.bind(this);
    this.updateDb = this.updateDb.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

  }

  componentDidMount() {
    console.log(this.props.location.state.product, this.props.location.state.category)
    var currentProduct = this.props.location.state.product
    var currentCat = this.props.location.state.category
    db.ref(`${auth.currentUser.uid}/${currentCat}/${currentProduct}`).on("value", snapshot => {
      var details= snapshot.val();
      console.log('db ref details')
      if (details != null){
        this.setState({ 
          dbProduct: currentProduct,
          category: currentCat,
          dbSnapshot: details,
          title: details.title,
          itemcode: details.itemID,
          category: currentCat,
          price: details.price,
          description: details.desc,
          availability: details.malls,
          sizes: details.sizes,
          colors: details.colors,
          images: details.illustration,
        }, 
          function(){console.log(this.state.dbSnapshot, this.state.title)});
      }
      
    });

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
    
    var ilen = this.state.images.length;
    var i = 0;
    var image = "";
    var setOfImages = [];
    for(i; i<ilen; i++){
      console.log('inside for loop')
      image = this.state.images[i]
      this.imagesToStorage(image, this.state.illustration)
    }
  
    // Timeout is needed for illustrations to load before uploading to the database
    setTimeout(()=>{console.log('wait for images to store')}, 20000)
    setTimeout(()=>{this.updateDb()}, 21000) 
  
  };

  imagesToStorage = (image, setOfImages) => {
      var uploadTask = storage.ref(`images/${auth.currentUser.uid}/${this.state.category}/${this.state.itemcode}/${image.name}`).put(image);
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
            .ref(`images/${auth.currentUser.uid}/${this.state.itemcode}`)
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
    //Updating the realtime database 
    db.ref(`/${auth.currentUser.uid}/${this.state.category}/${this.state.itemcode}`)
    .set({
      title: this.state.title,
      illustration: this.state.illustration,
      desc: this.state.description,
      price: this.state.price,
      colors: this.state.colors,
      malls: this.state.availability,
      sizes: this.state.sizes,
      fav: 'heart',
      itemID: this.state.itemcode,
      
    })
    .then(() => this.props.history.goBack())
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

  deleteItem = () => {
    // Delete from database
    var adaRef = db.ref(`/${auth.currentUser.uid}/${this.state.category}/${this.state.dbProduct}`)
    adaRef.remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });

    // Delete from storage
    var images = this.state.images;
    var image = "";
    console.log('storage images to delete', images)
    var ilen = images.length;
    var i=0;
    for (i;  i<ilen; i++){
      image = images[i];
      console.log('image inside delete', image)
      var stoRef  = storage.refFromURL(`${image}`);
      stoRef.delete()
        .then(function() { console.log('storage removal success')})
        .catch(function(error) {
          console.log("Storage Remove failed: " + error.message)
        });
    }
    
  };

  render() {
    return (
      <React.Fragment>
        <div className="HeaderUp">
          <Link to='/productlist'>
            <img className="Small_Logo"
            src="https://live.staticflickr.com/65535/48713562801_2b7787f5b8_o.png"
            alt="logo"/>
          </Link>
        </div>

        <div className="MyTitle">EDIT ITEM </div>
        <div className="App">
          <div className="App__Aside2">
            <div className="FormField__Label2"> Current Photos </div>

            <div>
              {this.state.dbSnapshot.illustration && this.state.dbSnapshot.illustration.map((image, index) => {
                return <img className="col-lg-3" src={image} key={index}/>
              })}
            </div>

            {/* <div onSubmit={this.onFormSubmit} className="UploadButtons">
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
            </div> */}
          </div>
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
                  
                </form>
              </div>
              <button className="FormField__Button2 mr-20" onClick={this.handleSubmit}>Apply</button>
              <button className="FormField__Button2 mr-20" onClick={this.deleteItem}>Delete</button>
              {/* <Link to="/productlist" className="FormField__Button2">Delete</Link> */}
              <Link to="/productlist" className="FormField__Button3">Cancel</Link>
            </div> 
                  
            

              
            {/* </div> */}
          </div>
      </React.Fragment>
    )
  }
}


