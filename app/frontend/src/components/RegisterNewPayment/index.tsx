import React from "react";
import api from "../../api";
import "./RegisterNewPayment.css";

export default function RegisterPayment({ setShouldReload }: { setShouldReload: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [paymentValue, setPaymentValue] = React.useState<number>(0);
  const [cashbackValue, setCashbackValue] = React.useState<number>(0);

  const token = localStorage.getItem("@token");

  function clearState() {
    setPaymentValue(0);
    setCashbackValue(0);
  }

  async function registerPayment(value: number, token: string) {
    try {
      const response = await api.post("/transactions", { value }, { headers: { authentication: token } });
      
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
  
  async function registerCashback(paymentId: number, value: number, token: string) {
    try {
      const url = '/transactions/' + paymentId;
      
      const response = await api.patch(url, { value }, { headers: { authentication: token } });
  
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
  
    const postResponse = await registerPayment(paymentValue, token!);
  
    if (postResponse) {
      const { transactionId } = postResponse;
  
      await registerCashback(transactionId, cashbackValue, token!);

      clearState();
  
      setShouldReload(true)
    }
  }

  return (
    <div className="register-payment-container">
      <h1>Register a new transaction</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="paymentValue">Valor da compra</label>
        <input
          type="number"
          id="paymentValue"
          name="paymentValue"
          value={paymentValue}
          onChange={(e) => setPaymentValue(Number(e.target.value))}
        />
        <label htmlFor="cashbackValue">Valor do cashback</label>
        <input
          type="number"
          id="cashbackValue"
          name="cashbackValue"
          value={cashbackValue}
          onChange={(e) => setCashbackValue(Number(e.target.value))}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
