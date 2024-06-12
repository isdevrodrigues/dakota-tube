import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero min-h-screen"
             style={{
                 backgroundImage: `url(${import.meta.env.BASE_URL}assets/dakota.jpeg)`,
             }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to DakotaTube</h1>
                    <p className="mb-5">Discover a curated collection of Dakota Fanning's top YouTube videos, all in one place.</p>
                    <Link to="/videos">
                        <button className="btn btn-primary">Start Watching</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
