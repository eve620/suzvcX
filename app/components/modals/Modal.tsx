'use client';

import {useCallback, useEffect, useState} from "react";

import FormButton from "@/app/components/FormButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         title,
                                         body,
                                         actionLabel,
                                         footer,
                                         disabled,
                                         secondaryAction,
                                         secondaryActionLabel,
                                     }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className={`
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50
          outline-none 
          focus:outline-none
          bg-neutral-800/90
          duration-300
          ${showModal ? 'opacity-100' : 'opacity-0'}
        `}
                onMouseDown={() => {
                    handleClose()
                }}
            >
                <div className="
          relative 
          w-full
          md:w-2/3
          lg:w-1/2
          xl:w-1/3
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
                     onMouseDown={(event) => {
                         event.stopPropagation()
                     }}
                >
                    {/*content*/}
                    <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-16'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
                        <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
                        >
                            {/*header*/}
                            <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
                            >
                                <button
                                    className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                                    onClick={handleClose}
                                >
                                    <svg className="icon" viewBox="0 0 1024 1024" width="16" height="16">
                                        <path
                                            d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                                            fill="#707070"></path>
                                    </svg>
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/*footer*/}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex
                                 items-center
                                 gap-4
                                 w-full"
                                >
                                    {secondaryAction && secondaryActionLabel && (
                                        <FormButton
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    <FormButton
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
