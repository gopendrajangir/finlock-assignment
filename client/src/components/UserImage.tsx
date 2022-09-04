import React, { HTMLAttributes } from 'react';
import { api } from 'utils/apis';
import UserPhoto from 'assets/img/user.png';

interface UserImageProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: string;
}

function UserImage({ size = '40px', ...props }: UserImageProps) {
  const photoSrc = UserPhoto;

  return (
    <img
      className={`${props.className} rounded-full`}
      src={photoSrc}
      alt="user"
      style={{ width: size }}
      {...props}
    />
  );
}

export default React.memo(UserImage);
