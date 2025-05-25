import './Button.css';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        className
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
