import React, { useEffect, useState } from "react";
import Bar from "../components/Bar.jsx";
import Balance from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { getBalance } from "../services/operations/transactionAPI";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await getBalance(token);
      setBalance(userBalance);
    };
    fetchBalance();
  }, [token]);

  return (
    <div>
      <Bar user={user.firstName} />
      <Balance balance={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;