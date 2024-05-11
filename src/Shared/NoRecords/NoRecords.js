export default function NoRecords({ message }) {
  if (!message) {
    message = "No records found !";
  }

  return (
    <div className="h-100 flex-row-center-items">
      <h3
        style={{
          backgroundColor: "#FFF",
          padding: "15px",
          borderRadius: "5px",
          border: "2px solid currentColor",
          color: "red",
          textTransform: "uppercase",
        }}
      >
        {message}
      </h3>
    </div>
  );
}
