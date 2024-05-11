export default function CardHeader({ children, style }) {
  return (
    <div className="card-header" style={style}>
      {children}
    </div>
  );
}
