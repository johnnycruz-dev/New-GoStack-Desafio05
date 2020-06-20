import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((total, index) => {
      if (index.type === 'income') {
        return total + index.value;
      }
      return total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, index) => {
      if (index.type === 'outcome') {
        return total + index.value;
      }
      return total;
    }, 0);

    const totalBalance = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
