import { readFileFromPath } from "../utils/file";

function splitReports(reports: string): number[][] {
	//each line in the input contains a report and that report containts numbers
	// seperated by space
	return reports
		.split("\r\n")
		.map((report) => report.split(" ").map((x) => Number.parseInt(x)));
}
function reportIsValid(report: number[]) {
	let mutatingReport = [...report];

	let secondLife = true;
	const isIncreasing = (value: number) => value < 0 && value > -4;
	const isDecreasing = (value: number) => value > 0 && value < 4;
	let i = 0;
	while (i < mutatingReport.length) {
		const firstValue = mutatingReport[0];
		const secondValue = mutatingReport[1];
		const diff = firstValue - secondValue;
		console.log("while");
		// is between 1 and 3 incresse
		if (isIncreasing(diff)) {
			console.log("isIncreasing");
			//means it was incresing

			const currentValue = mutatingReport[i];
			const nextValue = mutatingReport[i + 1];
			const diff2 = currentValue - nextValue;
			// means we are at the end and it always meet our criteria of incresing and between 1-3
			if (nextValue === undefined) return true;
			if (!isIncreasing(diff2)) {
				if (secondLife) {
					mutatingReport = removeBrokenValue(mutatingReport, i);
					console.log(mutatingReport);
					//go back before the error
					i = 0;
					secondLife = false;
					continue;
				}
				return false;
			}
		}
		if (isDecreasing(diff)) {
			console.log("isDecreasing");
			//means it was decresing

			// console.log("mutatingReport:", mutatingReport);
			const currentValue = mutatingReport[i];
			const nextValue = mutatingReport[i + 1];
			const diff2 = currentValue - nextValue;
			// means we are at the end and it always meet our criteria of incresing and between 1-3
			if (nextValue === undefined) return true;
			if (!isDecreasing(diff2)) {
				if (secondLife) {
					mutatingReport = removeBrokenValue(mutatingReport, i);
					console.log(mutatingReport);
					i = 0;
					secondLife = false;
					continue;
				}
				return false;
			}
		}
		i++;
	}
	return false;
}
const buffer = await readFileFromPath("./src/day2/input.txt");
const reports = buffer.toString();
const workItems = splitReports(reports);
// const correctReportsCount = workItems.reduce((a, b) => {
// 	if (reportIsValid(b)) return a + 1;
// 	return a;
// }, 0);
// console.log(correctReportsCount);

const willBeStillFalse = [69, 71, 69, 68, 66, 63, 56, 52];
const willBeRight = [9, 7, 6, 2, 1];

function removeBrokenValue(report: number[], currentIndex: number) {
	const mutatingReport = [...report];
	const firstIsTheProblem = (report: number[]) => {
		const diff = Math.abs(report[currentIndex] - report[currentIndex + 1]);
		return diff > 0 && diff < 4;
	};
	const currentIsTheProblem = (report: number[]) => {
		const diff = Math.abs(report[currentIndex - 1] - report[currentIndex + 1]);
		return diff > 0 && diff < 4;
	};
	const thirdIsTheProblem = (report: number[]) => {
		const diff = Math.abs(report[currentIndex] - report[currentIndex + 2]);
		return diff > 0 && diff < 4;
	};
	if (firstIsTheProblem(report)) {
		console.log("first");
		mutatingReport.splice(currentIndex - 1, 1);
		return mutatingReport;
	}
	if (currentIsTheProblem(report)) {
		console.log("current");
		mutatingReport.splice(currentIndex, 1);
		return mutatingReport;
	}
	if (thirdIsTheProblem(report)) {
		console.log("third");
		mutatingReport.splice(currentIndex + 1, 1);
		return mutatingReport;
	}
	return mutatingReport;
}
//[69, 71, 69, 68]
//current [69, 69, 68]
// needs to be [71, 69, 68]
// console.log(reportIsValid([69, 71, 69, 68]));
// for (let index = 0; index < [69, 71, 69, 68].length; index++) {
// 	const element = [69, 71, 69, 68][index];
// 	removeBrokenValue([69, 71, 69, 68], index);
// }
// removeBrokenValue([69, 71, 69, 68], 0);
console.log(reportIsValid([69, 71, 69, 68]));
console.log(reportIsValid([69, 71, 66, 65]));
console.log(reportIsValid([69, 71, 66, 72]));
