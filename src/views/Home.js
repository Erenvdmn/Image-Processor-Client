import React, { useState } from "react";
import ApiRequest from '../helpers/ApiManager';
import FileUploader from '../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
    const [image, setImage] = useState(null);
    const [ tag, setTag ] = useState('');
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!image) {
            return alert("Please upload an image first");
        }

        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('tag', tag)

            ApiRequest('upload', 'POST', formData, true)
                .then(res => res.json())
                .then(data => console.log(data));

            console.log('endpoint çalışıyor')
            
            window.location.href ='http://192.168.0.250:3000/library';

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
                                <input 
                                    className="tag-input" 
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    />
                                <button onClick={handleUpload}>Upload</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
