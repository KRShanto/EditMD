import { FilesContext, CurrentFilePathContext } from "../App";
import { useContext } from "react";
import { removeFile } from "../utils/removeFile";

export default function FileHeader() {
    const files = useContext(FilesContext);
    const currentFile = useContext(CurrentFilePathContext);

    return (
        <>
            <div className="file-header">
                {files && currentFile ? (
                    files.files.map((file, index) => {
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
                                    onClick={() =>
                                        // TODO: show a dialog if the file has unsaved changes
                                        removeFile(file, files, currentFile)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
}
