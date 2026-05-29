import { useNavigate } from "react-router-dom";

export default function CustomerHome() {

  const navigate = useNavigate();

  const companyName =
    localStorage.getItem("companyName");

  return (

    <div style={{ padding: 40 }}>

      <h1>
        {companyName} 様
      </h1>

      <br />

      <button
        onClick={() =>
          navigate("/order")
        }
      >
        発注フォーム
      </button>

      <br /><br />

      <button
        onClick={() =>
          navigate("/inquiry")
        }
      >
        問い合わせフォーム
      </button>

    </div>
  );
}