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
        highlightHistory.push([j, leftCol, min]);
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
    this.quickSortIterative(arr, 0, arr.length - 1, sortHistory, highlightHistory);
  }

  static quickSortIterative(arr, l, h, sortHistory, highlightHistory) { 
    // Create an auxiliary stack 
    let stack = []; 
  
    // initialize top of stack 
    let top = -1; 
  
    // push initial values of l and h to stack 
    stack[++top] = l; 
    stack[++top] = h; 
  
    // Keep popping from stack while is not empty 
    while (top >= 0) { 
        // Pop h and l 
        h = stack[top--]; 
        l = stack[top--]; 
  
        // Set pivot element at its correct position 
        // in sorted array 
        let p = this.partition(arr, l, h, sortHistory, highlightHistory); 
  
        // If there are elements on left side of pivot, 
        // then push left side to stack 
        if (p - 1 > l) { 
            stack[++top] = l; 
            stack[++top] = p - 1; 
        } 
  
        // If there are elements on right side of pivot, 
        // then push right side to stack 
        if (p + 1 < h) { 
            stack[++top] = p + 1; 
            stack[++top] = h; 
        } 
    } 
  } 

  static partition(arr, l, h, sortHistory, highlightHistory) { 
    let x = arr[h]; 
    let i = (l - 1); 
  
    for (let j = l; j <= h - 1; j++) { 
      sortHistory.push(arr.slice());
      highlightHistory.push([j, l, h]);
      if (arr[j] <= x) { 
          i++; 
          this.swap(arr, i, j); 
      } 
    } 
    this.swap(arr, i + 1, h); 
    return (i + 1); 
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
