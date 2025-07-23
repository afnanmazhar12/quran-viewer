#include <iostream>
using namespace std;

int binsearch(int arr[], int n, int k) {
    int s = 0;
    int e = n - 1; // End should be n-1 because array indices start from 0

    while (s <= e) {
        int mid = s + (e - s) / 2; // Correctly calculate the middle index

        if (arr[mid] == k) {
            return mid; // Key found at index mid
        } else if (arr[mid] > k) {
            e = mid - 1; // Search in the left half
        } else {
            s = mid + 1; // Search in the right half
        }
    }
    return -1; // Key not found
}

int main() {
    int n, k;

    cout << "Enter the size of array: ";
    cin >> n;

    cout << "Enter the key: ";
    cin >> k;

    int arr[n];
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cout << "Array elements: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    int result = binsearch(arr, n, k);
    if (result != -1) {
        cout << "Key found at index: " << result << endl;
    } else {
        cout << "Key not found in the array" << endl;
    }

    return 0;
}
