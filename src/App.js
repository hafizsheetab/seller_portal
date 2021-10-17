import logo from './logo.svg';
import './App.css';
import {Button, TextField} from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import QRCode from 'react-qr-code';
function App() {
  let account = "0xe2B6577e17317e56b6D007056Cc6ed449443C1dF";
  axios.defaults.headers.common['x-auth-accountAddress'] = account
  const [state, setState] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    cid: ""
  })
  const onChangeInputFields = (e) => {
    setState({...state, [e.target.name] : e.target.value})
  }
  const onChangeInputPicture = (e) => {
    console.log(e.target.files)
    setState({...state, image: e.target.files[0]})
  }
  const postPicture = () => {
    let {image, name, description, price} = state
    let data = new FormData()
    data.append("name", name)
    data.append("description", description)
    data.append('productImage', image, image.name)
    data.append("price", price)
    console.log(image)
    
    axios.post('http://localhost:5000/api/product/upload',data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
        'x-auth-accountAddress': `${account}`
        
      }
    }).then(res=> {
      setState({...state, cid: res.data.product.cid})
    })
  }
  return (
    // <div className="App">
    //   <TextField id="filled-basic" label="Product Name" variant="filled" name = "name" value = {state.name}  onChange = {onChangeInputFields}/>
    //   <TextField id="filled-basic" label="Description" variant="filled" name = "description" value = {state.description} onChange = {onChangeInputFields}/>
    //   <TextField id="filled-basic" label="Price" variant="filled" name = "price" value = {state.price} onChange = {onChangeInputFields}/>
    //   <input type = "file" onChange = {onChangeInputPicture}></input>
    //   <Button onClick = {postPicture}>Upload</Button>
    //   <br />
      // {
      //   state.cid && <QRCode value = {state.cid} style = {{margin: 5}}/>
      // }
    //   {console.log(state.cid)}
    // </div>
    <div class="content center">
    
    <div class="container center">
      <div class="row justify-content-center">
        <div class="col-md-10">
          

          <div class="row justify-content-center">
            <div class="col-md-6">
              
              <h3 class="heading mb-4">Upload Products</h3>
              <p>Upload the Products and scan the generated QR Code</p>
            </div>
            <div class="col-md-6">
              
              <form class="mb-5" method="post" id="contactForm" name="contactForm">
                <div class="row">
                  <div class="col-md-12 form-group">
                  <TextField id="filled-basic" label="Product Name"  variant="filled" name = "name" value = {state.name}  onChange = {onChangeInputFields}/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                  <TextField id="filled-basic" label="Description" variant="filled" name = "description" value = {state.description} onChange = {onChangeInputFields}/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                  <TextField id="filled-basic" label="Price" variant="filled" name = "price" value = {state.price} onChange = {onChangeInputFields}/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                  <input type = "file" class="inputfile" onChange = {onChangeInputPicture}></input>
                  </div>
                </div>  
                <div class="row">
                  <div class="col-12">
                    <Button class="btn btn-primary rounded-0 py-2 px-4" onClick = {postPicture}>Upload</Button>
                    
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                  {state.cid && <QRCode value = {state.cid} style = {{margin: 5}}/>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
}

export default App;
