import React from 'react';

const SectionHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <h1 {...props} className={`my-10 text-2xl ${props.className}`}>
      {children}
    </h1>
  );
};

export default SectionHeading;
