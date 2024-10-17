import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { MdAdd } from 'react-icons/md';
import Goal from './Goal';
import Button from '../input/Button';
import Icon from '../other/Icon';

function GoalsPage() {
  const goals = useSelector((state) => state.goalsReducer.goals);
  const navigate = useNavigate();

  const renderedGoals = goals.map((goal) => <Goal key={goal.id} data={goal} />);

  const pageClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-fade-in',
    'overflow-auto', 'sm:h-auto', 'sm:pt-6', 'sm:rounded-2xl', 'sm:shadow-xl', 'sm:bg-white',
    'lg:min-w-[70%]', 'xl:min-w-[50%]', 'transition-all', 'duration-500', 'ease-in-out'
  );

  const goalsClass = classNames(
    'flex', 'flex-col', 'space-y-4', 'transition-all', 'duration-300',
    { 'justify-center h-full': goals.length === 0 }
  );

  return (
    <div className={pageClass}>
      <div className={goalsClass}>
        {goals.length > 0 ? (
          renderedGoals
        ) : (
          <p className="text-xl text-center font-bold text-gray-500 animate-pulse">
            You haven't added any goals
          </p>
        )}
      </div>

      <Button
        className="self-center hover:bg-blue-500 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        onClick={() => navigate('/goals/new-goal')}
        equalPaddings
      >
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
        <span className="ml-2 text-white font-bold">Add Goal</span>
      </Button>
    </div>
  );
}

export default GoalsPage;
