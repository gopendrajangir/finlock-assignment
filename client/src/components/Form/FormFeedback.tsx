import React, { ComponentPropsWithoutRef } from 'react';

interface FormFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  children,
  show,
  ...props
}) => {
  return (
    <>
      {show ? (
        <div
          {...props}
          className={`text-red-500 text-xs mt-1 ${props.className}`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};
