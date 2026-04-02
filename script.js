// 1) 获取页面元素
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 2) 定义 localStorage 的键名（用于保存/读取任务）
const STORAGE_KEY = 'todo-items';

// 3) 页面加载时先恢复本地任务
loadTodos();

// 4) 监听表单提交：添加任务
form.addEventListener('submit', function (event) {
  // 阻止表单默认刷新页面行为
  event.preventDefault();

  // 去掉首尾空格，避免添加空任务
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('请输入任务内容');
    return;
  }

  addTodoItem(taskText);

  // 新增任务后立刻保存，确保刷新页面不会丢失
  saveTodos();

  // 清空输入框并重新聚焦，方便继续输入
  input.value = '';
  input.focus();
});

// 5) 创建并插入一个任务项
// completed 参数用于“恢复本地数据时”指定是否已完成（默认 false）
function addTodoItem(text, completed = false) {
  // 每个任务项是 li
  const item = document.createElement('li');
  item.className = 'todo-item';

  // 如果是已完成任务，补上 completed 类名
  if (completed) {
    item.classList.add('completed');
  }

  // 任务文字区域（点击可切换完成状态）
  const textSpan = document.createElement('span');
  textSpan.className = 'todo-text';
  textSpan.textContent = text;

  textSpan.addEventListener('click', function () {
    // 给任务项切换 completed 类名
    item.classList.toggle('completed');

    // 状态变化后马上保存
    saveTodos();
  });

  // 删除按钮
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.type = 'button';
  deleteBtn.textContent = '删除';

  deleteBtn.addEventListener('click', function () {
    // 从列表中移除当前任务项
    item.remove();

    // 删除后马上保存
    saveTodos();
  });

  // 把文字和删除按钮放进任务项
  item.appendChild(textSpan);
  item.appendChild(deleteBtn);

  // 把任务项放进列表
  list.appendChild(item);
}

// 6) 把当前页面中的任务列表保存到 localStorage
function saveTodos() {
  const todoData = [];

  // 遍历每一项任务，提取“文字 + 是否完成”
  const items = list.querySelectorAll('.todo-item');
  items.forEach(function (item) {
    const text = item.querySelector('.todo-text').textContent;
    const completed = item.classList.contains('completed');

    todoData.push({ text, completed });
  });

  // 转成 JSON 字符串后存入浏览器本地存储
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoData));
}

// 7) 从 localStorage 读取任务并恢复到页面
function loadTodos() {
  const savedText = localStorage.getItem(STORAGE_KEY);

  // 没有数据就直接结束
  if (!savedText) {
    return;
  }

  // 把字符串转回数组
  const savedTodos = JSON.parse(savedText);

  // 逐条重新渲染到页面
  savedTodos.forEach(function (todo) {
    addTodoItem(todo.text, todo.completed);
  });
}
