import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

}
