import { useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar
} from 'recharts';
import CompletionCalendar from './CompletionCalendar';
import ProgressCards from './ProgressCards';

function TotalProgressPage() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const chartData = habits.map((habit) => {
    const completions = habit.dates.length;
    let skips = 0;

    for (let time = (new Date()).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
      const date = new Date(time);
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart('0', 2)}`;

      if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
        skips += 1;
      }
    }

    return {
      name: habit.name,
      completions, skips
    };
  });

  const pageClass = classNames(
    'flex', 'flex-col', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'overflow-auto', 'animate-fade-in',
    'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-gradient-to-br from-gray-50 to-white',
    'lg:min-w-[70%]', 'xl:min-w-[50%]',
    { 'justify-center': habits.length === 0 }
  );

  return (
    <div className={pageClass}>
      {(habits.length > 0) ? <>
        {/* Chart Section */}
        <div className="px-4 pb-2 border-b-[1.5px] border-neutral-3 sm:bg-white sm:rounded-lg sm:shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500} height={300}
              data={chartData}
              className="hover:shadow-lg transition-shadow duration-300">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#555' }} />
              <YAxis tick={{ fill: '#555' }} />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px', border: 'none' }} />
              <Legend />
              <Bar dataKey="completions" stackId="a" fill="#7bc93c" />
              <Bar dataKey="skips" stackId="a" fill="#c93c3c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col space-y-8 xl:grid xl:grid-cols-[1fr,_1fr] xl:items-start xl:space-y-0">
          <CompletionCalendar />
          <ProgressCards />
        </div>
      </> :
        <p className="text-xl text-center font-bold text-neutral-400">You haven't added any habits yet</p>}
    </div >
  );
}

export default TotalProgressPage;
