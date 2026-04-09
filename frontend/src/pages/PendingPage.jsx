import React, { useState, useMemo } from "react";
import { layoutClasses } from "../assets/dummy";
import { ListChecks, Plus, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";

const PendingPage = () => {
    const { tasks = [], refreshTasks } = useOutletContext();

    const [sortBy, setSortBy] = useState("newest");
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const pendingTasks = useMemo(() => {
        const filtered = tasks.filter(
            (t) =>
                !(
                    t.completed === true ||
                    t.completed === 1 ||
                    (typeof t.completed === "string" &&
                        t.completed.toLowerCase() === "yes")
                )
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
                        <ListChecks className="text-purple-500" />
                        Pending Tasks
                    </h1>

                    <p className="text-sm text-gray-500 mt-1 ml-7">
                        {pendingTasks.length} task{pendingTasks.length !== 1 ? "s" : ""} needing your attention
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

            <div
                className="flex items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 bg-purple-50/50 cursor-pointer transition-colors mb-5"
                onClick={() => setShowModal(true)}
            >
                <Plus className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-medium">Add New Task</span>
            </div>

            <div className={layoutClasses.listWrapper}>
                {pendingTasks.length === 0 ? (
                    <div className={layoutClasses.emptyState}>
                        <div className="max-w-xs mx-auto py-6 text-center">
                            <div className={layoutClasses.emptyIconBg}>
                                <Clock className="w-8 h-8 text-purple-500 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                All caught up!
                            </h3>
                            <p className="text-sm text-gray-500">
                                You have no pending tasks at the moment.
                            </p>
                        </div>
                    </div>
                ) : (
                    pendingTasks.map((task) => (
                        <TaskItem
                            key={task._id || task.id}
                            task={task}
                            showCompleteCheckbox
                            onDelete={() => handleDelete(task._id || task.id)}
                            onToggleComplete={() => handleToggleComplete(task._id || task.id, task.completed)}
                            onEdit={() => {
                                setSelectedTask(task);
                                setShowModal(true);
                            }}
                            onRefresh={refreshTasks}
                        />
                    ))
                )}
            </div>

            <TaskModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedTask(null);
                }}
                taskToEdit={selectedTask}
                onSave={() => {
                    refreshTasks();
                    setShowModal(false);
                    setSelectedTask(null);
                }}
            />
        </div>
    );
};

export default PendingPage;