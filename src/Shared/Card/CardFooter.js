export default function CardFooter({ children, style }) {
  return (
    <div className="card-footer" style={style}>
      {children}
    </div>
  );
}
