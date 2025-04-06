import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';

class UserDashboard extends Component {
    state = {
        requestCount: 0,
        loading: true
    };

    componentDidMount() {
        // Simulate loading for demonstration purposes
        setTimeout(() => {
          axios.get('http://localhost:3000/requests/count')
            .then(response => {
              this.setState({ requestCount: response.data.count, loading: false });
            })
            .catch(error => {
              console.error('Error fetching request count:', error);
              this.setState({ loading: false }); // Set loading to false in case of an error
            });
        }, 2000); // Simulated delay of 2 seconds
    }

    render() {
        const { user, isAuthenticated } = this.props.auth0;
        const { requestCount, loading } = this.state;

        if (loading) {
            return (
                <div className="loading-container flex justify-center items-center h-screen">
                    <PacmanLoader color={'#00BFFF'} size={40} />
                </div>
            );
        }


        return(
            <div className="">
                {/* User Dashboard */}
                <div className="container mx-auto pt-10">
                    <h1 className="text-4xl font-bold text-center">Welcome to Your Dashboard, {isAuthenticated ? user.name : 'Guest'}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Information</h2>
                            <div className="mb-4">
                                <p className="text-lg text-gray-800">Name:</p>
                                <p className="text-gray-600 text-xl font-medium">{isAuthenticated ? user.name : 'Guest'}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg text-gray-800">Email:</p>
                                <p className="text-gray-600 text-xl font-medium">{isAuthenticated ? user.email : 'guest@example.com'}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">My Requests</h2>
                            <div className="mb-8 text-center">
                                <p className="text-lg text-gray-800">You have {requestCount} active Requests.</p>
                            </div>
                            <a href="/all-requests" className="mt-16 block w-full text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                View Requests
                            </a>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Available Rides</h2>
                            <div className="mb-8 text-center">
                                <p className="text-lg text-gray-800">Find all available rides here.</p>
                            </div>
                            <a href="/rides" className="mt-16 block w-full text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                View Available Rides
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth0(UserDashboard);
