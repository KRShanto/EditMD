import { CurrentFilePathContextType, FilesContextType } from "../App";
import { writeTextFile } from "@tauri-apps/api/fs";

// Save the currently open file to the file system
export async function saveFile(
    files: FilesContextType,
    currentFile: CurrentFilePathContextType
) {
    // Get the current file
    const file = files.files.find(
        (file) => file.path === currentFile.currentFile
    );
    if (file === undefined) {
        // No file is open
        console.log("No file is open");
    } else {
        // Check if the file has unsaved changes
        if (file.hasUnsavedChanges) {
            // Save the file
            try {
                await writeTextFile(file.path, file.content);
                console.log("File saved");

                // Update the file in the list
                const newFiles = files.files.map((file) => {
                    if (file.path === currentFile.currentFile) {
                        return {
                            ...file,
                            hasUnsavedChanges: false,
                        };
                    } else {
                        return file;
                    }
                });
                // Update the list
                files.setFiles(newFiles);
            } catch (error) {
                console.error(
                    "Error while saving the file {",
                    file.path,
                    "}, Error: ",
                    error
                );
            }
        } else {
            console.log("File has no unsaved changes");
        }
    }
}
