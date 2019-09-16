export default class Algorithms {

  static bubbleSort(arr, sortHistory, highlightHistory) {
    this.clearArray(sortHistory);
    this.clearArray(highlightHistory);
    let comparisonCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - (i + 1); j++) {
        sortHistory.push(arr.slice());
        highlightHistory.push([j + 1, j]);
        comparisonCount++;
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
          sortHistory.push(arr.slice());
          highlightHistory.push([j + 1, j]);
        }
      }
    }
  }

  static insertionSort(arr, sortHistory, highlightHistory) {
    this.clearArray(sortHistory);
    this.clearArray(highlightHistory);
    let leftCol = -1;
    for (let i = 0; i < arr.length; i++) {
      leftCol = i;
      let temp = arr[i];
      let j;
      for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
        arr[j + 1] = arr[j];
        sortHistory.push(arr.slice());
        highlightHistory.push([j, leftCol]);
      }
      arr[j + 1] = temp;
    }
    sortHistory.push(arr.slice());
    highlightHistory.push([0, arr.length - 1]);
  }

  static selectionSort(arr, sortHistory, highlightHistory) {
    this.clearArray(sortHistory);
    this.clearArray(highlightHistory);
    let leftCol = -1;
    for(let i = 0; i < arr.length; i++) {
      let min = i;
      leftCol = min;
      for(let j = i + 1; j < arr.length; j++) {
        if(arr[j] < arr[min]) {
          min = j;
        }
        sortHistory.push(arr.slice());
        highlightHistory.push([j, leftCol]);
      }
      if(i !== min) {
        this.swap(arr, i, min);
      }
    }
    sortHistory.push(arr.slice());
    highlightHistory.push([-1, arr.length - 1]);
  }

  static mergeSort(arr, sortHistory, highlightHistory) {
    this.clearArray(sortHistory);
    this.clearArray(highlightHistory);
    let step = 1;
    while (step < arr.length) {
      let left = 0;
      while (left + step < arr.length) {
        this.mergeBottomUp(arr, left, step, sortHistory, highlightHistory);
        left += step * 2;
      }
      step *= 2;
    }
  }

  static mergeBottomUp(arr, left, step, sortHistory, highlightHistory) {
    let right = left + step;
    let end = Math.min(left + step * 2 - 1, arr.length - 1);
    let leftMoving = left;
    let rightMoving = right;
    let temp = [];
  
    for (let i = left; i <= end; i++) {
      if ((arr[leftMoving] <= arr[rightMoving] || rightMoving > end) && leftMoving < right) {
        temp[i] = arr[leftMoving];
        leftMoving++;
      } else {
        temp[i] = arr[rightMoving];
        rightMoving++;
      }
    }
    
    for (let j = left; j <= end; j++) {
      arr[j] = temp[j];
    }
    sortHistory.push(arr.slice());
    highlightHistory.push([-1]);
  }

  static quickSort(arr, sortHistory, highlightHistory) {
    this.clearArray(sortHistory);
    this.clearArray(highlightHistory);
  }

  static swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
		
  static clearArray(arr) {
    while (arr.length) {
      arr.pop();
    }
  }

}
