document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let notebook = new Array(squares.length);
    const startBtn = document.querySelector('#start-button');
    const clearBtn = document.querySelector('#clear-button');
    const stepBtn =  document.querySelector('#step-button');
    const width = 40;
    let timerId;
    
    function mouseClick(e) {           
        let trgt = e.target;
        if (trgt.nodeName === 'DIV') {
            if (trgt.classList.contains('cell')) {
                trgt.classList.remove('cell')
            } else {
                trgt.classList.add('cell');                           
            }
        }
    }
    document.addEventListener('click', mouseClick);

    function clear() {
        squares.forEach(square =>             
            square.classList.remove('cell')
        );
    }
    clearBtn.addEventListener('click', clear);

    function isCellActive(k) {
        if (k < 0 || k > squares.length - 1) {
            return false;
        }                
        return squares[k].classList.contains('cell');
    }

    function step() {
        for (let i = 0; i < squares.length; i++) {
            let n = 0;            
            if (isCellActive(i - width - 1)) n++;
            if (isCellActive(i - width)) n++;
            if (isCellActive(i - width + 1)) n++;
            if (isCellActive(i - 1)) n++;
            if (isCellActive(i + 1)) n++;
            if (isCellActive(i + width - 1)) n++;
            if (isCellActive(i + width)) n++;
            if (isCellActive(i + width + 1)) n++;

            if (!isCellActive(i) && n == 3) {
                notebook[i] = 1;
            }

            if (isCellActive(i)) {
                if (n == 2 || n == 3) {
                    notebook[i] = 1;
                } else {
                    notebook[i] = 0;
                }
            }
        }

        clear();             
        for (let k = 0; k < notebook.length; k++) {
            if (notebook[k] == 1) {
                squares[k].classList.add('cell');
            }
        };
    }
    stepBtn.addEventListener('click', step);

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            step();
            timerId = setInterval(step, 500);
        }
    });
});