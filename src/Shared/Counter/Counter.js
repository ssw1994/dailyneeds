export default function Counter({ initialValue, valueChange, min, max }) {
  const emitValue = (v) => {
    if (valueChange && typeof valueChange === "function") {
      valueChange(v);
    }
  };

  const updateCounter = (e) => {
    emitValue(e?.target?.value ?? initialValue);
  };

  // useEffect(() => {
  //   emitValue();
  // }, [value]);

  const inc = () => {
    if (max && initialValue >= max) return;
    //updateValue(value + 1);
    emitValue(initialValue + 1);
  };
  const dec = () => {
    if (min && initialValue <= min) return;
    emitValue(initialValue - 1);
    //updateValue(value - 1);
  };

  return (
    <div className="flex-row-left-items counter">
      <button onClick={dec}>
        <i class="fa-solid fa-minus"></i>
      </button>
      <input value={initialValue} onChange={(e) => updateCounter(e)} />
      <button onClick={inc}>
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
