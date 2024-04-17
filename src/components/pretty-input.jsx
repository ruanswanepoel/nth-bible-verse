import React, { useState } from "react";

import { RxCross2 } from "react-icons/rx";

/**
 *
 * @param helperText Text displayed under the input to explain the requirements of the input
 * @param getError function which takes in the current input value and returns the error message, if any
 * @param clearable shows the cross icon which clears the input
 * @param onClear callback function to allow for custom clear behaviour in the parent component
 * @returns
 */
export default function PrettyInput(props) {
  const [input, setInput] = useState("");
  const [errorText, setErrorText] = useState(null);

  return (
    <div className="flex w-full flex-col relative">
      <div className="group relative h-full">
        <input
          {...props}
          onChange={(e) => {
            props.onChange?.(e);
            setInput(e.target.value);
          }}
          onBlur={(e) => {
            props.onBlur?.(e);
            if (!e.target.value.length) {
              setErrorText(null);
              return;
            }

            // if condition then check and display result
            if (props.getError) {
              const result = props.getError(e.target.value);

              if (result) {
                setErrorText(result);
                e.target.setCustomValidity(result);
              } else {
                setErrorText("");
                e.target.setCustomValidity("");
              }
            }
          }}
          value={props.value ?? input}
          placeholder=""
          id="input"
          className={`standard ${errorText ? "error" : ""} peer w-full`}
        />

        <label
          className={`peer-focus:pointer-events-none absolute left-4 top-3 bg-white px-2 transition-all peer-focus:top-[-10px] peer-focus:text-xs peer-focus:font-semibold ${
            input ? " top-[-10px] text-xs font-semibold" : ""
          } ${errorText ? "error-shake text-red animate-once" : ""}`}
          htmlFor="input"
        >
          {props.placeholder ?? ""}
        </label>
        {props.clearable && (
          <RxCross2
            onClick={() => {
              setInput("");
              setErrorText(null);
              props.onClear?.();
            }}
            className="absolute right-4 top-4 opacity-50 transition-all hover:cursor-pointer group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mx-6 mt-1 flex justify-between absolute bottom-[-24px]">
        {props.helperText && !errorText && (
          <div className="text-xs text-grey">{props.helperText}</div>
        )}
        {errorText && (
          <div className="animate-in slide-in-from-top-2 text-xs text-red ">
            {errorText}
          </div>
        )}
        {props.maxLength && (
          <div className="text-xs text-grey">
            {input.length}/{props.maxLength}
          </div>
        )}
      </div>
    </div>
  );
}
