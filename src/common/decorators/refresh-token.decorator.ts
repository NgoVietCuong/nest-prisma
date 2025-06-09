import { applyDecorators, UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/common/guards';
import { Public } from './public.decorator';

export const RefreshToken = () => applyDecorators(Public(), UseGuards(RefreshTokenGuard));
