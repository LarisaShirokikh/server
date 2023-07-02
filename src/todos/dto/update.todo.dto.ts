import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateTodo {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    @IsBoolean()
    readonly done: boolean
}