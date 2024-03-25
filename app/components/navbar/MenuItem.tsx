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
        cursor-pointer
        bg-white
        dark:bg-[#0f172a]
        px-4
        py-2
        hover:bg-neutral-100
        dark:hover:bg-slate-950
      ">
      {label}
    </div>
   );
}

export default MenuItem;