import { useState } from "react";
import Login from "./components/Login";
import InquiryForm from "./components/InquiryForm";
import OrderForm from "./components/OrderForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("inquiry");

  if (!user) return <Login setUser={setUser} />;

  return (
    <div>
      <div>
        <button onClick={() => setPage("inquiry")}>問い合わせ</button>
        <button onClick={() => setPage("order")}>発注</button>
      </div>

      <p>{user.companyName}</p>

      {page === "inquiry" && <InquiryForm user={user} />}
      {page === "order" && <OrderForm user={user} />}
    </div>
  );
}