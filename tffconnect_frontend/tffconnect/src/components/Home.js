import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <br />
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {/* Endpoint to route to Log In component */}
                        <Link to="/login">Log In</Link>
                    </li>
                    <li>
                        {/* Endpoint to route to Sign Up component */}
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        );
    }
};

export default Home;

