import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { storage } from "./Firebase";


export default class Additem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: '',
      price: '',
      description: '',
      availability: '',
      sizes: '',
      colors: '',
      url: '',
      progress: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  onChange(e){
    let files=e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
      console.log("img data", e.target.result)
    }

    if (e.target.files[0]) {
      this.setState({image: e.target.files[0]});
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
            this.setState({url: url})
          });
      }
    );

    //console.log('The form was submitted with the following data:');
    //console.log(this.state);
  }

  handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });
  }

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
        <div className = "App">
          {/* Upload button that opens file manager  */}
          <div className = "App__Aside2">
            <div className="MyTitle2"> Upload Photos </div>
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

          {/* Create a form for item details */}
          <div className="App__Form2">
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormField">
                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="name">Item Name</label>
                    <input type="text" id="name" className="FormField__Input2" placeholder="Enter item name"
                      name="name" value={this.state.name} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label2" htmlFor="price">Price</label>
                    <input type="price" id="price" className="FormField__Input2" placeholder="Enter item price"
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
                      <button className="FormField__Button2 mr-20" onClick={this.handleSubmit}>Apply</button>
                      <Link to="/productlist" className="FormField__Button2">Save</Link>
                      <Link to="/productlist" className="FormField__Button3">Cancel</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

      </React.Fragment>
    )
  }
}
