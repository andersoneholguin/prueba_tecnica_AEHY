import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class userDto {    
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsNumber()
    edad: number
}