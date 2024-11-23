'use client';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

const FormButton: React.FC<ButtonProps> = ({
  label, 
  onClick, 
  disabled, 
  outline,
  small,
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'text-gray-700' : 'text-gray-200'}
        ${outline ? 'bg-gray-100' : 'bg-modalSubmit'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
      `}
    >
      {label}
    </button>
   );
}
 
export default FormButton;