const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    'brother',
    'alphabet',
    'roadway',
    'adore',
    'times',
    'as a result',
    'hackwork',
    'round',
    'barrack',
    'stage',
    'stimulating',
    'narrow',
    'in order that',
    'fiercely',
    'grill',
    'emotional',
    'bayou',
    'until',
    'pish',
    'positively',
    'probable',
    'greatly',
    'phew',
    'gerrymander',
    'caramel',
    'speedily',
    'in addition',
    'forestry',
    'subscribe',
    'amidst',
    'provided that',
    'distant',
    'plunger',
    'crackle',
    'inexperienced',
    'cautiously',
    'whole',
    'next',
];

let score = 0;
let time = 20;

//初始化单词
let randomWord;

//设置难度为ls或medium(本地存储 刷新保持上次关闭页面的难度)
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

//设置难度选择值
difficultySelect.value = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

//表单自动对焦
text.focus();

//开启定时器 1s时间减少一次
const timerInterval = setInterval(updateTime, 1000);


function getRandomWord() {
    //返回不超过数组长度的单词(随机生成)
    // Math.floor() 返回小于等于一个给定数字的最大整数。
    //Math.random() 函数返回一个浮点数，伪随机数在范围从0 到小于1，也就是说，从 0（包括 0）往上，但是不包括 1（排除 1）
    return words[Math.floor(Math.random() * words.length)];
}

//随机生成单词函数
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}


//定时器
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time == 0) {
        clearInterval(timerInterval);
        gameOver();
    }
}

function upadateScore() {
    score++;
    scoreEl.innerHTML = score;
}
//游戏结束
function gameOver() {
    //Es6中的${}新语法
    //这是es6中新增的字符串方法
    //配合反单引号完成拼接字符串的功能
    endgameEl.innerHTML = ` 
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

    //记得加单引号
    endgameEl.style.display = 'flex';
}

addWordToDOM();

//绑定点击事件
text.addEventListener('input', e => {
    //获取用户键盘输入的单词
    const insertWord = e.target.value;
    if (insertWord == randomWord) {
        upadateScore();
        addWordToDOM();
        //文本框置空
        e.target.value = '';

        //难度设置
        if (difficulty == 'hard') {
            time += 1;
        }
        else if (difficulty == 'medium') {
            time += 2;
        }
        else {
            time += 3;
        }
        updateTime();
    }
})

//设置按钮功能
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});


//本地存储设置过的难度
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})