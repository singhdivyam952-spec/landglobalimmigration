import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const base =
    variant === 'outline'
      ? 'btn-outline'
      : variant === 'navy' || variant === 'dark'
        ? 'btn-navy'
        : variant === 'ghost'
          ? 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold text-primary transition hover:bg-accent-soft'
          : 'btn-primary';

  const classes = `${base} ${className} ${disabled ? 'pointer-events-none opacity-60' : ''}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;
