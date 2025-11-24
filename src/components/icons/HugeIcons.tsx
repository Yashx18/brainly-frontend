import { HugeiconsIcon } from '@hugeicons/react';

interface IconProps {
  size?: number;
  color?: string;
  icon: any;
  strokeWidth?: number;
  className? : string
}

export const HugeIcons = ({ size, color, strokeWidth, icon, className,...props }: IconProps) => {
  return (
    <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={strokeWidth} {...props} className={ className} />
  );
};
