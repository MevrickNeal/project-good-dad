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

// MATH PENALTY DATA
const mathProblems = [
    { q: "Calculate Torque: Force=10N, Radius=2m", a: ["20 Nm", "5 Nm", "12 Nm"], c: 0 },
    { q: "Derivative of x^2?", a: ["x", "2x", "x^3"], c: 1 },
    { q: "Ohm's Law?", a: ["V=IR", "V=I/R", "V=R/I"], c: 0 },
    { q: "Binary for 5?", a: ["100", "110", "101"], c: 2 },
    { q: "Integral of 2x?", a: ["x^2", "2x^2", "x"], c: 0 }
];

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

// DEBUG SHORTCUT 'O'
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
// PART 2: PHASER GAME ENGINE
// ==========================================

var GLOBAL_TIMER = 300; // 5 Minutes

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, UIScene, IntroScene, LevelSneak, LevelRun, LevelCollect, LevelBus, LevelBlock, LevelBargain, LevelBike, LevelBoss]
    };
    new Phaser.Game(config);
}

// --- CONTROLS HELPER (TRANSPARENT) ---
function addMobileControls(scene) {
    // Transparent Style
    const btnStyle = { 
        fontSize: '60px', 
        color: 'rgba(0, 255, 65, 0.3)', // 30% Opacity Green
        fontStyle: 'bold'
    };
    const actionStyle = {
        fontSize: '60px',
        color: 'rgba(255, 0, 0, 0.3)', // 30% Opacity Red
        fontStyle: 'bold'
    };
    
    const hitArea = new Phaser.Geom.Rectangle(-20, -20, 100, 100);

    // D-PAD
    scene.leftBtn = scene.add.text(50, 500, '<', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(9999);
    scene.rightBtn = scene.add.text(200, 500, '>', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(9999);
    scene.upBtn = scene.add.text(125, 420, '^', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(9999);
    scene.downBtn = scene.add.text(125, 500, 'v', btnStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(9999);
    
    // ACTION
    scene.actionBtn = scene.add.text(650, 480, 'O', actionStyle).setScrollFactor(0).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setDepth(9999);

    scene.leftBtn.isDown = false; scene.rightBtn.isDown = false;
    scene.upBtn.isDown = false; scene.downBtn.isDown = false;
    scene.actionBtn.isDown = false;

    // Touch Listeners
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

// --- BOOT SCENE ---
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
        this.load.image('jump_pose', 'l9.png'); 
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
        this.scene.launch("UIScene");
        this.scene.start("IntroScene");
    }
}

// --- UI SCENE ---
class UIScene extends Phaser.Scene {
    constructor() { super("UIScene"); }
    create() {
        this.timerText = this.add.text(600, 10, 'TIME: 5:00', { fontSize: '32px', color: '#fff', fontStyle: 'bold', backgroundColor: '#000' }).setScrollFactor(0).setDepth(9999);
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                GLOBAL_TIMER--;
                let min = Math.floor(GLOBAL_TIMER / 60);
                let sec = GLOBAL_TIMER % 60;
                this.timerText.setText(`TIME: ${min}:${sec < 10 ? '0'+sec : sec}`);
                if (GLOBAL_TIMER <= 0) {
                    alert("TIME UP! SHE LEFT!");
                    location.reload();
                }
            }
        });
    }
}

// --- INTRO ---
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
        this.time.delayedCall(6000, () => {
            this.scene.start("LevelSneak");
        });
    }
}

// --- LEVEL 1: SNEAK ---
class LevelSneak extends Phaser.Scene {
    constructor() { super("LevelSneak"); }
    create() {
        if (this.cache.audio.exists('bgm')) { this.sound.play('bgm', { loop: true, volume: 0.5 }); }
        this.add.image(400, 300, 'home').setDisplaySize(800, 600);
        this.add.text(400, 30, "SNEAK TO FRONT DOOR (Bottom Right)", { fontSize: '20px', backgroundColor: '#000' }).setOrigin(0.5).setDepth(1000);
        
        // WALLS
        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.add.rectangle(420, 150, 20, 300)); 
        this.walls.add(this.add.rectangle(420, 500, 20, 200)); 
        this.walls.add(this.add.rectangle(200, 320, 400, 20)); 
        this.walls.add(this.add.rectangle(600, 320, 400, 20)); 
        // Borders
        this.walls.add(this.add.rectangle(400, 0, 800, 50)); 
        this.walls.add(this.add.rectangle(400, 600, 800, 50));
        this.walls.add(this.add.rectangle(0, 300, 50, 600));
        this.walls.add(this.add.rectangle(800, 300, 50, 600));
        
        this.walls.children.iterate((child) => { child.setVisible(false); });

        // Player
        this.player = this.physics.add.sprite(150, 150, 'l1').setScale(0.5);
        this.player.body.setSize(30, 30).setOffset(25, 100);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.walls);

        // Baba
        this.baba = this.physics.add.sprite(650, 150, 'baba_idle').setScale(0.6).play('baba_walk');
        this.baba.body.setSize(40, 40).setOffset(20, 100);

        this.patrolPoints = [{ x: 500, y: 300 }, { x: 500, y: 500 }, { x: 200, y: 500 }, { x: 500, y: 500 }, { x: 700, y: 500 }, { x: 500, y: 300 }, { x: 650, y: 150 }];
        this.currentPoint = 0;
        this.moveBabaToNextPoint();

        // Exit
        this.exitZone = this.add.rectangle(750, 500, 60, 100, 0x00ff00, 0.0);
        this.physics.add.existing(this.exitZone, true);
        this.physics.add.overlap(this.player, this.exitZone, () => { this.scene.start("LevelRun"); });

        this.cursors = this.input.keyboard.createCursorKeys();
        addMobileControls(this);
    }
    moveBabaToNextPoint() {
        let p = this.patrolPoints[this.currentPoint];
        this.physics.moveTo(this.baba, p.x, p.y, 120);
        this.time.addEvent({
            delay: 100, loop: true,
            callback: () => {
                if (this.baba && this.baba.body && Phaser.Math.Distance.Between(this.baba.x, this.baba.y, p.x, p.y) < 10) {
                    this.baba.body.reset(p.x, p.y);
                    this.currentPoint++;
                    if (this.currentPoint >= this.patrolPoints.length) this.currentPoint = 0;
                    this.time.delayedCall(1500, () => this.moveBabaToNextPoint());
                    return false;
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

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.baba.getBounds())) {
            this.cameras.main.shake(200);
            this.player.x = 150; this.player.y = 150;
        }
    }
}

// --- LEVEL 2: DINO RUN (BOSS ADDED) ---
class LevelRun extends Phaser.Scene {
    constructor() { super("LevelRun"); }
    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'city');
        
        // OFFICE BOSS (Fixed in place on right side)
        this.boss = this.add.image(750, 400, 'boss').setScale(0.8).setScrollFactor(0).setDepth(50);

        this.player = this.physics.add.sprite(100, 450, 'l1').setScale(0.8).setDepth(100);
        this.player.setGravityY(1200); 
        this.player.setCollideWorldBounds(true);
        
        this.ground = this.add.rectangle(400, 580, 800, 20, 0x000000, 0);
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.player, this.ground);

        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 2000, callback: this.spawnObs, callbackScope: this, loop: true });
        
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

        this.timeLeft = 20; 
        this.infoText = this.add.text(16, 50, 'Survive Boss: 20s', { fontSize: '24px', color: '#fff' });
        
        this.time.addEvent({ delay: 1000, callback: () => {
            this.timeLeft--;
            this.infoText.setText('Survive Boss: ' + this.timeLeft);
            if (this.timeLeft <= 0) {
                alert("MOMO CALLING: 'Ekhono tmi phone deona! etokhone to maf chaoa uchit silo'");
                this.scene.start("LevelCollect");
            }
        }, loop: true });
        
        addMobileControls(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.isSlowed = false;
    }

    update() {
        this.bg.tilePositionX += 5; 

        let jump = this.cursors.up.isDown || (this.upBtn && this.upBtn.isDown) || this.cursors.space.isDown;
        let duck = this.cursors.down.isDown || (this.downBtn && this.downBtn.isDown);

        if (this.player.body.touching.down) {
            if (jump) {
                this.player.setVelocityY(-700);
                this.player.setTexture('jump_pose');
            } else if (duck) {
                this.player.body.setSize(50, 70).setOffset(10, 50);
                this.player.anims.play('run', true);
                this.player.setTint(0x888888); 
            } else {
                this.player.body.setSize(50, 140).setOffset(10, 10);
                this.player.clearTint();
                if (!this.isSlowed) this.player.anims.play('run', true);
            }
        } else {
            this.player.setTexture('jump_pose');
        }
    }

    spawnObs() {
        let type = Phaser.Math.Between(0, 2);
        let obs;
        if (type === 0) {
            // Dog
            obs = this.obstacles.create(800, 540, 'dog_sleep').setScale(0.15);
            obs.setVelocityX(-400);
            obs.body.setAllowGravity(false);
            obs.type = "dog";
        } else {
            // Boss throws Files (spawn from Boss position)
            obs = this.obstacles.create(700, 400, 'files').setScale(0.2); 
            obs.setVelocityX(-500);
            obs.body.setAllowGravity(false);
            obs.type = "file";
        }
    }

    hitObstacle(player, obs) {
        if (obs.type === "dog") {
            obs.setTexture('dog_bark');
            this.isSlowed = true;
            player.setTint(0xff0000);
            this.cameras.main.shake(100);
            this.time.delayedCall(1000, () => {
                this.isSlowed = false;
                player.clearTint();
            });
            obs.destroy();
        } else {
            obs.destroy();
            this.scene.pause(); 
            let prob = mathProblems[Phaser.Math.Between(0, mathProblems.length - 1)];
            let ans = prompt(`ENGINEERING PENALTY!\n${prob.q}\n\nOptions:\n0: ${prob.a[0]}\n1: ${prob.a[1]}\n2: ${prob.a[2]}\n\nEnter 0, 1, or 2:`);
            if (parseInt(ans) === prob.c) {
                this.scene.resume();
            } else {
                alert("WRONG! 10 Seconds Lost!");
                GLOBAL_TIMER -= 10;
                this.scene.resume();
            }
        }
    }
}

// --- LEVEL 3: COLLECT (FIXED VISIBILITY & FALLING) ---
class LevelCollect extends Phaser.Scene {
    constructor() { super("LevelCollect"); }
    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'city');
        this.add.text(400, 100, "Collect 10 Flowers! Press 'V' or 'O'", { fontSize: '24px', backgroundColor: '#000' }).setOrigin(0.5);
        
        // FIX: Depth set to 100 so he is visible
        this.player = this.physics.add.sprite(100, 450, 'l1').play('run').setScale(0.8).setDepth(100);
        this.player.setGravityY(800);
        // FIX: CollideWorldBounds prevents falling out of screen
        this.player.setCollideWorldBounds(true);
        
        this.ground = this.add.rectangle(400, 580, 800, 50, 0x000000, 0); // Thicker ground
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.player, this.ground);
        
        this.flowers = this.physics.add.group();
        this.time.addEvent({ delay: 1500, callback: () => {
            let f = this.flowers.create(800, 500, 'flower').setScale(0.15).setVelocityX(-200);
            f.body.setAllowGravity(false);
        }, loop: true });
        
        this.score = 0;
        this.scoreText = this.add.text(16, 50, 'Flowers: 0/10', { fontSize: '32px' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        addMobileControls(this);

        // Fixed interaction logic
        this.physics.add.overlap(this.player, this.flowers, (p, f) => {
            // Check interaction inside overlap
            let isAction = this.vKey.isDown || (this.actionBtn && this.actionBtn.isDown);
            if (isAction) {
                f.destroy();
                this.score++;
                this.scoreText.setText('Flowers: ' + this.score + '/10');
                if (this.score >= 10) {
                    this.scene.start("LevelBus");
                }
            }
        });
    }
    update() {
        this.bg.tilePositionX += 5;
    }
}

// --- LEVEL 4: BUS ---
class LevelBus extends Phaser.Scene {
    constructor() { super("LevelBus"); }
    create() {
        this.road = this.add.tileSprite(400, 300, 800, 600, 'road');
        this.player = this.physics.add.sprite(400, 500, 'bus_top').setScale(0.6);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.hits = 0;
        this.traffic = this.physics.add.group();
        this.time.addEvent({ delay: 800, callback: () => {
            let x = Phaser.Math.Between(200, 600);
            let t = this.traffic.create(x, -100, 'bus_top').setScale(0.6).setTint(0xff0000).setVelocityY(400);
        }, loop: true });
        
        this.physics.add.overlap(this.player, this.traffic, (p, t) => {
            if(t.active) { // Prevent double hits
                t.destroy();
                this.hits++;
                this.cameras.main.shake(200);
                if (this.hits >= 3) this.scene.start("LevelBlock");
            }
        });
        this.time.delayedCall(15000, () => this.scene.start("LevelBlock"));
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

// --- LEVEL 5: BLOCK ---
class LevelBlock extends Phaser.Scene {
    constructor() { super("LevelBlock"); }
    create() {
        this.add.text(400, 200, "MOMO CALLED...", { fontSize: '40px', color: 'red' }).setOrigin(0.5);
        this.add.text(400, 300, "\"No need to see me again. Good bye.\"", { fontSize: '30px' }).setOrigin(0.5);
        this.add.text(400, 400, "YOU ARE BLOCKED.", { fontSize: '50px', color: 'red', fontStyle: 'bold' }).setOrigin(0.5);
        this.time.delayedCall(4000, () => { this.scene.start("LevelBargain"); });
    }
}

class LevelBargain extends Phaser.Scene {
    constructor() { super("LevelBargain"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x555555);
        this.add.text(400, 100, "FIND A BIKE! NEGOTIATE!", { fontSize: '28px' }).setOrigin(0.5);
        this.add.image(400, 300, 'pathao_single').setScale(1.5);
        this.add.text(400, 450, "Enter Fare:", { fontSize: '24px' }).setOrigin(0.5);
        let input = document.createElement('input');
        input.type = 'number';
        input.style = "position:absolute; top: 500px; left: 50%; transform: translate(-50%); padding: 10px;";
        document.body.appendChild(input);
        let btn = document.createElement('button');
        btn.innerText = "OFFER";
        btn.style = "position:absolute; top: 550px; left: 50%; transform: translate(-50%); padding: 10px;";
        document.body.appendChild(btn);
        btn.onclick = () => {
            let val = parseInt(input.value);
            if (val >= 120 && val <= 150) {
                alert("Rider: 'Uthen mama.'");
                input.remove(); btn.remove();
                this.scene.start("LevelBike");
            } else {
                alert("Rider: 'Dhur mama!' (Try 120-150)");
            }
        };
    }
}

// --- LEVEL 6: BIKE ---
class LevelBike extends Phaser.Scene {
    constructor() { super("LevelBike"); }
    create() {
        this.road = this.add.tileSprite(400, 300, 800, 600, 'road');
        this.player = this.physics.add.sprite(400, 500, 'hunda_top').setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.traffic = this.physics.add.group();
        this.time.addEvent({ delay: 800, callback: () => {
            let x = Phaser.Math.Between(200, 600);
            let bus = this.traffic.create(x, -100, 'bus_top').setScale(0.6).setVelocityY(400);
        }, loop: true });
        this.add.text(10, 10, "Distance: 200m", { fontSize: '20px', backgroundColor: '#000' });
        this.time.delayedCall(10000, () => this.scene.start("LevelBoss"));
        addMobileControls(this);
    }
    update() {
        this.road.tilePositionY -= 15;
        let left = this.cursors.left.isDown || (this.leftBtn && this.leftBtn.isDown);
        let right = this.cursors.right.isDown || (this.rightBtn && this.rightBtn.isDown);
        if (left) this.player.x -= 5;
        if (right) this.player.x += 5;
    }
}

// --- LEVEL 7: BOSS ---
class LevelBoss extends Phaser.Scene {
    constructor() { super("LevelBoss"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0xff0000);
        this.boss = this.physics.add.sprite(400, 150, 'momo_angry').setScale(0.8);
        this.player = this.physics.add.sprite(400, 500, 'l1');
        this.bossHP = 20;
        this.playerHP = 3;
        this.hpText = this.add.text(16, 16, "Momo Anger: 20", { fontSize: '32px', color: '#fff' });
        this.pText = this.add.text(600, 16, "Lian HP: 3", { fontSize: '32px', color: '#fff' });
        this.tweens.add({ targets: this.boss, x: 600, duration: 2000, yoyo: true, repeat: -1 });
        this.lasers = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: () => {
            let l = this.lasers.create(this.boss.x, this.boss.y, 'fire').setVelocityY(300);
        }, loop: true });
        this.physics.add.overlap(this.player, this.lasers, (p, l) => {
            l.destroy();
            this.playerHP--;
            this.pText.setText("Lian HP: " + this.playerHP);
            this.cameras.main.shake(100);
            if (this.playerHP <= 0) this.scene.restart();
        });
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
            this.hpText.setText("Momo Anger: " + this.bossHP);
            if (this.bossHP <= 0) this.win();
        });
    }
    win() {
        this.physics.pause();
        this.boss.setTexture('momo_happy');
        GLOBAL_TIMER = 9999; 
        
        let div = document.createElement('div');
        div.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; background:rgba(0,0,0,0.9); padding:20px; border:2px solid gold; color:white; font-family:monospace; z-index:9999;";
        div.innerHTML = `
            <h1>Will you be my forever?</h1>
            <button onclick="playEnding()" style="font-size:20px; padding:10px; margin:10px; background:green; color:white;">YES</button>
            <button onclick="playEnding()" style="font-size:20px; padding:10px; margin:10px; background:green; color:white;">100%</button>
            <button id="noBtn" style="font-size:20px; padding:10px; margin:10px; background:red; color:white; position:absolute;">I will think about it</button>
        `;
        document.body.appendChild(div);

        // Runaway Button
        let noBtn = document.getElementById('noBtn');
        noBtn.onmouseover = function() { noBtn.style.left = Math.random() * 200 + 'px'; noBtn.style.top = Math.random() * 200 + 'px'; };
        noBtn.ontouchstart = function() { noBtn.style.left = Math.random() * 200 + 'px'; noBtn.style.top = Math.random() * 200 + 'px'; };

        // Global Play Video Function
        window.playEnding = function() {
            document.body.innerHTML = `
                <div style="width:100%; height:100vh; background:black; display:flex; justify-content:center; align-items:center;">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/InTy_ceaGgw?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            `;
        };
    }
}
