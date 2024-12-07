import { readFile } from "node:fs/promises";
/**
 * Reads a file from the specified path relative to the `package.json`.
 *
 * @param path - The file path relative to the `package.json`.
 * @returns A Promise that resolves to a Buffer containing the file content.
 */
export async function readFileFromPath(path: string): Promise<Buffer> {
	try {
		const content = await readFile(path);
		return content;
	} catch (error) {
		console.log("There was an Error reading the file", error);
		return Buffer.from([]);
	}
}
