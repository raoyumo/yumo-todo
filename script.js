// 1) 获取页面元素
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 2) 监听表单提交：添加任务
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

  // 清空输入框并重新聚焦，方便继续输入
  input.value = '';
  input.focus();
});

// 3) 创建并插入一个任务项
function addTodoItem(text) {
  // 每个任务项是 li
  const item = document.createElement('li');
  item.className = 'todo-item';

  // 任务文字区域（点击可切换完成状态）
  const textSpan = document.createElement('span');
  textSpan.className = 'todo-text';
  textSpan.textContent = text;

  textSpan.addEventListener('click', function () {
    // 给任务项切换 completed 类名
    item.classList.toggle('completed');
  });

  // 删除按钮
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.type = 'button';
  deleteBtn.textContent = '删除';

  deleteBtn.addEventListener('click', function () {
    // 从列表中移除当前任务项
    item.remove();
  });

  // 把文字和删除按钮放进任务项
  item.appendChild(textSpan);
  item.appendChild(deleteBtn);

  // 把任务项放进列表
  list.appendChild(item);
}
