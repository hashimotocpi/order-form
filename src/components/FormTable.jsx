export default function FormTable({ children }) {
    return (
      <table className="form-table">
        <tbody>{children}</tbody>
      </table>
    );
  }