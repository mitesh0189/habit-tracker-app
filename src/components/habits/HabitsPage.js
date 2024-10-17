import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { MdAdd } from 'react-icons/md';
import { setSortingCriteria } from '../../store';
import useSortHabits from '../../hooks/use-sort-habits';
import SelectSorting from '../input/SelectSorting';
import Button from '../input/Button';
import Icon from '../other/Icon';
import Habit from './Habit';

function HabitsPage() {
  const { habits, sortingCriteria, sortingOrder } = useSelector((state) => state.habitsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (criteria, order) => {
    dispatch(setSortingCriteria({ criteria, order }));
  };

  const renderedHabits = useSortHabits().map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);

  // Page layout styles
  const pageClass = classNames(
    'flex flex-col justify-between space-y-8 h-full pt-16 pb-8 px-4 animate-slide-down',
    'overflow-auto sm:h-auto sm:pt-4 sm:rounded-xl sm:shadow-lg sm:shadow-neutral-200 sm:bg-white',
    'lg:min-w-[70%] xl:min-w-[50%] transition-transform duration-300 ease-in-out'
  );

  // Habit list container
  const habitsClass = classNames(
    'flex flex-col space-y-4',
    { 'justify-center h-full text-center': habits.length === 0 }
  );

  // Button styles with animation and hover effects
  const addButtonClass = classNames(
    'self-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full',
    'transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg',
    'focus:ring focus:ring-green-300 active:scale-95'
  );

  return (
    <div className={pageClass}>
      <div className={habitsClass}>
        {habits.length > 0 ? (
          <>
            <SelectSorting
              criteria={sortingCriteria}
              order={sortingOrder}
              onChange={handleChange}
              options={['Created', 'Total checks', 'Checks series', 'Total skips']}
              className="mb-4"
            />
            {renderedHabits}
          </>
        ) : (
          <p className="text-xl font-semibold text-gray-600">You haven't added any habits yet</p>
        )}
      </div>

      {/* Add Habit Button */}
      <Button className={addButtonClass} onClick={() => navigate('/habits/new-habit')}>
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
        <span className="ml-2">Add New Habit</span>
      </Button>
    </div>
  );
}

export default HabitsPage;
