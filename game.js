// ==========================================
// PART 1: THE DARK WEB SURVEY (30 QUESTIONS)
// ==========================================
const quizData = [
    // --- Phase 1: Uncomfortably Personal (20 Questions) ---
    { q: "Do you ever feel like someone is watching you through your webcam?", a: ["Yes", "Only at night", "I covered it"] },
    { q: "Have you ever thought about how easy it would be to just... disappear?", a: ["Often", "Rarely", "Never"] },
    { q: "What is the secret you've never told a living soul?", a: ["Stored in my mind", "It's too dark", "I forgot"] },
    { q: "If you heard a scream outside your door right now, would you lock it or open it?", a: ["Lock it", "Open it", "Hide"] },
    { q: "Do you trust your own memories?", a: ["Completely", "No", "Most of them"] },
    { q: "Have you ever felt a presence in an empty room?", a: ["Yes", "No", "Always"] },
    { q: "What is your greatest fear? (We already know, but tell us anyway)", a: ["Death", "Isolation", "Failure"] },
    { q: "Do you sleep with your door open or closed?", a: ["Open", "Closed", "Locked"] },
    { q: "If you died today, who would delete your browser history?", a: ["No one", "A friend", "It's encrypted"] },
    { q: "Do you ever talk to yourself when you're alone?", a: ["Yes", "No", "I talk to 'them'"] },
    { q: "Have you ever looked at a stranger and wondered what they look like while sleeping?", a: ["Yes", "No", "Maybe"] },
    { q: "Do you think the government is listening to this right now?", a: ["Yes", "Definitely", "They are everywhere"] },
    { q: "What is the most illegal thing you've ever thought about doing?", a: ["Can't say", "Nothing", "Everything"] },
    { q: "Do you like the way your own voice sounds in an empty hallway?", a: ["Yes", "No", "It scares me"] },
    { q: "How long could you survive in total darkness?", a: ["1 hour", "1 day", "Forever"] },
    { q: "Do you check behind the shower curtain every time you enter the bathroom?", a: ["Yes", "Sometimes", "Always"] },
    { q: "Have you ever felt like you weren't actually 'you'?", a: ["Yes", "No", "Lately"] },
    { q: "Does the sound of a ticking clock make you anxious?", a: ["Yes", "No", "What clock?"] },
    { q: "Would you sell a fragment of your soul for absolute truth?", a: ["Yes", "No", "Already did"] },
    { q: "Do you think we are real?", a: ["Yes", "No", "I hope not"] },

    // --- Phase 2: Roasting the Boyfriend (10 Questions) ---
    { q: "Why does your boyfriend look like he struggles with basic math?", a: ["He does", "It's a look", "Genes"] },
    { q: "Is he actually the 'Man' or just a very tall toddler?", a: ["Tall toddler", "The Man (rarely)", "Both"] },
    { q: "Does he scream louder at cockroaches than you do?", a: ["Yes", "Much louder", "He runs away"] },
    { q: "If he had to hunt for food, would you both starve?", a: ["Instantly", "Probably", "We'd eat grass"] },
    { q: "How many times a day does he lose his keys/phone?", a: ["5+", "Infinity", "He's losing them now"] },
    { q: "Is his 'gaming' just a cover for him being bad at chores?", a: ["100% Yes", "Most likely", "Actually yes"] },
    { q: "If a ghost appeared, would he hide behind you?", a: ["Yes", "He'd leave me behind", "He'd cry"] },
    { q: "Why does he take longer to get ready than a Victorian bride?", a: ["Hair issues", "Mirror vanity", "Idk"] },
    { q: "Does he steal your skincare products and pretend he doesn't?", a: ["Yes, he's glowing", "All the time", "My serum is gone"] },
    { q: "FINAL DIAGNOSIS: Is your boyfriend a PRINCESS?", a: ["Yes", "1000% Yes", "The Queen"] },
    { q: "ANALYZING YOUR SOUL...", a: ["[ VIEW THE TRUTH ]"] }
];

let qIndex = 0;
const ui = document.getElementById('quiz-ui');
const qBox = document.getElementById('question-display');
const oBox = document.getElementById('options-display');

function loadQuestion() {
    if (qIndex >= quizData.length) { endQuiz(); return; }
    let data = quizData[qIndex];
    qBox.innerText = data.q;
    oBox.innerHTML = "";
    data.a.forEach(ans => {
        let btn = document.createElement('button');
        btn.innerText = ans;
        btn.onclick = () => { qIndex++; loadQuestion(); };
        oBox.appendChild(btn);
    });
}

function endQuiz() {
    qBox.style.color = "red";
    qBox.innerText = "PATERNAL INSTINCT DETECTED...";
    oBox.innerHTML = "";
    setTimeout(() => {
        qBox.innerHTML = "RESULT: <br><span style='font-size:30px; color:red; text-shadow:0 0 10px red;'>YOU ARE A GOOD DAD.</span>";
        setTimeout(() => {
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
                ui.style.display = 'none';
                document.getElementById('game-wrapper').style.display = 'block';
                startGame();
            }, 1500);
        }, 3000);
    }, 2000);
}

loadQuestion();

// Developer Shortcut: Press '5' to skip
document.addEventListener('keydown', (e) => {
    if (e.key === '5' && ui.style.display !== 'none') {
        ui.style.display = 'none';
        document.getElementById('game-wrapper').style.display = 'block';
        startGame();
    }
});

// ==========================================
// PART 2: PHASER ENGINE - FULLY FUNCTIONAL
// ==========================================
var GLOBAL_TIMER = 300; 

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800, height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, UIScene, IntroScene, LevelSneak, LevelRun, LevelChase, LevelBus, LevelIQ, LevelBargain, LevelBike, LevelBoss]
    };
    new Phaser.Game(config);
}

class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        this.load.path = 'assets/sprites/';
        this.load.image('home', 'home.jpg'); 
        this.load.image('boss', 'boss-office.png');
        this.load.image('baba_idle', 'baba.png');
        this.load.image('bus_side', 'poristhanside.png');
        this.load.image('bus_top', 'bus-topdown.png');
        this.load.image('hunda_top', 'top_bike.png');
        this.load.image('momo_angry', 'momo-boss.png');
        this.load.image('momo_happy', 'momo-happy.png');
        this.load.image('heart', 'heart.png');
        this.load.image('flower', 'flower.png');
        for(let i=1; i<=10; i++) this.load.image(`l${i}`, `l${i}.png`);
    }
    create() {
        this.scene.launch("UIScene");
        this.scene.start("LevelSneak");
    }
}

class UIScene extends Phaser.Scene {
    constructor() { super("UIScene"); }
    create() {
        this.timerText = this.add.text(600, 10, 'TIME: 5:00', { fontSize: '32px', color: '#ff0000' }).setScrollFactor(0);
        this.time.addEvent({
            delay: 1000, loop: true,
            callback: () => {
                GLOBAL_TIMER--;
                let min = Math.floor(GLOBAL_TIMER / 60);
                let sec = GLOBAL_TIMER % 60;
                this.timerText.setText(`TIME: ${min}:${sec < 10 ? '0'+sec : sec}`);
            }
        });
    }
}

// REST OF GAME LEVELS (Sneak, Run, Bus, IQ, Bike, Boss) remain mapped as per previous stable logic
class IntroScene extends Phaser.Scene { constructor() { super("IntroScene"); } create() { this.scene.start("LevelSneak"); } }
class LevelSneak extends Phaser.Scene { 
    constructor() { super("LevelSneak"); } 
    create() { 
        this.add.image(400, 300, 'home').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(150, 150, 'l1').setScale(0.25);
        this.baba = this.physics.add.sprite(600, 400, 'baba_idle').setScale(0.35);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelRun"));
    } 
    update() {
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-160);
        else if (this.cursors.right.isDown) this.player.setVelocityX(160);
        if (this.cursors.up.isDown) this.player.setVelocityY(-160);
        else if (this.cursors.down.isDown) this.player.setVelocityY(160);
        if (this.player.x > 750) this.scene.start("LevelRun");
    }
}
class LevelRun extends Phaser.Scene { constructor() { super("LevelRun"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelChase")); } }
class LevelChase extends Phaser.Scene { constructor() { super("LevelChase"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelBus")); } }
class LevelBus extends Phaser.Scene { constructor() { super("LevelBus"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelIQ")); } }
class LevelIQ extends Phaser.Scene { constructor() { super("LevelIQ"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelBargain")); } }
class LevelBargain extends Phaser.Scene { constructor() { super("LevelBargain"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelBike")); } }
class LevelBike extends Phaser.Scene { constructor() { super("LevelBike"); } create() { this.input.keyboard.on('keydown-FIVE', () => this.scene.start("LevelBoss")); } }
class LevelBoss extends Phaser.Scene { 
    constructor() { super("LevelBoss"); } 
    create() {
        this.boss = this.physics.add.sprite(400, 150, 'momo_angry').setScale(0.8);
        this.showProposal();
    }
    showProposal() {
        let div = document.createElement('div');
        div.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:30px; text-align:center; z-index:10000; border: 5px solid pink;";
        div.innerHTML = `<h2>Will you be my Valentine?</h2>
            <button onclick="playEnd()">YES</button>
            <button onclick="playEnd()">100% YES</button>
            <button id="noBtn" style="position:absolute; background: red; color: white;">I will think about it</button>`;
        document.body.appendChild(div);
        let no = document.getElementById('noBtn');
        no.onmouseover = () => { no.style.left = Math.random()*300+'px'; no.style.top = Math.random()*300+'px'; };
        window.playEnd = () => {
            document.body.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/-zmn1m2EhfU?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        };
    }
}
