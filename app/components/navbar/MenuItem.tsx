'use client';

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return (
    <div
      onClick={onClick}
      className="
        text-sm
        text-nowrap
        bg-white
        px-4
        py-2
        hover:bg-neutral-100
      ">
      {label}
    </div>
   );
}

export default MenuItem;