class Algorithms {

    static bubbleSort(arr, sortHistory, highlightHistory) {
			this.clearArray(sortHistory);
			sortHistory.push(arr.slice());
			this.clearArray(highlightHistory);
			highlightHistory.push(0);
      console.log('SORT');
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - (i + 1); j++) {
					
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            
					}
					sortHistory.push(arr.slice());
					highlightHistory.push(j + 1);
        }
      }
    }

    static insertionSort(arr, sortHistory, highlightHistory) {
        
		}
		
		static clearArray(array) {
			while (array.length) {
				array.pop();
			}
		}
}
export default Algorithms;