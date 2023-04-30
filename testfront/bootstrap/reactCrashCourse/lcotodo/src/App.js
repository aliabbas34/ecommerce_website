
/*
 few points to remeber

 1. In react we do not write HTML, we write JSX i.e. javascript XML. So there are certain changes related to it that we should keep in mind
  1.1. Each tag that is opened must be closed. In case of tags like <br>, we should make them self closing <br/>
  1.2. There cannot be two elements in simple form, for example you can not write h1 tag and p tag simultaneously, Instead we should write in a parent child format. so inorder to use both tags we can enclose these tags seperately into div tags.
  1.3. HTML's class keyword is written as className in jsx.
*/

import React from "react";
import logo from "./lco-logo.png";
import "./App.css";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      newItem:"",
      list: []
    }
  }
  addItem(todoValue){
    if(todoValue!==""){
      const newItem={
        id:Date.now,
        value: todoValue,
        isDone: false
      };
      const list=[...this.state.list];//append the existing values of original list into this new list created locally in addItem function.
      list.push(newItem);//update the local list by adding new item to it.

      this.setState({
        list,//by this we update the original list.
        newItem: ""//and we overwrite the newItem as empty as it is pushed into the list.
      });
    }
  }

  deleteItem(id){
  const list=[...this.state.list];
  const updatedList=list.filter(item=>item.id!==id);
  this.setState({
    list:updatedList
  });
  }
  
  updateInput(input){
    this.setState({newItem:input});
  }


  updateCheck(itemToUpdate){
    const updatedList = [...this.state.list]
    .map(item => item.id === itemToUpdate.id ? Object.assign(item, { isDone: !itemToUpdate.isDone }) : item);
    this.setState({ list: updatedList });
    
  }

  render(){
    return (
      <div>
        <img className="logo" src={logo} width="100" height="100" alt="logo"/>
        <h1 className="app-title">LCO ToDo App</h1>
        <div className="container">
          Add an Item...
          <br/>
          <input
            type="text"
            className="input-text"
            placeholder="write a todo"
            required
            value={this.state.newItem}
            onChange={e=> this.updateInput(e.target.value)}
          />
          <button 
          className="btn btn-primary"
          onClick={()=>this.addItem(this.state.newItem)}
          disabled={!this.state.newItem.length}
          >Add Todo</button>
          <div className="list">
            <ul className="card">
              {this.state.list.map(item=>{
                 return( 
                  <li key={item.id}>
                    <input
                    type="checkbox"
                    name="isDone"
                    checked={item.isDone}
                    onChange={()=>this.updateCheck(item)}
                    />
                    {item.value}
                    <button
                    className="btn btn-danger"
                    onClick={()=>this.deleteItem(item.id)}
                    disabled={!item.isDone}
                    >Delete</button>
                  </li>
                 ); 
              })}
              <li className="card-body">
                <div className="row">
                  <div className="col-8">
                    <input
                    type="checkbox"
                    />
                    Record YouTube videos
                  </div>
                  <div className="col-4">
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
                
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;