import * as bcrypt from "bcryptjs";
import { HashingServiceProtocol } from "./hashing.service";

export class BcryptService extends HashingServiceProtocol{
    async hash(password: string): Promise<string> {
        //método que devolve a senha criptografada 
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(password, salt) 
    }
    async compare(password: string, passwordHash: string): Promise<boolean> {
        //compara as senhas 

        return bcrypt.compare(password, passwordHash)
    }
    
}