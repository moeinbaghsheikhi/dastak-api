import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsPositive } from "class-validator";

export class UpdateFactoresItemDto{
    @ApiProperty({
        description: 'آیدی فاکتور مربوطه',
        example: '1',
    })
    @IsInt({ message: 'آیدی فاکتور باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'آیدی فاکتور باید مقدار مثبت داشته باشد' })
    factor_id: number;

    @ApiProperty({
        description: 'آیدی محصول مربوطه',
        example: '2',
    })
    @IsInt({ message: 'آیدی محصول باید یک عدد صحیح باشد' })
    @IsPositive({ message: 'آیدی محصول باید مقدار مثبت داشته باشد' })
    product_id: number;
}
