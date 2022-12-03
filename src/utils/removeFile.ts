import { CurrentFilePathContextType, FilesContextType, MdFile } from "../App";

// Remove a file from the list of files
export function removeFile(
    file: MdFile,
    files: FilesContextType,
    currentFile: CurrentFilePathContextType
) {
    // file to remove
    const fileToRemove = file.path;

    // Check if the file was in the first position
    const isFirst = files?.files[0].path === fileToRemove;

    if (files?.files.length > 1) {
        if (isFirst) {
            // Set the current file to the second file
            currentFile?.setCurrentFile(files?.files[1].path);
        } else {
            // Set the current file to the first file
            currentFile?.setCurrentFile(files?.files[0].path);
        }
    } else if (files?.files.length === 1) {
        // Set the current file to the first file
        currentFile?.setCurrentFile(files?.files[0].path);
    } else {
        // Set the current file to null
        currentFile?.setCurrentFile(null);
    }

    // Remove the file from the list
    files?.setFiles(files.files.filter((file) => file.path !== fileToRemove));
}
