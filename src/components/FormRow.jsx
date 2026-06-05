export default function FormRow({
    label,
    required = false,
    children,
  }) {
    return (
      <tr>
        <th>
          {label}
          {required && (
            <span className="required">*</span>
          )}
        </th>
  
        <td>{children}</td>
      </tr>
    );
  }