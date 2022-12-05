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
- Improve the syntax highlighting feature
- Highly customizable theme
*/

/*
TODOs to do:

- Create a component `TextArea` that will be used for editing the text.
   It will also have the functionality to undo/redo changes.
   It will show the line numbers
   Tab will indent the text

- Try to reduce the bundle size. Try to optimize the react-syntax-highlighter and react-markdown packages
   
- Fonts fanily
*/

// Type of a file
export interface MdFile {
    name: string;
    path: string;
    content: string;
    hasUnsavedChanges: boolean;
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
        // {
        //     path: "/demo/file.txt",
        //     content:
        //         "It is just for a demo\nIts an [example](https://example.com)",
        //     name: "file.txt",
        //     hasUnsavedChanges: false,
        // },
        // {
        //     path: "/demo/file2.txt",
        //     content: "It is just for a demo",
        //     name: "file2.txt",
        //     hasUnsavedChanges: false,
        // },
        // {
        //     path: "/demo/file3.txt",
        //     content: "It is just for a demo",
        //     name: "file3.txt",
        //     hasUnsavedChanges: false,
        // },
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
                    <div className="edit-section">
                        <Editor />
                        <Result />
                    </div>
                </CurrentFilePathContext.Provider>
            </FilesContext.Provider>
        </>
    );
}

export default App;
