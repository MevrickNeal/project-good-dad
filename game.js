// ==========================================
// PART 1: THE PSYCHOPATH & PRINCESS QUIZ
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
        qBox.innerHTML = "RESULT: <br><span style='font-size:30px; color:white; text-shadow:0 0 10px white;'>YOU ARE A GOOD DAD.</span>";
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

// --- DEBUG SHORTCUT (PRESS 'O' TO SKIP) ---
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'o') {
        const ui = document.getElementById('quiz-ui');
        if (ui.style.display !== 'none') {
            ui.style.display = 'none';
            document.getElementById('game-wrapper').style.display = 'block';
            startGame();
        }
    }
});

// ==========================================
// PART 2: THE GAME ENGINE
// ==========================================

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, IntroScene, LevelSneak, LevelRun, LevelPathao, LevelDrive, LevelUnlock, LevelBoss]
    };
    new Phaser.Game(config);
}

function addMobileControls(scene) {
    const btnStyle = { fontSize: '40px', backgroundColor: '#00ff41', color: '#000', padding: { x: 10, y: 10 } };
    const hitArea = new Phaser.Geom.Rectangle(0, 0, 60, 60);

    scene.leftBtn = scene.add.text(50, 500, '<', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(999);
    scene.rightBtn = scene.add.text(150, 500, '>', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(999);
    scene.upBtn = scene.add.text(100, 440, '^', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(999);
    scene.downBtn = scene.add.text(100, 500, 'v', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(999);
    scene.actionBtn = scene.add.text(700, 500, 'A', { ...btnStyle, backgroundColor: '#ff0000', color: '#fff' }).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(999);

    scene.leftBtn.isDown = false;
    scene.rightBtn.isDown = false;
    scene.upBtn.isDown = false;
    scene.downBtn.isDown = false;
    scene.actionBtn.isDown = false;

    scene.input.on('gameobjectdown', (pointer, obj) => {
        if (obj === scene.leftBtn) scene.leftBtn.isDown = true;
        if (obj === scene.rightBtn) scene.rightBtn.isDown = true;
        if (obj === scene.upBtn) scene.upBtn.isDown = true;
        if (obj === scene.downBtn) scene.downBtn.isDown = true;
        if (obj === scene.actionBtn) scene.actionBtn.isDown = true;
    });

    scene.input.on('gameobjectup', (pointer, obj) => {
        if (obj === scene.leftBtn) scene.leftBtn.isDown = false;
        if (obj === scene.rightBtn) scene.rightBtn.isDown = false;
        if (obj === scene.upBtn) scene.upBtn.isDown = false;
        if (obj === scene.downBtn) scene.downBtn.isDown = false;
        if (obj === scene.actionBtn) scene.actionBtn.isDown = false;
    });
}

class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        this.load.path = 'assets/sprites/';
        this.load.audio('bgm', 'bgm.mp3');
        this.load.image('home', 'home.jpg'); 
        this.load.image('city', 'evening city.png'); 
        this.load.image('road', 'vangarasta.png');
        this.load.image('hunda_top', 'top_bike.png');
        this.load.image('hunda_side', 'hunda.png');
        this.load.image('boss', 'boss-office.png');
        this.load.image('baba_idle', 'baba.png');
        this.load.image('baba_w1', 'walkbaba.png');
        this.load.image('baba_w2', 'walkbaba1.png');
        this.load.image('baba_w3', 'walkbaba2.png');
        this.load.image('pathao_single', 'bikeride.png');
        this.load.image('pathao_mob', 'grabarm.png');
        this.load.image('dog_sleep', 'kuttasleep.jpg');
        this.load.image('dog_bark', 'kuttavau.png');
        this.load.image('bus_side', 'poristhanside.png');
        this.load.image('bus_top', 'bus-topdown.png');
        this.load.image('momo_angry', 'momo-boss.png');
        this.load.image('momo_happy', 'momo-happy.png');
        this.load.image('files', 'files.png'); 
        this.load.image('fire', 'golla.png');
        this.load.image('heart', 'heart.png');
        this.load.image('choco', 'choco.png');
        this.load.image('flower', 'flower.png');
        this.load.image('keys', 'keys.png');
        this.load.image('win', 'win.png');
        for(let i=1; i<=10; i++) this.load.image(`l${i}`, `l${i}.png`);
    }
    create() {
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
        this.scene.start("IntroScene");
    }
}

class IntroScene extends Phaser.Scene {
    constructor() { super("IntroScene"); }
    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.add.text(400, 200, "3:00 AM...", { fontSize: '40px', color: '#fff' }).setOrigin(0.5);
        this.time.delayedCall(1500, () => {
             this.add.text(400, 300, "1 NEW MESSAGE FROM MOMO", { fontSize: '24px', color: '#00ff00', backgroundColor: '#000' }).setOrigin(0.5);
        });
        this.time.delayedCall(3000, () => {
            this.add.text(400, 400, "\"I HATE YOU. DO NOT CALL ME.\"", { fontSize: '32px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
        });
        this.time.delayedCall(5000, () => {
             this.add.text(400, 500, "OH NO! I HAVE TO FIX THIS!", { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        });
        this.time.delayedCall(7000, () => {
            this.scene.start("LevelSneak");
        });
    }
}

// --- LEVEL 1: THE REAL HOME LAYOUT ---
class LevelSneak extends Phaser.Scene {
    constructor() { super("LevelSneak"); }
    create() {
        if (this.cache.audio.exists('bgm')) { this.sound.play('bgm', { loop: true, volume: 0.5 }); }

        // BACKGROUND: Home Map
        // We stretch it slightly to fill 800x600 game window
        this.add.image(400, 300, 'home').setDisplaySize(800, 600);

        this.add.text(400, 30, "SNEAK TO THE FRONT DOOR (Bottom Right)", { fontSize: '20px', color: '#fff', backgroundColor: '#000' }).setOrigin(0.5).setDepth(1000);
        
        // --- WALLS (Invisible) ---
        // These match the lines in your home.jpg floorplan
        this.walls = this.physics.add.staticGroup();
        
        // 1. Vertical Spine (Separating Left Rooms from Hallway)
        this.walls.add(this.add.rectangle(420, 150, 10, 300)); // Top half (Bedroom wall)
        this.walls.add(this.add.rectangle(420, 500, 10, 200)); // Bottom half (TV room wall)
        
        // 2. Horizontal Spine (Separating Top Rooms from Bottom Rooms)
        this.walls.add(this.add.rectangle(200, 320, 400, 10)); // Left side (Bed/TV separator)
        this.walls.add(this.add.rectangle(600, 320, 400, 10)); // Right side (Kitchen/Entrance separator)

        // 3. Outer Borders
        this.walls.add(this.add.rectangle(400, 5, 800, 10)); // Top
        this.walls.add(this.add.rectangle(400, 595, 800, 10)); // Bottom
        this.walls.add(this.add.rectangle(5, 300, 10, 600)); // Left
        this.walls.add(this.add.rectangle(795, 300, 10, 600)); // Right

        // Hide walls
        this.walls.children.iterate((child) => { child.setVisible(false); });

        // --- PLAYER ---
        // Start in Bedroom (Top Left)
        this.player = this.physics.add.sprite(150, 150, 'l1').setScale(0.5);
        this.player.body.setSize(30, 30).setOffset(25, 100);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.walls);

        // --- BABA (The Guard) ---
        // Start in Kitchen (Top Right)
        this.baba = this.physics.add.sprite(650, 150, 'baba_idle').setScale(0.6).play('baba_walk');
        this.baba.body.setSize(40, 40).setOffset(20, 100);

        // --- PATROL LOGIC (Visiting Rooms) ---
        // Coordinates based on 800x600 home.jpg layout
        this.patrolPoints = [
            { x: 500, y: 300 }, // Hallway Top
            { x: 500, y: 500 }, // Hallway Bottom
            { x: 200, y: 500 }, // TV Room (Bottom Left)
            { x: 500, y: 500 }, // Back to Hallway
            { x: 700, y: 500 }, // Near Entrance (Scary!)
            { x: 500, y: 300 }, // Hallway Top
            { x: 650, y: 150 }  // Kitchen (Top Right)
        ];
        this.currentPoint = 0;
        this.moveBabaToNextPoint();

        // --- WIN ZONE ---
        // Double Doors at Bottom Right
        this.exitZone = this.add.rectangle(750, 500, 60, 100, 0x00ff00, 0.0); // Invisible trigger
        this.physics.add.existing(this.exitZone, true);

        this.physics.add.overlap(this.player, this.exitZone, () => {
            this.scene.start("LevelRun");
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        addMobileControls(this);
    }

    moveBabaToNextPoint() {
        let p = this.patrolPoints[this.currentPoint];
        this.physics.moveTo(this.baba, p.x, p.y, 120); // Speed

        // Check distance to target
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                if (this.baba && this.baba.body && Phaser.Math.Distance.Between(this.baba.x, this.baba.y, p.x, p.y) < 10) {
                    this.baba.body.reset(p.x, p.y); // Stop
                    this.currentPoint++;
                    if (this.currentPoint >= this.patrolPoints.length) this.currentPoint = 0;
                    // Wait 1.5 seconds in the room before moving
                    this.time.delayedCall(1500, () => this.moveBabaToNextPoint()); 
                    return false; // Stop checking
                }
            }
        });
    }

    update() {
        this.player.setVelocity(0);
        let speed = 200;
        let left = this.cursors.left.isDown || (this.leftBtn && this.leftBtn.isDown);
        let right = this.cursors.right.isDown || (this.rightBtn && this.rightBtn.isDown);
        let up = this.cursors.up.isDown || (this.upBtn && this.upBtn.isDown);
        let down = this.cursors.down.isDown || (this.downBtn && this.downBtn.isDown);

        if (left) { this.player.setVelocityX(-speed); this.player.flipX = true; this.player.anims.play('run', true); }
        else if (right) { this.player.setVelocityX(speed); this.player.flipX = false; this.player.anims.play('run', true); }
        
        if (up) { this.player.setVelocityY(-speed); this.player.anims.play('run', true); }
        else if (down) { this.player.setVelocityY(speed); this.player.anims.play('run', true); }

        if (!left && !right && !up && !down) this.player.anims.stop();

        this.player.setDepth(this.player.y);
        this.baba.setDepth(this.baba.y);

        // CAUGHT!
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.baba.getBounds())) {
            this.cameras.main.shake(200);
            this.player.x = 150; this.player.y = 150; // Send back to Bedroom
        }
    }
}

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
        addMobileControls(this);
    }
    update() {
        this.bg.tilePositionX += 5;
        let jump = this.input.keyboard.createCursorKeys().space.isDown || (this.actionBtn && this.actionBtn.isDown);
        if (jump && this.player.y > 400) {
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
                alert("MOB ATTACK: 'Amare lon! Amare lon!'");
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
        addMobileControls(this);
    }
    update() {
        this.road.tilePositionY -= 10;
        let left = this.cursors.left.isDown || (this.leftBtn && this.leftBtn.isDown);
        let right = this.cursors.right.isDown || (this.rightBtn && this.rightBtn.isDown);
        if (left) this.player.x -= 5;
        if (right) this.player.x += 5;
    }
}

class LevelUnlock extends Phaser.Scene {
    constructor() { super("LevelUnlock"); }
    create() {
        this.add.text(400, 200, "YOU ARE BLOCKED!", { fontSize: '40px', color: 'red' }).setOrigin(0.5);
        this.add.text(400, 300, "Tap Keys to Unlock", { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        let key = this.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'keys').setInteractive();
        key.on('pointerdown', () => {
            this.add.text(400, 400, "UNBLOCKED!", { fontSize: '30px', color: 'green' }).setOrigin(0.5);
            this.time.delayedCall(1000, () => this.scene.start("LevelBoss"));
        });
        this.time.addEvent({ delay: 500, callback: () => {
            key.x = Phaser.Math.Between(100, 700);
            key.y = Phaser.Math.Between(100, 500);
        }, loop: true });
    }
}

class LevelBoss extends Phaser.Scene {
    constructor() { super("LevelBoss"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0xff0000);
        this.boss = this.physics.add.sprite(400, 150, 'momo_angry').setScale(0.8);
        this.player = this.physics.add.sprite(400, 500, 'l1');
        this.bossHP = 10;
        this.hpText = this.add.text(16, 16, "Momo Anger: 100%", { fontSize: '32px', color: '#fff' });
        this.tweens.add({ targets: this.boss, x: 600, duration: 2000, yoyo: true, repeat: -1 });
        
        this.input.keyboard.on('keydown-SPACE', this.shootHeart, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        addMobileControls(this);
    }
    update() {
        let left = this.cursors.left.isDown || (this.leftBtn && this.leftBtn.isDown);
        let right = this.cursors.right.isDown || (this.rightBtn && this.rightBtn.isDown);
        let shoot = this.actionBtn && this.actionBtn.isDown;
        if (left) this.player.x -= 5;
        if (right) this.player.x += 5;
        if (shoot) this.shootHeart();
    }
    shootHeart() {
        let heart = this.physics.add.sprite(this.player.x, this.player.y, 'heart').setVelocityY(-400);
        this.physics.add.overlap(heart, this.boss, (h, b) => {
            h.destroy();
            this.bossHP--;
            this.hpText.setText("Momo Anger: " + (this.bossHP * 10) + "%");
            if (this.bossHP <= 0) this.win();
        });
    }
    win() {
        this.physics.pause();
        this.boss.setTexture('momo_happy');
        this.hpText.setText("SHE SAID YES!");
        let winImg = this.add.image(400, 300, 'win').setScale(0.1);
        this.tweens.add({ targets: winImg, scale: 1, duration: 1000, ease: 'Bounce' });
    }
}
