import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsOptional, IsNumber, Max, Min, MaxLength } from 'class-validator';

export class CreateFactoresDto {
    @ApiProperty({
        description: 'شناسه حساب',
        example: '1',
    })
    @IsInt({ message: 'شناسه حساب باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'شناسه حساب باید مقدار مثبت داشته باشد' })
    account_id: number;

    @ApiProperty({
        description: 'کد فاکتور',
        example: '12345',
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'کد فاکتور نمی‌تواند خالی باشد' })
    @MaxLength(50, { message: 'کد فاکتور نمی‌تواند بیشتر از 50 کاراکتر داشته باشد' })
    code: string;

    @ApiProperty({
        description: 'درصد تخفیف (بین 1 تا 99)',
        example: '30',
        type: 'smallint',
        nullable: true
    })
    @IsOptional()
    @IsNumber({}, { message: 'درصد تخفیف باید یک عدد صحیح باشد' })
    @Min(1, { message: 'درصد تخفیف نباید کمتر از 1 باشد' })
    @Max(99, { message: 'درصد تخفیف نباید بیشتر از 99 باشد' })
    off_percent: number | null;

    @ApiProperty({
        description: 'وضعیت',
        example: '1',
        type: 'smallint',
    })
    @IsInt({ message: 'وضعیت باید یک عدد صحیح باشد' })
    @Min(1, { message: 'وضعیت نباید کمتر از 1 باشد' })
    status: number;
}
