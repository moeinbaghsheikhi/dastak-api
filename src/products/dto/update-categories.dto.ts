import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateCategoriesDto {
    @ApiProperty({
        description: 'توضیحات موردنیاز برای عنوان دسته‌بندی',
        example: 'دسته‌بندی جدید'
    })
    @IsString({ message: 'عنوان دسته‌بندی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'عنوان دسته‌بندی نمی‌تواند خالی باشد' })
    @MaxLength(250, { message: 'عنوان دسته‌بندی نمی‌تواند بیشتر از 250 کاراکتر داشته باشد' })
    title: string;
}
