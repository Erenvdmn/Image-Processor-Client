import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from '../helpers/ApiManager';
import '../css/Library.css';


export default function Library({ images, setImages }) {
    const [ searchTerm, setSearchTerm ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await ApiRequest('media', 'GET');
                console.log("RESPONSE: ", response);

                if (response.ok) {
                    console.log("Images listed");
                    const data = await response.json();
                    setImages(data);
                    return;
                } else {
                    console.error("Images can't be listed");
                    return;
                }
            } catch (error) {
                console.error("Images can't be listed ", error);
                return;
            }
        }
        fetchImages();
    }, []);

    const fetchImageWithId = async (id) => {
        try {
            const response = await ApiRequest(`image/${id}`, 'GET');
            console.log("RESPONSE: ", response);

            if (response.ok) {
                console.log("Image called");
                navigate(`edit${response.url.substring(response.url.lastIndexOf("/"))}`)
                return;
            } else {
                console.error("Image can't called");
                return;
            }
        } catch (error) {
            console.error("Image can't called", error);
            return;
        }
    }

    const filteredImages = images.filter(image => 
        image.tag.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    return (
        <div className="background" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0}}>
            <div className="search-div">
                <div className='search-container'>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className='search-input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="images-container">
                {
                    filteredImages.map((image, index) => (                            
                        <div
                            key={image._id}
                            className="image"
                            style={{ backgroundImage: `url(${image.path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            onClick={() => fetchImageWithId(image._id)}
                        >
                            <div className="image-footer">
                                {image.tag.length > 30 ? (
                                    <span className="image-tag">{image.tag.substring(0,25) + '...'}</span>) : 
                                (
                                    <span className="image-tag">{image.tag}</span>
                                )}
                                
                            </div>
                        </div>      
                    ))
                }
            </div>
        </div>
    )
}