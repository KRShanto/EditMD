import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import Result from "./components/Result";
import { useState, createContext, useEffect } from "react";
import FileHeader from "./components/FileHeader";

/*
FEATUREs to add:

- Keyboard shortcuts
- Create a new file
- Rich text editor
- Help menu to show keyboard shortcuts and how to use the markdown editor
- Save the opened file paths to the filesystem when the app is about to close
- Warn the user if they are about to close the app with unsaved changes
*/

// Type of a file
export interface MdFile {
    name: string;
    path: string;
    content: string;
    // isSaved: boolean; // TODO: add this
}

// Type of the context of the MdFile
export interface FilesContextType {
    files: MdFile[];
    setFiles: React.Dispatch<React.SetStateAction<MdFile[]>>;
}

// Type of the context of the current file
export interface CurrentFilePathContextType {
    currentFile: string | null;
    setCurrentFile: React.Dispatch<React.SetStateAction<string | null>>;
}

// File Context
export const FilesContext = createContext<FilesContextType | null>(null);

// Current File Context
export const CurrentFilePathContext =
    createContext<CurrentFilePathContextType | null>(null);

function App() {
    const [files, setFiles] = useState<MdFile[]>([
        {
            path: "/demo/file.txt",
            content: "It is just for a demo",
            name: "file.txt",
        },
    ]);
    const [currentFile, setCurrentFile] = useState<string | null>(null);

    return (
        <>
            <FilesContext.Provider value={{ files, setFiles }}>
                <CurrentFilePathContext.Provider
                    value={{
                        currentFile,
                        setCurrentFile,
                    }}
                >
                    <Navbar />
                    <FileHeader />
                    <Editor />
                    <Result />
                </CurrentFilePathContext.Provider>
            </FilesContext.Provider>
        </>
    );
}

export default App;
