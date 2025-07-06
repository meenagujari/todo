const Todo = require('../models/Todo');

// @desc    Get all todos with advanced filtering and pagination
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
      archived = false
    } = req.query;

    // Build filter object
    const filter = { isArchived: archived === 'true' };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const todos = await Todo.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Todo.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: todos.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority, tags } = req.body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority, tags } = req.body;

    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Update fields
    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (status !== undefined) todo.status = status;
    if (dueDate !== undefined) todo.dueDate = dueDate ? new Date(dueDate) : null;
    if (priority !== undefined) todo.priority = priority;
    if (tags !== undefined) todo.tags = tags;

    await todo.save();

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Bulk update todos
// @route   PATCH /api/todos/bulk
// @access  Public
const bulkUpdateTodos = async (req, res) => {
  try {
    const { ids, updates } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'IDs array is required'
      });
    }

    const result = await Todo.updateMany(
      { _id: { $in: ids } },
      { $set: updates }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} todos updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get todo statistics
// @route   GET /api/todos/stats
// @access  Public
const getTodoStats = async (req, res) => {
  try {
    const stats = await Todo.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Todo.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const overdueCount = await Todo.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    });

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        byPriority: priorityStats,
        overdue: overdueCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  bulkUpdateTodos,
  getTodoStats
}; 