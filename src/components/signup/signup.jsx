import React from "react";
import "./signup.css";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateField, resetForm } from "../../store/signupSlice";
import { auth, googleProvider } from "../../firebase.jsx";
import { signInWithPopup } from "firebase/auth";

import { Link } from "react-router-dom";

function Signup() {
    const dispatch = useDispatch();
    const { Username, email, password, confirmPassword } = useSelector((state) => state.signup);

    const handleChange = (e) => {
        dispatch(updateField({
            field: e.target.name,
            value: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        console.log('Form submitted:', { Username, email, password });
        alert('Account created successfully!');
        dispatch(resetForm());
    };
const handleGoogleSignIn = async () => {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                const user = result.user;
                alert(`WELCOM ${user.displayName}! 🎉`);
            } catch (error) {
                console.error('Error:', error.message);
                alert('Google Sign In failed!');
            }
        };


    return (
        <div className="allForme">
            <div className="ImageForm">
                <div className="animated-text">
                    <div className="text-line">
                        <span>Y</span><span>O</span><span>U</span><span>R</span>{' '}
                        <span>F</span><span>I</span><span>R</span><span>S</span><span>T</span>
                    </div>
                    <div className="text-line">
                        <span>S</span><span>T</span><span>E</span><span>P</span>{' '}
                        <span>T</span><span>O</span>{' '}
                        <span>B</span><span>E</span>
                    </div>
                    <div className="text-line">
                        <span>P</span><span>R</span><span>O</span><span>D</span><span>U</span><span>C</span><span>T</span><span>I</span><span>V</span><span>E</span>
                    </div>
                </div>
            </div>
            
            <div className="form">
                <div className="TitleForm">CREATE ACCOUNT</div>
                <p className="subtitle">Start your productive journey today</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="feild">
                            <label>Name:</label>
                            <input 
                                type="text" 
                                name="Username"
                                value={Username}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="feild">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>  
                    
                    <div className="form-row">
                        <div className="feild">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>
                        
                        <div className="feild">
                            <label>Password confirmation:</label>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="buttons">
                        <button type="submit" className="BttonSigne">CREATE ACCOUNT</button>
                        <button type="button" className="bttonGoogle" onClick={handleGoogleSignIn}>
                            <FaGoogle className="googleIcon"/> 
                            <span>SIGN UP WITH GOOGLE</span>
                        </button>
                    </div>
                </form>
                
                <div className="login-link">
                    ALREADY HAVE AN ACCOUNT ? <Link href="/login">LOG IN</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;