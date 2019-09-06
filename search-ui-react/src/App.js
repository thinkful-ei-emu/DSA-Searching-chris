import React from 'react';
import './App.css';
import data from './dataset';
import binarySearch from './binarySearch';

class App extends React.Component {
  state = {
    value: 0,
    result: {
      linear: '',
      binary: ''
    },
  }

  indexOf(array, value) {
    let numSerc = 0;
    for (let i = 0; i < array.length; i++) {
      numSerc++
    if (array[i] === value) {
      return 'Number of searches: ' + numSerc;
    }
    }
    return 'Number not found. Number of searches required: ' + numSerc;
  };

  handleSubmit = e => {
    e.preventDefault();
    let res1 = this.indexOf(data, Number(this.state.value));
    let res2 = binarySearch(data.sort((a,b) => a - b), Number(this.state.value));
    this.setState({ 
      result: {
        linear: res1,
        binary: res2,
      } 
    })
  }

  updateValue = value => this.setState({ value })
  render(){
    const { result, value } = this.state;
    return (
      <div className="App">
        <p>Hello</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            {result.linear && <p>Linear Search: {result.linear}</p>}
            {result.binary && <p>Binary Search: {result.binary}</p>}
          </div>
          <label>Number Search: </label>
          <input type='number' value={value} onChange={e => this.updateValue(e.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
