import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':address')
  async getBalances(@Param('address') address: string) {
    return this.balanceService.getBalances(address);
  }
}