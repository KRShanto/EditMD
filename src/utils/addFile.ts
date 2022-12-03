import { FilesContextType, CurrentFilePathContextType, MdFile } from "../App";
import { getFile } from "./getFile";
import { readTextFile } from "@tauri-apps/api/fs";

// Add a file to the list of files
export async function addFile(
    files: FilesContextType,
    currentFile: CurrentFilePathContextType
) {
    const inputFiles = await getFile();

    if (inputFiles === null) {
        // user cancelled the selection
        console.log("cancelled");
    } else {
        // Check if the file path is already in the list
        // If it is, don't add it again
        // If it isn't, load the file and add it to the list
        const newFiles: MdFile[] = [];
        for (let i = 0; i < inputFiles.length; i++) {
            const path = inputFiles[i];
            // Check if the file is already in the list
            const file = files.files.find((file) => file.path === path);
            if (file === undefined) {
                // File is not in the list
                // Load the file and add it to the list
                try {
                    const content = await readTextFile(path);
                    const name = path.split("/").pop();
                    newFiles.push({
                        path: path,
                        content: content,
                        name: name ? name : "",
                        hasUnsavedChanges: false,
                    });
                } catch (error) {
                    // TODO: handle it
                    console.error(
                        "Error while reading the file {",
                        path,
                        "}, Error: ",
                        error
                    );
                }
            }
        }

        // Add the new files to the list
        if (newFiles.length > 0) {
            files.setFiles([...files.files, ...newFiles]);

            // Set the current file to the last file in the list
            currentFile.setCurrentFile(newFiles[newFiles.length - 1].path);
        }
    }
}
