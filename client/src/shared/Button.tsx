import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      disabled={props.disabled}
      className={`flex items-center justify-center bg-slate-700 hover:bg-slate-600 ${
        props.disabled && 'bg-slate-600'
      } text-white text-xs p-3 rounded ${
        props.className ? props.className : ''
      }`}
      onClick={props.onClick}
    >
      {props.disabled ? (
        <span>
          <ThreeDots color="#cbd5e1" height={16} width={30} />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
