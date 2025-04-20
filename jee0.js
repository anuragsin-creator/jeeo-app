document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links li');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Tab functionality for Materials section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Performance Chart
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Physics',
                    data: [65, 59, 70, 71, 76, 80],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Chemistry',
                    data: [55, 50, 60, 65, 70, 75],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Mathematics',
                    data: [50, 55, 60, 65, 70, 78],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    // Stopwatch functionality
    const stopwatchDisplay = document.querySelector('.stopwatch-display');
    const startBtn = document.getElementById('start-stopwatch');
    const pauseBtn = document.getElementById('pause-stopwatch');
    const resetBtn = document.getElementById('reset-stopwatch');
    const lapTimesContainer = document.getElementById('lap-times');
    
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = null;
    let isRunning = false;
    
    function updateDisplay() {
        const displayHours = hours.toString().padStart(2, '0');
        const displayMinutes = minutes.toString().padStart(2, '0');
        const displaySeconds = seconds.toString().padStart(2, '0');
        stopwatchDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }
    
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
                updateDisplay();
            }, 1000);
            
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    }
    
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            
            // Record lap time
            const lapTime = document.createElement('div');
            lapTime.className = 'lap-time';
            lapTime.textContent = stopwatchDisplay.textContent;
            lapTimesContainer.prepend(lapTime);
        }
    }
    
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapTimesContainer.innerHTML = '';
    }
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // To-Do List functionality
    const newTaskInput = document.getElementById('new-task');
    const taskSubjectSelect = document.getElementById('task-subject');
    const addTaskBtn = document.getElementById('add-task');
    const physicsTasksList = document.getElementById('physics-tasks');
    const chemistryTasksList = document.getElementById('chemistry-tasks');
    const mathTasksList = document.getElementById('math-tasks');
    
    function addTask() {
        const taskText = newTaskInput.value.trim();
        const subject = taskSubjectSelect.value;
        
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.remove('completed');
                }
            });
            
            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-text';
            taskSpan.textContent = taskText;
            
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-task';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', function() {
                taskItem.remove();
            });
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskSpan);
            taskItem.appendChild(deleteBtn);
            
            switch(subject) {
                case 'physics':
                    physicsTasksList.appendChild(taskItem);
                    break;
                case 'chemistry':
                    chemistryTasksList.appendChild(taskItem);
                    break;
                case 'math':
                    mathTasksList.appendChild(taskItem);
                    break;
                default:
                    physicsTasksList.appendChild(taskItem);
            }
            
            newTaskInput.value = '';
        }
    }
    
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Community functionality
    const newPostInput = document.getElementById('new-post');
    const postBtn = document.getElementById('post-btn');
    const postsList = document.querySelector('.posts-list');
    
    function addPost() {
        const postText = newPostInput.value.trim();
        
        if (postText) {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            
            const postHeader = document.createElement('div');
            postHeader.className = 'post-header';
            
            const userImg = document.createElement('img');
            userImg.src = 'https://via.placeholder.com/40';
            userImg.alt = 'User';
            
            const usernameSpan = document.createElement('span');
            usernameSpan.className = 'username';
            usernameSpan.textContent = 'You';
            
            const postTimeSpan = document.createElement('span');
            postTimeSpan.className = 'post-time';
            postTimeSpan.textContent = 'Just now';
            
            const postContent = document.createElement('div');
            postContent.className = 'post-content';
            postContent.textContent = postText;
            
            const postActions = document.createElement('div');
            postActions.className = 'post-actions';
            
            const replyBtn = document.createElement('button');
            replyBtn.className = 'btn small-btn';
            replyBtn.innerHTML = '<i class="fas fa-reply"></i> Reply';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn small-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
            deleteBtn.addEventListener('click', function() {
                postDiv.remove();
            });
            
            postHeader.appendChild(userImg);
            postHeader.appendChild(usernameSpan);
            postHeader.appendChild(postTimeSpan);
            
            postActions.appendChild(replyBtn);
            postActions.appendChild(deleteBtn);
            
            postDiv.appendChild(postHeader);
            postDiv.appendChild(postContent);
            postDiv.appendChild(postActions);
            
            postsList.prepend(postDiv);
            newPostInput.value = '';
        }
    }
    
    postBtn.addEventListener('click', addPost);
    newPostInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addPost();
        }
    });
    
    // File upload functionality (simplified)
    const uploadButtons = document.querySelectorAll('[id$="-upload-btn"]');
    
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subject = this.id.split('-')[0];
            const fileInput = document.getElementById(`${subject}-upload`);
            
            if (fileInput.files.length > 0) {
                alert(`Uploading ${fileInput.files.length} file(s) for ${subject}`);
                // In a real app, you would handle the file upload here
            } else {
                alert('Please select at least one file to upload');
            }
        });
    });
});