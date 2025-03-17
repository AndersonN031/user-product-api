import { IsOptional, IsUUID } from "class-validator";

export class DeleteIdDto {
    @IsUUID()
    @IsOptional()
    id: string;
}