import { confirm } from "@tauri-apps/api/dialog";
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
                                    onClick={async () => {
                                        if (file.hasUnsavedChanges) {
                                            // show a dialog if the file has unsaved changes
                                            let confirmed = await confirm(
                                                "You will lose your unsaved changes if you continue.",
                                                {
                                                    type: "warning",
                                                    title: "You have unsaved changes. Are you sure you want to close this file?",
                                                }
                                            );

                                            if (confirmed) {
                                                removeFile(
                                                    file,
                                                    files,
                                                    currentFile
                                                );
                                            }
                                        } else {
                                            removeFile(
                                                file,
                                                files,
                                                currentFile
                                            );
                                        }
                                    }}
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
