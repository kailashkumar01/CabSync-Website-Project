import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";

class AccountSettings extends Component {
    render(){
        const { user, isAuthenticated } = this.props.auth0;

        // Add functionality to update other user settings here

        return(
            <div>
                {/* Account Settings */}
                <div className="container mx-auto pt-10">
                    <h1 className="text-4xl font-bold text-center mb-8">Account Settings</h1>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Profile Information</h2>
                        <div className="mb-4">
                            <label className="text-lg text-gray-800 block mb-2" htmlFor="displayName">Display Name</label>
                            <input
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="displayName"
                                type="text"
                                value={isAuthenticated ? user.name : ''}
                                // Add an onChange event handler to update the user display name
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-lg text-gray-800 block mb-2" htmlFor="bio">Bio</label>
                            <textarea
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="bio"
                                rows="4"
                                // Add an onChange event handler to update the user bio
                            ></textarea>
                        </div>
                        {/* Add more input fields to update other profile information */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto"
                            // Add an onClick event handler to handle account settings update
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth0(AccountSettings);
