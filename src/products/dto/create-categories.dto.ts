import { IsString, IsNotEmpty, MaxLength, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriesDto {
    @ApiProperty({
        description: 'شناسه حساب',
        example: '1',
    })
    @IsInt({ message: 'شناسه حساب باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'شناسه حساب باید مقدار مثبت داشته باشد' }) account_id: number;

    @ApiProperty({
        description: 'توضیحات موردنیاز برای عنوان دسته‌بندی',
        example: 'دسته‌بندی جدید'
    })
    @IsString({ message: 'عنوان دسته‌بندی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'عنوان دسته‌بندی نمی‌تواند خالی باشد' })
    @MaxLength(250, { message: 'عنوان دسته‌بندی نمی‌تواند بیشتر از 250 کاراکتر داشته باشد' })
    title: string;
}
