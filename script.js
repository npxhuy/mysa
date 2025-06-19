let allQuestions = [];
let currentIndex = 0;

document.getElementById('startBtn').addEventListener('click', () => {
  fetch('questions.txt')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load questions.txt');
      return response.text();
    })
    .then(data => {
      allQuestions = data.split(/\r?\n/).filter(q => q.trim() !== '');
      shuffleArray(allQuestions);
      currentIndex = 0;
      showQuestions();
      document.getElementById('nextBtn').disabled = false;
      document.getElementById('exitBtn').disabled = false;
    })
    .catch(err => {
      alert("Error loading questions.txt: " + err.message);
    });
});

document.getElementById('nextBtn').addEventListener('click', showQuestions);

document.getElementById('exitBtn').addEventListener('click', () => {
  document.getElementById('questions').innerHTML = "<h2>Game Ended</h2>";
  document.getElementById('nextBtn').disabled = true;
  document.getElementById('exitBtn').disabled = true;
});

function showQuestions() {
  const questionDiv = document.getElementById('questions');
  const nextThree = allQuestions.slice(currentIndex, currentIndex + 3);
  if (nextThree.length === 0) {
    questionDiv.innerHTML = "<h2>No more questions!</h2>";
    document.getElementById('nextBtn').disabled = true;
    return;
  }
  questionDiv.innerHTML = nextThree.map(q => `<p>${q}</p>`).join('');
  currentIndex += 3;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
