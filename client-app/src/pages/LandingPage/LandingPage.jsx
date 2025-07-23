import React from "react";
import './LandingPage.css';
import Header from '../../components/Header/Header.jsx';
import  Footer from '../../components/Footer/Footer.jsx';

const LandingPage = () => {

    return(
        <div className="landing-page-container">
            <Header/>
            <div className="capsule-section">
                <h1>Seal your thoughts. <br/> Unlock your future.</h1>
                <h3>Create your capsule , Send yourself something worth reading tomorrow.</h3>
                <div>
                    <p>A space to pause, reflect, and speak to the version of you that hasn't arrived yet. 
                        <br/> Capture a moment from today, your thoughts, your feelings, your quiet dreams and 
                        <br/> send it into the future like a sealed letter to yourself. Whether it's hope or humour, a 
                        <br/> reminder or a revelation, you decide what stays hidden until it's time. Choose the 
                        <br/> message, design its mood, and set a date for it to return. This isn’t just writing, it’s 
                        <br/> remembering forward. It’s giving time a voice, and yourself a second chance to listen.</p>
                </div>
            </div>
        <Footer/>
        </div>
        
        
    );
}

export default LandingPage;