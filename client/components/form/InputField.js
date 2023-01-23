import { useState, useEffect } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const InputField = ({
  name,
  register,
  placeholder,
  type,
  labelText,
  errors,
  value,
  showEye = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [typeState, setTypeState] = useState(type);

  useEffect(() => {
    if (showPassword) {
      setTypeState("text");
    } else {
      setTypeState(type);
    }
  }, [showPassword]);

  return (
    <>
      <label className="relative">
        <input
          className={`input peer  ${
            errors[name] ? "border-error" : "border-normal"
          }`}
          type={typeState}
          placeholder={placeholder}
          name={name}
          {...register(name)}
        />
        <div
          className={`pointer-events-none absolute left-3 text-sm font-semibold mb-2 ut-animation
        ${
          value
            ? "top-0 -translate-y-[120%] bg-colorBg text-xs"
            : "top-[50%] -translate-y-[50%] peer-focus:bg-colorBg peer-focus:top-0 peer-focus:-translate-y-[120%] peer-focus:text-xs"
        }`}
        >
          {labelText}
        </div>

        {showEye && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer"
          >
            {showPassword ? (
              <BsEyeSlash className="h-5 w-5" />
            ) : (
              <BsEye className="h-5 w-5" />
            )}
          </div>
        )}
      </label>
      <div className="flex  mt-2">
        {errors[name] && (
          <div className="text-xs font-medium text-red-500">
            {errors[name].message}
          </div>
        )}
      </div>
    </>
  );
};

export default InputField;
