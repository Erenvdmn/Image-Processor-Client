import React, { useState } from "react";
import ApiRequest from '../helpers/ApiManager';
import FileUploader from '../components/FileUploader';
import '../css/Home.css';

export default function Home() {
    const [image, setImage] = useState(null);

    const handleUpload = async () => {
        if (!image) {
            return alert("Please upload an image first");
        }

        try {
            const formData = new FormData();
            formData.append('file', image);

            ApiRequest('upload', 'POST', formData, true)
                .then(res => res.json())
                .then(data => console.log(data));

        } catch (error) {
            console.error("Image couldn't be uploaded ", error);
        }
    };

    return (
        <div className="page-container">
            <div className="upload-div">
                <div className="upload-header">
                    <h2 className="upload-div-header">Upload</h2>

                    <div className="upload-image-div">
                        <FileUploader onFileSelect={setImage} />
                    </div>

                    <div className="images-uploaded">
                        {image && (
                            <div className="image-info">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    style={{ maxWidth: "200px", display: "block", marginTop: "10px" }}
                                />
                                <p>Name: {image.name}</p>
                                <p>Size: {(image.size / 1024).toFixed(2)} KB</p>
                                <p>Type: {image.type}</p>
                                <button onClick={handleUpload}>Upload</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
