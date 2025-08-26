import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from '../helpers/ApiManager';
import FileUploader from '../components/FileUploader';
import '../css/Edit.css';
import { useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";


export default function Edit({ setImages }) {
    const { id } = useParams();
    const [ width, setWidth ] = useState(null);
    const [ height, setHeight ] = useState(null);
    const [ type, setType ] = useState(null);
    const [ tag, setTag ] = useState(null)
    const [ imageURL, setImageURL ] = useState(null);
    const [ watermark, setWatermark ] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await ApiRequest(`media/${id}`, 'GET');
                const data = await response.json();
                console.log("DAATA: ", data);

                if (response.ok) {
                    console.log("Image Called");
                    setWidth(data.width);
                    setHeight(data.height);
                    setType(data.type);
                    setTag(data.tag)
                } if (data.path) {
                    setImageURL(data.path);
                }
                
                else {
                    return console.error("Image can't be called");
                }
            } catch (error) {
                return console.error("Image can't be called", error);
            }
        }
        fetchImage();
        
    }, [id]);


    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', watermark)

            ApiRequest('uploadWM', 'POST', formData, true)
                .then(res => res.json())
                .then(data => console.log(data));
        } catch (error) {
            console.error("Watermark couldn't be uploaded");
        }
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                id,
                width,
                height,
                type,
                tag
            };

            const res = await ApiRequest('apply-watermark-and-edit', 'POST', payload);
            if (res.ok) {
                const data = await res.json();
                if (data.done) {
                    navigate("/library");
                    return;
                }
            }
            console.error("Response not ok");
        } catch (error) {
            console.error("Response not ok", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await ApiRequest(`delete/${id}`, 'POST');

            if (response.ok) {
                setImages(prev => prev.filter(img => img._id !== id));
                navigate('/library')
                return console.log("image deleted");
            }
            return console.error("image can't be deleted")
        } catch (error) {
            return console.error("image couldn't deleted", error)
        }
    }



    return (
        <div className="background" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0}}>
            <Card className="form-section">
                <Label>Watermark</Label>
                <div className="upload-image-div">
                    <FileUploader onFileSelect={setWatermark}/>
                </div>
                <Button className="orange-button" onClick={handleUpload}>Edit With Watermark</Button>
            </Card>
            <Card className="form-section">
                <Label>Width:</Label>
                <Input
                    className="form-input"
                    type="number"
                    value={width}
                    min={0}
                    onChange={(e) => setWidth(e.target.value)}
                    step="10"
                />
                <Label>Height:</Label>
                <Input
                    className="form-input"
                    type="number"
                    value={height}
                    min={0}
                    onChange={(e) => setHeight(e.target.value)}
                    step="10"
                />
                <Label>Type:</Label>
                <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="png">png</option>
                    <option value="jpeg">jpg</option>
                </select>
                <Label>Tag:</Label>
                <Input 
                    className="form-input"
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <Button className="orange-button" onClick={() => handleSubmit()}>Change</Button>
            </Card>
            <div className="image-view-div">
                <div className="image-view">
                    {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
                </div>
                <Button className="delete-button" onClick={() => handleDelete(id)}>Delete Image</Button>
            </div>
        </div>
    )
}