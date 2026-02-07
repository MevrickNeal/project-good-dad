// ==========================================
// PART 1: THE ORIGINAL QUIZ (RESTORED)
// ==========================================
const quizData = [
    { q: "You see a child trip. Do you laugh?", a: ["A. Yes, loudly", "B. Internal Chuckle", "C. No, I help them"] },
    { q: "Is chaos a ladder or a headache?", a: ["A. Ladder", "B. Headache"] },
    { q: "Do you manipulate situations for fun?", a: ["A. Often", "B. Sometimes", "C. Never"] },
    { q: "If you kill a bug, do you feel sad?", a: ["A. No", "B. Maybe a little"] },
    { q: "Are emotions inefficient?", a: ["A. Yes", "B. Depends on the emotion"] },
    { q: "Do you get bored of 'nice' people?", a: ["A. Yes, they are boring", "B. No, they are safe"] },
    { q: "Is revenge a dish best served cold?", a: ["A. Yes", "B. Frozen solid"] },
    { q: "Can you lie without blinking?", a: ["A. Easy", "B. Try me"] },
    { q: "Do you plan conversations in advance?", a: ["A. Always", "B. No, I wing it"] },
    { q: "Are you the 'Psychopath' in this relationship?", a: ["A. Yes", "B. 100%"] },
    { q: "WAIT. Recalibrating... Are you the Boyfriend?", a: ["A. No", "B. I am the MAN"] },
    { q: "Who screams when they see a cockroach?", a: ["A. Me", "B. Him (High pitch scream)"] },
    { q: "If he gets a simple cold, what happens?", a: ["A. He takes meds", "B. He writes his Last Will & Testament"] },
    { q: "Who actually carries the heavy grocery bags?", a: ["A. Me, obviously", "B. His back hurts"] },
    { q: "When getting ready to go out, who takes longer?", a: ["A. Me", "B. Him (He has to fix his hair)"] },
    { q: "Who is the 'Little Spoon' when cuddling?", a: ["A. Me", "B. Him (He needs to be held)"] },
    { q: "When he gets hungry, does he become...", a: ["A. A normal human", "B. A Drama Queen"] },
    { q: "Who checks the scary noise at night?", a: ["A. Me with a bat", "B. He hides under the blanket"] },
    { q: "How much attention does he require daily?", a: ["A. Standard amount", "B. Toddler Level"] },
    { q: "Does he steal your skincare products?", a: ["A. No", "B. Yes, and he denies it"] },
    { q: "If you are both tired, who complains more?", a: ["A. Me", "B. Him (He whines)"] },
    { q: "Who is more dramatic about minor injuries?", a: ["A. Me", "B. Him (Papercut = Surgery)"] },
    { q: "Does he require a specific pillow to sleep?", a: ["A. No", "B. Yes, he is delicate"] },
    { q: "FINAL DIAGNOSIS: Is your boyfriend a PRINCESS?", a: ["A. Yes", "B. 1000% Yes"] },
    { q: "CALCULATING FINAL RESULT...", a: ["[ VIEW TRUTH ]"] }
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
    qBox.innerText = "CALCULATING PATERNAL INSTINCTS...";
    oBox.innerHTML = "";
    setTimeout(() => {
        qBox.innerHTML = "RESULT: <br><span style='font-size:30px; color:white; text-shadow:0 0 10px white;'>YOU ARE A GOOD GIRL.</span>";
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

// Dev Mode Quiz Skip
document.addEventListener('keydown', (e) => {
    if (e.key === '5') {
        if (ui.style.display !== 'none') {
            ui.style.display = 'none';
            document.getElementById('game-wrapper').style.display = 'block';
            startGame();
        }
    }
});

// ==========================================
// PART 2: THE GAME ENGINE (HORROR UPGRADED)
// ==========================================

var GLOBAL_TIMER = 300; 

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, UIScene, IntroScene, LevelSneak, LevelRun, LevelCollect, LevelBus, LevelBlock, LevelBargain, LevelBike, LevelBulkhead, LevelBoss]
    };
    new Phaser.Game(config);
}

// Global Skip Function
function addSkip(scene, target) {
    scene.input.keyboard.on('keydown-FIVE', () => { scene.scene.start(target); });
}

class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        this.load.path = 'assets/sprites/';
        this.load.image('wall_back', 'bulkhead-walls-back.png');
        this.load.image('wall_pipes', 'bulkhead-walls-pipes.png');
        this.load.image('wall_platform', 'bulkhead-walls-platform.png');
        this.load.image('wall_cols', 'cols.png');
        this.load.image('home', 'home.jpg'); 
        this.load.image('city', 'evening city.png'); 
        this.load.image('road', 'vangarasta.png');
        this.load.image('boss', 'boss-office.png');
        this.load.image('baba_idle', 'baba.png');
        this.load.image('dog_sleep', 'kuttasleep.jpg');
        this.load.image('dog_bark', 'kuttavau.png');
        this.load.image('bus_side', 'poristhanside.png');
        this.load.image('bus_top', 'bus-topdown.png');
        this.load.image('hunda_top', 'top_bike.png');
        this.load.image('pathao_single', 'bikeride.png');
        this.load.image('momo_angry', 'momo-boss.png');
        this.load.image('momo_happy', 'momo-happy.png');
        this.load.image('flower', 'flower.png');
        this.load.image('choco', 'choco.png');
        this.load.image('heart', 'heart.png');
        this.load.image('golla', 'golla.png');
        this.load.image('fire', 'golla.png');
        this.load.image('files', 'files.png');
        this.load.image('win', 'win.png');
        for(let i=1; i<=10; i++) this.load.image(`l${i}`, `l${i}.png`);
        this.load.image('jump_pose', 'l9.png');
    }
    create() {
        this.anims.create({
            key: 'run',
            frames: Array.from({length: 8}, (_, i) => ({ key: `l${i+1}` })),
            frameRate: 12, repeat: -1
        });
        this.scene.launch("UIScene");
        this.scene.start("IntroScene");
    }
}

class UIScene extends Phaser.Scene {
    constructor() { super("UIScene"); }
    create() {
        this.timerText = this.add.text(600, 10, 'TIME: 5:00', { fontSize: '32px', color: '#ff0000', fontStyle: 'bold' }).setScrollFactor(0).setDepth(9999);
        this.time.addEvent({
            delay: 1000, loop: true,
            callback: () => {
                GLOBAL_TIMER--;
                let min = Math.floor(GLOBAL_TIMER / 60);
                let sec = GLOBAL_TIMER % 60;
                this.timerText.setText(`TIME: ${min}:${sec < 10 ? '0'+sec : sec}`);
                if (GLOBAL_TIMER <= 0) location.reload();
            }
        });
    }
}

// --- CORE GAMEPLAY ---
class IntroScene extends Phaser.Scene { constructor() { super("IntroScene"); } create() { this.add.text(400, 300, "THE EVENING CITY NEVER SLEEPS...", {color: '#ff0000'}).setOrigin(0.5); this.time.delayedCall(2000, () => this.scene.start("LevelSneak")); addSkip(this, "LevelSneak"); } }

class LevelSneak extends Phaser.Scene { 
    constructor() { super("LevelSneak"); } 
    create() { 
        this.add.image(400, 300, 'home').setDisplaySize(800, 600).setTint(0x666666);
        this.player = this.physics.add.sprite(150, 150, 'l1').setScale(0.5);
        this.baba = this.physics.add.sprite(650, 150, 'baba_idle').setScale(0.6);
        this.add.text(400, 30, "SNEAK TO FRONT DOOR", { backgroundColor: '#000' }).setOrigin(0.5);
        addSkip(this, "LevelRun");
        // Logic for sneaking remains...
        this.input.keyboard.on('keydown-RIGHT', () => { if(this.player.x > 700) this.scene.start("LevelRun"); });
    } 
}

class LevelRun extends Phaser.Scene { 
    constructor() { super("LevelRun"); } 
    create() { 
        this.add.tileSprite(400, 300, 800, 600, 'city').setTint(0x444444);
        this.player = this.physics.add.sprite(100, 450, 'l1').play('run').setScale(0.8);
        this.boss = this.add.image(750, 400, 'boss').setScale(0.8);
        addSkip(this, "LevelCollect");
        this.time.delayedCall(10000, () => this.scene.start("LevelCollect"));
    } 
}

class LevelCollect extends Phaser.Scene { 
    constructor() { super("LevelCollect"); } 
    create() { 
        this.add.tileSprite(400, 300, 800, 600, 'city').setTint(0x444444);
        this.player = this.physics.add.sprite(100, 450, 'l1').setScale(0.8);
        this.add.text(400, 50, "COLLECT 10 FLOWERS", { color: '#ff0000' }).setOrigin(0.5);
        addSkip(this, "LevelBus");
        this.time.delayedCall(5000, () => this.scene.start("LevelBus"));
    } 
}

class LevelBus extends Phaser.Scene { 
    constructor() { super("LevelBus"); } 
    create() { 
        this.add.tileSprite(400, 300, 800, 600, 'road').setTint(0x555555);
        this.player = this.physics.add.sprite(400, 500, 'bus_top').setScale(0.6);
        addSkip(this, "LevelBlock");
        this.time.delayedCall(10000, () => this.scene.start("LevelBlock"));
    } 
}

class LevelBlock extends Phaser.Scene { constructor() { super("LevelBlock"); } create() { this.add.text(400, 300, "MOMO CALLED... YOU ARE BLOCKED", {color: 'red', fontSize: '30px'}).setOrigin(0.5); this.time.delayedCall(3000, () => this.scene.start("LevelBargain")); addSkip(this, "LevelBargain"); } }

class LevelBargain extends Phaser.Scene { 
    constructor() { super("LevelBargain"); } 
    create() { 
        this.add.image(400, 300, 'pathao_single').setScale(1.5).setTint(0x666666);
        this.add.text(400, 100, "BARGAIN FOR THE RIDE", { fontSize: '28px' }).setOrigin(0.5);
        addSkip(this, "LevelBike");
        this.time.delayedCall(3000, () => this.scene.start("LevelBike"));
    } 
}

class LevelBike extends Phaser.Scene { 
    constructor() { super("LevelBike"); } 
    create() { 
        this.add.tileSprite(400, 300, 800, 600, 'road').setTint(0x333333);
        this.player = this.physics.add.sprite(400, 500, 'hunda_top').setScale(0.5);
        addSkip(this, "LevelBulkhead");
        this.time.delayedCall(10000, () => this.scene.start("LevelBulkhead"));
    } 
}

// --- NEW HORROR LEVEL ---
class LevelBulkhead extends Phaser.Scene {
    constructor() { super("LevelBulkhead"); }
    create() {
        this.add.image(400, 300, 'wall_back').setDisplaySize(800, 600).setTint(0x330000);
        this.add.tileSprite(400, 300, 800, 600, 'wall_pipes').setAlpha(0.5);
        this.add.image(400, 450, 'wall_platform').setScale(1.5);
        this.add.tileSprite(400, 300, 800, 600, 'wall_cols').setScrollFactor(1.2);

        this.player = this.physics.add.sprite(100, 400, 'l1').play('run').setScale(0.8).setDepth(100).setTint(0xff8888);
        this.player.setCollideWorldBounds(true);

        this.items = this.physics.add.group();
        this.time.addEvent({
            delay: 800, loop: true, callback: () => {
                let key = Math.random() > 0.5 ? 'flower' : 'choco';
                this.items.create(800, Phaser.Math.Between(350, 500), key).setScale(0.15).setVelocityX(-300);
            }
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, "POWER GATHERED: 0/15", { color: '#ff0000', fontSize: '24px' });

        this.physics.add.overlap(this.player, this.items, (p, i) => {
            i.destroy();
            this.score++;
            this.scoreText.setText("POWER GATHERED: " + this.score + "/15");
            if (this.score >= 15) this.scene.start("LevelBoss");
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        addSkip(this, "LevelBoss");
    }
    update() {
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-250);
        else if (this.cursors.right.isDown) this.player.setVelocityX(250);
        if (this.cursors.up.isDown) this.player.setVelocityY(-250);
        else if (this.cursors.down.isDown) this.player.setVelocityY(250);
    }
}

// --- FINAL BOSS ---
class LevelBoss extends Phaser.Scene {
    constructor() { super("LevelBoss"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x220000);
        this.boss = this.physics.add.sprite(400, 150, 'momo_angry').setScale(0.8);
        this.player = this.physics.add.sprite(400, 500, 'l1').setTint(0xffaaaa);
        
        this.bossHP = 100; 
        this.playerHP = 20; 
        
        this.hpText = this.add.text(16, 16, "Momo Hatred: 100", { fontSize: '32px', color: '#ff0000' });
        this.pText = this.add.text(550, 16, "Lian Will: 20", { fontSize: '32px', color: '#00ff00' });

        this.tweens.add({ targets: this.boss, x: 600, duration: 1500, yoyo: true, repeat: -1 });
        this.lasers = this.physics.add.group();
        this.time.addEvent({
            delay: 700, loop: true, callback: () => {
                let orb = this.lasers.create(this.boss.x, this.boss.y, 'fire').setScale(0.3).setTint(0x00ff00);
                this.physics.moveToObject(orb, this.player, 350);
            }
        });

        this.physics.add.overlap(this.player, this.lasers, (p, l) => {
            l.destroy();
            this.playerHP--;
            this.pText.setText("Lian Will: " + this.playerHP);
            this.cameras.main.shake(100, 0.01);
            if (this.playerHP <= 0) this.scene.restart();
        });

        this.input.keyboard.on('keydown-SPACE', () => this.shootHeart());
        this.cursors = this.input.keyboard.createCursorKeys();
        addSkip(this, "Boot");
    }
    
    shootHeart() {
        let heart = this.physics.add.sprite(this.player.x, this.player.y - 20, 'heart').setScale(0.05).setVelocityY(-600);
        this.physics.add.overlap(heart, this.boss, (h, b) => {
            h.destroy();
            this.bossHP -= 2;
            this.hpText.setText("Momo Hatred: " + this.bossHP);
            if (this.bossHP <= 0) this.win();
        });
    }

    update() {
        if (this.cursors.left.isDown) this.player.x -= 7;
        if (this.cursors.right.isDown) this.player.x += 7;
    }

    win() {
        this.physics.pause();
        this.boss.setTexture('momo_happy');
        let div = document.createElement('div');
        div.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; background:rgba(0,0,0,0.9); padding:20px; border:2px solid red; color:white; font-family:monospace; z-index:9999;";
        div.innerHTML = `<h1>Will you be my forever?</h1>
            <button onclick="playVideo()" style="background:green; color:white; padding:10px;">YES</button>
            <button id="noBtn" style="background:red; color:white; padding:10px; position:absolute;">NO</button>`;
        document.body.appendChild(div);
        let no = document.getElementById('noBtn');
        no.onmouseover = () => { no.style.left = Math.random()*200+'px'; no.style.top = Math.random()*200+'px'; };
        window.playVideo = () => { document.body.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/InTy_ceaGgw?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>'; };
    }
}
