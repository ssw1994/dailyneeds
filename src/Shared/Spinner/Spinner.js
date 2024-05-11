export default function Spinner({ children, loading }) {
  return (
    <div className={`spinner-load${loading ? "ing" : "ed"}`}>
      {loading && <i className="fa-solid fa-spinner spinner-ico"></i>}
      <div hidden={loading}>{children}</div>
    </div>
  );
}
