import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import Plan from './Plan';
import axios from 'axios';

class App extends Component {
  state ={
    items:[],
    text: ""
  }
  showPlan = () => {
    axios.get('http://127.0.0.1:8000/list/')
    .then((res) => {
      this.setState({items: res.data})
    })
    }
    addPlan = (d) => {
      if (this.state.text !=="") {
        axios.post("http://127.0.0.1:8000/create/", d)
          .then((res) => {
            this.setState({text: ''})
            this.showPlan()
          })
      }
    }  
  handleChange = e => {
    this.setState({text: e.target.value})
  }
  handleAdd = e => {
    let dt = {items: this.state.text}
    this.addPlan(dt)
  }
  handleDelete = id =>{
    console.log("Deleted", id)
    axios.delete(`http://127.0.0.1:8000/delete/${id}`)
    .then((res) =>{
      this.showPlan()
    })
  }
  componentDidMount(){
    this.showPlan();
  }
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
              <h1 className="text-center">Today's Work</h1>
              <div className="row">
                <div className="col-9">
                  <input type="text" className="form-control" placeholder="My everyday work"
                  value={this.state.text} onChange={this.handleChange} />
                </div>
                <div className="col-2">
                  <button className="btn btn-warning px-4 font-weight-bold" 
                  onClick={this.handleAdd}>Add</button>
                </div>
                <div className="container-fluid">
                  <ul className="list-unstyled row m-5">
                    {
                      this.state.items.map((value, i)=>{
                        // console.log(value.id, value.items)
                        return <Plan value={value.items} key={i} id={value.id} 
                        sendData={this.handleDelete} />
                      })
                    }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
