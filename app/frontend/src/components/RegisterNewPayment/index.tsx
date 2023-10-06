import { useState } from "react";
import api from "../../api";
import { formatCurrencyInput, convertPtBrToNumber } from "../../helpers/formatCurrency";
import "./RegisterNewPayment.css";

export default function RegisterPayment({
  setShouldReload,
}: {
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [paymentValue, setPaymentValue] = useState<string>("0,00");
  const [cashbackValue, setCashbackValue] = useState<string>("0,00");

  const token = localStorage.getItem("@token");


  function clearState() {
    setPaymentValue("0,00");
    setCashbackValue("0,00");
  }

  async function registerPayment(value: number, token: string) {
    try {
      const response = await api.post(
        "/transactions",
        { value },
        { headers: { authentication: token } }
      );

      if (response.status !== 201) {
        alert(response.data.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function registerCashback(
    paymentId: number,
    value: number,
    token: string
  ) {
    try {
      const url = "/transactions/" + paymentId;

      const response = await api.patch(
        url,
        { value },
        { headers: { authentication: token } }
      );

      if (response.status !== 200) {
        alert(response.data.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const postResponse = await registerPayment(
      convertPtBrToNumber(paymentValue),
      token!
    );

    if (postResponse) {
      const { transactionId } = postResponse;

      await registerCashback(
        transactionId,
        convertPtBrToNumber(cashbackValue),
        token!
      );

      clearState();

      setShouldReload(true);
    }
  }

  return (
    <div className="register-payment-container">
      <h1>Register a new transaction</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="paymentValue">Valor da compra (R$)</label>
        <input
          type="text"
          id="paymentValue"
          name="paymentValue"
          value={formatCurrencyInput(paymentValue)}
          onChange={(e) => setPaymentValue(e.target.value)}
        />
        <label htmlFor="cashbackValue">Valor do cashback (R$)</label>
        <input
          type="text"
          id="cashbackValue"
          name="cashbackValue"
          value={formatCurrencyInput(cashbackValue)}
          onChange={(e) => setCashbackValue(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
