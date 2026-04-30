import React, { useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";

import { InputWrapper, FIELDS, BUTTONCLASSES, MESSAGE_SUCCESS, MESSAGE_ERROR } from "../assets/dummy";

// const API_URL = "https://agiledesk.onrender.com";
const API_URL = "http://localhost:4000";
const INITIAL_FORM = { name: "", email: "", password: "" };

const SignUp = ({ onSwitchMode }) => {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const { data } = await axios.post(
                `${API_URL}/api/user/register`,
                formData
            );
            console.log("signup successful", data);

            setMessage({
                text: "Registration successful! You can login now",
                type: "success"
            });

            setFormData(INITIAL_FORM);
        } catch (err) {
            console.log("signup error:", err);
            setMessage({
                text: err.response?.data?.message || "please try again later",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-purple-100 via-white to-fuchsia-100 px-4">
            <div className=" max-w-md w-full bg-white/80 backdrop-blur-md shadow-xl shadow-purple-200/40 border border-purple-100 rounded-2xl 
            p-8 transition-all duration-300 hover:shadow-2xl">

                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-linear-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center 
                    justify-center mb-4 shadow-lg shadow-purple-300/40">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Create Account
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Join AgileDesk to manage your tasks
                    </p>
                </div>

                {message.text && (
                    <div
                        className={message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
                        <div key={name} className="flex items-center border border-purple-100 rounded-lg px-3 py-2.5 bg-white/90 focus-within:ring-2 
                        focus-within:ring-purple-500 transition-all duration-200">
                            <Icon className="text-purple-500 w-5 h-5 mr-2" />

                            <input
                                type={type} placeholder={placeholder} value={formData[name]} onChange={(e) => setFormData({
                                    ...formData,
                                    [name]: e.target.value
                                })
                                }
                                className="w-full bg-transparent focus:outline-none text-sm text-gray-700" required />
                        </div>
                    ))}

                    <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-fuchsia-500 to-purple-600  text-white text-sm font-semibold 
                    py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                        {loading ? ("Signing up...") : (
                            <><UserPlus className="w-4 h-4 inline mr-1" /> Sign Up</>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <button onClick={onSwitchMode} className="text-purple-600 hover:underline font-medium">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;