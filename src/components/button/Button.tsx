
interface ButtonProps {
  disabled?: boolean;
  isSecondary?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "destructive" | "text";
  isIconOnly?: boolean;
  borderColor?: string;
  size?: string;
  shadow?: string;
  centered?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  isLoading?: boolean;
  trailingIcon?: React.ReactNode;
  className?: string;
  shouldOpenHrefInNewTab?: boolean;
  ariaLabel?: string;
}

export default function Button({
  disabled,
  href,
  onClick,
  children,
  variant = "contained",
  isIconOnly,
  borderColor,
  shadow = variant === "text" ? "shadow-none" : "shadow-sm",
  centered = true,
  fullWidth = false,
  isLoading,
  leadingIcon,
  trailingIcon,
  className = "",
  shouldOpenHrefInNewTab = false,
  ariaLabel,
}: ButtonProps) {
  const baseClasses = `bg-primary  rounded-md    text-nowrap ${
    isLoading ? "text-transparent" : ""
  } min-w-fit inline-flex items-center  ${
    centered ? "justify-center" : "justify-between"
  } ${
    fullWidth ? "w-full" : "w-fit"
  } gap-3 border transition-all duration-300  ${shadow}`;
  const buttonSize = ` min-w-10  ${
    isIconOnly ? "aspect-square  " : "py-3 px-6 hover:scale-95 transition-transform duration-300"
  }`;

  const variantStyles = variant === "destructive" ? "bg-redColor " : "";
  const outlineVariant =
    variant === "outlined"
      ? `  bg-transparent ${disabled ? "opacity-45" : ""} `
      : ` border-transparent `;
  const disabledStyles = `${disabled ? "bg-opacity-50" : ""} ${
    disabled || isLoading ? "" : ""
  }`;

  const textVariant = variant === "text" ? "bg-transparent hover:bg-grey/5 p-2 " : "";

  const containedVariant =
    variant === "contained" || variant === "destructive"
      ? "text-white"
      : "text-txtPrimary";

  const customBorder = borderColor || "";

  const buttonClasses = `${baseClasses} ${buttonSize} ${customBorder} ${variantStyles} ${disabledStyles} ${outlineVariant} ${textVariant} ${containedVariant} ${className}`;

  const button = (
    <button
      onClick={(e) => {
        if (!disabled && onClick && !isLoading) {
          onClick(e);
        }
      }}
      aria-label={ariaLabel}
      className={buttonClasses}
      disabled={disabled}
    >
     
      {leadingIcon && (
        <span className="size-4 text-[inherit]">{leadingIcon}</span>
      )}

      {children}
      {trailingIcon && (
        <span className="size-4 text-[inherit]">{trailingIcon}</span>
      )}
    </button>
  );

  return href ? <a href={href}
  target={shouldOpenHrefInNewTab ? "_blank" : "_self"}
  >{button}</a> : button;
}
