import * as React from "react";

const Alert: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <div style={{ backgroundColor: "green", color: "#fff", padding: "" }}>
      {message}
    </div>
  );
};

export default Alert;
