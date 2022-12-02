import { useContext } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
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
                        <button>Save</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
