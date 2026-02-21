import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateField, resetForm } from "../../store/LoginSlice";
import { auth, googleProvider } from "../../firebase.jsx";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Login() {
    const dispatch = useDispatch();
    const { email, password } = useSelector((state) => state.Login);

    const handleChange = (e) => {
        dispatch(updateField({
            field: e.target.name,
            value: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        
        console.log('Form submitted:', { email, password });
        alert('Welcome To Your Account');
        
        // Reset form after successful submission
        dispatch(resetForm());
    };

    const navigate = useNavigate();
const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        navigate('/tasks', { state: { displayName: user.displayName } });
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
                <div className="TitleForm">LOGIN TO YOUR ACCOUNT</div>
                <p className="subtitle">Continue your productive journey today !</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
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
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="buttons">
                        <button type="submit" className="BttonSigne">Login</button>
                        <button type="button" className="bttonGoogle" onClick={handleGoogleSignIn}>
                            <FaGoogle className="googleIcon"/> 
                            <span>SIGN IN WITH GOOGLE</span>
                        </button>
                    </div>
                </form>
                
                <div className="login-link">
                    DON'T HAVE AN ACCOUNT ? <Link to="/signup">SIGN UP</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;