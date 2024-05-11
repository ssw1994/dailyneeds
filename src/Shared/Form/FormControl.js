import { FormControl as Control } from "../../Hooks/FormControl";
export default function FormControl({ control, children }) {
  const getErrorTemplate = () => {
    if (control instanceof Control) {
      if (!control.valid) {
        const errors = Object.keys(control.erros);
        for (let i = 0; i < errors.length; i++) {
          const error = errors[i];
          if (control.hasError(error)) {
            const errorMessage = control.errorsMessages[error].replace(
              "control",
              control.control
            );
            if (["required", "pattern"].includes(error)) {
              return <p className="error">{errorMessage}</p>;
            } else {
              return (
                <p className="error">
                  {errorMessage.replace(error, control[error])}
                </p>
              );
            }
          }
        }
      }
      return null;
    }
    return null;
  };

  const errorTemplate = getErrorTemplate();
  const controlName = control.control;
  const cName = control?.valid ? "success" : "error";
  return (
    <div className={"form-control " + cName}>
      <div>
        <label>{controlName}</label>
        {children}
        {errorTemplate}
      </div>
    </div>
  );
}
