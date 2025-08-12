import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from '../helpers/ApiManager';
import '../css/Edit.css';
import { useParams } from "react-router";


export default function Edit() {
    const { id } = useParams();
    const [ width, setWidth ] = useState(null);
    const [ height, setHeight ] = useState(null);
    const [ type, setType ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
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


    const handleSubmit = async () => {
        try {

            const payloadConvertType = {
                id,
                newType: type
            };
            const payloadChangeSize = {
                id,
                width: width,
                height: height
            };
            const responseConvertType = await ApiRequest(`convert-type`, 'POST', payloadConvertType);
            const responseChangeSize = await ApiRequest(`change-size`, 'POST', payloadChangeSize);

            if (responseChangeSize.ok && responseConvertType.ok) {
                console.log(responseChangeSize, responseConvertType);
                navigate("/library")
                return;
            } else {
                return console.error("Response not ok");
            }
        } catch (error) {
            return console.error("Response not ok", error);
        }
    }

    return (
        <div className="background">
            <div className="form-section">
                <label>Width:</label>
                <input
                    className="form-input"
                    type="number"
                    value={width}
                    min={0}
                    onChange={(e) => setWidth(e.target.value)}
                    step="10"
                />
                <label>Height:</label>
                <input
                    className="form-input"
                    type="number"
                    value={height}
                    min={0}
                    onChange={(e) => setHeight(e.target.value)}
                    step="10"
                />
                <label>Type:</label>
                <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="png">png</option>
                    <option value="jpeg">jpg</option>
                </select>
                <button onClick={() => handleSubmit()}>Change</button>
            </div>
            <div className="image-view">
                {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
            </div>
        </div>
    )
}