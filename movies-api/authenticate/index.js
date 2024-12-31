import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return response.status(401).json({ message: 'No authorization header provided.' });
        }

        // Extract Bearer token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return response.status(401).json({ message: 'Bearer token not found.' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('Decoded token:', decoded);

        // Find the user by username in the decoded token
        const user = await User.findByUserName(decoded.username);
        if (!user) {
            return response.status(401).json({ message: 'User not found.' });
        }

        // Attach the user to the request object
        request.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        return response.status(401).json({ message: `Authentication failed: ${err.message}` });
    }
};

export default authenticate;
