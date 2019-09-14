import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, Slider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      highlighted: 0
    };
    this.sortHistory = [];
    this.highlightHistory = [];
    this.sortHistoryTraverseIndex = 0;
    this.interval = null;
  }

  componentWillMount() {
    this.generateNewArray();
  }

  generateNewArray() {
    if (this.interval) return;
    this.sortHistoryTraverseIndex = 0;
    this.sortHistory = [];
    this.highlightHistory = [];

    let arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push( Math.floor( Math.random() * 50) + 1);
    }
    this.setState({arr: arr});
  }

  sort() {
    if (this.interval) return;
    this.sortHistory = [];
    this.highlightHistory = [];
    console.log('SORT');
    let arr = this.state.arr;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - (i + 1); j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.sortHistory.push(arr.slice());
          this.highlightHistory.push(j + 1);
        }
      }
    }
    this.sortHistoryTraverseIndex = 0;
    if (this.sortHistory.length === 0) return;
    this.interval = setInterval( () => {
      if (this.sortHistoryTraverseIndex >= this.sortHistory.length - 1) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.setState({arr: this.sortHistory[this.sortHistoryTraverseIndex], highlighted: this.highlightHistory[this.sortHistoryTraverseIndex]});
      this.sortHistoryTraverseIndex++;
    }, 10);
  }

  handleSlide(event, newValue) {
    if (newValue < 0 || newValue > this.sortHistory.length - 1) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.setState({arr: this.sortHistory[newValue], highlighted: this.highlightHistory[newValue]});
    this.sortHistoryTraverseIndex = newValue;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="bar-wrapper">
          {this.state.arr.map((item, index) => <Bar key={index} size={item} highlighted={this.state.highlighted === index}/>)}
        </div>
        <Slider className="slider" defaultValue={0} value={this.sortHistoryTraverseIndex} min={0} max={this.sortHistory.length + 1} onChange={this.handleSlide.bind(this)} aria-labelledby="discrete-slider" />
        <div className="buttons-wrapper">
          <Button className="button" onClick={ () => this.generateNewArray()}> NEW ARRAY </Button>
          <Button className="button" onClick={ () => this.sort()} > SORT </Button>
        </div>
      </div>
    );
  }
}

function Bar(props) {
  return (
    <div className="bar" style={{height: props.size * 10, backgroundColor: props.highlighted ? 'red' : 'snow'}}>
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
