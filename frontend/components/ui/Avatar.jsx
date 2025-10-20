'use client';
import React from 'react';
import Image from 'next/image';

const Avatar = ({ src, alt = 'Avatar' }) => {
  return (
    <Image
      className="h-8 w-8 rounded-full"
      src={src || '/avatar.png'} // Dùng avatar.png làm ảnh dự phòng
      alt={alt}
      width={32}
      height={32}
    />
  );
};
export { Avatar };