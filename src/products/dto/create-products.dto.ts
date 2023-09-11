import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, IsPositive } from 'class-validator';

export class CreateProductsDto {
    @ApiProperty({
        description: 'شناسه دسته‌بندی',
        example: '2',
    })
    // @IsInt({ message: 'شناسه دسته‌بندی باید یک عدد صحیح باشد' })
    // @IsPositive({ message: 'شناسه دسته‌بندی باید مقدار مثبت داشته باشد' })
    categories_id: number;

    @ApiProperty({
        description: 'عنوان محصول',
        example: 'محصول نمونه',
        maxLength: 250,
    })
    @IsString({ message: 'عنوان محصول باید یک رشته باشد' })
    @IsNotEmpty({ message: 'عنوان محصول نمی‌تواند خالی باشد' })
    @MaxLength(250, { message: 'عنوان محصول نمی‌تواند بیشتر از 250 کاراکتر داشته باشد' })
    title: string;

    @ApiProperty({
        description: 'قیمت محصول',
        example: '10000',
        type: BigInt,
    })
    @IsNumber({}, { message: 'قیمت محصول باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'قیمت محصول باید مقدار مثبت داشته باشد' })
    price: number;

    @ApiProperty({
        description: 'موجودی انبار',
        example: '50',
        type: BigInt,
        nullable: true
    })
    @IsOptional()
    @IsNumber({}, { message: 'موجودی انبار باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'موجودی انبار باید مقدار مثبت داشته باشد' })
    stock_count: number | null;
}
