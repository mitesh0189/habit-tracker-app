import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Habit from './Habit';
import { MdList, MdCheckCircle } from 'react-icons/md';

function TodaysHabitsPage() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayWeekDay = weekDays[today.getDay()];

  // Filter habits relevant for today
  const habitsForToday = habits.filter((habit) => habit.days.includes(todayWeekDay));

  // Separate habits into To-Do and Completed
  const toDoHabits = habitsForToday.filter((habit) => !habit.dates.includes(getTodayDate()));
  const completedHabits = habitsForToday.filter((habit) => habit.dates.includes(getTodayDate()));

  // Render Habit components
  const renderedToDoHabits = toDoHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);
  const renderedCompletedHabits = completedHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);

  // Tailwind CSS classes for the main page container
  const pageClass = classNames(
    'flex', 'flex-col', 'space-y-8', 'h-full', 'pt-16', 'pb-8', 'px-4', 'animate-slide-down', 'overflow-auto',
    'sm:h-auto', 'sm:pt-6', 'sm:rounded-2xl', 'sm:shadow-xl', 'sm:shadow-neutral-200', 'sm:bg-white',
    'lg:min-w-[70%]', 'xl:min-w-[50%]', 'transition-transform', 'duration-300', 'ease-in-out'
  );

  // Tailwind CSS classes for each section (To-Do and Completed)
  const sectionClass = classNames(
    'flex', 'flex-col', 'space-y-4', 'bg-white', 'rounded-lg', 'shadow-md', 'p-6',
    'transition-shadow', 'duration-300', 'ease-in-out', 'hover:shadow-lg'
  );

  // Tailwind CSS classes for section headers
  const sectionHeaderClass = classNames(
    'flex', 'items-center', 'mb-4', 'text-xl', 'font-semibold', 'text-gray-700', 'border-b', 'border-gray-300', 'pb-2'
  );

  // Tailwind CSS classes for messages when no habits are present
  const noHabitsMessageClass = classNames(
    'text-center', 'text-gray-500', 'italic', 'mt-4'
  );

  return (
    <div className={pageClass}>
      {/* To-Do Section */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <MdList className="text-blue-500 mr-2 text-2xl" />
          <p>To Do</p>
        </div>
        <div className="space-y-4">
          {habitsForToday.length > 0 ? (
            toDoHabits.length > 0 ? (
              renderedToDoHabits
            ) : (
              <p className={noHabitsMessageClass}>You have completed all the habits</p>
            )
          ) : (
            <p className={noHabitsMessageClass}>No habits for today</p>
          )}
        </div>
      </div>

      {/* Completed Section */}
      {habitsForToday.length > 0 && (
        <div className={sectionClass}>
          <div className={sectionHeaderClass}>
            <MdCheckCircle className="text-green-500 mr-2 text-2xl" />
            <p>Completed</p>
          </div>
          <div className="space-y-4">
            {completedHabits.length > 0 ? (
              renderedCompletedHabits
            ) : (
              <p className={noHabitsMessageClass}>You haven't completed a single habit</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodaysHabitsPage;
