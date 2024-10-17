import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { MdCheck, MdEdit } from 'react-icons/md';
import useCompletionsSeries from '../../hooks/use-completions-series';
import { toggleHabitCompletion } from '../../store';
import habitTemplates from '../../habitTemplates';
import Icon from '../other/Icon';

function Habit({ data, todaysHabit }) {
  const dispatch = useDispatch();

  const icon = habitTemplates.find((templateHabit) => templateHabit.name === data.icon)?.icon;
  const deadlineTime = `${(data.time.slice(0, data.time.indexOf(':'))).padStart(2, '0')}:${data.time.slice(data.time.indexOf(':') + 1).padStart(2, '0')} `;
  const currentCompletionSeries = useCompletionsSeries(data);

  const getTodayDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const compareTime = () => {
    if (data.time) {
      const now = new Date();
      const nowTime = now.getHours() * 60 + now.getMinutes();
      const deadlineTime = Number(data.time.slice(0, data.time.indexOf(':'))) * 60 + Number(data.time.slice(data.time.indexOf(':') + 1));
      return deadlineTime - nowTime >= 0;
    }
    return true;
  };

  const handleCompleteHabit = () => {
    if (compareTime()) {
      dispatch(toggleHabitCompletion({
        id: data.id,
        date: getTodayDate(),
      }));
    }
  };

  const habitClass = classNames(
    'flex items-center space-x-4 w-full pl-6 pr-4 py-3 rounded-xl',
    'bg-gradient-to-br from-green-100 to-blue-100 shadow-lg hover:shadow-xl',
    'transition-shadow duration-300 ease-in-out transform hover:scale-105',
    'overflow-hidden cursor-pointer group'
  );

  const completeHabitButtonClass = classNames(
    'p-2 bg-green-500 rounded-full border-2 border-green-600 text-white',
    'cursor-pointer duration-300 ease-in-out transform hover:scale-110 hover:bg-green-600',
    { 'active:scale-95': compareTime() }
  );

  return (
    <div className={habitClass}>
      {todaysHabit && (
        <div className={completeHabitButtonClass} onClick={handleCompleteHabit}>
          <div className="w-5 h-5">
            {data.dates.includes(getTodayDate()) && (
              <Icon icon={<MdCheck className="w-5 h-5" />} color="white" />
            )}
          </div>
        </div>
      )}

      <div className="grow flex justify-between items-center">
        <div className="flex flex-col pt-1 pb-2">
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
            Deadline: {data.time ? deadlineTime : 'Full day'}
          </p>
          <div className="flex items-center space-x-2">
            {icon}
            <p className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              {data.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center -space-y-1 text-center">
            <p className="text-2xl text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
              {data.dates.length}
            </p>
            <p className="text-xs text-gray-500">Checks</p>
          </div>
          <div className="flex flex-col items-center -space-y-1 text-center">
            <p className="text-2xl text-blue-600 group-hover:text-blue-800 transition-colors duration-200">
              {currentCompletionSeries}
            </p>
            <p className="text-xs text-gray-500">Series</p>
          </div>

          <Link to={`/habits/edit-habit/${data.id}`} className="group-hover:scale-105 transition-transform duration-200">
            <Icon icon={<MdEdit className="w-6 h-6 text-blue-600 hover:text-blue-800" />} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Habit;
