#!/bin/bash

echo "🚀 Todo API Testing Commands"
echo "=============================="

# Base URL
BASE_URL="http://localhost:5000"

echo ""
echo "1. 🏠 Test Home API"
echo "curl $BASE_URL/"
curl $BASE_URL/
echo ""
echo ""

echo "2. 📝 Create Todo 1"
echo 'curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '"'"'{"title": "Learn Node.js", "description": "Complete the Node.js tutorial", "priority": "high", "dueDate": "2024-12-31", "tags": ["learning", "backend"]}'"'"
curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '{"title": "Learn Node.js", "description": "Complete the Node.js tutorial", "priority": "high", "dueDate": "2024-12-31", "tags": ["learning", "backend"]}'
echo ""
echo ""

echo "3. 📝 Create Todo 2"
echo 'curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '"'"'{"title": "Buy groceries", "description": "Milk, bread, eggs", "priority": "medium", "dueDate": "2024-12-25", "tags": ["personal", "shopping"]}'"'"
curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, bread, eggs", "priority": "medium", "dueDate": "2024-12-25", "tags": ["personal", "shopping"]}'
echo ""
echo ""

echo "4. 📝 Create Todo 3"
echo 'curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '"'"'{"title": "Complete project presentation", "description": "Prepare slides for meeting", "priority": "urgent", "dueDate": "2024-12-20", "tags": ["work", "presentation"]}'"'"
curl -X POST $BASE_URL/api/todos -H "Content-Type: application/json" -d '{"title": "Complete project presentation", "description": "Prepare slides for meeting", "priority": "urgent", "dueDate": "2024-12-20", "tags": ["work", "presentation"]}'
echo ""
echo ""

echo "5. 📋 Get All Todos"
echo "curl $BASE_URL/api/todos"
curl $BASE_URL/api/todos
echo ""
echo ""

echo "6. 🔍 Get Todos with Status Filter"
echo "curl '$BASE_URL/api/todos?status=pending'"
curl "$BASE_URL/api/todos?status=pending"
echo ""
echo ""

echo "7. 🔍 Get Todos with Priority Filter"
echo "curl '$BASE_URL/api/todos?priority=high'"
curl "$BASE_URL/api/todos?priority=high"
echo ""
echo ""

echo "8. 🔍 Search Todos"
echo "curl '$BASE_URL/api/todos?search=project'"
curl "$BASE_URL/api/todos?search=project"
echo ""
echo ""

echo "9. 📄 Get Single Todo (replace ID)"
echo "curl $BASE_URL/api/todos/[TODO_ID]"
echo "Note: Replace [TODO_ID] with actual ID from previous responses"
echo ""
echo ""

echo "10. ✏️ Update Todo (replace ID)"
echo 'curl -X PUT $BASE_URL/api/todos/[TODO_ID] -H "Content-Type: application/json" -d '"'"'{"status": "completed", "priority": "low"}'"'"
echo "Note: Replace [TODO_ID] with actual ID"
echo ""
echo ""

echo "11. ⚡ Bulk Update (replace IDs)"
echo 'curl -X PATCH $BASE_URL/api/todos/bulk -H "Content-Type: application/json" -d '"'"'{"ids": ["ID1", "ID2"], "updates": {"priority": "medium"}}'"'"
echo "Note: Replace ID1, ID2 with actual IDs"
echo ""
echo ""

echo "12. 📊 Get Statistics"
echo "curl $BASE_URL/api/todos/stats"
curl $BASE_URL/api/todos/stats
echo ""
echo ""

echo "13. 🗑️ Delete Todo (replace ID)"
echo "curl -X DELETE $BASE_URL/api/todos/[TODO_ID]"
echo "Note: Replace [TODO_ID] with actual ID"
echo ""
echo ""

echo "🎉 Testing completed!"
echo ""
echo "💡 Tips:"
echo "- Copy the _id from create responses to use in update/delete commands"
echo "- Use jq to format JSON responses: curl ... | jq '.'"
echo "- Test different query parameters: ?page=2&limit=5&sortBy=dueDate&order=asc" 