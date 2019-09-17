import React, { Component } from 'react';
import { Button, Slider } from '@material-ui/core';
import './App.css';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Styles from './Styles';
import Algorithms from './Algorithms.js';
import Header from './components/Header';

const defaultSize = 40;
const defaultSpeed = 150;
const maxSize = 200;
const maxSpeed = 200;
const highlightColors = ['red', 'green', 'yellow', 'gray'];
const styles = Styles;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      highlighted: [],
      sortOnGoing: false,
      sortName: 'Bubble Sort'
    };
    this.sortHistory = [];
    this.highlightHistory = [];
    this.sortHistoryTraverseIndex = 0;
    this.interval = null;
    this.sortSize = defaultSize;
    this.sortSpeed = defaultSpeed;
    console.log(this.props);
    this.props.history.listen((location, action) => {
      this.generateNewArray();
      let path = location.pathname;
      switch (path) {
        case '/bubble-sort':
            this.setState({sortName: 'Bubble Sort'});
            break;
        case '/insertion-sort':
            this.setState({sortName: 'Insertion Sort'});
            break;
        case '/selection-sort':
          this.setState({sortName: 'Selection Sort'});
          break;
        case '/merge-sort':
          this.setState({sortName: 'Merge Sort'});
          break;
        case '/quick-sort':
          this.setState({sortName: 'Quick Sort'});
          break;                
        default:
            this.setState({sortName: 'Bubble Sort'});
      }
    });
  }

  componentDidMount() {
    this.generateNewArray();
  }

  generateNewArray() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({sortOnGoing: false});
    }
    this.sortHistoryTraverseIndex = 0;
    this.sortHistory = [];
    this.highlightHistory = [];

    let arr = [];
    for (let i = 0; i < this.sortSize; i++) {
      arr.push(Math.floor( Math.random() * 50) + 1);
    }
    this.setState({arr: arr, highlighted: -1});
  }

  sortAsChosen(arr, sortHistory, highlightHistory) {
    let path = this.props.location.pathname;
    switch (path) {
      case '/bubble-sort':
          Algorithms.bubbleSort(arr.slice(), sortHistory, highlightHistory);
          break;
      case '/insertion-sort':
          Algorithms.insertionSort(arr.slice(), sortHistory, highlightHistory);
          break;
      case '/selection-sort':
        Algorithms.selectionSort(arr.slice(), sortHistory, highlightHistory);
        break;
      case '/merge-sort':
        Algorithms.mergeSort(arr.slice(), sortHistory, highlightHistory);
        break;
      case '/quick-sort':
        Algorithms.quickSort(arr.slice(), sortHistory, highlightHistory);
        break;                
      default:
          Algorithms.bubbleSort(arr.slice(), sortHistory, highlightHistory);
    }
  }

  handleSort() {
    if (this.interval) return;
    if (this.sortHistory.length !== 0 && this.sortHistoryTraverseIndex === this.sortHistory.length) return;
    if (this.sortHistoryTraverseIndex === 0) {
      console.log('SORT');
      this.sortAsChosen(this.state.arr.slice(), this.sortHistory, this.highlightHistory);
      this.sortHistoryTraverseIndex = 0;
      if (this.sortHistory.length === 1) return;
    }  
    this.setState({sortOnGoing: true});
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval( () => {
      if (this.sortHistoryTraverseIndex >= this.sortHistory.length - 1) {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({sortOnGoing: false});
      }
      this.setState({arr: this.sortHistory[this.sortHistoryTraverseIndex], highlighted: this.highlightHistory[this.sortHistoryTraverseIndex]});
      this.sortHistoryTraverseIndex++;
    }, maxSpeed - this.sortSpeed);
  }

  stopSort() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({sortOnGoing: false});
    }
  }

  handleSizeSlide(event, newValue) {
    let arr = this.state.arr;
    this.sortHistoryTraverseIndex = 0;
    this.sortHistory = [];
    this.highlightHistory = [];
    if (newValue > arr.length) {
      for (let i = 0; i < newValue - arr.length; i++) {
        arr.push(Math.floor( Math.random() * 50) + 1);
      }
    } else {
      for (let i = 0; i < arr.length - newValue; i++) {
        arr.pop();
      }
    }
    this.sortSize = newValue;
    this.setState({arr: arr});
  }

  handleSpeedSlide(event, newValue) {
    this.sortSpeed = newValue;
  }

  handleHistorySlide(event, newValue) {
    if (newValue < 0 || newValue > this.sortHistory.length - 1) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({sortOnGoing: false});
    }
    this.setState({arr: this.sortHistory[newValue], highlighted: this.highlightHistory[newValue]});
    this.sortHistoryTraverseIndex = newValue;
  }

  determineBarColor(highlighted, index) {
    for (let i = 0; i < highlighted.length; i++)  {
      if (highlighted[i] === index) {
        return highlightColors[i];
      }
    }
    return 'snow';
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Header history={this.props.history} />
        <span className="sort-name"> {this.state.sortName} </span>
        <div className="top-slider-wrapper">
          <span className="slider-label">Size</span>
          <Slider disabled={this.sortHistoryTraverseIndex > 0 && this.sortHistoryTraverseIndex < this.sortHistory.length - 1} className={classes.topSlider} defaultValue={defaultSize} min={0} max={maxSize} onChange={this.handleSizeSlide.bind(this)} aria-labelledby="discrete-slider" />
        </div>
        <div className="top-slider-wrapper">
          <span className="slider-label">Speed</span>
          <Slider className={classes.topSlider} defaultValue={defaultSpeed} min={0} max={maxSpeed} onChange={this.handleSpeedSlide.bind(this)} aria-labelledby="discrete-slider" />
        </div>
        <div className="bar-wrapper">
          {this.state.arr.map((item, index) => <Bar key={index} size={item} color={this.determineBarColor(this.state.highlighted, index)}/>)}
        </div>
        <Slider className={classes.historySlider} defaultValue={0} value={this.sortHistoryTraverseIndex} min={0} max={this.sortHistory.length + 1} onChange={this.handleHistorySlide.bind(this)} aria-labelledby="discrete-slider" />
        <div className="buttons-wrapper">
          <Button className={classes.button} onClick={ () => this.generateNewArray()}> NEW ARRAY </Button>
          <Button className={classes.button} style={{backgroundColor: this.state.sortOnGoing ? 'red' : classes.button.backgroundColor}} onClick={ this.state.sortOnGoing ? this.stopSort.bind(this) : this.handleSort.bind(this)} > {this.state.sortOnGoing ? 'STOP' : 'SORT'}</Button>
          
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function Bar(props) {
  return (
    <div className='bar' style={{height: props.size * 10, backgroundColor: props.color}}>
    </div>
  );
}


export default withStyles(styles)(App);
