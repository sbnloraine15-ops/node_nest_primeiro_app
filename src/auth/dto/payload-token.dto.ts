export class PayloadTokenDto {
    sub!: number;
    email!: string; 
    iat!: number; 
    exp!: number; 
    aud!: 'http://localhost:3000';
    iss!: 'http://localhost:3000'; 
}