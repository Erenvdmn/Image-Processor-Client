import React, { useEffect, useState }from "react";
import ApiRequest from '../helpers/ApiManager';
import '../css/Library.css';


export default function Library() {

    const [ images, setImages ] = useState([]);
    const ApiDomain = '192.168.0.250';

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
                window.open(`http://${ApiDomain}:3000/edit${response.url.substring(response.url.lastIndexOf("/"))}`)
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

    return (
        <div className="background">
            {
                images.map((image, index) => (                            
                    <div
                        key={image._id}
                        className="image"
                        style={{ backgroundImage: `url(${image.path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        onClick={() => fetchImageWithId(image._id)}
                    ></div>      
                ))
            }
        </div>
    )
}