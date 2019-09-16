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
						[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
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
		
		static clearArray(array) {
			while (array.length) {
				array.pop();
			}
		}
}
