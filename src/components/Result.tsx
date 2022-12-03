import { CurrentFilePathContext, FilesContext } from "../App";
import { useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Result() {
    const files = useContext(FilesContext);
    const currentFile = useContext(CurrentFilePathContext);

    // Get the current file
    const selectedFile = files?.files.find(
        (file) => file.path === currentFile?.currentFile
    );

    return (
        <>
            <div className="edit-result">
                <div className="header">Preview</div>
                <div className="result">
                    {selectedFile !== undefined ? (
                        <ReactMarkdown>{selectedFile.content}</ReactMarkdown>
                    ) : (
                        <ReactMarkdown>
                            {"## Select a file to edit"}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        </>
    );
}
