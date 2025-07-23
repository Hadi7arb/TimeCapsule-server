import React from "react";
import Header2 from '../../components/Header2/Header2.jsx';
import './HomePage.css';

const HomePage = () => {


    return(
        <div className="homepage-container"> 
            <Header2/>
            <main className="content-section"> 
                <div className="card-wrapper"> 

                    
                    <div className="feature-card">
                        <h1 className="card-title">View capsules</h1>
                        <h2 className="card-description">
                            Explore public messages from other users <br/> and feel their stories unfold
                        </h2>
                        <button className="card-button">
                            View messages
                        </button>
                    </div>
                    <div className="feature-card">
                        <h1 className="card-title">Create capsule</h1>
                        <h2 className="card-description">
                            Write your own messages, choose its <br />colours, and set a reveal date <br />for the future
                        </h2>
                        <button className="card-button">
                            Start writing
                        </button>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default HomePage;