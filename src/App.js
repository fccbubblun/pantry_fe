import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  // <LocationForm />
  // <ListForm />
  // <ItemForm />
  // <ItemList />
  render(){
    return (
      <div>
        <DisplayList />
      </div>
    )
  }
}

class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      items: []
    }
  }
  componentWillMount(){
    fetch('http://127.0.0.1:3000/item')
      .then(response => response.json())
      .then(results => this.setState({items: results}))//this.setState({items: items}))
      //.then(response => this.setState({items: response.json()}))
  }
  filter(e){
    this.setState({filter: e.target.value})
  }
  render(){
    let items = this.state.items
    if (this.state.filter){
      items = items.filter(item =>
        item.name.toLowerCase()
        .includes(this.state.filter.toLowerCase()))
    }
    return (
      <div>
      <input type="text" onChange={this.filter.bind(this)}/>
      {items.map(item => <h4>{item.name} -- {item.category}</h4>)}
      </div>
    )
  }
}

class ItemForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: '', category: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({
      name: this.refs.nameInput.value,
      category: this.refs.categoryInput.value,
    });
  }
  handleSubmit(){
    var data = [];
    data.push(encodeURIComponent("name") + "=" + encodeURIComponent(this.state.name));
    data.push(encodeURIComponent("category") + "=" + encodeURIComponent(this.state.category));
    data = data.join("&");
    fetch('http://127.0.0.1:3000/item', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: data,
    });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref="nameInput" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Category:
          <input type="text" ref="categoryInput" value={this.state.category} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class ListForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({
      name: this.refs.nameInput.value,
    });
  }
  handleSubmit(){
    var data = [];
    data.push(encodeURIComponent("name") + "=" + encodeURIComponent(this.state.name));
    data = data.join("&");
    fetch('http://127.0.0.1:3000/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: data,
    });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref="nameInput" value={this.state.name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class ListItemForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({
      name: this.refs.nameInput.value,
    });
  }
  handleSubmit(){
    var data = [];
    data.push(encodeURIComponent("name") + "=" + encodeURIComponent(this.state.name));
    data = data.join("&");
    fetch('http://127.0.0.1:3000/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: data,
    });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref="nameInput" value={this.state.name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class LocationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: '', address: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({
      name: this.refs.nameInput.value,
      address: this.refs.addressInput.value,
    });
  }
  handleSubmit(){
    var data = [];
    data.push(encodeURIComponent("name") + "=" + encodeURIComponent(this.state.name));
    data.push(encodeURIComponent("address") + "=" + encodeURIComponent(this.state.address));
    data = data.join("&");
    fetch('http://127.0.0.1:3000/location', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: data,
    });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref="nameInput" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Address:
          <input type="text" ref="addressInput" value={this.state.address} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class DisplayList extends React.Component{
  constructor(props){
    super(props);
    this.state = {listName: '', listItems: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({listName: this.refs.nameInput.value});
  }
  handleSubmit(){
    fetch('http://127.0.0.1:3000/list/' + this.state.listName)
    .then(response => response.json())
    .then(results => this.setState({listItems: results}))
    .catch(function(error){
      console.log("An error occured while trying to get List Items: " + error);
    });
  }
  render(){
    let li = this.state.listItems;
    return (
      <div>
          <label>
            Name:
            <input type="text" ref="nameInput" value={this.state.name} onChange={this.handleChange} />
          </label>
          <button type="submit" onClick={this.handleSubmit}>Get List</button>
        {li.map(item => <h4>{item.item}</h4>)}
      </div>
    )
  }
}

export default App
