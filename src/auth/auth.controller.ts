import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { registerSchema } from './register.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(
        @Body(new ZodValidationPipe(registerSchema))
        dto: any,
    ) {
        return this.authService.register(dto);
    }
}
