const InputField = ({
  name,
  register,
  placeholder,
  type,
  labelText,
  errors,
  value,
}) => {
  return (
    <>
      <label className="relative">
        <input
          className={`input peer  ${
            errors[name] ? "border-error" : "border-normal"
          }`}
          type={type}
          placeholder={placeholder}
          name={name}
          {...register(name)}
        />
        <div
          className={`absolute left-3 text-sm font-semibold mb-2 ut-animation
        ${
          value
            ? "top-0 -translate-y-[120%] bg-colorBg text-xs"
            : "top-[50%] -translate-y-[50%] peer-focus:bg-colorBg peer-focus:top-0 peer-focus:-translate-y-[120%] peer-focus:text-xs"
        }`}
        >
          {labelText}
        </div>
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
