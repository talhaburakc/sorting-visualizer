import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, Slider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {highlighted: 0};
    let arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push( Math.floor( Math.random() * 50) + 1);
    }
    this.state.arr = arr;
    this.sortHistory = [];
    this.sortHistoryTraverseIndex = 0;
    this.highlightHistory = [];
  }

  componentDidMount() {
    //this.state.arr = this.arr;
    /*
    setTimeout(() => this.setState((state) => {
      let temp = state.arr;
      temp.push(12345);
      return ({arr: temp});
    }), 2000);
     */
  }

  sort() {
    this.sortHistory = [];
    this.highlightHistory = [];
    console.log('SORT');
    let arr = this.state.arr;
    for (let i = 0; i < arr.length - 1; i++) {
      let change = false;
      for (let j = 0; j < arr.length - (i + 1); j++) {
        if (arr[j] > arr[j + 1]) {
          change = true;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.sortHistory.push(arr.slice());
          this.highlightHistory.push(j + 1);
        }
      }
      if (!change) break;
    }
    console.log(this.sortHistory);
    this.sortHistoryTraverseIndex = 0;
    if (this.sortHistory.length === 0) return;
    let interval = setInterval( () => {
      if (this.sortHistoryTraverseIndex >= this.sortHistory.length - 1) clearInterval(interval);
      this.setState({arr: this.sortHistory[this.sortHistoryTraverseIndex], highlighted: this.highlightHistory[this.sortHistoryTraverseIndex]});
      this.sortHistoryTraverseIndex++;
    }, 10);
  }

  handleSlide(event, newValue) {
    console.log(newValue);
    if (newValue < 0 || newValue > this.sortHistory.length - 1) return;
    this.setState({arr: this.sortHistory[newValue], highlighted: this.highlightHistory[newValue]});
    this.sortHistoryTraverseIndex = newValue;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Button onClick={ () => this.sort()} style={{backgroundColor: 'gray'}}>SORT</Button>
        <div>
          {this.state.arr.map((item, index) => <Bar key={index} size={item} highlighted={this.state.highlighted === index}/>)}
        </div>
        <Slider className="slider" defaultValue={0} value={this.sortHistoryTraverseIndex} max={this.sortHistory.length} onChange={this.handleSlide.bind(this)} aria-labelledby="discrete-slider" />
      </div>
    );
  }
}

function Bar(props) {
  console.log('proprs', props)
  return (
    <div style={{display: 'inline-block', color: 'white', height: props.size * 10, width: 20, backgroundColor: props.highlighted ? 'red' : 'snow', marginRight: 3}}>
    </div>
  );
}

function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            <Button color="inherit">BUBBLE SORT</Button>
          </Typography>
          <IconButton edge="start" style={{marginRight: 10 + 'px'}} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
