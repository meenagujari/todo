const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Sample todo data
const sampleTodos = [
  {
    title: "Learn Node.js",
    description: "Complete the Node.js tutorial and build a REST API",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-12-31",
    tags: ["learning", "backend", "javascript"]
  },
  {
    title: "Buy groceries",
    description: "Milk, bread, eggs, vegetables, and fruits",
    status: "pending",
    priority: "medium",
    dueDate: "2024-12-25",
    tags: ["personal", "shopping"]
  },
  {
    title: "Complete project presentation",
    description: "Prepare slides for the quarterly project review meeting",
    status: "pending",
    priority: "urgent",
    dueDate: "2024-12-20",
    tags: ["work", "presentation", "meeting"]
  },
  {
    title: "Exercise routine",
    description: "30 minutes cardio and 20 minutes strength training",
    status: "completed",
    priority: "medium",
    dueDate: "2024-12-15",
    tags: ["health", "fitness"]
  },
  {
    title: "Read React documentation",
    description: "Go through React hooks and advanced patterns",
    status: "pending",
    priority: "low",
    dueDate: "2025-01-15",
    tags: ["learning", "frontend", "react"]
  }
];

let createdTodoIds = [];

// Test functions
async function testHomeAPI() {
  console.log('\n🏠 Testing Home API...');
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Home API:', response.data);
  } catch (error) {
    console.log('❌ Home API Error:', error.message);
  }
}

async function testCreateTodos() {
  console.log('\n📝 Testing Create Todos...');
  for (let i = 0; i < sampleTodos.length; i++) {
    try {
      const response = await axios.post(`${BASE_URL}/todos`, sampleTodos[i]);
      createdTodoIds.push(response.data.data._id);
      console.log(`✅ Created Todo ${i + 1}:`, response.data.data.title);
    } catch (error) {
      console.log(`❌ Create Todo ${i + 1} Error:`, error.response?.data || error.message);
    }
  }
}

async function testGetAllTodos() {
  console.log('\n📋 Testing Get All Todos...');
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    console.log('✅ Get All Todos:', {
      count: response.data.count,
      total: response.data.total,
      page: response.data.page,
      totalPages: response.data.totalPages
    });
  } catch (error) {
    console.log('❌ Get All Todos Error:', error.response?.data || error.message);
  }
}

async function testGetTodosWithFilters() {
  console.log('\n🔍 Testing Get Todos with Filters...');
  
  // Test status filter
  try {
    const response = await axios.get(`${BASE_URL}/todos?status=pending`);
    console.log('✅ Pending Todos:', response.data.count);
  } catch (error) {
    console.log('❌ Status Filter Error:', error.response?.data || error.message);
  }

  // Test priority filter
  try {
    const response = await axios.get(`${BASE_URL}/todos?priority=high`);
    console.log('✅ High Priority Todos:', response.data.count);
  } catch (error) {
    console.log('❌ Priority Filter Error:', error.response?.data || error.message);
  }

  // Test search
  try {
    const response = await axios.get(`${BASE_URL}/todos?search=project`);
    console.log('✅ Search "project":', response.data.count);
  } catch (error) {
    console.log('❌ Search Error:', error.response?.data || error.message);
  }

  // Test pagination
  try {
    const response = await axios.get(`${BASE_URL}/todos?page=1&limit=3`);
    console.log('✅ Pagination (page 1, limit 3):', response.data.count);
  } catch (error) {
    console.log('❌ Pagination Error:', error.response?.data || error.message);
  }
}

async function testGetSingleTodo() {
  console.log('\n📄 Testing Get Single Todo...');
  if (createdTodoIds.length > 0) {
    try {
      const response = await axios.get(`${BASE_URL}/todos/${createdTodoIds[0]}`);
      console.log('✅ Get Single Todo:', response.data.data.title);
    } catch (error) {
      console.log('❌ Get Single Todo Error:', error.response?.data || error.message);
    }
  }
}

async function testUpdateTodo() {
  console.log('\n✏️ Testing Update Todo...');
  if (createdTodoIds.length > 0) {
    try {
      const response = await axios.put(`${BASE_URL}/todos/${createdTodoIds[0]}`, {
        status: "completed",
        priority: "low"
      });
      console.log('✅ Updated Todo:', response.data.data.title, '- Status:', response.data.data.status);
    } catch (error) {
      console.log('❌ Update Todo Error:', error.response?.data || error.message);
    }
  }
}

async function testBulkUpdate() {
  console.log('\n⚡ Testing Bulk Update...');
  if (createdTodoIds.length >= 2) {
    try {
      const response = await axios.patch(`${BASE_URL}/todos/bulk`, {
        ids: [createdTodoIds[0], createdTodoIds[1]],
        updates: {
          priority: "medium"
        }
      });
      console.log('✅ Bulk Update:', response.data.message);
    } catch (error) {
      console.log('❌ Bulk Update Error:', error.response?.data || error.message);
    }
  }
}

async function testGetStats() {
  console.log('\n📊 Testing Get Statistics...');
  try {
    const response = await axios.get(`${BASE_URL}/todos/stats`);
    console.log('✅ Statistics:', {
      byStatus: response.data.data.byStatus,
      byPriority: response.data.data.byPriority,
      overdue: response.data.data.overdue
    });
  } catch (error) {
    console.log('❌ Get Stats Error:', error.response?.data || error.message);
  }
}

async function testDeleteTodo() {
  console.log('\n🗑️ Testing Delete Todo...');
  if (createdTodoIds.length > 0) {
    try {
      const response = await axios.delete(`${BASE_URL}/todos/${createdTodoIds[createdTodoIds.length - 1]}`);
      console.log('✅ Deleted Todo:', response.data.message);
      createdTodoIds.pop(); // Remove the deleted ID
    } catch (error) {
      console.log('❌ Delete Todo Error:', error.response?.data || error.message);
    }
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Todo API Tests...\n');
  
  await testHomeAPI();
  await testCreateTodos();
  await testGetAllTodos();
  await testGetTodosWithFilters();
  await testGetSingleTodo();
  await testUpdateTodo();
  await testBulkUpdate();
  await testGetStats();
  await testDeleteTodo();
  
  console.log('\n🎉 All tests completed!');
}

// Run tests
runAllTests().catch(console.error); 