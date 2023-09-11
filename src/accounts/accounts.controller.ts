import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Header, Req, Request, Response } from '@nestjs/common/decorators';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiBearerAuth, ApiHeader, ApiHeaderOptions, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { LoginDto } from './dto/login-account.dto';
import { otpnData } from './dto/otp-account.dto';
import * as bcrypt from 'bcrypt'
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { ExtractJwt } from 'passport-jwt';
import { type } from 'os';
import { Headers } from '@nestjs/common/decorators';

@Controller('account')
@ApiTags('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const mobile = await this.accountsService.findByMobile(createAccountDto.mobile)
      if (mobile)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Mobile Already Exists", null)

      const data = await this.accountsService.create(createAccountDto);
      return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
    }
    catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    try {
      const data = await this.accountsService.login(loginData.mobile, loginData.password)
      if (!data)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "کاربری پیدا نشد!", null)

      return ResponseFormat(true, HttpStatus.OK, "ورود با موفقیت انجام شد", data)
    }
    catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @Post('otp')
  async otp(@Body() otpnData: otpnData) {
    try {
      const otpCode = (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
      const data = await this.accountsService.findOneByMobile(otpnData.mobile);
      if (!data)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "کاربری پیدا نشد!", null)

      const otp = await this.accountsService.otpsend(otpnData.mobile, otpCode)
      console.log(otpCode)
      const password = await bcrypt.hash(otpCode, 10)
      data.password = password

      await this.accountsService.updateOtp(data.id, { ...data });
      return ResponseFormat(true, HttpStatus.OK, "پیامک با موفقیت ارسال شد", data)
    }
    catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get()
  async findAll() {
    const data = await this.accountsService.findAll()

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get('account_profile')
  async findOne(@Headers('authorization') token: string) {
    const data = await this.accountsService.findOne(token);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)
    return ResponseFormat(true, HttpStatus.OK, "OK", data)

  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Patch()
  async update(@Headers('authorization') token: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const account = this.accountsService.findOne(token)
      if (!account)
        return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT_FOUND", null)

      updateAccountDto.password = await bcrypt.hash(updateAccountDto.password, 10)
      const data = await this.accountsService.update(token, updateAccountDto);
      return ResponseFormat(true, HttpStatus.OK, "OK", data)
    } catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Delete()
  async remove(@Headers('authorization') token: string) {
    const data = await this.accountsService.remove(token);
    if (data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}
