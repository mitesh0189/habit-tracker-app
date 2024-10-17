import classNames from 'classnames';

function Button({ className, children, equalPaddings, ...rest }) {
  const buttonClass = classNames(
    'relative', 'bottom-0', 'flex', 'justify-center', 'items-center', 'space-x-2',
    'bg-gradient-to-br', 'from-blue-500', 'to-blue-700', 'rounded-full',
    'shadow-lg', 'shadow-blue-300', 'transition-all', 'duration-300', 'ease-in-out',
    'hover:shadow-xl', 'hover:shadow-blue-400', 'hover:opacity-90', 'hover:scale-105',
    'active:scale-95', 'active:bottom-1.5',
    { 'p-2': equalPaddings, 'px-6 py-3': !equalPaddings }, className
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
}

export default Button;
