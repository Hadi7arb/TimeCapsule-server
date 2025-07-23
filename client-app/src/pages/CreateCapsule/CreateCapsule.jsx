import React, { useState } from "react";
import axios from "axios";
import './createCapsule.css';

const CreateCapsule = () => {
    const [formData, setFormData] = useState({
        title: "",
        revealDate: "",
        message: "",
        privacy: "private",
        color: "#000000",
        media: null,
        city: "",
        surpriseMode: false,
        mood: "neutral"
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('message', formData.message);
            data.append('mood', formData.mood);
            data.append('color', formData.color);
            data.append('privacy', formData.privacy);
            data.append('reveal_date', new Date(formData.revealDate).toISOString());
            data.append('surprise_mode', formData.surpriseMode ? "1" : "0");
            data.append('is_revealed', "0");
            data.append('city', formData.city);

    
            if (formData.media) {
                data.append('media', formData.media);
                data.append('media_url', formData.media);
            }

            const response = await axios.post('http://127.0.0.1:8000/api/add_update_capsule', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            
            setFormData({
                title: "",
                revealDate: "",
                message: "",
                privacy: "private",
                color: "#000000",
                media: null,
                city: formData.city, 
                surpriseMode: false,
                mood: "neutral"
            });

        } catch (err) {
            console.error("API Error:", err.response?.data);
            setError(err.response?.data?.message || "Failed to create capsule");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="capsule">
            <div className="centered-container">
                <h1 className="h1">create your capsule</h1>
                <h2 className="h2">Write your message, choose your color, and add a photo, then seal it for the future.</h2>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Capsule created successfully!</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                id="title" 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                placeholder="My capsule title" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="revealDate">Reveal date</label>
                            <input 
                                id="revealDate" 
                                type="date" 
                                name="revealDate" 
                                value={formData.revealDate} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>
                    <div className="form-text">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            placeholder="This is my message" 
                            required
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-privacy">
                            <label htmlFor="privacy">Privacy</label>
                            <select 
                                name="privacy" 
                                id="privacy" 
                                value={formData.privacy} 
                                onChange={handleChange}
                                required
                            >
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        <div className="form-color">
                            <label htmlFor="color">Capsule color</label>
                            <input 
                                id="color" 
                                type="color" 
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="media">Bring more life to your capsule! upload an image or audio</label>
                        <input 
                            id="media" 
                            type="file" 
                            name="media" 
                            accept="image/*,audio/*" 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>City: {formData.city}</label>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="surpriseMode">Surprise mode</label>
                            <input 
                                id="surpriseMode" 
                                type="checkbox" 
                                name="surpriseMode" 
                                checked={formData.surpriseMode} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sealing..." : "Seal your capsule"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCapsule;