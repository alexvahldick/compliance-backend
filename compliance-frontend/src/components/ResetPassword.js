import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient"; // ✅ Import the singleton instance

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    function getAccessToken() {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("access_token");
    }

    const accessToken = getAccessToken();

    useEffect(() => {
        console.log("Reset password page loaded.");
        console.log("Received token:", accessToken);
    }, [accessToken]);

    const handleReset = async () => {
        if (!accessToken) {
            setMessage("Missing access token.");
            return;
        }

        try {
            // Authenticate user with the token
            const { data: session, error: loginError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: accessToken, // Supabase needs both tokens
            });

            if (loginError) {
                setMessage(`Error logging in: ${loginError.message}`);
                return;
            }

            console.log("User authenticated:", session);

            // Now update the password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) {
                setMessage(`Error updating password: ${updateError.message}`);
                return;
            }

            setMessage("Password updated successfully! Redirecting to login...");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setMessage(error.message || "Something went wrong.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <p>Token received: {accessToken || "No token detected"}</p>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleReset}>Reset Password</button>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
