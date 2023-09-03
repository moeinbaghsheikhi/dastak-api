import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriesDto {
    account_id: number;

    @ApiProperty({
        description: 'توضیحات موردنیاز برای عنوان دسته‌بندی',
        example: 'دسته‌بندی جدید'
    })
    title: string;
}
