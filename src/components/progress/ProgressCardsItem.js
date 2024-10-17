import habitTemplates from '../../habitTemplates';

function ProgressCardsItem({ label, value, habit }) {
  const icon = !!habit && habitTemplates.find((templateHabit) => templateHabit.name === habit.icon)?.icon;

  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-blue-50 to-gray-50 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <p className="text-xs text-neutral-600 font-semibold mb-2">{label}</p>
      <div className="grow flex justify-center items-center py-3">
        <p className="text-5xl font-bold text-blue-800">{value}</p>
      </div>
      {!!habit && (
        <div className="flex items-center space-x-3 mt-3">
          <div className="text-blue-500">{icon}</div>
          <p className="text-sm font-medium text-gray-800">{habit.name}</p>
        </div>
      )}
    </div>
  );
}

export default ProgressCardsItem;
