document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal-input');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalList = document.getElementById('goal-list');

    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    const saveGoals = () => {
        localStorage.setItem('goals', JSON.stringify(goals));
    };

    const renderGoals = () => {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="goal-text ${goal.completed ? 'completed' : ''}">${goal.text}</span>
                <div class="goal-actions">
                    <button class="complete-btn" data-index="${index}">${goal.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            goalList.appendChild(li);
        });
    };

    addGoalBtn.addEventListener('click', () => {
        const goalText = goalInput.value.trim();
        if (goalText) {
            goals.push({ text: goalText, completed: false });
            goalInput.value = '';
            saveGoals();
            renderGoals();
        }
    });

    goalList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            const index = e.target.dataset.index;
            goals[index].completed = !goals[index].completed;
            saveGoals();
            renderGoals();
        }

        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            goals.splice(index, 1);
            saveGoals();
            renderGoals();
        }
    });

    renderGoals();
});
