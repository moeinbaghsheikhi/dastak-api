import { ApiHeader, ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ExtractJwt } from "passport-jwt";

export class UpdateAccountDto {
    @ApiProperty({
        description: 'نام حساب',
        example: 'Reza',
        maxLength: 250,
    })
    @IsString({ message: 'نام باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
    @MaxLength(250, { message: 'نام نمی‌تواند بیشتر از 250 کاراکتر داشته باشد' })
    name: string;

    @ApiProperty({
        description: 'نوع محصول : physical یا digital',
        example: 'digital'
    })
    account_type: string;

    @ApiProperty({
        description: 'فروش در ماه',
        example: '1'
    })
    sale_count: number;

    @ApiProperty({
        description: 'شماره تلفن همراه',
        example: '09123456789',
        maximum: 11,
    })

    @ApiProperty({
        description: 'رمز عبور',
        example: '1234'
    })
    password: string;
}
