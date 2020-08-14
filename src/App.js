import React from 'react';
import './App.css';
import ListItems from './List'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Form,Input,InputGroup,InputGroupAddon, Container, Row, Col, Navbar } from 'reactstrap';



library.add(faTrash)
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
 render(){
  return (

    
    <Container className="my-4">
      <div className="section">
      <Row className="d-flex justify-content-center pt-4">
        <Col lg="6">
        <Form id="to-do-form" onSubmit={this.addItem} >
       
        <InputGroup>
        
        <Input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></Input>
        <InputGroupAddon addonType="prepend"> <Button color="primary" type="submit">Add</Button></InputGroupAddon>     
      </InputGroup>
        </Form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
          </Col>
      </Row>
      </div>
     
    </Container>

  );
 }
}


export default App;
