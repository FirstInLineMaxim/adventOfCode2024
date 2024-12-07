import { readFileFromPath } from "../utils/file";
/**
 * Input.txt : a file Containing 1000 lines each line containing 2 numbers seperated with white space.
 * Task : for each number in array1 count the appearance of it in array 2 ,
 * calculate the similiartiy score with number * count and sum it up
 *
 * Run : npm run day2
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
function createSimilarityScoreArray(
	inputArray1: Array<number>,
	inputArray2: Array<number>,
): Array<number> {
	const similarityArray = [];
	let index = 0;
	while (index < inputArray1.length) {
		const currentNumber = inputArray1[index];
		const countOfNumberInOtherArray = inputArray2.reduce((a, b) => {
			if (b === currentNumber) {
				return a + 1;
			}
			return a;
		}, 0);

		similarityArray.push(currentNumber * countOfNumberInOtherArray);
		index++;
	}

	return similarityArray;
}
const inputBuffer = await readFileFromPath("./src/day1/input.txt");
const fileContetnAsString = inputBuffer.toString();
const [inputArray1, inputArray2] = buildInputArrays(fileContetnAsString);
console.time("getScore");
const similarityArray = createSimilarityScoreArray(inputArray1, inputArray2);
console.timeEnd("getScore");
const result = similarityArray.reduce((a, b) => a + b, 0);
console.log(result);

/**
 * Chat GPT Better Performance Function
 * 200x better performance
 * mine around 4ms
 * this around 0.2ms
 */

function GptCreateSimiliarityScoreArray(
	inputArray1: number[],
	inputArray2: number[],
): number[] {
	// Create a frequency map for inputArray2
	const frequencyMap = new Map<number, number>();
	for (const num of inputArray2) {
		frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
	}

	// Calculate similarity scores
	const similarityScores: number[] = [];
	for (const num of inputArray1) {
		const count = frequencyMap.get(num) || 0;
		similarityScores.push(num * count);
		// Remove the number from the map after processing
		frequencyMap.delete(num);
	}

	return similarityScores;
}
