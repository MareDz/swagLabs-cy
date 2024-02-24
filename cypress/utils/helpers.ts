  /*
  Pass an array
  If any element is greater than the previous one, the array is not sorted in descending order -> false
  If the loop completes without returning false, the array is sorted in descending order -> true
  */
  export async function checkSortDescending(arr: number[]): Promise<boolean> {
    console.log('checkSortDescending()')

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        return false
      }
    }
    return true
  }

  /*
  Pass an array
  If any element is less than the previous one, the array is not sorted in ascending order -> false
  If the loop completes without returning false, the array is sorted in ascending order -> true
  */
  export async function checkSortAscending(arr: number[]): Promise<boolean> {
    console.log('checkSortAscending()')

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false
      }
    }
    return true
  }