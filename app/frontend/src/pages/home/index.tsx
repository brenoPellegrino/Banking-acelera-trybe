import { useCallback, useEffect, useState } from "react";
import ListTransaction from "../../components/ListTransactions";
import ITransaction from "../../interfaces/ITransaction";
import api from "../../api";
import RegisterPayment from "../../components/RegisterNewPayment";
import "./Home.css";
import RedirectButton from "../../components/RedirectButton";
import Menu from "../../components/Menu";

export default function Home() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [shoudReload, setShouldReload] = useState<boolean>(false);

  const token = localStorage.getItem("@token");

  const updateTransactions = useCallback(async () => {
    try {
      const response = await api.get("/transactions", {
        headers: {
          Authentication: `${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await updateTransactions()
        .then((response) => response)
        .catch((error) => console.log(error));

      if (!apiResponse) {
        setTransactions([]);
      } else {
        setTransactions(apiResponse);
      }
    }
    fetchData();
    setShouldReload(false);
  }, [updateTransactions, shoudReload]);

  return (
    <div>
      <Menu />
      <RegisterPayment setShouldReload={setShouldReload} />
      <ListTransaction transactions={transactions} />
      <RedirectButton path="/" name="Logout" clearToken={true} />
      <RedirectButton path="/editAcc" name="Edit Account" clearToken={false} />
    </div>
  );
}
