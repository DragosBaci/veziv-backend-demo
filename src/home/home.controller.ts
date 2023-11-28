import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { HomeService } from './home.service';

@UseGuards(JwtGuard)
@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}
}
