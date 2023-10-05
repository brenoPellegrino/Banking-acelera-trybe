import { formatDate, formatValue } from "../../helpers";
import ListTransactionProps from "../../interfaces/IListTranasactionProps";
import "./ListTransactions.css";

export default function ListTransaction({
  transactions,
}: ListTransactionProps) {
  const totalCashback = transactions.reduce(
    (total, transaction) => total + transaction.cashback,
    0
  );

  const sortedTransactions = transactions.sort((a, b) => {
    const dateA = new Date(b.date).getTime();
    const dateB = new Date(a.date).getTime();
    return dateA - dateB;
  });

  return (
    <div>
      <h1>Transactions</h1>
      <div className="list-transactions-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Account</th>
              <th>Date</th>
              <th>Value (R$)</th>
              <th>Cashback (R$)</th>
            </tr>
          </thead>
          {transactions.length > 0 && (
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.accountId}</td>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{formatValue(transaction.value)}</td>
                  <td>{formatValue(transaction.cashback)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <h2>Total de cashback recebidos: R$ {formatValue(totalCashback)}</h2>
    </div>
  );
}
