// ==========================================
// PART 1: THE ORIGINAL ROAST QUIZ
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

const iqQuestions = [
    { q: "Momo is silent and staring at her phone. What is the most logical action?", a: ["Ask 'Are you mad?'", "Order her favorite food + Give space", "Tell her she's being dramatic"], c: 1 },
    { q: "Identify the pattern: ❤️, 🌹, 🍫, ❤️, 🌹, ...", a: ["🌹", "🍫", "❤️"], c: 1 }
];

const trapQuestions = [
    { q: "Do I look fat in this dress?", a: ["No, you look perfect", "Maybe a little", "I like curves"], c: 0 },
    { q: "I said 'It's fine'. What does that mean?", a: ["It's fine", "It's NOT fine (PANIC)", "You are happy"], c: 1 }
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
    qBox.innerHTML = "RESULT: <br><span style='font-size:30px;'>YOU ARE A GOOD DAD.</span>";
    setTimeout(() => {
        ui.style.display = 'none';
        document.getElementById('game-wrapper').style.display = 'block';
        startGame();
    }, 3000);
}

loadQuestion();

// Developer Stage Skip ('5') logic
document.addEventListener('keydown', (e) => {
    if (e.key === '5') {
        if (ui.style.display !== 'none') {
            ui.style.display = 'none';
            document.getElementById('game-wrapper').style.display = 'block';
            startGame();
        } else if (window.gameInstance) {
            let current = window.gameInstance.scene.getScenes(true).find(s => s.scene.key !== 'UIScene');
            let scenes = ['LevelSneak', 'LevelRun', 'LevelChase', 'LevelBus', 'LevelIQ', 'LevelBargain', 'LevelBike', 'LevelBoss'];
            if (current) {
                let nextIdx = scenes.indexOf(current.scene.key) + 1;
                if (nextIdx < scenes.length) current.scene.start(scenes[nextIdx]);
            }
        }
    }
});

// ==========================================
// PART 2: PHASER GAME ENGINE (3 MIN TOTAL)
// ==========================================
var GLOBAL_TIMER = 180; 
var PLAYER_LIVES = 9; // Starting lives updated

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800, height: 600,
        parent: 'game-wrapper',
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
        scene: [BootScene, UIScene, LevelSneak, LevelRun, LevelChase, LevelBus, LevelIQ, LevelBargain, LevelBike, LevelBoss]
    };
    window.gameInstance = new Phaser.Game(config);
}

class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        this.load.path = 'assets/sprites/';
        this.load.image('home', 'home.jpg'); 
        this.load.image('city', 'evening city.png');
        this.load.image('boss', 'boss-office.png');
        this.load.image('baba_idle', 'baba.png');
        this.load.image('momo_angry', 'momo-boss.png');
        this.load.image('momo_happy', 'momo-happy.png');
        this.load.image('flower', 'flower.png');
        this.load.image('heart', 'heart.png');
        this.load.image('golla', 'golla.png');
        this.load.image('files', 'files.png');
        this.load.image('bus_side', 'poristhanside.png');
        this.load.image('bus_top', 'bus-topdown.png');
        this.load.image('hunda_top', 'top_bike.png');
        this.load.image('win', 'win.png');
        for(let i=1; i<=10; i++) this.load.image(`l${i}`, `l${i}.png`);
    }
    create() { 
        this.anims.create({ key: 'run', frames: Array.from({length: 8}, (_, i) => ({ key: `l${i+1}` })), frameRate: 12, repeat: -1 });
        this.scene.launch("UIScene"); 
        this.scene.start("LevelSneak"); 
    }
}

class UIScene extends Phaser.Scene {
    constructor() { super("UIScene"); }
    create() {
        this.timerText = this.add.text(20, 20, 'TIME: 3:00', { fontSize: '32px', color: '#ff0000', backgroundColor: '#000' }).setScrollFactor(0).setDepth(10000);
        this.lifeText = this.add.text(20, 60, `LIVES: ${PLAYER_LIVES}`, { fontSize: '24px', color: '#00ff00', backgroundColor: '#000' }).setScrollFactor(0).setDepth(10000);
        
        this.time.addEvent({
            delay: 1000, loop: true,
            callback: () => {
                GLOBAL_TIMER--;
                let m = Math.floor(GLOBAL_TIMER/60);
                let s = GLOBAL_TIMER%60;
                this.timerText.setText(`TIME: ${m}:${s<10?'0'+s:s}`);
                this.lifeText.setText(`LIVES: ${PLAYER_LIVES}`);
                if (GLOBAL_TIMER <= 0 || PLAYER_LIVES <= 0) location.reload();
            }
        });
    }
}

// --- LEVEL 1: SNEAK ---
class LevelSneak extends Phaser.Scene {
    constructor() { super("LevelSneak"); }
    create() {
        this.add.image(400, 300, 'home').setDisplaySize(800, 600).setTint(0x666666);
        this.player = this.physics.add.sprite(150, 150, 'l1').setScale(0.25);
        this.baba = this.physics.add.sprite(600, 400, 'baba_idle').setScale(0.35);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tweens.add({ targets: this.baba, x: 300, duration: 3000, yoyo: true, repeat: -1 });
    }
    update() {
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-160);
        else if (this.cursors.right.isDown) this.player.setVelocityX(160);
        if (this.cursors.up.isDown) this.player.setVelocityY(-160);
        else if (this.cursors.down.isDown) this.player.setVelocityY(160);
        if (this.player.x > 750) this.scene.start("LevelRun");
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.baba.getBounds())) {
            PLAYER_LIVES--;
            this.player.setPosition(150, 150);
        }
    }
}

// --- LEVEL 2: OFFICE BOSS (MIRRORED FACING PLAYER) ---
class LevelRun extends Phaser.Scene {
    constructor() { super("LevelRun"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x444444);
        this.player = this.physics.add.sprite(100, 500, 'l1').setScale(0.6).setGravityY(1000);
        this.boss = this.add.image(700, 500, 'boss').setScale(0.6).setFlipX(true); // Mirrored updated
        
        this.ground = this.add.rectangle(400, 580, 800, 20, 0x000, 0);
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.player, this.ground);
        
        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 1800, loop: true, callback: () => {
            this.obstacles.create(700, 480, 'files').setScale(0.3).setVelocityX(-450).body.setAllowGravity(false);
        }});
        
        this.physics.add.overlap(this.player, this.obstacles, (p, o) => { 
            o.destroy();
            PLAYER_LIVES--;
            this.cameras.main.shake(100, 0.01); 
        });
        
        this.time.delayedCall(15000, () => this.scene.start("LevelChase"));
    }
    update() { if (this.input.keyboard.createCursorKeys().up.isDown && this.player.body.touching.down) this.player.setVelocityY(-550); }
}

// --- LEVEL 3: BUS CHASE (FREE UP/DOWN) ---
class LevelChase extends Phaser.Scene {
    constructor() { super("LevelChase"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x333333);
        this.player = this.physics.add.sprite(100, 300, 'l1').setScale(0.6);
        this.bus = this.physics.add.sprite(600, 300, 'bus_side').setScale(0.8).setVelocityX(45);
        this.flowers = this.physics.add.group();
        this.score = 0;
        this.time.addEvent({ delay: 1000, loop: true, callback: () => {
            this.flowers.create(800, Phaser.Math.Between(100, 550), 'flower').setScale(0.15).setVelocityX(-200).body.setAllowGravity(false);
        }});
        this.physics.add.overlap(this.player, this.flowers, (p, f) => { f.destroy(); this.score++; });
        this.physics.add.overlap(this.player, this.bus, () => { if(this.score >= 10) this.scene.start("LevelBus"); });
    }
    update() {
        let c = this.input.keyboard.createCursorKeys();
        this.player.setVelocity(0);
        if (c.up.isDown) this.player.setVelocityY(-250); if (c.down.isDown) this.player.setVelocityY(250);
        if (c.right.isDown) this.player.setVelocityX(100); if (c.left.isDown) this.player.setVelocityX(-150);
    }
}

// --- LEVEL 4: BUS 1000m (SURVIVAL) ---
class LevelBus extends Phaser.Scene {
    constructor() { super("LevelBus"); }
    create() {
        this.add.tileSprite(400, 300, 800, 600, 'road').setTint(0x444444);
        this.player = this.physics.add.sprite(400, 500, 'bus_top').setScale(0.6);
        this.distLeft = 1000; // Updated goal
        this.distText = this.add.text(600, 100, '1000m Left', { fontSize: '24px', color: '#fff' });
        
        this.traffic = this.physics.add.group();
        this.time.addEvent({ delay: 800, loop: true, callback: () => {
            this.traffic.create(Phaser.Math.Between(200, 600), -100, 'bus_top').setScale(0.6).setTint(0xff0000).setVelocityY(450);
        }});
        
        this.physics.add.overlap(this.player, this.traffic, () => {
            alert("MOMO: 'Ei tmi ekhon o asho nai? BLOCK KORE DILAM!'");
            PLAYER_LIVES -= 2;
            this.scene.start("LevelIQ");
        });
    }
    update() {
        this.distLeft -= 1.5;
        this.distText.setText(`${Math.max(0, Math.floor(this.distLeft))}m Left`);
        let c = this.input.keyboard.createCursorKeys();
        if (c.left.isDown) this.player.x -= 5; if (c.right.isDown) this.player.x += 5;
        if (this.distLeft <= 0) this.scene.start("LevelIQ");
    }
}

// --- LEVEL: EMOTIONAL IQ ---
class LevelIQ extends Phaser.Scene {
    constructor() { super("LevelIQ"); }
    create() {
        this.add.text(400, 100, "HIGH IQ EMOTIONAL TEST", { fontSize: '32px' }).setOrigin(0.5);
        let q = iqQuestions[Phaser.Math.Between(0, 1)];
        this.add.text(400, 200, q.q, { fontSize: '20px', align: 'center', wordWrap: { width: 600 } }).setOrigin(0.5);
        q.a.forEach((ans, i) => {
            let btn = this.add.text(400, 350 + (i * 60), ans, { backgroundColor: '#333', padding: 15 }).setOrigin(0.5).setInteractive();
            btn.on('pointerdown', () => { 
                if(i === q.c) { alert("CORRECT! +15s Time Reward!"); GLOBAL_TIMER += 15; this.scene.start("LevelBargain"); }
                else { alert("WRONG! Momo is losing patience..."); this.scene.start("LevelBargain"); }
            });
        });
    }
}

// --- LEVEL: BARGAIN (BLIND MARGIN LOGIC) ---
class LevelBargain extends Phaser.Scene {
    constructor() { super("LevelBargain"); }
    create() {
        const MARGIN = 165; 
        let riderPrice = 250;
        this.add.text(400, 100, "BARGAIN WITH RIDER (Guess fare)", { fontSize: '24px' }).setOrigin(0.5);
        let riderUI = this.add.text(400, 200, "Rider: '250tk lagbe mama.'", { color: '#ffff00', fontSize: '20px' }).setOrigin(0.5);
        
        let input = document.createElement('input');
        input.type = 'number'; input.placeholder = "Offer amount";
        input.style = "position:absolute; top: 300px; left: 50%; transform: translate(-50%); padding: 10px; z-index: 100;";
        document.body.appendChild(input);

        let btn = document.createElement('button');
        btn.innerText = "OFFER";
        btn.style = "position:absolute; top: 360px; left: 50%; transform: translate(-50%); padding: 10px; z-index: 100;";
        document.body.appendChild(btn);

        btn.onclick = () => {
            let userOffer = parseInt(input.value);
            if (userOffer < 130) { riderUI.setText("Rider: (Suspicious talk...) 'Eto kom e hobe na.'"); return; }
            
            riderPrice -= Math.floor(Math.random() * 25) + 5;
            
            if (userOffer >= riderPrice) {
                input.remove(); btn.remove();
                if (userOffer > MARGIN) {
                    alert(`Agreed at ${userOffer}tk. (Paid more than margin) -10s Penalty!`);
                    GLOBAL_TIMER -= 10;
                } else {
                    alert(`Agreed at ${userOffer}tk! (Below margin) +10s Reward!`);
                    GLOBAL_TIMER += 10;
                }
                this.scene.start("LevelBike");
            } else {
                riderUI.setText(`Rider: 'Na mama, bariye bolen! ${riderPrice}tk den.'`);
            }
        };
    }
}

// --- LEVEL 5: BIKE (1000m SURVIVAL) ---
class LevelBike extends Phaser.Scene {
    constructor() { super("LevelBike"); }
    create() {
        this.add.tileSprite(400, 300, 800, 600, 'road').setTint(0x222222);
        this.player = this.physics.add.sprite(400, 500, 'hunda_top').setScale(0.5);
        this.distLeft = 1000;
        this.distText = this.add.text(600, 100, '1000m Left', { fontSize: '24px' });
        
        this.traffic = this.physics.add.group();
        this.time.addEvent({ delay: 1000, loop: true, callback: () => {
            this.traffic.create(Phaser.Math.Between(200, 600), -100, 'bus_top').setScale(0.5).setVelocityY(480);
        }});
        
        this.physics.add.overlap(this.player, this.traffic, (p, t) => {
            t.destroy(); 
            PLAYER_LIVES--; 
            alert("CRASH! 10s lost while restarting..."); 
            GLOBAL_TIMER -= 10;
        });
    }
    update() { 
        this.distLeft -= 2;
        this.distText.setText(`${Math.max(0, Math.floor(this.distLeft))}m Left`);
        let c = this.input.keyboard.createCursorKeys();
        if (c.left.isDown) this.player.x -= 6; if (c.right.isDown) this.player.x += 6;
        if (this.distLeft <= 0) this.scene.start("LevelBoss");
    }
}

// --- FINAL BOSS: MOMO (200HP / 5 DMG) ---
class LevelBoss extends Phaser.Scene {
    constructor() { super("LevelBoss"); }
    create() {
        this.add.image(400, 300, 'city').setTint(0x220000);
        this.boss = this.physics.add.sprite(400, 150, 'momo_angry').setScale(0.8);
        this.player = this.physics.add.sprite(400, 500, 'l1').setScale(0.6).setTint(0xffaaaa);
        this.bossHP = 200; // Updated HP
        this.hpText = this.add.text(20, 100, "Momo HP: 200", { fontSize: '32px', color: '#ff0000' });
        
        this.input.keyboard.on('keydown-SPACE', () => {
            let h = this.physics.add.sprite(this.player.x, this.player.y - 20, 'heart').setScale(0.05).setVelocityY(-650);
            this.physics.add.overlap(h, this.boss, () => {
                h.destroy(); 
                this.bossHP -= 5; // Updated Damage rate
                this.hpText.setText(`Momo HP: ${this.bossHP}`);
                if (this.bossHP <= 0) this.win();
            });
        });

        this.lasers = this.physics.add.group();
        this.time.addEvent({ delay: 1500, loop: true, callback: () => {
            let orb = this.lasers.create(this.boss.x, this.boss.y, 'golla').setScale(0.25).setTint(0x00ff00);
            this.physics.moveToObject(orb, this.player, 300);
        }});
        
        this.physics.add.overlap(this.player, this.lasers, () => { 
            PLAYER_LIVES--; 
            this.cameras.main.shake(100, 0.01); 
        });

        this.time.addEvent({ delay: 7000, loop: true, callback: () => {
            this.scene.pause();
            let q = trapQuestions[Phaser.Math.Between(0, 1)];
            let ans = prompt(`${q.q}\n0: ${q.a[0]}\n1: ${q.a[1]}`);
            if (parseInt(ans) === q.c) this.scene.resume(); else location.reload();
        }});
    }
    win() {
        this.physics.pause(); this.boss.setTexture('momo_happy');
        this.add.image(400, 300, 'win').setDepth(1000).setScale(1.2);
        this.time.delayedCall(2000, () => {
            let div = document.createElement('div');
            div.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:black; color:white; padding:40px; text-align:center; z-index:10000; border:4px solid red;";
            div.innerHTML = `<h1>Will you be my forever?</h1>
                <button onclick="playEnd()" style="padding:15px; background:green; color:white;">YES</button>
                <button id="noBtn" style="position:absolute; background:red; color:white; padding:10px;">I will think about it</button>`;
            document.body.appendChild(div);
            let no = document.getElementById('noBtn');
            no.onmouseover = () => { no.style.left = Math.random()*300+'px'; no.style.top = Math.random()*300+'px'; };
        });
    }
}

class IntroScene extends Phaser.Scene { constructor() { super("IntroScene"); } create() { this.scene.start("LevelSneak"); } }

window.playEnd = () => {
    document.body.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/InTy_ceaGgw?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
};
