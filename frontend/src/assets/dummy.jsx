import {
  User,
  Mail,
  Lock,
  Home,
  ListChecks,
  CheckCircle2,
  HomeIcon,
  Flame,
  Edit2,
  Trash2   
} from "lucide-react";

// export const DEFAULT_TASK = {
//   title: "",
//   description: "",
//   priority: "low", 
//   status: "pending", 
//   dueDate: new Date().toISOString().split("T")[0], 
//   createdAt: new Date().toISOString(),
// };

export const DEFAULT_TASK = {
  title: "",
  description: "",
  priority: "low", 
  dueDate: "", 
  completed: "no", 
  id: null,
};

// LINK_CLASSES for Sidebar navigation
export const LINK_CLASSES = {
  base: "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors",
  active: "bg-purple-100 text-purple-700",
  inactive: "text-gray-600",
  icon: "w-5 h-5",
  text: "flex-1",
};

// SIDEBAR
export const menuItems = [
  { text: "Dashboard", path: "/", icon: <Home className="w-5 h-5" /> },
  { text: "Pending Tasks", path: "/pending", icon: <ListChecks className="w-5 h-5" /> },
  { text: "Completed Tasks", path: "/complete", icon: <CheckCircle2 className="w-5 h-5" /> },
];

export const SIDEBAR_CLASSES = {
  desktop: "hidden md:flex flex-col fixed h-full w-20 lg:w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 shadow-sm",

  mobileButton:
    "absolute md:hidden top-25 left-5 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700",

  mobileDrawerBackdrop:
    "fixed inset-0 bg-black/40 backdrop-blur-sm",

  mobileDrawer:
    "absolute top-0 left-0 w-64 h-full bg-white/90 backdrop-blur-md border-r border-purple-100 shadow-lg z-50 p-4",
};

export const TIP_CARD = {
  container: "bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100",
  iconWrapper: "p-2 bg-purple-100 rounded-lg",
  title: "text-sm font-semibold text-gray-800",
  text: "text-xs text-gray-600 mt-1",
};

// DASHBOARD
// UI Constants
export const WRAPPER = "p-4 md:p-6 min-h-screen overflow-hidden";

export const HEADER =
  "flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3";

export const ADD_BUTTON =
  "flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300";

export const STATS_GRID =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6";

export const STAT_CARD =
  "p-3 md:p-4 rounded-xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300 min-w-0";

export const ICON_WRAPPER = "p-1.5 md:p-2 rounded-lg";

export const VALUE_CLASS =
  "text-lg md:text-2xl font-bold truncate";

export const LABEL_CLASS =
  "text-xs text-gray-500 truncate";


// Stats definitions
export const STATS = [
  {
    key: "total",
    label: "Total Tasks",
    icon: HomeIcon,
    iconColor: "bg-purple-100 text-purple-600",
    valueKey: "total",
    gradient:true,
  },
  {
    key: "lowPriority",
    label: "Low Priority",
    icon: Flame,
    iconColor: "bg-green-100 text-green-600",
    borderColor: "border-green-100",
    valueKey: "lowPriority",
    textColor: "text-green-600"  },
  {
    key: "mediumPriority",
    label: "Medium Priority",
    icon: Flame,
    iconColor: "bg-orange-100 text-orange-600",
    valueKey: "mediumPriority",
    borderColor: "border-orange-100",
    textColor:"text-orange-600"
  },
  {
    key: "highPriority",
    label: "High Priority",
    icon: Flame,
    iconColor: "bg-red-100 text-red-600",
    valueKey: "highPriority",
    borderColor: "border-red-100",
    textColor:"text-red-600"
  },
];

// FILTER UI CONSTANTS

export const FILTER_WRAPPER =
  "flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-purple-100";

export const SELECT_CLASSES =
  "px-3 py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm md:hidden";

export const TABS_WRAPPER =
  "hidden md:flex space-x-1 bg-purple-50 p-1 rounded-lg";

export const TAB_BASE =
  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all";

export const TAB_ACTIVE =
  "bg-white text-purple-700 shadow-sm border";

export const TAB_INACTIVE =
  "text-gray-600 hover:bg-purple-100/50";


// COMPLETE TASK (SORT OPTIONS)

import { SortDesc, SortAsc, Award } from "lucide-react";

export const SORT_OPTIONS = [
  {
    id: "newest",
    label: "Newest",
    icon: <SortDesc className="w-3 h-3" />,
  },
  {
    id: "oldest",
    label: "Oldest",
    icon: <SortAsc className="w-3 h-3" />,
  },
  {
    id: "priority",
    label: "Priority",
    icon: <Award className="w-3 h-3" />,
  },
];

// Filter options
export const FILTER_OPTIONS = ["all", "today", "week", "high", "medium", "low"];

export const FILTER_LABELS = {
  all: "All Tasks",
  today: "Today's Tasks",
  week: "This Week",
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
};

// Empty state
export const EMPTY_STATE = {
  wrapper:
    "p-6 bg-white rounded-xl shadow-sm border border-purple-100 text-center flex flex-col items-center justify-center",

  iconWrapper:
    "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4",

  btn:
    "px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg text-sm font-medium",
};

export const PRODUCTIVITY_CARD = {
  container: "bg-purple-50/50 rounded-xl p-3 border border-purple-100",

  header: "flex items-center justify-between mb-2",

  label: "text-xs font-semibold text-purple-700",

  badge: "text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full",

  barBg: "w-full h-2 bg-purple-200 rounded-full overflow-hidden",

  barFg: "h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-pulse",
};

// SIGNUP
export const FIELDS = [
  { name: "name", type: "text", placeholder: "Full Name", icon: User },
  { name: "email", type: "email", placeholder: "Email", icon: Mail },
  { name: "password", type: "password", placeholder: "Password", icon: Lock },
];

export const InputWrapper =
  "flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500";

export const BUTTONCLASSES =
  "w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:shadow-md";

export const MESSAGE_SUCCESS =
  "bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 border border-green-100";

export const MESSAGE_ERROR =
  "bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100";

// PROFILE CSS
export const INPUT_WRAPPER =
  "flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500";

export const FULL_BUTTON =
  "w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-200";

export const SECTION_WRAPPER =
  "bg-white rounded-xl shadow-sm border border-purple-100 p-6";

export const BACK_BUTTON =
  "flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors duration-200";

export const DANGER_BTN =
  "w-full text-red-600 border border-red-200 py-2.5 rounded-lg hover:bg-red-50 transition-colors duration-200";

// Profile form fields

export const personalFields = [
  { name: "name", type: "text", placeholder: "Full Name", icon: User },
  { name: "email", type: "email", placeholder: "Email", icon: Mail },
];

export const securityFields = [
  { name: "current", type: "password", placeholder: "Current Password" },
  { name: "new", type: "password", placeholder: "New Password" },
  { name: "confirm", type: "password", placeholder: "Confirm Password" },
];  

// TASK ITEM
export const getPriorityColor = (priority) => {
  const colors = {
    low: "border-green-500 bg-green-50/50 text-green-700",
    medium: "border-purple-500 bg-purple-50/50 text-purple-600",
    high: "border-fuchsia-800 bg-fuchsia-50/50 text-fuchsia-800",
  };

  return colors[priority?.toLowerCase()] || "border-gray-500 bg-gray-50/50 text-gray-700";
};

export const getPriorityBadgeColor = (priority) => {
  const colors = {
    low: "bg-green-100 text-green-600",
    medium: "bg-purple-100 text-purple-600",
    high: "bg-fuchsia-100 text-fuchsia-700",
  };

  return (
    colors[priority?.toLowerCase()] ||
    "bg-gray-100 text-gray-600"
  );
};

export const TI_CLASSES = {
  wrapper:
    "group p-4 sm:p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md transition-all duration-300",

  leftContainer:
    "flex items-start gap-2 sm:gap-3 flex-1 min-w-0",

  completeBtn:
    "mt-0.5 sm:mt-1 p-1 sm:p-1.5 rounded-full hover:bg-purple-100 transition-colors duration-300",

  checkboxIconBase:
    "w-4 h-4 sm:w-5 sm:h-5",

  titleBase:
    "text-base sm:text-lg font-medium truncate",

  priorityBadge:
    "text-xs px-2 py-0.5 rounded-full shrink-0",

  description:
    "text-sm text-gray-500 mt-1 truncate",

  subtasksContainer:
    "mt-3 sm:mt-4 space-y-2 sm:space-y-3 bg-purple-50/30 p-2 sm:p-3 rounded-lg border border-purple-100",

  progressBarBg:
    "h-1.5 bg-purple-100 rounded-full overflow-hidden mt-2",

  progressBarFg:
    "h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-300",

  rightContainer:
    "flex flex-col items-end gap-2 sm:gap-3",

  menuButton:
    "p-1 sm:p-1.5 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-700 transition-colors duration-200",

  menuDropdown:
    "absolute right-0 mt-1 w-40 sm:w-48 bg-white border border-purple-100 rounded-xl shadow-lg z-10 overflow-hidden",

  dateRow:
    "flex items-center gap-1.5 text-xs font-medium whitespace-nowrap",

  createdRow:
    "flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap",
};

// Menu options for task actions
export const MENU_OPTIONS = [
  {
    action: "edit",
    label: "Edit Task",
    icon: <Edit2 size={14} className="text-purple-600" />,
  },
  {
    action: "delete",
    label: "Delete Task",
    icon: <Trash2 size={14} className="text-red-600" />,
  },
];

export const layoutClasses = {
  container: "p-4 md:p-6 min-h-screen",

  headerWrapper:
    "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3",

  title:
    "text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2",

  subtitle:
    "text-sm text-gray-500 mt-1 ml-7",

  select:
    "px-3 py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm",

  listWrapper:
    "space-y-4",
};