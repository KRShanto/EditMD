import { FilesContext, FilesContextType, CurrentFilePathContext } from "../App";
import { useContext } from "react";

export default function FileHeader() {
    const files = useContext(FilesContext);
    const currentFile = useContext(CurrentFilePathContext);

    return (
        <>
            <div className="file-header">
                {files?.files.map((file, index) => {
                    return (
                        <div className="header" key={index}>
                            <button
                                title={file.path}
                                style={
                                    file.hasUnsavedChanges
                                        ? { color: "red" }
                                        : {}
                                }
                                onClick={() => {
                                    currentFile?.setCurrentFile(file.path);
                                }}
                            >
                                {file.name}
                            </button>
                            <button
                                onClick={() => {
                                    // file to remove
                                    const fileToRemove = file.path;

                                    // Check if the file was in the first position
                                    const isFirst =
                                        files?.files[0].path === fileToRemove;

                                    if (files?.files.length > 1) {
                                        if (isFirst) {
                                            // Set the current file to the second file
                                            currentFile?.setCurrentFile(
                                                files?.files[1].path
                                            );
                                        } else {
                                            // Set the current file to the first file
                                            currentFile?.setCurrentFile(
                                                files?.files[0].path
                                            );
                                        }
                                    } else if (files?.files.length === 1) {
                                        // Set the current file to the first file
                                        currentFile?.setCurrentFile(
                                            files?.files[0].path
                                        );
                                    } else {
                                        // Set the current file to null
                                        currentFile?.setCurrentFile(null);
                                    }

                                    // Remove the file from the list
                                    files?.setFiles(
                                        files.files.filter(
                                            (file) => file.path !== fileToRemove
                                        )
                                    );
                                }}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
