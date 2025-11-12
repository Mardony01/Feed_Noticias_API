import { useState } from "react";
import User from "../model/entities/User";
import AuthService from "../model/services/AuthService";

export type LoginState = {
    
    userId: string | null;
    loading: boolean;
    error: string | null;
};
export type LoginActions = {
    handleLogin: (email: string, password: string) => Promise<void>;
};
export function useLoginViewModel(): LoginState & LoginActions {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const service = new AuthService();
    async function handleLogin(email: string, password: string) {
        try {
            setLoading(true);
            setError(null);
            const user: User = await service.login(email, password);
            setUserId(user.uID);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);

        }
    }
    return { userId, loading, error, handleLogin };
}