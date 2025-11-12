import User from "../entities/User";

export default class AuthService {
    async login(email: string, password: string): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (email !== "Noobmaster69" || password !== "entradaUSB") {
            throw new Error("Credenciais inválidas");
        }
        return { uID: "123", userName: "user123" };
    }
}