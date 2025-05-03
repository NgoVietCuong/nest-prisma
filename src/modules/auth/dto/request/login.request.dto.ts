import { PickType } from '@nestjs/swagger';
import { SignUpBodyDto } from 'src/modules/auth/dto/request/sign-up.request.dto';

export class LoginBodyDto extends PickType(SignUpBodyDto, ['email', 'password'] as const) {}