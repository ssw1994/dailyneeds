import { Card } from "../../../Shared";

const Tour = () => {
  return <i class="fa-regular fa-folder"></i>;
};

export default function Tours() {
  const tours = [];
  return (
    <div className="tours">
      <Card>
        {tours?.map((t, i) => {
          return <Tour tourDetails={t} key={i} />;
        })}
        <i class="fa-solid fa-folder-plus"></i>
      </Card>
    </div>
  );
}
