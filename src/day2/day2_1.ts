import { readFileFromPath } from "../utils/file";

function splitReports(reports: string): number[][] {
	//each line in the input contains a report and that report containts numbers
	// seperated by space
	return reports
		.split("\r\n")
		.map((report) => report.split(" ").map((x) => Number.parseInt(x)));
}
function reportIsValid(report: number[]) {
	const firstValue = report[0];
	const secondValue = report[1];
	const diff = firstValue - secondValue;

	const isIncresing = (value: number) => value < 0 && value > -4;
	const isDecresing = (value: number) => value > 0 && value < 4;
	// console.log(firstValue, secondValue, diff, {
	// 	isDecresing: isDecresing(diff),
	// 	isIncresing: isIncresing(diff),
	// });

	// is between 1 and 3 incresse
	if (isIncresing(diff)) {
		//means it was incresing
		for (let i = 0; i < report.length; i++) {
			const currentValue = report[i];
			const nextValue = report[i + 1];
			const diff2 = currentValue - nextValue;
			// means we are at the end and it always meet our criteria of incresing and between 1-3
			if (nextValue === undefined) return true;
			if (!isIncresing(diff2)) return false;
		}
	}
	if (isDecresing(diff)) {
		//means it was decresing
		for (let i = 0; i < report.length; i++) {
			const currentValue = report[i];
			const nextValue = report[i + 1];
			const diff2 = currentValue - nextValue;
			// means we are at the end and it always meet our criteria of incresing and between 1-3
			if (nextValue === undefined) return true;
			if (!isDecresing(diff2)) return false;
		}
	}
	//default false since condition not meet
	return false;
}
const buffer = await readFileFromPath("./src/day2/input.txt");
const reports = buffer.toString();
const workItems = splitReports(reports);
const correctReportsCount = workItems.reduce((a, b) => {
	if (reportIsValid(b)) return a + 1;
	return a;
}, 0);
console.log(correctReportsCount);
