// Imports Mongoose library for MongoDB operations
const mongoose = require('mongoose'); 



// Creates a new Mongoose schema for Todo documents

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
    minlength: [1, 'Title cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed', 'cancelled'],
      message: 'Status must be pending, in-progress, completed, or cancelled'
    },
    default: 'pending'
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: 'Priority must be low, medium, high, or urgent'
    },
    default: 'medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true; // Allow null/undefined
        return value > new Date(); // Due date must be in the future
      },
      message: 'Due date must be in the future'
    }
  },
  completedAt: {
    type: Date,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters']
  }],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if todo is overdue
todoSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'completed') return false;
  return new Date() > this.dueDate;
});

// Virtual for days until due
todoSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Indexes for better query performance
todoSchema.index({ status: 1, priority: 1 });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ createdAt: -1 });
todoSchema.index({ isArchived: 1 });

// Pre-save middleware to set completedAt
todoSchema.pre('save', function(next) {
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  } else if (this.status !== 'completed') {
    this.completedAt = null;
  }
  next();
});

module.exports = mongoose.model('Todo', todoSchema); 