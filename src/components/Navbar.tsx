import { useContext } from "react";
import { FilesContext, CurrentFilePathContext } from "../App";
import { addFile } from "../utils/addFile";
import { saveFile } from "../utils/saveFile";

export default function Navbar() {
    const files = useContext(FilesContext);
    const currentFile = useContext(CurrentFilePathContext);

    return (
        <>
            <div className="navbar">
                <div className="logo">EditMD</div>

                {files && currentFile ? (
                    <div className="options">
                        <button onClick={() => addFile(files, currentFile)}>
                            Open File
                        </button>
                        <button onClick={() => saveFile(files, currentFile)}>
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
