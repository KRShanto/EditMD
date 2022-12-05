import { CurrentFilePathContext, FilesContext } from "../App";
import { useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("rust", rust);

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
                        <ReactMarkdown
                            components={{
                                // overwrite with target="_blank"
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" />
                                ),
                                code: ({
                                    node,
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }) => {
                                    const match = /language-(\w+)/.exec(
                                        className || ""
                                    );
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            // @ts-ignore
                                            style={darcula}
                                            showLineNumbers={true}
                                            language={match[1]}
                                            PreTag="div"
                                            className="code-block"
                                            children={String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {selectedFile.content}
                        </ReactMarkdown>
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

// interface ComponentProps {
//     value: string | undefined;
//     language: string | undefined;
// }

// function Component({ value, language }: ComponentProps) {
//     return (
//         <ReactSyntaxHighlighter language={language} style={docco}>
//             {value ?? ""}
//         </ReactSyntaxHighlighter>
//     );
// }
