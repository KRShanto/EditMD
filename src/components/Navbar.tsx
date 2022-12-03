import { useContext } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import {
    FilesContext,
    FilesContextType,
    MdFile,
    CurrentFilePathContext,
    CurrentFilePathContextType,
} from "../App";

async function getFile() {
    // Open a selection dialog for directories
    const selected = await open({
        directory: false,
        multiple: true,
        filters: [
            {
                name: "Markdown",
                extensions: ["md", "txt"],
            },
        ],
        title: "Select a markdown file",
    });

    console.log("Selected: ", selected);

    return selected;
}

async function openFile(
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

async function save(
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
    }
}

export default function Navbar() {
    const files = useContext(FilesContext);
    const currentFile = useContext(CurrentFilePathContext);

    return (
        <>
            <div className="navbar">
                <div className="logo">EditMD</div>

                {files && currentFile ? (
                    <div className="options">
                        <button onClick={() => openFile(files, currentFile)}>
                            Open File
                        </button>
                        <button onClick={() => save(files, currentFile)}>
                            Save
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
