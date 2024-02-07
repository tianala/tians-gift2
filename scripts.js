document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.container');
    var audio = new Audio('moan.mp3'); // Create an Audio object with the path to the audio file

    container.addEventListener('click', function (event) {
        playSound(); // Play the sound when the container is clicked
        createFirework(event.clientX, event.clientY);
    });

    function playSound() {
        audio.play(); // Play the audio
    }

    function createFirework(x, y) {
        for (var i = 0; i < 100; i++) { // Create 100 confetti particles per firework
            createConfettiParticle(x, y);
        }
    }

    function createConfettiParticle(x, y) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = getRandomColor(); // Random color for each confetti particle
        container.appendChild(confetti);

        var angle = Math.random() * Math.PI * 2; // Random angle in radians
        var velocity = 10 + Math.random() * 10; // Random velocity
        var duration = 1000 + Math.random() * 500; // Random duration

        var startX = x;
        var startY = y;

        var startTime = Date.now();

        function update() {
            var timeElapsed = Date.now() - startTime;
            var distance = velocity * (timeElapsed / duration);
            var offsetX = Math.cos(angle) * distance;
            var offsetY = Math.sin(angle) * distance;

            confetti.style.left = startX + offsetX + 'px';
            confetti.style.top = startY + offsetY + 'px';

            if (timeElapsed < duration) {
                requestAnimationFrame(update);
            } else {
                container.removeChild(confetti);
            }
        }

        requestAnimationFrame(update);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
