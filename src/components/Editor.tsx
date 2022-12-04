import { FilesContext, FilesContextType, CurrentFilePathContext } from "../App";
import { useContext } from "react";

function EditorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="editor">
            <div className="header">Markdown</div>
            <div className="content">{children}</div>
        </div>
    );
}

export default function Editor() {
    const files = useContext(FilesContext);
    const currentFilePath = useContext(CurrentFilePathContext);

    if (currentFilePath?.currentFile !== null) {
        const selected = files?.files.find(
            (file) => file.path === currentFilePath?.currentFile
        );

        if (selected !== undefined) {
            return (
                <>
                    <EditorLayout>
                        <div className="line-numbers">
                            {selected.content
                                .split("\n")
                                .map((_, index) => index + 1)
                                .map((line) => (
                                    <div key={line}>{line}</div>
                                ))}
                        </div>
                        <textarea
                            value={selected.content}
                            onChange={(event) => {
                                if (files !== null) {
                                    files.setFiles(
                                        files.files.map((file) => {
                                            if (file.path === selected.path) {
                                                return {
                                                    ...file,
                                                    content: event.target.value,
                                                    hasUnsavedChanges: true,
                                                };
                                            } else {
                                                return file;
                                            }
                                        })
                                    );
                                }
                            }}
                            onScroll={(event) => {
                                // scroll the line numbers
                                const target =
                                    event.target as HTMLTextAreaElement;
                                const lineNumbers =
                                    document.querySelector(".line-numbers");
                                const result = document.querySelector(
                                    ".edit-result .result"
                                );
                                if (lineNumbers !== null) {
                                    lineNumbers.scrollTop = target.scrollTop;

                                    // scroll the result
                                    if (result !== null) {
                                        result.scrollTop = target.scrollTop;
                                    }
                                }
                            }}
                        />
                    </EditorLayout>
                </>
            );
        } else {
            return (
                <EditorLayout>
                    <textarea
                        readOnly
                        value="Select a file to start editing"
                    ></textarea>
                </EditorLayout>
            );
        }
    } else {
        return (
            <EditorLayout>
                <textarea
                    readOnly
                    value="Select a file to start editing"
                ></textarea>
            </EditorLayout>
        );
    }
}
