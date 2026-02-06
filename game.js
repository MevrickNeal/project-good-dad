// ==========================================
// PART 1: THE PSYCHOPATH & DAD QUIZ
// ==========================================
const quizData = [
    { q: "You see a child trip. Do you laugh?", a: ["Yes", "Internal Chuckle"] },
    { q: "Is chaos a ladder or a headache?", a: ["Ladder", "Headache"] },
    { q: "Do you manipulate situations for fun?", a: ["Often", "Sometimes"] },
    { q: "If you kill a bug, do you feel sad?", a: ["No", "Maybe"] },
    { q: "Are emotions inefficient?", a: ["Yes", "Depends"] },
    { q: "Do you get bored of 'nice' people?", a: ["Yes", "Always"] },
    { q: "Is revenge a dish best served cold?", a: ["Yes", "Frozen"] },
    { q: "Can you lie without blinking?", a: ["Easy", "Try me"] },
    { q: "Are you the 'Psychopath' in this relationship?", a: ["Yes", "100%"] },
    { q: "WAIT. Recalibrating... Are you the Boyfriend?", a: ["No", "I am the MAN"] },
    
    // Phase 2: Good Dad Test
    { q: "Do you act strong but want to be held?", a: ["Yes", "Secretly"] },
    { q: "Is your partner a 'Princess'?", a: ["100%", "200%"] },
    { q: "Do you pay the bills while she looks away?", a: ["Always", "Yes"] },
    { q: "Who kills the spider?", a: ["Me", "I am the Warrior"] },
    { q: "Do you carry the heavy bags?", a: ["Yes", "My back hurts"] },
    { q: "Does she steal your hoodies?", a: ["Yes", "All of them"] },
    { q: "Are you the 'Responsible One'?", a: ["Trying", "Yes"] },
    { q: "Do you think your efforts go unpaid?", a: ["Sometimes", "Often"] },
    { q: "Is she actually a baby in disguise?", a: ["Yes", "Confirmed"] },
    { q: "Diagnosis Ready. Proceed?", a: ["Proceed", "Go"] }
];

let qIndex = 0;
const ui = document.getElementById('quiz-ui');
const qBox = document.getElementById('question-display');
const oBox = document.getElementById('options-display');

function loadQuestion() {
    if (qIndex >= quizData.length) {
        endQuiz();
        return;
    }
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
        qBox.innerHTML = "RESULT: <br><span style='font-size:30px; color:white'>YOU ARE A GOOD DAD.</span>";
        setTimeout(() => {
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
                ui.style.display = 'none';
                document.getElementById('game-wrapper').style.display = 'block';
                startGame();
            }, 1500);
        }, 2000);
    }, 2000);
}

loadQuestion();

// ==========================================
// PART 2: THE GAME ENGINE (PHASER JS)
// ==========================================

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, LevelSneak, LevelRun, LevelPathao, LevelDrive, LevelUnlock, LevelBoss]
    };
    new Phaser.Game(config);
}

// --- SCENE 0: ASSET LOADING (MAPPED TO YOUR EXACT FILENAMES) ---
class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        this.load.path = 'assets/';

        // Backgrounds
        this.load.image('city', 'evening city.jpg');
        this.load.image('road', 'vangarasta.jpg');
        
        // Characters & Vehicles
        this.load.image('hunda_side', 'hunda.png');
        this.load.image('hunda_top', 'top_bike.png');
        this.load.image('boss', 'boss-office.png');
        
        // Baba (Dad)
        this.load.image('baba_idle', 'baba.png');
        this.load.image('baba_w1', 'walkbaba.png');
        this.load.image('baba_w2', 'walkbaba1.png');
        this.load.image('baba_w3', 'walkbaba2.png');
        
        // Pathao
        this.load.image('pathao_single', 'bikeride.png');
        this.load.image('pathao_mob', 'grabarm-removebg-preview.png');
        
        // Enemies & Obstacles
        this.load.image('dog_sleep', 'kuttasleep.jpg');
        this.load.image('dog_bark', 'kuttavau.png');
        this.load.image('bus_side', 'poristhanside.jpg');
        this.load.image('bus_top', 'bus-topdown.png');
        
        // Boss Momo
        this.load.image('momo_angry', 'momo-boss.jpg');
        this.load.image('momo_happy', 'momo-happy.jpg');
        
        // Items & Projectiles
        this.load.image('files', 'files.png'); 
        this.load.image('fire', 'golla.png');
        this.load.image('heart', 'heart.png');
        this.load.image('choco', 'choco.png');
        this.load.image('flower', 'flower.png');
        this.load.image('keys', 'keys.png');
        this.load.image('win', 'win-removebg-preview.png');
        
        // Running Frames
        for(let i=1; i<=10; i++) {
            this.load.image(`l${i}`, `l${i}.png`);
        }
    }
    create() {
        // Create Animations
        this.anims.create({
            key: 'run',
            frames: [
                { key: 'l1' }, { key: 'l2' }, { key: 'l3' }, { key: 'l4' }, { key: 'l5' },
                { key: 'l6' }, { key: 'l7' }, { key: 'l8' }, { key: 'l9' }, { key: 'l10' }
            ],
            frameRate: 15, repeat: -1
        });

        this.anims.create({
            key: 'baba_walk',
            frames: [ { key: 'baba_w1' }, { key: 'baba_w2' }, { key: 'baba_w3' } ],
            frameRate: 6, repeat: -1
        });

        this.scene.start("LevelSneak");
    }
}

// --- LEVEL 1: SNEAK OUT ---
class LevelSneak extends Phaser.Scene {
    constructor() { super("LevelSneak"); }
    create() {
        this.add.text(400, 100, "LEVEL 1: SNEAK OUT", { fontSize: '30px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 140, "Avoid Baba. Reach the Door (Right) ->", { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
        
        this.player = this.physics.add.sprite(100, 400, 'l1').setScale(0.8);
        this.baba = this.physics.add.sprite(500, 400, 'baba_idle').setScale(0.8).play('baba_walk');
        
        this.tweens.add({
            targets: this.baba,
            x: 700,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            flipX: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.cursors.right.isDown) {
            this.player.x += 3;
            this.player.anims.play('run', true);
        } else {
            this.player.anims.stop();
        }
        if (this.player.x > 750) this.scene.start("LevelRun");
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.baba.getBounds())) {
            this.player.x = 100; 
        }
    }
}

// --- LEVEL 2: THE RUN (Side Scroller) ---
class LevelRun extends Phaser.Scene {
    constructor() { super("LevelRun"); }
    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'city');
        this.player = this.physics.add.sprite(100, 450, 'l1').play('run').setScale(0.8);
        
        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 2000, callback: this.spawnObs, callbackScope: this, loop: true });
        
        this.physics.add.overlap(this.player, this.obstacles, (p, o) => {
            o.destroy();
            this.cameras.main.shake(100);
        });

        this.timeLeft = 20; 
        this.timerText = this.add.text(16, 16, 'Run: 20', { fontSize: '32px', color: '#fff' });
        this.time.addEvent({ delay: 1000, callback: () => {
            this.timeLeft--;
            this.timerText.setText('Run: ' + this.timeLeft);
            if (this.timeLeft <= 0) this.scene.start("LevelPathao");
        }, loop: true });
    }
    update() {
        this.bg.tilePositionX += 5;
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.space.isDown && this.player.y > 400) {
            this.player.y -= 150;
            this.time.delayedCall(500, () => { this.player.y += 150; });
        }
    }
    spawnObs() {
        let type = Phaser.Math.Between(0, 2);
        let key = ['boss', 'dog_sleep', 'bus_side'][type];
        let obs = this.obstacles.create(800, 450, key).setScale(0.7);
        obs.setVelocityX(-400);
        if (key === 'boss') {
            let file = this.obstacles.create(obs.x, obs.y, 'files');
            file.setVelocityX(-600);
        }
    }
}

// --- LEVEL 3: PATHAO NEGOTIATION ---
class LevelPathao extends Phaser.Scene {
    constructor() { super("LevelPathao"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x555555);
        this.add.text(400, 100, "LEVEL 3: NEGOTIATE RIDE", { fontSize: '28px', color: '#fff' }).setOrigin(0.5);
        
        let rider = this.add.image(400, 300, 'pathao_single').setScale(1.5);
        this.add.text(400, 450, "Enter Fare (120-150):", { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        
        let input = document.createElement('input');
        input.type = 'number';
        input.style = "position:absolute; top: 500px; left: 50%; transform: translate(-50%); padding: 10px; font-size: 20px;";
        document.body.appendChild(input);
        
        let btn = document.createElement('button');
        btn.innerText = "OFFER";
        btn.style = "position:absolute; top: 550px; left: 50%; transform: translate(-50%); padding: 10px;";
        document.body.appendChild(btn);
        
        btn.onclick = () => {
            let val = parseInt(input.value);
            if (val < 120) {
                alert("Rider: 'Dhur mama, eita kisu hoilo?'");
            } else if (val > 150) {
                rider.setTexture('pathao_mob');
                alert("MOB ATTACK: 'Amare lon! Amare lon!' (You got delayed)");
                input.remove(); btn.remove();
                this.time.delayedCall(2000, () => this.scene.start("LevelDrive"));
            } else {
                alert("Rider: 'Uthen mama.'");
                input.remove(); btn.remove();
                this.scene.start("LevelDrive");
            }
        };
    }
}

// --- LEVEL 4: THE DRIVE (Top Down) ---
class LevelDrive extends Phaser.Scene {
    constructor() { super("LevelDrive"); }
    create() {
        this.road = this.add.tileSprite(400, 300, 800, 600, 'road');
        this.player = this.physics.add.sprite(400, 500, 'hunda_top').setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.traffic = this.physics.add.group();
        this.time.addEvent({ delay: 800, callback: () => {
            let x = Phaser.Math.Between(200, 600);
            let bus = this.traffic.create(x, -100, 'bus_top').setScale(0.6).setVelocityY(400);
        }, loop: true });
        
        this.items = this.physics.add.group();
        this.time.addEvent({ delay: 1500, callback: () => {
            let x = Phaser.Math.Between(200, 600);
            let type = Math.random() > 0.5 ? 'flower' : 'choco';
            let item = this.items.create(x, -100, type).setVelocityY(200);
        }, loop: true });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Love Items: 0', { fontSize: '24px', fill: '#000', backgroundColor: '#fff' });

        this.physics.add.overlap(this.player, this.items, (p, i) => {
            i.destroy();
            this.score++;
            this.scoreText.setText('Love Items: ' + this.score);
        });

        this.time.delayedCall(15000, () => this.scene.start("LevelUnlock"));
    }
    update() {
        this.road.tilePositionY -= 10;
        if (this.cursors.left.isDown) this.player.x -= 5;
        if (this.cursors.right.isDown) this.player.x += 5;
    }
}

// --- LEVEL 5: THE UNBLOCK (Pattern) ---
class LevelUnlock extends Phaser.Scene {
    constructor() { super("LevelUnlock"); }
    create() {
        this.add.text(400, 200, "YOU ARE BLOCKED!", { fontSize: '40px', color: 'red' }).setOrigin(0.5);
        this.add.text(400, 300, "Find the Keys to Unlock", { fontSize: '24px', color: '#fff' }).set
