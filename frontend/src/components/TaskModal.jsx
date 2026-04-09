import React, { useState, useEffect, useCallback } from "react";
import { DEFAULT_TASK } from "../assets/dummy";
import {
  AlignLeft,
  Flag,
  PlusCircle,
  Save,
  X,
  Calendar,
  Type,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:4000/api/tasks";

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {
  const [taskData, setTaskData] = useState(DEFAULT_TASK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!isOpen) return;

    if (taskToEdit?._id) {
      const normalized =
        taskToEdit.completed === "yes" || taskToEdit.completed === true
          ? "yes"
          : "no";

      setTaskData({
        ...DEFAULT_TASK,
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority?.toLowerCase() || "low",
        dueDate: taskToEdit.dueDate?.split("T")[0] || today,
        completed: normalized,
        id: taskToEdit._id,
      });
    } else {
      setTaskData({ ...DEFAULT_TASK, dueDate: today, id: null });
    }

    setError(null);
  }, [isOpen, taskToEdit, today]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setTaskData((prev) => {
      if (type === "radio") {
        return { ...prev, [name]: value };
      }
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");
    return { Authorization: `Bearer ${token}` };
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      if (taskData.dueDate < today) {
        setError("Due date cannot be in the past");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const isEdit = Boolean(taskData.id);
        const url = isEdit ? `${API_BASE}/${taskData.id}` : `${API_BASE}`;
        const method = isEdit ? "put" : "post";

        const { id, ...rest } = taskData;

        const payload = {
          ...rest,
          completed: taskData.completed === "yes",
        };

        const resp = await axios({
          method,
          url,
          headers: getHeaders(),
          data: payload,
        });

        onSave?.(resp.data.task);
        onClose();
      } catch (err) {
        if (err.response?.status === 401) {
          onLogout?.();
          return;
        }
        setError(err.response?.data?.message || err.message || "Failed to save task");
      } finally {
        setLoading(false);
      }
    },
    [taskData, today, getHeaders, onLogout, onSave, onClose, loading]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {taskData.id ? <Save className="text-purple-500 w-5 h-5" /> : <PlusCircle className="text-purple-500 w-5 h-5" />}
            {taskData.id ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 hover:text-purple-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>
          )}

          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
              <Type className="h-4 w-4 text-purple-500" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full border border-purple-100 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
              <AlignLeft className="h-4 w-4 text-purple-500" />
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={taskData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-purple-100 rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                <Flag className="w-4 h-4 text-purple-500" />
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full border border-purple-100 rounded-lg px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 text-purple-500" />
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                min={today}
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full border border-purple-100 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
              <CheckCircle className="w-4 h-4 text-purple-500" />
              Status
            </label>
            <div className="flex gap-4">
              {[{ val: "yes", label: "Completed" }, { val: "no", label: "In Progress" }].map(({ val, label }) => (
                <label key={val} className="flex items-center">
                  <input
                    type="radio"
                    name="completed"
                    value={val}
                    checked={taskData.completed === val}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2 rounded-lg px-4 flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200"
          >
            {loading ? "Saving..." : taskData.id ? <><Save className="w-4 h-4" /> Update Task</> : <><PlusCircle className="w-4 h-4" /> Create Task</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;