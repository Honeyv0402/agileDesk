import React, { useState, useMemo } from "react";
import { layoutClasses } from "../assets/dummy";
import { CheckCircle2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../components/TaskItem";

const CompletePage = () => {
  const { tasks = [], refreshTasks } = useOutletContext();

  const [sortBy, setSortBy] = useState("newest");

  const completedTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" &&
          t.completed.toLowerCase() === "yes")
    );

    return filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "priority") {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
      }
      return 0;
    });
  }, [tasks, sortBy]);

  return (
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" />
            Completed Tasks
          </h1>

          <p className="text-sm text-gray-500 mt-1 ml-7">
            {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""} marked as completed
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={layoutClasses.select}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className={layoutClasses.listWrapper}>
        {completedTasks.length === 0 ? (
          <div className="w-full mt-12 p-6 bg-white rounded-lg shadow-md text-center border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              No completed tasks yet!
            </h3>
            <p className="text-sm text-gray-500">
              Complete some tasks and they'll appear here
            </p>
          </div>
        ) : (
          completedTasks.map((task) => (
            <TaskItem
              key={task._id || task.id}
              task={task}
              onRefresh={refreshTasks}
              showCompleteCheckbox={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CompletePage;