import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CapsulesPage.css'; 

const CapsulesPage = () => {
    const [capsules, setCapsules] = useState([]);
    const [moodFilter, setMoodFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCapsule, setSelectedCapsule] = useState(null);

    const fetchCapsules = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (Object.keys(filters).length > 0 && (moodFilter || countryFilter || dateFilter)) {
                console.log("Fetching filtered capsules with filters:", filters);
                response = await axios.get('http://127.0.0.1:8000/api/filter_by', filters);
            } else {
                console.log("Fetching all capsules...");
                response = await axios.get('http://127.0.0.1:8000/api/capsules');
            }

            console.log("API Response Data:", response.data); 

            
            
            if (Array.isArray(response.data)) {
                setCapsules(response.data);
            } else if (response.data && Array.isArray(response.data.payload)) {
                
                setCapsules(response.data.payload);
            } else if (response.data && Array.isArray(response.data.capsules)) {
                
                setCapsules(response.data.capsules);
            } else if (response.data && Array.isArray(response.data.data)) {
                
                setCapsules(response.data.data);
            }
            else {
                
                console.warn("API response data is not an array or does not contain a 'capsules'/'data'/'payload' array:", response.data);
                setCapsules([]);
            }
            
            console.log("Capsules state set. Check React DevTools for current state.");


        } catch (err) {
            console.error("Error fetching capsules:", err);
            setError("Failed to fetch capsules. Please try again later.");
            setCapsules([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCapsules();
    }, []);

    const handleFilter = () => {
        const filters = {};
        if (moodFilter) filters.mood = moodFilter;
        if (countryFilter) filters.country = countryFilter;
        if (dateFilter) filters.reveal_date = dateFilter;
        fetchCapsules(filters);
    };

    const openModal = (capsule) => {
        setSelectedCapsule(capsule);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCapsule(null);
    };

    return (
        <div className="app-container">
            <h1 className="title">Revealed Capsules</h1>
            <p className="subtitle">Explore messages shared by others</p>

            <div className="filter-section">
                <h2 className="filter-title">Filter Capsules</h2>
                <div className="filter-grid">
                    <div>
                        <label htmlFor="mood" className="label">Mood</label>
                        <input
                            type="text"
                            id="mood"
                            className="input"
                            placeholder="e.g., Happy, Sad, Hopeful"
                            value={moodFilter}
                            onChange={(e) => setMoodFilter(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="label">Country</label>
                        <input
                            type="text"
                            id="country"
                            className="input"
                            placeholder="e.g., USA, Canada"
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="reveal_date" className="label">Reveal Date</label>
                        <input
                            type="date"
                            id="reveal_date"
                            className="input"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    onClick={handleFilter}
                    className="filter-button"
                >
                    Apply Filters
                </button>
            </div>

            {loading && <p className="message">Loading capsules...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && capsules.length === 0 && (
                <p className="message">No capsules found. Try adjusting your filters.</p>
            )}

            <div className="capsules-grid">
                {capsules.map((capsule) => (
                    <div
                        key={capsule.id}
                        className="capsule-card"
                    >
                        <div className="capsule-header">
                            {capsule.username || 'Anonymous'}
                        </div>
                        <div className="capsule-content">
                            <h3 className="capsule-title">{capsule.title || 'No Title'}</h3>
                            <p className="capsule-snippet">
                                {capsule.message_snippet || 'No message snippet available.'}
                            </p>
                            <button
                                onClick={() => openModal(capsule)}
                                className="reveal-button"
                            >
                                Reveal full Message
                            </button>
                            <p className="reveal-date">
                                Revealed on {new Date(capsule.reveal_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }) || 'N/A'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedCapsule && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            onClick={closeModal}
                            className="modal-close-button"
                        >
                            &times;
                        </button>
                        <h2 className="modal-title">{selectedCapsule.title || 'No Title'}</h2>
                        <p className="modal-username">By: {selectedCapsule.username || 'Anonymous'}</p>
                        <p className="modal-message">{selectedCapsule.full_message || 'No full message available.'}</p>
                        <p className="modal-date">
                            Revealed on {new Date(selectedCapsule.reveal_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }) || 'N/A'}
                        </p>
                        {selectedCapsule.mood && <p className="modal-date">Mood: {selectedCapsule.mood}</p>}
                        {selectedCapsule.country && <p className="modal-date">Country: {selectedCapsule.country}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CapsulesPage;
