// Set Up Authentication Context
// Create a context that will allow child components to be aware of the authentication status.
import { createContext } from 'react';

export const AuthContext = createContext(null);