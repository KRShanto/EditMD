import { FilesContext, FilesContextType, CurrentFilePathContext } from "../App";
import { useContext } from "react";

function EditorLayout({ children }: { children: React.ReactNode }) {
    return <div className="editor">{children}</div>;
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
                                                };
                                            } else {
                                                return file;
                                            }
                                        })
                                    );
                                }
                            }}
                        />
                    </EditorLayout>
                </>
            );
        } else {
            return (
                <EditorLayout>
                    <></>
                </EditorLayout>
            );
        }
    } else {
        return (
            <EditorLayout>
                <></>
            </EditorLayout>
        );
    }
}
