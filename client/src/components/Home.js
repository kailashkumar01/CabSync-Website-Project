import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shareRideImage from '../assets/images/share-ride.png';
import goGreenImage from '../assets/images/go-green.png';
import saveMoneyImage from '../assets/images/save-money.png';
import Typewriter from 'typewriter-effect';
import { PacmanLoader } from 'react-spinners';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Set the time according to your preference

        return () => clearTimeout(timer);
    }, []);

    const goToRides = () => {
        navigate('/rides');
    };

    if (loading) {
        return (
            <div className="loading-container flex justify-center items-center h-screen">
                <PacmanLoader size={40} margin={2} color={"#00BFFF"} />
            </div>
        );
    }



    return (
        <div className="home-container bg-gradient-to-b from-indigo-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center">
            {/* <h1 className="text-5xl font-extrabold text-indigo-700 my-6">GoTogether</h1> */}
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString('GoTogether !')
                        .pauseFor(2000)
                        .deleteAll()
                        .start();
                }}
                options={{
                    loop: true
                }}
            />



            <p className="text-xl text-gray-800 mb-12">Connecting Your Journeys</p>
            <button
                onClick={goToRides}
                className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg text-xl mb-12 transition duration-300 ease-in-out transform hover:scale-105"
            >
                Find a Ride
            </button>
            <div className="features grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="feature bg-white rounded-lg shadow-xl p-8 text-center">
                    <img src={shareRideImage} alt="Share Ride" className="h-30 mx-auto mb-6" />
                    <h3 className="text-2xl font-extrabold text-indigo-700 mb-4">Share Your Ride</h3>
                    <p className="text-gray-700 text-base">Meet interesting people and split the costs by sharing your ride.</p>
                </div>
                <div className="feature bg-white rounded-lg shadow-xl p-8 text-center">
                    <img src={goGreenImage} alt="Eco-friendly" className="h-30 mx-auto mb-6" />
                    <h3 className="text-2xl font-extrabold text-indigo-700 mb-4">Go Green</h3>
                    <p className="text-gray-700 text-base">Reduce your carbon footprint by carpooling with others.</p>
                </div>
                <div className="feature bg-white rounded-lg shadow-xl p-8 text-center">
                    <img src={saveMoneyImage} alt="Save Money" className="h-48 mx-auto mb-6" />
                    <h3 className="text-2xl font-extrabold text-indigo-700 mb-4">Save Money</h3>
                    <p className="text-gray-700 text-base">Cut down your travel expenses by sharing the ride with fellow travelers.</p>
                </div>
            </div>
            <div className="testimonials grid gap-12 grid-cols-1 sm:grid-cols-2 mt-16 mb-5">
                <div className="testimonial bg-white rounded-lg shadow-xl p-8">
                    <p className="text-gray-800 text-lg mb-6">"Finding rides has never been easier! I love how simple and convenient GoTogether makes carpooling."</p>
                    <p className="text-gray-800 font-semibold">- Amali, A Happy Commuter</p>
                </div>
                <div className="testimonial bg-white rounded-lg shadow-xl p-8">
                    <p className="text-gray-800 text-lg mb-6">"I've met some incredible people through this app. It's not just about sharing rides, it's about sharing experiences."</p>
                    <p className="text-gray-800 font-semibold">- Tanisha, A Regular User</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
