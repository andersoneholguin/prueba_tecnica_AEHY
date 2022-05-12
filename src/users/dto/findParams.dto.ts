import { IsString } from "class-validator";

export class findParamsDto{
    @IsString()
    id: number
}