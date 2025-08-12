import React, { useState } from "react";

export default function FileUploader({ onFileSelect }) {
    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            onFileSelect(selectedFile);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {file && (
                <div>
                    <p style={{ color: "white"}}>
                        File Name: {file.name}
                    </p>
                </div>
            )}
        </div>
    );
}
