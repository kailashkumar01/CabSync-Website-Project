import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PacmanLoader } from 'react-spinners';

const RideDetails = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rides/${id}`); // Replace with your API endpoint
        setRide(response.data);
        // Simulate a delay for demonstration purposes
        setTimeout(() => {
          setLoading(false); // Set loading to false after the timeout
        }, 2000);
      } catch (error) {
        console.error('Error fetching ride:', error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };
    fetchRide();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <PacmanLoader color={'#00BFFF'} size={45} />
      </div>
    );
  }

  const handleRequestSeat = () => {
    if (isAuthenticated) {
      navigate(`/rides/${id}/create-request`);
    } else {
      toast.error('You need to be signed in to make a request.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000, // 5 seconds
      });
      setTimeout(() => {
        loginWithRedirect();
      }, 5000); // Delay the redirection by 1 second
    }
  };


  return (
    <div className="custom-container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Ride Details</h2>
      <div className="bg-white shadow-md rounded p-8 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Driver:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.driver}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Departure Location:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.departureDetails.departureLocation}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Departure Date and Time:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.departureDetails.departureDateTime}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Destination Location:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.destinationDetails.destinationLocation}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Estimated Arrival Time:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.destinationDetails.estimatedArrivalTime}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Additional Information:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.additionalInformation}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Price per Seat:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.pricing.pricePerSeat}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Available Seats:</p>
              <p className="text-gray-900 font-bold text-xl">{ride.availableSeats.numberOfAvailableSeats}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleRequestSeat}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md focus:outline-none focus:shadow-outline"
            style={{ boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' }}
          >
            Request a Seat
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RideDetails;
