import React, { Component } from "react";
import { Link } from "react-router-dom";

class Feed extends Component {
    render() {
        return (
            <div>
                <h1>Successfully Logged In!</h1>
                <br />
                <ul>
                    <li>
                        <Link to="/feed">Home</Link>
                    </li>
                    <li>
                        {/* Endpoint to route to Profile component */}
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        );
    }
};

export default Feed;