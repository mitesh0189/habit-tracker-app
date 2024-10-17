import { useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import { MdCheck, MdClose } from 'react-icons/md';
import Icon from '../other/Icon';

function CompletionCalendar() {
  const habits = useSelector((state) => state.habitsReducer.habits);
  const [showCompletionMenu, setShowCompletionMenu] = useState(null);

  const now = new Date();
  const startDate = new Date(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`);
  const renderedDates = [];

  for (let time = startDate.getTime(); (new Date(time)).getMonth() === now.getMonth(); time += 8.64e+7) {
    const date = new Date(time);
    const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const completedHabits = habits.filter((habit) =>
      habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate));
    const skippedHabits = habits.filter((habit) =>
      habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate) &&
      (new Date(habit.created)).getTime() <= time && time <= now.getTime());

    const calendarDayClass = classNames(
      'flex', 'justify-center', 'items-center', 'aspect-square', 'rounded-full', 'shadow-md',
      'cursor-pointer', 'duration-300', 'hover:opacity-90', 'active:scale-95', 'sm:text-xl',
      {
        'bg-gray-200': completedHabits.length === 0 && skippedHabits.length === 0,  // Pending habits
        'bg-green-500': completedHabits.length > 0 && skippedHabits.length === 0,  // Completed habits
        'bg-red-500 text-white': skippedHabits.length > 0,  // Skipped habits
      }
    );

    const renderedCompletedHabits = completedHabits.map((habit) =>
      <div key={habit.id} className="flex justify-between items-center space-x-2">
        <p className="whitespace-nowrap text-green-700">{habit.name}</p>
        <Icon icon={<MdCheck className="w-6 h-6" />} color="#7bc93c" />
      </div>);

    const renderedSkippedHabits = skippedHabits.map((habit) =>
      <div key={habit.id} className="flex justify-between items-center space-x-2">
        <p className="whitespace-nowrap text-red-700">{habit.name}</p>
        <Icon icon={<MdClose className="w-6 h-6" />} color="#c93c3c" />
      </div>);

    const completionMenuClass = classNames(
      'absolute', 'z-20', 'flex', 'flex-col', 'space-y-2', 'mt-2', 'px-4', 'py-2',
      'bg-gray-200', 'rounded-xl', 'shadow-lg', 'shadow-gray-400', 'transition-opacity', 'duration-300',
      {
        'opacity-100': !!showCompletionMenu,
        'opacity-0': !showCompletionMenu,
      }
    );

    renderedDates.push(
      <div key={date.getDate()} className="relative group">
        <div className={calendarDayClass} onClick={() =>
          ((completedHabits.length > 0 && skippedHabits.length === 0) || skippedHabits.length > 0) &&
          setShowCompletionMenu((showCompletionMenu === date.getDate()) ? 0 : date.getDate())
        }>
          {date.getDate()}
        </div>
        {showCompletionMenu === date.getDate() &&
          <div className={completionMenuClass}>
            {renderedCompletedHabits}
            {renderedSkippedHabits}
          </div>}
      </div>
    );
  }

  const calendarClass = classNames(
    'grid', 'grid-cols-[repeat(auto-fill,_minmax(2.5rem,_1fr))]', 'gap-3', 'px-4', 'pb-6',
    'border-b-2', 'border-gray-300', 'sm:grid-cols-[repeat(7,_3rem)]', 'sm:place-content-center',
    'sm:px-16', 'xl:border-b-0'
  );

  return (
    <div className="px-4 py-6 bg-gradient-to-br from-blue-50 to-gray-200 shadow-lg rounded-lg">
      <div className={calendarClass}>
        {renderedDates}
      </div>
    </div>
  );
}

export default CompletionCalendar;
