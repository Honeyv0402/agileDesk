import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
        type: String,
        default: "",
        trim: true
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "Low"
    },

    dueDate: {
        type: Date
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const taskModel =
    mongoose.models.Task || mongoose.model("Task", taskSchema);

export default taskModel;