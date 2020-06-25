import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { storage, db, auth } from "./Firebase";

export default class Additem extends Component {

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
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imagesToStorage = this.imagesToStorage.bind(this);
    this.updateDb = this.updateDb.bind(this);
  }


  componentDidMount() {
    var user = auth.currentUser;
    if (user) {
      console.log('user is: ', user.uid)
    }
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
    this.imagesToStorage()
    // this.updateDb()
    // Timeout is needed for illustrations to load before uploading to the database
    setTimeout(()=>{console.log('wait for images to store')}, 20000)
    setTimeout(()=>{this.updateDb()}, 21000)
    
  
  };


  imagesToStorage = () => {
    var ilen = this.state.images.length;
    console.log(ilen);

    for(var i=0; i<ilen; i++){
      var image = this.state.images[i]
      // console.log(i)
      const uploadTask = storage.ref(`images/${auth.currentUser.uid}/${this.state.itemcode}/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot)
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${auth.currentUser.uid}/${this.state.itemcode}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url)
              var setOfImages = this.state.illustration.concat(url)
              this.setState({illustration: setOfImages}, function(){console.log('imagesToStorage illustrations', this.state.illustration)})
            });
        }
      );
    }
  };

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
      mallls: this.state.availability,
      sizes: this.state.sizes,
      fav: 'heart',
      
    })
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
                <div>
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
                  
                <button className="FormField__Button2 mr-20" onClick={this.handleSubmit}>Apply</button>
                <Link to="/productlist" className="FormField__Button2">Save</Link>
                <Link to="/productlist" className="FormField__Button3">Cancel</Link>

              </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}