import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMobilePhone, MaxLength } from 'class-validator';

export class CreateAccountDto {
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
        description: 'شماره تلفن همراه',
        example: '09123456789',
        maximum: 11,
    })
    @IsString({ message: 'شماره تلفن همراه باید یک رشته باشد' })
    @IsNotEmpty({ message: 'شماره تلفن همراه نمی‌تواند خالی باشد' })
    @IsMobilePhone('fa-IR', {}, { message: 'شماره تلفن همراه وارد شده معتبر نیست' })
    @MaxLength(11, { message: 'شماره تلفن همراه نمی‌تواند بیشتر از 11 کاراکتر داشته باشد' })
    mobile: string;
}