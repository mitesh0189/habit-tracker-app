import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setSelectedTemplate } from '../../store';

function HabitTemplate({ data }) {
  const { selectedTemplate } = useSelector((state) => state.newHabitReducer);
  const dispatch = useDispatch();

  // Habit template card class with improved hover, border, and shadow effects
  const habitTemplateClass = classNames(
    'flex flex-col justify-center items-center space-y-2 h-full p-4 transition-all duration-300 ease-in-out',
    'rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg hover:shadow-xl cursor-pointer transform',
    'hover:scale-105 hover:opacity-90 text-center select-none',  // Add scaling and hover opacity
    {
      'border-2 border-blue-500 shadow-lg shadow-blue-300': selectedTemplate === data.name, // Selected state
      'border-2 border-transparent shadow-md shadow-neutral-200': selectedTemplate !== data.name // Unselected state
    }
  );

  return (
    <div className={habitTemplateClass} onClick={() => dispatch(setSelectedTemplate(data.name))}>
      <div className="p-3 bg-white rounded-full border-2 border-gray-300">
        {data.icon} {/* Icon inside a circular container */}
      </div>
      <p className="text-sm font-semibold text-gray-700">{data.name}</p> {/* Text with better font size and color */}
    </div>
  );
}

export default HabitTemplate;
