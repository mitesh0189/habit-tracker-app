import classNames from 'classnames';

function DateInput({ value, onChange, label }) {
  const handleInput = (event, input) => {
    if ((input === 'year' && String(event.target.value).length <= 4) ||
      ((input === 'month' || input === 'day') && String(event.target.value).length <= 2)) {
      onChange({ input, text: event.target.value });
    }
  }

  const inputWrapperClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-1', 'px-4', 'pt-2', 'pb-3',
    'bg-neutral-100', 'rounded-lg', 'border-2', 'border-transparent', 'shadow-lg',
    'duration-300', 'focus-within:bg-white', 'focus-within:border-blue-400',
    'focus-within:shadow-xl', 'focus-within:shadow-blue-200', 'transition-all',
    'hover:bg-neutral-200', 'hover:shadow-md', 'sm:w-full', 'md:w-72', 'lg:w-80');

  const getInputClass = (isYear) => classNames(
    'text-center', 'bg-transparent', 'outline-none', 'border-b-2', 'border-neutral-300',
    'duration-300', 'focus:border-blue-400', 'placeholder-neutral-400', 'text-neutral-700',
    'hover:border-blue-300', 'hover:scale-105', 'hover:text-neutral-900',
    { 'w-12': isYear, 'w-8': !isYear, 'text-lg': isYear, 'text-base': !isYear });

  return (
    <div className={inputWrapperClass}>
      <p className="text-base font-semibold text-neutral-500">{label}</p>
      <div className="flex space-x-4 items-center justify-center">
        <input 
          className={getInputClass(true)} 
          value={value.year} 
          placeholder="YYYY" 
          onInput={(event) => handleInput(event, 'year')} 
        />
        <input 
          className={getInputClass(false)} 
          value={value.month} 
          placeholder="MM" 
          onInput={(event) => handleInput(event, 'month')} 
        />
        <input 
          className={getInputClass(false)} 
          value={value.day} 
          placeholder="DD" 
          onInput={(event) => handleInput(event, 'day')} 
        />
      </div>
    </div>
  );
}

export default DateInput;
