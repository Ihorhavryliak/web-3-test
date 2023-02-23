import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('/')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @Get('/total/:address')
  async getTotal(@Param('address') address: string) {
    return this.balanceService.getTotal(address);
  }
  @Get('/balance/:address')
  async getBalances(@Param('address') address: string) {
    return this.balanceService.getBalances(address);
  }

}