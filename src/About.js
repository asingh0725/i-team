import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './App.css';

const About = () => {
    return (
        <div className="about">
            <NavBar />
            <main className="about-content">
                <h1 className="about-title">About Us</h1>
                <div className="about-section">
                <h2 className="about-section-title">Why Share-A-Bite?</h2>
                    <p className="about-section-content">
                        Share-A-Bite is a platform that enables clubs and organizations to share information about their surplus food with hungry students at the University of Washington Seattle. By facilitating this exchange, Share-A-Bite not only helps address food insecurity among students but also contributes to the reduction of food waste.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="about-section-title">How do I use it?</h2>
                    <p className="about-section-content">
                        1. Log in using your UW netID <br />
                        2. After logging in with your UW netID, you will gain access to Share-A-Bite's feed, which is filled with posts about available food options <br />
                        3. To create a post, simply click on the "create post" button and provide all the necessary information as prompted <br />
                        4. All posts get deleted after 24hrs
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default About;