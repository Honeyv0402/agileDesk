import React, { useMemo, useState, useCallback } from "react";
import {
  ADD_BUTTON,
  HEADER,
  WRAPPER,
  STATS_GRID,
  STAT_CARD,
  ICON_WRAPPER,
  VALUE_CLASS,
  LABEL_CLASS,
  STATS,
  FILTER_WRAPPER,
  FILTER_LABELS,
  SELECT_CLASSES,
  FILTER_OPTIONS,
  TABS_WRAPPER,
  TAB_BASE,
  TAB_ACTIVE,
  TAB_INACTIVE,
  EMPTY_STATE,
} from "../assets/dummy";

import { Home, Plus, Filter, CalendarIcon } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";
import axios from "axios";


const API_BASE = 'http://localhost:4000/api/tasks';

const Dashboard = () => {
  const { tasks = [], refreshTasks } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      lowPriority: tasks.filter(
        (t) => t.priority?.toLowerCase() === "low"
      ).length,
      mediumPriority: tasks.filter(
        (t) => t.priority?.toLowerCase() === "medium"
      ).length,
      highPriority: tasks.filter(
        (t) => t.priority?.toLowerCase() === "high"
      ).length,
      completed: tasks.filter(
        (t) =>
          t.completed === true ||
          t.completed === 1 ||
          (typeof t.completed === "string" &&
            t.completed.toLowerCase() === "yes")
      ).length,
    }),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      switch (filter) {
        case "today":
          return dueDate.toDateString() === today.toDateString();
        case "week":
          return dueDate >= today && dueDate <= nextWeek;
        case "high":
        case "medium":
        case "low":
          return task.priority?.toLowerCase() === filter;
        default:
          return true;
      }
    });
  }, [tasks, filter]);

//   const handleTaskSave = useCallback(async (taskData) => {
//   try {
//     const token = localStorage.getItem("token");

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     if (taskData.id) {
//       await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData, config);
//     } else {
//       await axios.post(`${API_BASE}/gp`, taskData, config);
//     }

//     refreshTasks();
//     setShowModal(false);
//     setSelectedTask(null);
//   } catch (error) {
//     console.error("Error saving task:", error);
//   }
// }, [refreshTasks]);


const handleTaskSave = useCallback(() => {
  refreshTasks();
  setShowModal(false);
  setSelectedTask(null);
}, [refreshTasks]);

  return (
    <div className={WRAPPER}>
      <div className={HEADER}>
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Home className="text-purple-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
            Task Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-7 truncate">
            Manage your tasks efficiently
          </p>
        </div>

        <button
          className={ADD_BUTTON}
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Add new task
        </button>
      </div>

      <div className={STATS_GRID}>
        {STATS.map(
          ({
            key,
            label,
            icon: Icon,
            iconColor,
            borderColor = "border-purple-100",
            valueKey,
            gradient,
            textColor,
          }) => (
            <div key={key} className={`${STAT_CARD} ${borderColor}`}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`${ICON_WRAPPER} ${iconColor}`}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p
                    className={`${VALUE_CLASS} ${
                      gradient
                        ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent"
                        : textColor || ""
                    }`}
                  >
                    {stats[valueKey]}
                  </p>
                  <p className={LABEL_CLASS}>{label}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="space-y-6">
        <div className={FILTER_WRAPPER}>
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-5 h-5 text-purple-500 shrink-0" />
            <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
              {FILTER_LABELS[filter]}
            </h2>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={SELECT_CLASSES}
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {FILTER_LABELS[opt]}
              </option>
            ))}
          </select>
        </div>

        <div className={TABS_WRAPPER}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`${TAB_BASE} ${
                filter === opt ? TAB_ACTIVE : TAB_INACTIVE
              }`}
            >
              {FILTER_LABELS[opt]}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className={EMPTY_STATE.wrapper}>
              <div className={EMPTY_STATE.iconWrapper}>
                <CalendarIcon className="w-8 h-8 text-purple-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No tasks found
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {filter === "all"
                  ? "Create your first task to get started"
                  : "No task matches this filter"}
              </p>

              <button
                onClick={() => {
                  setSelectedTask(null);
                  setShowModal(true);
                }}
                className={EMPTY_STATE.btn}
              >
                Add New Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onRefresh={refreshTasks}
                showCompleteCheckbox
                onEdit={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
                className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm"
              />
            ))
          )}
        </div>

        <div
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
          className="hidden md:flex items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 bg-purple-50/50 cursor-pointer transition-colors"
        >
          <Plus className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-gray-600 font-medium">Add New Task</span>
        </div>

        <TaskModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          taskToEdit={selectedTask}
          onSave={handleTaskSave}
        />
      </div>
    </div>
  );
};

export default Dashboard;