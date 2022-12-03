import { open } from "@tauri-apps/api/dialog";

// Open a dialog to select a file
export async function getFile() {
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
