import { readFileFromPath } from "../utils/file";

/**
 * Input.txt : a file Containing 1000 lines each line containing 2 numbers seperated with white space.
 * Task : match both number arrays lowest value in array 1 to lowest value in arra2 for all the array elements. Calculate the distance between both numbers and store it in an array.
 * Afterwards sum up all the distances to a total
 *
 * Run : npm run day1
 */

function buildInputArrays(fileContent: string): [Array<number>, Array<number>] {
	const valueArray1: Array<number> = [];
	const valueArray2: Array<number> = [];
	for (const line of fileContent.split("\n")) {
		const [value1, value2] = line.split("   ");
		valueArray1.push(Number.parseInt(value1));
		valueArray2.push(Number.parseInt(value2));
	}
	return [valueArray1, valueArray2];
}
function sortArray(array: Array<number>): Array<number> {
	return array.sort((a, b) => a - b);
}
function getDistanceBetweenEachNumber(
	array: Array<number>,
	array2: Array<number>,
): Array<number> {
	const result: Array<number> = [];
	for (let i = 0; i < array.length; i++) {
		const value1 = array[i];
		const value2 = array2[i];
		//the description was not clear if value 1 is always smaller then value 2 so for safty i just check to get always a positive number
		if (value1 > value2) {
			result.push(value1 - value2);
		} else {
			result.push(value2 - value1);
		}
	}
	return result;
}
const inputBuffer = await readFileFromPath("./src/day1/input.txt");
const fileContetnAsString = inputBuffer.toString();
const [inputArray1, inputArray2] = buildInputArrays(fileContetnAsString);
const sortedArray1 = sortArray(inputArray1);
const sortedArray2 = sortArray(inputArray2);
const resultArray = getDistanceBetweenEachNumber(sortedArray1, sortedArray2);
const result = resultArray.reduce((acc, value) => acc + value);
console.log(result);
