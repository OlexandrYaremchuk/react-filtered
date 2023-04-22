import { useCallback, useMemo, useState } from "react";
import "./styles.css";
import data from "./data.json";

const COMPLETE_FILTER = {
  Completed: "completed",
  Incompleted: "incompleted",
  All: "all",
};

const TodoItem = ({ title, completed }) => {
  return (
    <article className={"todoItem"}>
      <h4>{title}</h4>
      <div>
        completed:{""}
        <span className={completed ? "completed" : "incompleted"}>
          {String(completed)}
        </span>
      </div>
    </article>
  );
};

const TodoList = ({ list = [] }) => {
  return (
    <main>
      {list.map(({ title, completed, id }) => (
        <TodoItem key={id} title={title} completed={completed} />
      ))}
    </main>
  );
};

const FilterItem = ({ checked, name, onChange }) => {
  return (
    <label>
      {name}
      <input
        type={"radio"}
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

const FiltersPanel = ({ curFilter, updateFilter }) => {
  const onFilterChange = (event) => {
    const newFilter = event.target.value;
    updateFilter(newFilter);
  };
  return (
    <form className={"filters-panel"}>
      <h2>Обери фільтер</h2>
      <FilterItem
        checked={curFilter === COMPLETE_FILTER.All}
        name={COMPLETE_FILTER.All}
        onChange={onFilterChange}
      />
      <FilterItem
        checked={curFilter === COMPLETE_FILTER.Completed}
        name={COMPLETE_FILTER.Completed}
        onChange={onFilterChange}
      />
      <FilterItem
        checked={curFilter === COMPLETE_FILTER.Incompleted}
        name={COMPLETE_FILTER.Incompleted}
        onChange={onFilterChange}
      />
    </form>
  );
};

function App() {
  const [filter, setFilter] = useState(COMPLETE_FILTER.All);

  // @param list - масив даних, які ми будемо фільтрувати
  // @param curFilter - поточне значення фільтра

  const getFilteredTodos = (list, curFilter = COMPLETE_FILTER.All) => {
    if (curFilter === COMPLETE_FILTER.All) return list;
    const needCompleted = curFilter === COMPLETE_FILTER.Completed;
    return list.filter((item) => item.completed === needCompleted);
  };

  const filteredTodos = useMemo(() => getFilteredTodos(data, filter), [filter]);

  const handleFilterUpdate = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="App">
      <FiltersPanel curFilter={filter} updateFilter={handleFilterUpdate} />
      <TodoList list={filteredTodos} />
    </div>
  );
}

export default App;
