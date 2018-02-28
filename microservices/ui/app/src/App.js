import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    originadd:"" ,
    destadd: "",
    text:"",
    text2:"",
    goto:"",
    lati:"",
    longi:"",
    text3:"",
    };
  }

  onChange = (event) => {
    this.setState({ originadd: event.target.value });
  }

  onChange2 = (event) => {
    this.setState({ destadd: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.backbitten72.hasura-app.io/api/address?origin=${this.state.originadd}&destination=${this.state.destadd}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({text: 'Distance: ' + data.distance, text2: 'Duration: ' + data.duration, goto: data.link}))
      .catch(e => console.log('error', e));
  }

  onChange3 = (event) => {
    this.setState({ lati: event.target.value });
  }

  onChange4 = (event) => {
    this.setState({ longi: event.target.value });
  }

  handleSubmit2 = (event) => {
    event.preventDefault();
    const url = `https://api.backbitten72.hasura-app.io/api/coordinates?lat=${this.state.lati}&long=${this.state.longi}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({text3: 'Address: ' + data["formatted address"]} ))
      .catch(e => console.log('error', e));
  }

  render() {
    return (
      <div className="App">

        <div className="jumbotron jumbotron-fluid">
         <div className="container">
          <h1 className="display-4">Hello there!</h1>
          <p className="lead" style={{fontSize:25}}>Want a simple distance and duration calculator for the source and destination addresses you enter? You are at the right place!</p>
         </div>
        </div>

        <form onSubmit={this.handleSubmit} style={{width:'10'}}>
         <div className="form-group" style={{paddingTop:'1%', margin:'auto', width:'50%'}}>
          <label htmlFor="formGroupExampleInput" style={{color:'#cce0ff'}}>Enter the source address</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="source address" onChange={this.onChange} value={this.state.originadd} />
         </div>

        <br/>
         <div className="form-group" style={{paddingTop:'1%', margin:'auto', width:'50%'}}>
          <label htmlFor="formGroupExampleInput2" style={{color:'#cce0ff'}}>Enter the destination address</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="destination address" onChange={this.onChange2} value={this.state.destadd} />
         </div>

        <br/><br/>
          <button className="btn btn-light" style={{fontSize:18}}>Search</button>
        <br/>

        </form>
        <br/>

        <p style={{fontSize:30, color:'#e6f2ff'}}>{this.state.text}<br/> {this.state.text2}</p>
        <span style= {{color:'#4da6ff'}}>Once you have entered the addresses, <a href={this.state.goto} target="_blank" style={{color:'white'}}>click here</a> to view the directions on Google Maps</span>

        <br/><br/>
        <hr/>
        <br/>
        <p style= {{color:'#4da6ff'}}>Know only the coordinates? Find out its text address first using this <span style={{color:'white'}}>coordinates-to-address calculator</span></p>

        <form onSubmit={this.handleSubmit2}>
         <div className="row" style={{width:'45%', margin:'0 auto'}}>
          <div className="col" >
            <input type="text" className="form-control" placeholder="Enter the latitude" onChange={this.onChange3} value={this.state.lati} />
          </div>
          <div className="col" >
            <input type="text" className="form-control" placeholder="Enter the longitude" onChange={this.onChange4} value={this.state.longi} />
          </div>
         <button className="btn btn-light btn-sm">Search</button>
         </div>
        </form>

        <div>
        <br/>
        <p style={{fontSize:20, color:'#e6f2ff'}}>{this.state.text3}</p>
        </div>

      </div>


    );
  }
}

export default App;
