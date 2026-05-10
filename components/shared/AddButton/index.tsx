"use client";
type AddButton_TP = {
    addLabel?: string;
    action?: () => void;
    className?: string;
    disabled?: boolean;
};

export const AddButton = ({
    addLabel = "Add",
    action,
    className = "",
    disabled = false,
}: AddButton_TP) => {
    return (
        <button
            onClick={action}
            disabled={disabled}
            className={`
  inline-flex items-center gap-2
  px-5 py-2.5
  bg-[#70423f] hover:bg-[#e28576] active:bg-[#5a3532]
  text-white text-sm font-medium
  rounded-lg
  border border-[#70423f] hover:border-[#e28576]
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed
  shadow-sm hover:shadow-md
  select-none
  font-['Inter']
  ${className}
`}
        >

            <span>{addLabel}</span>
        </button>
    );
};