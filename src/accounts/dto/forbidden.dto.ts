import { ApiProperty } from '@nestjs/swagger'

export class ProductForBiddenResponse {
    @ApiProperty({
        type: String,
        description: 'http error code',
        example: 405
    })
    statusCode: number

    @ApiProperty({
        type: String,
        description: 'Description about the error',
        example: 'resource'
    })
    message: number
}