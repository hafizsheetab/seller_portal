import logo from './logo.svg';
import './App.css';
import {Button, TextField} from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import QRCode from 'react-qr-code';
function App() {
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
      }
    }).then(res=> {
      setState({...state, cid: res.data.product.cid})
    })
  }
  return (
    <div className="App">
      <TextField id="filled-basic" label="Product Name" variant="filled" name = "name" value = {state.name}  onChange = {onChangeInputFields}/>
      <TextField id="filled-basic" label="Description" variant="filled" name = "description" value = {state.description} onChange = {onChangeInputFields}/>
      <TextField id="filled-basic" label="Price" variant="filled" name = "price" value = {state.price} onChange = {onChangeInputFields}/>
      <input type = "file" onChange = {onChangeInputPicture}></input>
      <Button onClick = {postPicture}>Upload</Button>
      <br />
      {
        state.cid && <QRCode value = {state.cid} style = {{margin: 5}}/>
      }
      {console.log(state.cid)}
    </div>
  );
}

export default App;
