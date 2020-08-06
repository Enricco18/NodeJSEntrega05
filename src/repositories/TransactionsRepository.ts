import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const incomeArray = await this.find({ where: { type: 'income' } });
    incomeArray.forEach(initial => {
      balance.income += Number(initial.value);
    });

    const outcomeArray = await this.find({ where: { type: 'outcome' } });
    outcomeArray.forEach(initial => {
      balance.outcome += Number(initial.value);
    });

    balance.total = balance.income - balance.outcome;
    return balance;
  }
}

export default TransactionsRepository;
