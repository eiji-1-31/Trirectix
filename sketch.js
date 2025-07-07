// TriRectix_ver_1_1_5

////// プレイ前にお読みください //////
// 本作品には、Soundライブラリ、Minimライブラリ、
// ControlP5ライブラリを使用しています！お手数ですが、
// 実行前に以上のライブラリのダウンロードをお願いしますm(_ _)m
//////

// デバッグ用制御
let debug = false;

// ナナメのアニメーションで使う変数
let animNaY;

// 盤面の大きさ。調節できるように改造。8/17
let sizeX = 12;
let sizeY = 10;

// １マス分の大きさ(60～推奨)
let blockSize = 60;

// 画面左の余白
let spaceRight = 100;

// 画面上部の余白
let spaceUp = 150;

// 三角形一つ一つの色情報。(1～5で5色指定。0は無色、6は変化中処理のための無色とする。)

let table = [];

for (let i = 0; i < sizeX; i++) {
  table[i] = new Array(sizeY);
}

// どの四角形を選択しているかを数値により判定。
let selectX;// range(0~sizeX -2) ブロック2つを選択するため範囲を1つ減らす
let selectY;// range(0~sizeY -1)

// 背景
let gameBack;
// タイトルロゴ
let titleLogo;
// メニューシーン/タイトルシーンの背景
let menuBack;
// タイトルシーンのボタン
let titleButton;
// メニューの上部と下部
let menuHeader;
// メニューのモード選択
let playButton;
let adjustButton;
let helpButton;
// ゲーム内のスコア表示
let scorePanel;
// ゲーム内の経過時間表示
let timePanel;

// ローディング時の飾り
let nowLoading;

// 設定画面の下
let adjustHeader;

// 遊び方説明
let explaination;

// 描画に使うバッファー
let buffer;
let titleLogo_buffer;
let MenuBack;
let TitleButton;
let MenuHeader;
let PlayButton;
let AdjustButton;
let HelpButton;
let NowLoading;
let ScorePanel;
let TimePanel;
let AdjustHeader;
let Explaination;

// サウンド
let titleDecide;
let cursorMove;
let countdownSound;
let goSound;
let gameover;
let isGamingBGM;
let rotateSound;
let cancelSound;
let beamSound;
let pauseSound;
let menuBGM;
let YajiriSound;
let DangerSound;
let shapeNotice;
let destroyLong;
let destroyShort;
let decide;
let rotateSound_sonoba;
let pyramidExpand;
let gameCursorMove;

// 各サウンドのボリューム
// BGM系
let menuBGM_vol;
let gameBGM_vol;
// 効果音系
let SE_vol;

// UIの修正(by Kei)

// グローバル変数
let menuBGMslider, gameBGMslider, seslider;
let infoLabel, setKey1Btn, setKey2Btn, currentKey1Label, currentKey2Label;
let actionKey1 = 'Z'; // 初期値例
let actionKey2 = 'X'; // 初期値例
let waitingForKey1 = false;
let waitingForKey2 = false;

let myFont;

const textX = 820;
let textY = 560;
// 文字の透明度
let texAlpha = 0;

let Score = 0;
let point_normal = 150;
let point_Tate = 410;
let point_Yoko = 410;
let point_Naname = 640;
let point_Yajiri = 835;
let point_Pyramid = 867;
let point_Heart = 1024;

// ゲームにおける制限時間
let limit_Time = 150;

// ゲームのスタートや終わりに関する変数
let gameStarted = true;// ゲームを実行してから一度しか実行されない。
let isGaming = false;
let playingEnd = false;// タイムアップ、ゲームオーバー時にtrueとなる。
let gameEnd = false;

// カウントダウンしてゲームがスタート
let countDown = 0;
let countDown_time = 5000;

// カウントダウン時の進捗を追加(サウンド多重防止のため)
let count3 = false;
let count2 = false;
let count1 = false;
let count0 = false;

// ゲームのシーン遷移について整数表記で管理
let scene = 0;

// メニュー画面で使うセレクター
let menuSelect = 0;

// メニューの選択が動く量
let menuWide1 = 0;
let menuWide2 = 0;
let menuWide3 = 0;
let menuMoveAmount = 90;

let size_Header = 180;
let size_Footer = 130;

let size_temprateX = 390;
let size_temprateY = 520;

function preload() {
  
  

  // とりあえずのフォント
  myFont = 'ＭＳ Ｐゴシック';
  gameBack = loadImage("assets/puzzlegameBack.png");
  titleLogo = loadImage("Logo.png");
  titleButton = loadImage("TitleButton.png");
  menuHeader = loadImage("Menu.png");
  menuBack = loadImage("assets/MenuBackground.png");
  playButton = loadImage("Game mode.png");
  adjustButton = loadImage("Adjustment.png");
  helpButton = loadImage("HowToPlay.png");
  scorePanel = loadImage("Scoreboard.png");
  timePanel = loadImage("Timeboard.png");
  adjustHeader = loadImage("AdjustScene.png");
  explaination = loadImage("HowToPlay0909.png");


  // サウンドファイル読み込み
  titleDecide = loadSound("TitleDecide.mp3");
  menuBGM = loadSound("ClearCubes.mp3");
  decide = loadSound("Decide.mp3");
  DangerSound = loadSound("DangerSound.mp3");
  countdownSound = loadSound("CountDownSound.mp3");
  goSound = loadSound("zeroGo.mp3");
  isGamingBGM = loadSound("GarasubarinoSankakusui.mp3");
  gameCursorMove = loadSound("gameCursor.mp3");
  cursorMove = loadSound("CursorMove.mp3");
  rotateSound_sonoba = loadSound("rotateSound_sonoba.mp3");
  shapeNotice = loadSound("shapeNotice.mp3");
  beamSound = loadSound("BeamSound.mp3");
  YajiriSound = loadSound("YajiriSound.mp3");
  gameover = loadSound("gameOver.mp3");
  rotateSound = loadSound("rotateSound.mp3");
  destroyShort = loadSound("Destroy_Short.mp3");
  pyramidExpand = loadSound("Expand.mp3");
  destroyLong = loadSound("Destroy_Long.mp3");
  cancelSound = loadSound("cancel.mp3");
  pauseSound = loadSound("PauseSound.mp3");
}

function setup()
{
  noCursor();
  animNaY = 15*sqrt(2)-4
    createCanvas(1300,900);
  fullscreen();

  frameRate(60);

  strokeWeight(4);

  gameBack.resize(width, height);
  buffer = createGraphics(width, height);
  //buffer.beginDraw](https://buffer.begindraw/)();
  buffer.image(gameBack, 0, 0);
  //buffer.endDraw](https://buffer.enddraw/)();

  titleLogo.resize(768, 576);
  titleLogo_buffer = createGraphics(width, height);
  //titleLogo_buffer.beginDraw();
  titleLogo_buffer.image(titleLogo, 0, 0);
  //titleLogo_buffer.endDraw();

  titleButton.resize(500, 150);
  TitleButton = createGraphics(width, height);
  //TitleButton.beginDraw();
  TitleButton.image(titleButton, 0, 0);
  //TitleButton.endDraw();

  menuHeader.resize(width, height);
  MenuHeader = createGraphics(width, height);
  //MenuHeader.beginDraw();
  MenuHeader.image(menuHeader, 0, 0);
  //MenuHeader.endDraw();

  menuBack.resize(width, height);
  MenuBack = createGraphics(width, height);
  //MenuBack.beginDraw();
  MenuBack.image(menuBack, 0, 0);
  //MenuBack.endDraw();

  playButton.resize(size_temprateX, size_temprateY);
  PlayButton = createGraphics(width, height);
  //PlayButton.beginDraw](https://playbutton.begindraw/)();
  PlayButton.image(playButton, 0, 0);
  //PlayButton.endDraw](https://playbutton.enddraw/)();

  adjustButton.resize(size_temprateX, size_temprateY);
  AdjustButton = createGraphics(width, height);
  //AdjustButton.beginDraw();
  AdjustButton.image(adjustButton, 0, 0);
  //AdjustButton.endDraw();

  helpButton.resize(size_temprateX, size_temprateY);
  HelpButton = createGraphics(width, height);
  //HelpButton.beginDraw();
  HelpButton.image(helpButton, 0, 0);
  //HelpButton.endDraw();

  scorePanel.resize(500, 150);
  ScorePanel = createGraphics(width, height);
  //ScorePanel.beginDraw();
  ScorePanel.image(scorePanel, 0, 0);
  //ScorePanel.endDraw();

  timePanel.resize(500, 150);
  TimePanel = createGraphics(width, height);
  //TimePanel.beginDraw();
  TimePanel.image(timePanel, 0, 0);
  //TimePanel.endDraw();

  adjustHeader.resize(width, height);
  AdjustHeader = createGraphics(width, height);
  //AdjustHeader.beginDraw();
  AdjustHeader.image(adjustHeader, 0, 0);
  //AdjustHeader.endDraw();

  explaination.resize(900, 600);
  Explaination = createGraphics(width, height);
  //Explaination.beginDraw();
  Explaination.image(explaination, 200, 150);
  //Explaination.endDraw();

  // UI修正版

  // MenuBGM スライダー
  menuBGMslider = createSlider(0, 1, 0.6, 0.01);
  menuBGMslider.position(100, 200);
  menuBGMslider.style('width', '300px');
  menuBGMslider.hide();

  // GameBGM スライダー
  gameBGMslider = createSlider(0, 1, 1, 0.01);
  gameBGMslider.position(100, 320);
  gameBGMslider.style('width', '300px');
  gameBGMslider.hide();

  // SE スライダー
  seslider = createSlider(0, 1, 0.8, 0.01);
  seslider.position(100, 440);
  seslider.style('width', '300px');
  seslider.hide();

  // infoラベル
  infoLabel = createP('変更したいキーを選んでね');
  infoLabel.position(600, 150);
  infoLabel.style('font-size', '42px');
  infoLabel.hide();

  // setKey1ボタン
  setKey1Btn = createButton('回転ボタン');
  setKey1Btn.position(600, 200);
  setKey1Btn.size(500, 150);
  setKey1Btn.style('font-size', '42px');
  setKey1Btn.style('background-color', 'rgb(0,100,100)');
  setKey1Btn.style('color', '#fff');
  setKey1Btn.mousePressed(() => {
    infoLabel.html('回転ボタンに使うボタンを押してね');
    waitingForKey1 = true;
    waitingForKey2 = false;
    infoLabel.show();
  }
  );
  setKey1Btn.hide();

  // setKey2ボタン
  setKey2Btn = createButton('入替ボタン');
  setKey2Btn.position(600, 400);
  setKey2Btn.size(500, 150);
  setKey2Btn.style('font-size', '42px');
  setKey2Btn.style('background-color', 'rgb(0,100,100)');
  setKey2Btn.style('color', '#fff');
  setKey2Btn.mousePressed(() => {
    infoLabel.html('入替ボタンに使うボタンを押してね');
    waitingForKey1 = false;
    waitingForKey2 = true;
    infoLabel.show();
  }
  );
  setKey2Btn.hide();

  // 現在のアクションキーラベル
  currentKey1Label = createP('現在の回転ボタンは ' + actionKey1);
  currentKey1Label.position(600, 200);
  currentKey1Label.style('font-size', '42px');
  currentKey1Label.hide();

  currentKey2Label = createP('現在の入替ボタンは ' + actionKey2);
  currentKey2Label.position(600, 500);
  currentKey2Label.style('font-size', '42px');
  currentKey2Label.hide();

  // 初期状態では全部非表示（必要に応じてshow()を呼ぶ）


  textFont(myFont);
  textSize(40);
  textAlign(CENTER, CENTER);
}

/*function MenuBGM(let v)
 {
 menuBGM_vol = v;
 menuBGM.amp(menuBGM_vol);
 //console.log("Volume updated: " + menuBGM_vol);
 }
 
 function GameBGM(let v)
 {
 gameBGM_vol = v;
 isGamingBGM.amp(gameBGM_vol);
 }
 
 function SE(let v)
 {
 SE_vol = v;
 titleDecide.amp(SE_vol);
 cursorMove.amp(SE_vol);
 countdownSound.amp(SE_vol);
 goSound.amp(SE_vol);
 gameover.amp(SE_vol);
 rotateSound.amp(SE_vol);
 cancelSound.amp(SE_vol);
 beamSound.amp(SE_vol);
 pauseSound.amp(SE_vol);
 YajiriSound.amp(SE_vol);
 DangerSound.amp(SE_vol);
 shapeNotice.amp(SE_vol);
 destroyLong.amp(SE_vol);
 destroyShort.amp(SE_vol);
 decide.amp(SE_vol);
 rotateSound_sonoba.amp(SE_vol);
 pyramidExpand.amp(SE_vol);
 gameCursorMove.amp(SE_vol);
 }*/

// 重力処理に関するパラメータ
let state = 0;
let waitTime = 300;
let waitStart = 0;

// 上からランダム配色ブロックを落とす時のパラメータ
let intstate = 0;
// n秒置きにブロックを落とす。
let n = 2;
let interval = n * 1000;
let waitInterval = 0;

let isTiming = false;
// 一番上のマスに一つでも何かある状態だったら、時間を計測し、一定時間をすぎるとゲームオーバー
// ステート管理
let checkState = -1;
let startCheck = 0;
let checkTime = 10*1000;

// ブロックの入れ替え時の遅らせる処理
let slideSpeed = 10;
let slideTime = 300;
let startSlide = 0;
// 一度だけ関数を実行するためのフラグ
let isWaitSlide = false;
// 入れ替えボタンを押せるかどうか(連打防止)
let canPushS = true;

// ブロック入れ替えに使うradians用の変数。
let t1 = -180;
let t2 = 0;

// 入れ替えに使う代替値
let temp1;
let temp2;
let temp3;
let temp4;

let letButton = 0;
let radlet = 0;

let gameTime = 0;
let gTimeStart = false;

// メニュー・ゲーム時のBGM再生について管理します
let isMenuBGM = false;
let isGameBGM = false;

let showHowtoplay = false;

function draw()
{
  // 現在のアクションキーを常に表示更新
  /*c5.get(Textlabel.class, "currentKey1").setText("いまの設定: " + actionKey1).setPosition(600, 210).setFont(createFont("ＭＳ Ｐゴシック", 24));
   c5.get(Textlabel.class, "currentKey2").setText("いまの設定: " + actionKey2).setPosition(600, 410).setFont(createFont("ＭＳ Ｐゴシック", 24));*/
  //console.log(SE_vol);

  // タイトルシーンについて
  if (scene == 0)
  {
    // 背景を描画
    image(MenuBack, 0, 0);
    // ロゴを表示
    image(titleLogo_buffer, 250, 100);
    // タイトルに浮くボタンを描画
    image(TitleButton, 350, 650+letButton);
    radlet+=2;
    letButton = 20*abs(sin(radians(radlet)));
    // ゲームのバージョンを表記
    fill(0);
    textSize(30);
    text("TriRectix_ver-1.1.5", width-135, height-20);
  }
  // メニューシーンについて
  if (scene == 1)
  {
    if (!isMenuBGM)
    {
      menuBGM.loop();
      menuBGM.amp(menuBGM_vol);
      isMenuBGM = true;
    }
    // 背景を描画
    image(MenuBack, 0, 0);


    // まずは画面上のヘッダー？と画面下のフッター？を描画
    image(MenuHeader, 0, 0);

    if (menuSelect == 0)
    {
      menuWide1 = menuMoveAmount;
      menuWide2 = 0;
      menuWide3 = 0;
    }
    if (menuSelect == 1)
    {
      menuWide1 = 0;
      menuWide2 = menuMoveAmount;
      menuWide3 = 0;
    }
    if (menuSelect == 2)
    {
      menuWide1 = 0;
      menuWide2 = 0;
      menuWide3 = menuMoveAmount;
    }
    radlet+=1;
    letButton = 20*abs(sin(radians(radlet)));

    // メニューで選ぶモードの種類を選ぶ
    image(PlayButton, 20, 210-menuWide1/2+letButton);

    image(AdjustButton, 450, 210-menuWide2/2+letButton);

    image(HelpButton, 890, 210-menuWide3/2+letButton);

    textSize(90);
    fill(255);
    text("モード選択", width/2, 70);

    textSize(30);
    fill(0);
    text("←／→：選択", 440, 820);
    text("ENTER：決定　／　X：もどる", 500, 855);

    if (showHowtoplay)
    {
      image(Explaination, 0, 0);
    }
  }

  // ゲームシーンについて
  if (scene == 2)
  {
    radTri += 6;
    // デバッグ
    if (debug) toDebug();


    // Scoreを、ゲームが始まった際に初期化。
    if (gameStarted)
    {
      count3 = false;
      count2 = false;
      count1 = false;
      count0 = false;
      countDown = millis();
      n = 3;
      pauseSelect = 0;
      Score = 0;
      playingEnd = false;
      gameStarted = false;
    }

    // 背景描画(後ほど画像差し替えを検討)
    //fill(100, 100, 100, 255);
    //rect(0, 0, 1600, 900);
    image(buffer, 0, 0);
    

    // 盤面を描画
    drawGameTable();

    // スコア・時間を掲示
    showScore();
    showTime();

    // 時間が経つにつれて落ちてくるブロックのインターバルを狭くする
    interval = n*1000;
    if (elapsedTime > 280*1000)
    {
      n = 0.25;
    } else if (elapsedTime > 150*1000)
    {
      n = 0.5;
    } else if (elapsedTime > 90*1000)
    {
      n = 1;
    } else if (elapsedTime > 30*1000)
    {
      n = 2;
    }

    // ブロックをランダムに落とす
    fallBlocks();

    // ブロックが落ちる時のディレイ
    blockGravity();

    // ブロック系の入れ替え時の処理
    BlockChangeAndSlide();

    // スキルの発生時間を演出のため遅らせる処理
    skillTwiceDelay();

    // 形を検出したら輪郭線で強調　ここを変更
    shapeAppeal();

    // スキルごとのアニメーションをtrigger各種とisfirstDelayedがtrueの時演出を流す。
    showAnimation();

    // ゲームオーバーになるかどうか監視
    checkFirstColumn();
    // 目前の時はヤバイということを伝える。
    callEmergency();

    // どこの四角形２つを選択しているか描画。
    drawCursor(selectX, selectY);

    // ゲームオーバー処理
    endPlaying();

    // カウントダウン処理
    if (millis()-countDown >= countDown_time)
    {
      if (!isGameBGM)
      {
        isGamingBGM.loop();
        isGamingBGM.amp(gameBGM_vol);
        isGameBGM = true;
      }

      isGaming = true;
      if (!gTimeStart)
      {
        gameTime = millis();
        isRunning =true;
        gTimeStart = true;
      }
    } else if (millis()-countDown >= 4000)
    {
      if (!count0)
      {
        goSound.play();
        goSound.amp(SE_vol);
        count0 = true;
      }

      textSize(80);
      fill(255);
      text("GO", spaceRight+blockSize*sizeX/4, spaceUp+blockSize*sizeY/2);
    } else if (millis()-countDown >= 3000)
    {
      if (!count1)
      {
        countdownSound.play();
        countdownSound.amp(SE_vol);
        count1 = true;
      }
      textSize(80);
      fill(255);
      text("1", spaceRight+blockSize*sizeX/4, spaceUp+blockSize*sizeY/2);
    } else if (millis()-countDown >= 2000)
    {
      if (!count2)
      {
        countdownSound.play();
        countdownSound.amp(SE_vol);
        count2 = true;
      }
      textSize(80);
      fill(255);
      text("2", spaceRight+blockSize*sizeX/4, spaceUp+blockSize*sizeY/2);
    } else if (millis()-countDown >= 1000)
    {
      if (!count3)
      {
        countdownSound.play();
        countdownSound.amp(SE_vol);
        count3 = true;
      }

      textSize(80);
      fill(255);
      text("3", spaceRight+blockSize*sizeX/4, spaceUp+blockSize*sizeY/2);
    }

    // 各パーティクルを更新して描画
    for (let i = particles.length - 1; i >= 0; i--)
    {
      let p = particles[i];
      p.update();
      p.display();
      if (p.isFinished())
      {
        particles.splice(i);
      }
    }

    // ポーズ中の処理について判定
    Pause();

    // リザルトを表示
    showResult();
  }
  // 設定画面について
  if (scene == 3 && !s3xPressed)
  {
    // 背景を描画
    image(MenuBack, 0, 0);


    // ヘッダーを描画
    image(AdjustHeader, 0, 0);
    fill(0);
    textSize(90);
    text("設定", 105, 70);

    textSize(30);
    fill(0);
    text("クリック／ドラッグで設定　／　X：もどる", 605, 840);

    textSize(42);
    text("メニュー画面のBGM音量", 220+50, 180);
    text("スコアアタックでのBGM音量", 262+50, 285);
    text("効果音の音量", 126+50, 415);


    /*
c5.getController("MenuBGM").show();
     c5.getController("GameBGM").show();
     c5.getController("SE").show();
     
     c5.getController("info").show();
     c5.getController("setKey1").show();
     c5.getController("setKey2").show();
     c5.getController("currentKey1").show();
     c5.getController("currentKey2").show();
     */
  } else
    /*{
     c5.getController("MenuBGM").hide();
     c5.getController("GameBGM").hide();
     c5.getController("SE").hide();
     
     
     c5.getController("info").hide();
     c5.getController("setKey1").hide();
     c5.getController("setKey2").hide();
     c5.getController("currentKey1").hide();
     c5.getController("currentKey2").hide();
     
     
     
     }
     */
    //console.log(isYajiriSound);
    //console.log(isbeamSound);

    // シーン遷移の暗転(ステート管理なので常に描画)
    windowShadow();

  // ゲームのロードに際して
  loadingWindow();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// いろいろな関数

function toDebug()
{
  console.log("tr1 = " + trigger1 + ", ");
  console.log("tr2 = " + trigger2 + ", ");
  console.log("tr3 = " + trigger3 + ", ");
  console.log("tr4 = " + trigger4 + ", ");
  console.log("tr5 = " + trigger5 + ", ");
  console.log("tr6 = " + trigger6);
  console.log();
  console.log("---------------");
  console.log(gameStarted);
  //console.log(skillDelayState + ", " + isfirstDelayed + ", " + isWaitState + ", " + PysumTx + ", " + HeartInfo);
}

// ポーズ中か否か
let isPause = false;
// ポーズにおける選択を表示
let pauseSelect = 0;

let pauseMenuAlpha = 0;
let spreadSpeed = 10;

let buttonWide1 = 0;
let buttonWide2 = 0;
let buttonWide3 = 0;

function Pause()
{
  // ゲーム画面の際にポーズボタンを押すとゲームが止まり、再開、やり直し、タイトルに戻るの3パターンを選べる。
  push();

  translate(width/2, height/2);
  // ゲーム画面を薄暗くして一時停止
  if (isPause)
  {
    isRunning = false;
    fill(0, 0, 0, 100);
    rect(-width/2, -height/2, width, height);


    if (pauseMenuAlpha <= 300)
    {
      pauseMenuAlpha += spreadSpeed;
    }

    fill(200);
    circle(-pauseMenuAlpha, -pauseMenuAlpha/3*2, pauseMenuAlpha/3);
    circle(-pauseMenuAlpha, pauseMenuAlpha/3*2, pauseMenuAlpha/3);
    circle(pauseMenuAlpha, -pauseMenuAlpha/3*2, pauseMenuAlpha/3);
    circle(pauseMenuAlpha, pauseMenuAlpha/3*2, pauseMenuAlpha/3);

    rect(-pauseMenuAlpha, -pauseMenuAlpha/3*2, pauseMenuAlpha*2, pauseMenuAlpha/3*4);

    rect(-pauseMenuAlpha, -pauseMenuAlpha/3*2, -pauseMenuAlpha/6, pauseMenuAlpha/3*4);
    rect(-pauseMenuAlpha, -pauseMenuAlpha/3*2, pauseMenuAlpha*2, -pauseMenuAlpha/6);
    rect(pauseMenuAlpha, pauseMenuAlpha/3*2, pauseMenuAlpha/6, -pauseMenuAlpha/3*4);
    rect(pauseMenuAlpha, pauseMenuAlpha/3*2, -pauseMenuAlpha*2, pauseMenuAlpha/6);

    // ポーズの字を描画
    fill(0);
    textSize(45);
    text("ポーズ", 0, -pauseMenuAlpha/3*2);

    // ポーズ操作表示
    textSize(22);
    text("ENTERキーで決定", pauseMenuAlpha-75, pauseMenuAlpha/3*2);

    // 中心とする
    //fill(255,0,0);
    //circle(0,0,20);

    if (pauseMenuAlpha >= 300)
    {
      fill(100);
      // 一番上のボタン
      //ellipse(0, -100, 450+buttonWide1, 70+buttonWide1);
      circle(-225, -100, 70+buttonWide1);
      circle(225, -100, 70+buttonWide1);
      rect(-225-buttonWide1/4, -100-35-buttonWide1/2, 450, 70+buttonWide1);

      fill(255);
      textSize(45+buttonWide1);
      text("つづける", 0, -100);

      fill(100);
      // 真ん中のボタン
      //ellipse(0, 20, 450+buttonWide2, 70+buttonWide2);
      circle(-225, 20, 70+buttonWide2);
      circle(225, 20, 70+buttonWide2);
      rect(-225-buttonWide2/4, 20-35-buttonWide2/2, 450, 70+buttonWide2);

      fill(255);
      textSize(45+buttonWide2);
      text("やりなおす", 0, 20);

      fill(100);
      // 下のボタン
      //ellipse(0, 140, 450+buttonWide3, 70+buttonWide3);
      circle(-225, 140, 70+buttonWide3);
      circle(225, 140, 70+buttonWide3);
      rect(-225-buttonWide3/4, 140-35-buttonWide3/2, 450, 70+buttonWide3);

      fill(255);
      textSize(45+buttonWide3);
      text("やめる", 0, 140);
    }

    if (pauseSelect == 0)
    {
      buttonWide1 = 20;
      buttonWide2 = 0;
      buttonWide3 = 0;
    }
    if (pauseSelect == 1)
    {
      buttonWide1 = 0;
      buttonWide2 = 20;
      buttonWide3 = 0;
    }
    if (pauseSelect == 2)
    {
      buttonWide1 = 0;
      buttonWide2 = 0;
      buttonWide3 = 20;
    }
  }

  pop();
}

// ステート管理
let shadowState = -1;
let shadowAlpha = 0;
// 暗転時間
let blackTime = 1000;
let startBlackTime = 0;
// シーン遷移を行っているか否か
let isChangingScene = false;

function windowShadow()
{
  //console.log(shadowState+", "+shadowAlpha+", "+scene);
  // シーンを遷移するごとに暗転する使用を追加。
  switch (shadowState)
  {
  case 0:
    if (shadowAlpha <= 255)
    {
      shadowAlpha += 17;
    } else
    {
      startBlackTime = millis();


      shadowState = 1;
    }
    break;



  case 1:
    if (millis()-startBlackTime >= blackTime)
    {
      if (scene == 0)
      {
        isMenuBGM = false;
        scene = 1;
      }


      if (scene == 1)
      {
        if (s1xPressed && (menuSelect == 0 || menuSelect == 1 || menuSelect == 2))
        {
          // それ以外はタイトルへ戻る
          isMenuBGM = false;
          // カーソルを初期化
          menuSelect = 0;
          scene = 0;
          s1xPressed = false;
        } else if (menuSelect == 1)
        {
          scene = 3;
        } else if (menuSelect == 2)
        {
          // 説明画像表示のletが作動
        }
      }

      if (scene == 2)
      {
        if (isPause && pauseSelect == 2)
        {
          isMenuBGM = false;
          scene = 0;
        }

        if (isResult && resultSelect == 1)
        {
          isMenuBGM = false;
          scene = 1;
          isResult = false;
        }

        if (isResult && resultSelect == 2)
        {
          isMenuBGM = false;
          scene = 0;
          isResult = false;
        }
      }

      if (scene == 3)
      {
        if (s3xPressed)
        {
          // モード選択へ戻る
          isMenuBGM = false;
          scene = 1;
          s3xPressed = false;
        }
      }

      shadowState = 2;
    }
    break;



  case 2:
    if (shadowAlpha >= 0)
    {
      shadowAlpha -= 17;
    } else
    {
      isChangingScene = true;
      shadowAlpha = 0;
      shadowState = -1;
    }
    break;
  }
  noStroke();
  fill(0, 0, 0, shadowAlpha);
  rect(0, 0, width, height);
}

let loadState = -1;
let loadingTime = 5 * 1000;

let isLoading = false;

let loadingColor1 = 0;
let loadingColor2 = 0;

function loadingWindow()
{
  // ゲームシーン用の偽のローディングウィンドウ
  // ゲームが始まる前に、開始と同時に消えてしまうブロックを消し、
  // ランダムに三角形の色を追加。消えてしまう組み合わせがなくなるまでループ
  switch (loadState)
  {
  case 0:


    if (shadowAlpha <= 255)
    {
      shadowAlpha += 17;
    } else
    {
      // scene2から再ロードするとき、一度scene1に立ち寄る
      scene = 5;
      // 再読み込みした際にまた初めから開始
      isGameBGM = false;
      isGaming = false;
      gTimeStart = false;
      gameStarted = true;
      elapsedTime = 0;
      playingEnd = false;
      madeTable = false;

      loadingColor1 = int(random(1, 6));
      loadingColor2 = int(random(1, 6));

      // やり直し時はポーズ状態を解除
      isPause = false;

      // カーソル初期位置
      selectX = 2;
      selectY = 6;

      startBlackTime = millis();

      loadState = 1;
    }
    break;



  case 1:
    // つながりがないテーブルを新規作成
    newTable();


    isLoading = true;

    if (millis()-startBlackTime >= loadingTime)
    {
      isLoading = false;
      scene = 2;
      loadState = 2;
    }
    break;



  case 2:
    if (shadowAlpha >= 0)
    {
      shadowAlpha -= 17;
    } else
    {
      isChangingScene = true;
      shadowAlpha = 0;
      loadState = -1;
    }
    break;
  }
  noStroke();
  fill(0, 0, 0, shadowAlpha);
  rect(0, 0, width, height);

  if (isLoading)
  {
    stroke(0);
    push();
    translate(width-120, height-120);
    textSize(80);
    fill(255);
    text("Now Loading...", -340, 0);


    radlet+=3;
    rotate(radians(radlet));
    switch (loadingColor1)
    {
    case 0:
      noFill();
      break;
    case 1:
      fill(255, 0, 0);
      break;
    case 2:
      fill(159, 255, 130);
      break;
    case 3:
      fill(104, 151, 255);
      break;
    case 4:
      fill(184, 41, 255);
      break;
    case 5:
      fill(222, 206, 0);
      break;
    case 6:
      noFill();
      break;
    }
    triangle(-50, -50, -50, 50, 50, 50);

    switch (loadingColor2)
    {
    case 0:
      noFill();
      break;
    case 1:
      fill(255, 0, 0);
      break;
    case 2:
      fill(159, 255, 130);
      break;
    case 3:
      fill(104, 151, 255);
      break;
    case 4:
      fill(184, 41, 255);
      break;
    case 5:
      fill(222, 206, 0);
      break;
    case 6:
      noFill();
      break;
    }
    triangle(-50, -50, 50, -50, 50, 50);
    pop();
  }
}

let isGameOverSE = false;
function endPlaying()
{
  if (!debug && limit_Time == 0)
  {
    //playingEnd = true;
  }

  if (playingEnd)
  {
    if (!isGameOverSE)
    {
      gameover.play();
      gameover.amp(SE_vol);
      isGameOverSE = true;
    }


    isGaming = false;
    isRunning = false;
    isResult = true;
  } else
  {
    isGameOverSE = false;
  }
}

// リザルト画面においても、「プレイを続ける」「モード選択に戻る」「タイトルに戻る」の３パターン用意。
let isResult = false;
let resultSelect = 0;

let resultAlpha = 0;

let result_buttonWide1 = 0;
let result_buttonWide2 = 0;
let result_buttonWide3 = 0;

function showResult()
{
  if (isResult)
  {
    isRunning = false;
    if (resultAlpha <= 150)
    {
      resultAlpha += 5;
    }
    fill(0, 0, 0, resultAlpha);
    rect(0, 0, width, height);


    // 「リザルト」を表示するUI(画面上部)
    fill(255);
    rect(width-resultAlpha*5, spaceUp, resultAlpha*5, 100);

    fill(0);
    textSize(80);
    text("リザルト", width+300-resultAlpha*5, spaceUp + 50);

    // Scoreを表示するUI
    fill(255);
    rect(20, 350, resultAlpha*5, 110);

    fill(0);
    textSize(100);
    text("スコア　"+ Score, 150+resultAlpha, 350+110/2);

    // 経過時間を表示するUI
    fill(255);
    rect(20, 510, resultAlpha*6, 110);

    let hours = (elapsedTime / (1000 * 60 * 60)) % 24;
    let minutes = (elapsedTime / (1000 * 60)) % 60;
    let seconds = (elapsedTime / 1000) % 60;
    let milliseconds = (elapsedTime % 1000) / 10;  // 1/100秒表示

    // 時間をフォーマットして表示
    let timeString = nf(hours, 1,0) + ":" + nf(minutes, 2,0)
      + ":" + nf(seconds, 2,0)
      + "." + nf(milliseconds, 2,0);
    fill(0);
    textSize(100);
    text("タイム　"+timeString, 300+resultAlpha, 510+110/2);

    // 各種ボタンを表示

    fill(255, 255, 255, 2*resultAlpha);
    //ellipse(width/2, height-250, 180+result_buttonWide1, 50+result_buttonWide1);
    circle(width/2-90, height-230, 50+result_buttonWide1);
    circle(width/2+90, height-230, 50+result_buttonWide1);
    rect(width/2-90-result_buttonWide1/2, height-255-result_buttonWide1/2, 180+result_buttonWide1, 50+result_buttonWide1);

    textSize(22+result_buttonWide1/2);
    fill(0);
    text("ゲームを続ける", width/2, height-230);

    fill(255, 255, 255, 2*resultAlpha);
    //ellipse(width/2, height-160, 180+result_buttonWide2, 50+result_buttonWide2);
    circle(width/2-90, height-160, 50+result_buttonWide2);
    circle(width/2+90, height-160, 50+result_buttonWide2);
    rect(width/2-90-result_buttonWide2/2, height-185-result_buttonWide2/2, 180+result_buttonWide2, 50+result_buttonWide2);

    textSize(22+result_buttonWide2/2);
    fill(0);
    text("モード選択に戻る", width/2, height-160);

    fill(255, 255, 255, 2*resultAlpha);
    //ellipse(width/2, height-90, 180+result_buttonWide3, 50+result_buttonWide3);
    circle(width/2-90, height-90, 50+result_buttonWide3);
    circle(width/2+90, height-90, 50+result_buttonWide3);
    rect(width/2-90-result_buttonWide3/2, height-115-result_buttonWide3/2, 180+result_buttonWide3, 50+result_buttonWide3);

    textSize(22+result_buttonWide3/2);
    fill(0);
    text("ゲームをやめる", width/2, height-90);

    if (resultSelect == 0)
    {
      // ゲームを続ける
      result_buttonWide1 = 10;
      result_buttonWide2 = 0;
      result_buttonWide3 = 0;
    }
    if (resultSelect == 1)
    {
      // モード選択に戻る
      result_buttonWide1 = 0;
      result_buttonWide2 = 10;
      result_buttonWide3 = 0;
    }
    if (resultSelect == 2)
    {
      // ゲームをやめる
      result_buttonWide1 = 0;
      result_buttonWide2 = 0;
      result_buttonWide3 = 10;
    }
  }
}

function checkFirstColumn()
{
  // 一行目がすべて0の場合。
  let conditionMet = false;
  // 盤面の一番上に数値が置かれたらアウト。ゲーム終了
  for (let i = 0; i < sizeX; i++)
  {
    if (table[i][0] != 0)
    {
      //console.log("検出");
      conditionMet = true;
      break;
    }
  }

  if (conditionMet && !isTiming)
  {
    startCheck = millis();
    isTiming = true;
  }

  if (!conditionMet && isTiming)
  {
    isTiming = false;
  }

  if (isTiming && millis()-startCheck >= checkTime)
  {
    playingEnd = true;
    isTiming = false;
  }
}

let flash = 0;
let isCallEmer = false;
function callEmergency()
{
  // ゲームシーンで、ゲームオーバー直前に警告を表示
  noStroke();
  // 最初の2秒を超えたら
  if (!playingEnd && isTiming && millis()-startCheck >= 5000)
  {
    if (!isCallEmer)
    {
      DangerSound.loop();
      DangerSound.amp(SE_vol);
      isCallEmer = true;
    }
    flash+=5;
    fill(255, 0, 0, 180 * abs(sin(radians(flash))));
    rect(spaceRight-blockSize/2, spaceUp, blockSize/2, blockSize*(sizeY));
    rect(spaceRight-blockSize/2, spaceUp-blockSize/2, blockSize*(sizeX/2+1), blockSize/2);
    rect(spaceRight+blockSize*sizeX/2+blockSize/2, spaceUp+blockSize*sizeY, -blockSize/2, -blockSize*(sizeY));
    rect(spaceRight+blockSize*sizeX/2+blockSize/2, spaceUp+blockSize*sizeY+blockSize/2, -blockSize*(sizeX/2+1), -blockSize/2);
  } else
  {
    DangerSound.stop();
    isCallEmer = false;
  }
}

let madeTable = false;
function newTable()
{
  if (!madeTable)
  {
    // 最初のテーブルを作成
    for (let i = 0; i < sizeX; i++)
    {


      for (let j = 0; j < sizeY/2+1; j++)
      {
        table[i][j] = 0;
      }

      for (let k = sizeY/2+1; k < sizeY; k++)
      {
        table[i][k] = int(random(1, 6));
      }
    }
    madeTable = true;
  }

  load_triQuadCheck();

  // もし消えたところがあるなら埋める
  for (let i = 0; i < sizeX; i++)
  {
    for (let j = 0; j < sizeY/2; j++)
    {
      table[i][j] = 0;
    }


    for (let k = sizeY/2+1; k < sizeY; k++)
    {
      if (table[i][k] == 0) table[i][k] = int(random(1, 6));
      else continue;
    }
  }
}

function drawGameTable()
{
  strokeWeight(4);
  // 盤面に薄い背景を追加
  fill(0, 0, 0, 100);
  rect(spaceRight, spaceUp, blockSize*sizeX/2, blockSize*sizeY);

  // 三角形全体を描画(盤面全体の描画)
  stroke(0);
  for (let i = 0; i < sizeX; i++)
  {
    for (let j = 0; j < sizeY; j++)
    {
      switch (table[i][j])
      {
      case 0:
        noFill();
        break;
      case 1:
        fill(255, 0, 0);
        break;
      case 2:
        fill(159, 255, 130);
        break;
      case 3:
        fill(104, 151, 255);
        break;
      case 4:
        fill(184, 41, 255);
        break;
      case 5:
        fill(222, 206, 0);
        break;
      case 6:
        noFill();
        break;
      }


      if (i % 2 == 0)
      {

        triangle(spaceRight+blockSize*(i/2), spaceUp+blockSize*j, (spaceRight+blockSize)+blockSize*(i/2), (spaceUp+blockSize)+blockSize*j, spaceRight+blockSize*(i/2), (spaceUp+blockSize)+blockSize*j);
      } else
      {
        push();
        translate(-blockSize/2, 0);
        triangle(spaceRight+blockSize*(i/2), spaceUp+blockSize*j, (spaceRight+blockSize)+blockSize*(i/2), spaceUp+blockSize*j, (spaceRight+blockSize)+blockSize*(i/2), (spaceUp+blockSize)+blockSize*j);
        pop();
      }
    }
  }
}

let scoreTex_x = 800;
let scoreTex_y = 300;

function showScore()
{
  image(ScorePanel, scoreTex_x-250, scoreTex_y-90);
  fill(255);
  textSize(70);
  if (Score<10)text("0000000"+Score, scoreTex_x, scoreTex_y);
  else if (Score<100)text("000000"+Score, scoreTex_x, scoreTex_y);
  else if (Score<1000)text("00000"+Score, scoreTex_x, scoreTex_y);
  else if (Score<10000)text("0000"+Score, scoreTex_x, scoreTex_y);
  else if (Score<100000)text("000"+Score, scoreTex_x, scoreTex_y);
  else if (Score<1000000)text("00"+Score, scoreTex_x, scoreTex_y);
  else if (Score<10000000)text("0"+Score, scoreTex_x, scoreTex_y);
  else {
    text("99999999", scoreTex_x, scoreTex_y);
  }
}

let elapsedTime = 0;
let timeTex_x = 800;
let timeTex_y = 450;
let sec = 1000;

let isRunning = false;

function showTime()
{
  image(TimePanel, timeTex_x-250, timeTex_y-90);

  // 経過時間を計算
  if (isRunning)
  {
    elapsedTime = millis() - gameTime;
  }

  // ミリ秒を時間、分、秒、ミリ秒に変換
  let hours = (elapsedTime / (1000 * 60 * 60)) % 24;
  let minutes = (int(elapsedTime / (1000 * 60)) % 60);
  let seconds = (elapsedTime / 1000) % 60;
  let milliseconds = (elapsedTime % 1000) / 10;  // 1/100秒表示


  let timeString =   nf(hours, 1, 0)+":"+nf(minutes, 2, 0) + ":" + nf(seconds, 2, 0) + "." + nf(milliseconds, 2, 0);
  fill(255);
  textAlign(LEFT);
  if (gTimeStart) text(timeString, timeTex_x-125, timeTex_y);
  /*else text("00:00:00.00", timeTex_x, timeTex_y);*/
  textAlign(CENTER);
}

function BlockSlideAnimation( x1, x2, x3, x4, t1, t2)
{
  push();
  translate(spaceRight+blockSize*(selectX+1), spaceUp+blockSize/2+blockSize*selectY);

  if (t1 <= 0)
  {
    switch (x1)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }
    triangle(-blockSize/2+blockSize/2*cos(radians(t1)), -blockSize/2+blockSize/2*sin(radians(t1)),
      -blockSize/2+blockSize/2*cos(radians(t1)), blockSize/2+blockSize/2*sin(radians(t1)),
      blockSize/2+blockSize/2*cos(radians(t1)), blockSize/2+blockSize/2*sin(radians(t1)));


    switch (x2)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }
    triangle(-blockSize/2+blockSize/2*cos(radians(t1)), -blockSize/2+blockSize/2*sin(radians(t1)),
      blockSize/2+blockSize/2*cos(radians(t1)), -blockSize/2+blockSize/2*sin(radians(t1)),
      blockSize/2+blockSize/2*cos(radians(t1)), blockSize/2+blockSize/2*sin(radians(t1)));
  }

  if (t2 <= 180)
  {
    switch (x3)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }


    triangle(-blockSize/2+blockSize/2*cos(radians(t2)), -blockSize/2+blockSize/2*sin(radians(t2)),
      -blockSize/2+blockSize/2*cos(radians(t2)), blockSize/2+blockSize/2*sin(radians(t2)),
      blockSize/2+blockSize/2*cos(radians(t2)), blockSize/2+blockSize/2*sin(radians(t2)));

    switch (x4)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }

    triangle(-blockSize/2+blockSize/2*cos(radians(t2)), -blockSize/2+blockSize/2*sin(radians(t2)),
      blockSize/2+blockSize/2*cos(radians(t2)), -blockSize/2+blockSize/2*sin(radians(t2)),
      blockSize/2+blockSize/2*cos(radians(t2)), blockSize/2+blockSize/2*sin(radians(t2)));
  }
  pop();
}

// ブロック内の三角形入れ替え時の遅らせる処理
let changeSpeed = 10;
let changeTime = 200;
let startChange = 0;
// 一度だけ関数を実行するためのフラグ
let isWaitChange = false;
// 入れ替えボタンを押せるかどうか(連打防止)
let canPushA = true;

// ブロック入れ替えに使うradians用の変数。
let r1 = 0;
let r2 = 0;

// 入れ替えに使う代替値
let rot1;
let rot2;
let rot3;
let rot4;

function BlockChangeAnimation( x1, x2, x3, x4, r1, r2)
{
  push();
  translate(spaceRight+blockSize/2+blockSize*selectX, spaceUp+blockSize/2+blockSize*selectY);

  if (r1 <= 180)
  {
    rotate(radians(r1));
    switch (x1)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }
    triangle(-blockSize/2, -blockSize/2, -blockSize/2, blockSize/2, blockSize/2, blockSize/2);


    switch (x2)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }
    triangle(-blockSize/2, -blockSize/2, blockSize/2, -blockSize/2, blockSize/2, blockSize/2);
  }
  pop();

  push();
  translate(spaceRight+blockSize/2+blockSize*(selectX+1), spaceUp+blockSize/2+blockSize*selectY);
  if (r2 <= 180)
  {
    rotate(radians(r2));
    switch (x3)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }


    triangle(-blockSize/2, -blockSize/2, -blockSize/2, blockSize/2, blockSize/2, blockSize/2);

    switch (x4)
    {
    case 0:
      noFill();
      noStroke();
      break;
    case 1:
      fill(255, 0, 0);
      stroke(0);
      break;
    case 2:
      fill(159, 255, 130);
      stroke(0);
      break;
    case 3:
      fill(104, 151, 255);
      stroke(0);
      break;
    case 4:
      fill(184, 41, 255);
      stroke(0);
      break;
    case 5:
      fill(222, 206, 0);
      stroke(0);
      break;
    case 6:
      noFill();
      noStroke();
      break;
    }

    triangle(-blockSize/2, -blockSize/2, blockSize/2, -blockSize/2, blockSize/2, blockSize/2);
  }
  pop();
}

function BlockChangeAndSlide()
{
  // ブロックのスライドアニメーションを実行するため、
  // 本来の入れ替え処理を遅らせて行う。
  if (isWaitSlide)
  {
    if (t1 <= 0) t1+= slideSpeed;
    if (t2 <= 180) t2+= slideSpeed;
    BlockSlideAnimation(temp1, temp2, temp3, temp4, t1, t2);
    if (millis() - startSlide >= slideTime)
    {
      table[2*selectX][selectY] = temp3;
      table[2*selectX+1][selectY] = temp4;
      table[2*(selectX+1)][selectY] = temp1;
      table[2*(selectX+1)+1][selectY] = temp2;


      // 値が6のまま重力によってこびりつくバグを修正。
      for (let i = 0; i< sizeX; i++)
      {
        for (let j = 0; j< sizeY; j++)
        {
          if (table[i][j] == 6)
          {
            table[i][j] = 0;
          } else
          {
            continue;
          }
        }
      }

      gravity();

      t1 = -180;
      t2 = 0;

      canPushS = true;
      isWaitSlide = false;
    }
  }

  // ブロックの中の三角形切り替えアニメーションを実行するため、
  // 本来の入れ替え処理を遅らせて行う。
  if (isWaitChange)
  {
    if (r1 <= 180) r1+= changeSpeed;
    if (r2 <= 180) r2+= changeSpeed;
    BlockChangeAnimation(rot1, rot2, rot3, rot4, r1, r2);
    if (millis() - startChange >= changeTime)
    {
      table[2*selectX][selectY] = rot2;
      table[2*selectX+1][selectY] = rot1;
      table[2*(selectX+1)][selectY] = rot4;
      table[2*(selectX+1)+1][selectY] = rot3;


      // 値が6のまま重力によってこびりつくバグを修正。
      for (let i = 0; i< sizeX; i++)
      {
        for (let j = 0; j< sizeY; j++)
        {
          if (table[i][j] == 6)
          {
            table[i][j] = 0;
          } else
          {
            continue;
          }
        }
      }

      gravity();

      r1 = 0;
      r2 = 0;

      canPushA = true;
      isWaitChange = false;
    }
  }
}

function fallBlocks()
{
  if (isGaming && !playingEnd && !isPause && !(trigger1 || trigger2 || trigger3 || trigger4 || trigger5 || trigger6) && !debug)
  {
    switch(intstate)
    {
    case 0:
      waitInterval = millis();
      intstate = 1;
      break;
    case 1:
      if (millis() - waitInterval >= interval)
      {
        intstate = 2;
      }
      break;
    case 2:
      let randomColor_1 = int(random(1, 6));
      let randomColor_2 = int(random(1, 6));


      let rdPosition = int(random(0, sizeX));

      if (rdPosition % 2 == 1)
      {
        rdPosition = rdPosition - 1;
      }

      if (table[rdPosition][0] == 0 && table[rdPosition+1][0] == 0)
      {
        table[rdPosition][0] = randomColor_1;
        table[rdPosition+1][0] = randomColor_2;
      }

      intstate = 0;
    }
  }
}

function blockGravity()
{
  switch(state)
  {
  case 0:
    // 三角形が四つ繋がった時の判定について
    triQuadCheck();
    waitStart = millis();
    state = 1;
    break;

  case 1:
    // 指定時間まで処理を待機
    if (millis() - waitStart >= waitTime)
    {
      state = 2;
    }
    break;

  case 2:
    // 消した分だけ上から補完する
    gravity();
    state = 0;
    break;
  }
}

// サウンド制御用に判定値を追加
let isAppeal = false;

function shapeAppeal()
{
  image(ScorePanel, textX-270, textY-50);
  fill(0);
  rect(textX-50, textY-40, 70, 20);
  fill(255);
  textSize(18);
  text("スキル", textX-20, textY-30);

  // スキルに合わせて、何のスキルが発動したかをテキスト&強調線表示
  if (trigger1 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }


    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero1 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：ヨコ", textX-10, textY+40);

    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    push();
    translate(-blockSize/2, 0);
    line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
      spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*startJ);
    line(spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*startJ,
      spaceRight+blockSize*(startI/2+3), spaceUp+blockSize*(startJ+1));
    line(spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+1),
      spaceRight+blockSize*(startI/2+3), spaceUp+blockSize*(startJ+1));
    line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
      spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+1));
    pop();
  } else
  {
    if (notAlphaZero1)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero1 = false;
    }
  }

  if (trigger2 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }


    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero2 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：タテ", textX-10, textY+40);

    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
      spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+1));
    line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
      spaceRight+blockSize*(startI/2), spaceUp+blockSize*(startJ+2));
    line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*(startJ+2),
      spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+3));
    line(spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+1),
      spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*(startJ+3));
  } else
  {
    if (notAlphaZero2)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero2 = false;
    }
  }

  if (trigger3 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }


    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero3 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：ナナメ", textX-10, textY+40);
    console.log(textX-10, textY+40);
    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    if (startI % 2 == 0)
    {
      line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
        spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+2));
      line(spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+2),
        spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+3));
      line(spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+3),
        spaceRight+blockSize*(startI/2), spaceUp+blockSize*(startJ+1));
      line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*(startJ+1),
        spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ);
    } else
    {
      push();
      translate(-blockSize/2, 0);
      line(spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ,
        spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*startJ);
      line(spaceRight+blockSize*(startI/2+1), spaceUp+blockSize*startJ,
        spaceRight+blockSize*(startI/2+3), spaceUp+blockSize*(startJ+2));
      line(spaceRight+blockSize*(startI/2+3), spaceUp+blockSize*(startJ+2),
        spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+2));
      line(spaceRight+blockSize*(startI/2+2), spaceUp+blockSize*(startJ+2),
        spaceRight+blockSize*(startI/2), spaceUp+blockSize*startJ);
      pop();
    }
  } else
  {
    if (notAlphaZero3)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero3 = false;
    }
  }

  if (trigger4 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }

    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero4 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：ヤジリ", textX-10, textY+40);

    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    if (startI % 2 == 0)
    {
      line(100+60*(startI/2), 150+60*startJ,
        100+60*(startI/2+1), 150+60*startJ);
      line(100+60*(startI/2+1), 150+60*startJ,
        100+60*(startI/2+2), 150+60*(startJ+1));
      line(100+60*(startI/2+2), 150+60*(startJ+1),
        100+60*(startI/2+1), 150+60*(startJ+1));
      line(100+60*(startI/2+1), 150+60*(startJ+1),
        100+60*(startI/2+1), 150+60*(startJ+2));
      line(100+60*(startI/2+1), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*(startJ+1));
      line(100+60*(startI/2), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*startJ);
    } else
    {
      push();
      translate(-blockSize/2, 0);
      line(100+60*(startI/2), 150+60*startJ,
        100+60*(startI/2+1), 150+60*startJ);
      line(100+60*(startI/2+1), 150+60*startJ,
        100+60*(startI/2+1), 150+60*(startJ-1));
      line(100+60*(startI/2+1), 150+60*(startJ-1),
        100+60*(startI/2+2), 150+60*startJ);
      line(100+60*(startI/2+2), 150+60*startJ,
        100+60*(startI/2+2), 150+60*(startJ+1));
      line(100+60*(startI/2+2), 150+60*(startJ+1),
        100+60*(startI/2+1), 150+60*(startJ+1));
      line(100+60*(startI/2+1), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*startJ);
      pop();
    }
  } else
  {
    if (notAlphaZero4)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero4 = false;
    }
  }

  if (trigger5 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }


    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero5 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：ピラミッド", textX-10, textY+40);

    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    if (startI % 2 == 0)
    {
      line(100+60*(startI/2), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ-1));
      line(100+60*(startI/2), 150+60*(startJ-1),
        100+60*(startI/2+2), 150+60*(startJ+1));
      line(100+60*(startI/2+2), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ+1));
    } else
    {
      push();
      translate(-blockSize/2, 0);
      line(100+60*(startI/2), 150+60*startJ,
        100+60*(startI/2+2), 150+60*startJ);
      line(100+60*(startI/2+2), 150+60*startJ,
        100+60*(startI/2+2), 150+60*(startJ+2));
      line(100+60*(startI/2+2), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*startJ);
      pop();
    }
  } else
  {
    if (notAlphaZero5)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero5 = false;
    }
  }

  if (trigger6 && skillDelayState == 1)
  {
    if (!isAppeal)
    {
      shapeNotice.play();
      shapeNotice.amp(SE_vol);
      isAppeal = true;
    }


    if (texAlpha <= 255)
    {
      texAlpha += 10;
    } else
    {
      notAlphaZero6 = true;
    }
    textSize(50);
    fill(255, 255, 255, texAlpha);
    text("スキル：ハート", textX-10, textY+40);

    strokeWeight(7);
    stroke(255, 255, 255, texAlpha);
    if (HeartInfo == 1)
    {
      line(100+60*(startI/2), 150+60*startJ,
        100+60*(startI/2+1), 150+60*startJ);
      line(100+60*(startI/2+1), 150+60*startJ,
        100+60*(startI/2+1), 150+60*(startJ+1));
      line(100+60*(startI/2+1), 150+60*(startJ+1),
        100+60*(startI/2+2), 150+60*(startJ+1));
      line(100+60*(startI/2+2), 150+60*(startJ+1),
        100+60*(startI/2+2), 150+60*(startJ+2));
      line(100+60*(startI/2+2), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*(startJ+2));
      line(100+60*(startI/2), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*(startJ));
    }
    if (HeartInfo == 2)
    {
      line(100+60*(startI/2), 150+60*startJ,
        100+60*(startI/2+1), 150+60*startJ);
      line(100+60*(startI/2+1), 150+60*startJ,
        100+60*(startI/2+1), 150+60*(startJ+2));
      line(100+60*(startI/2+1), 150+60*(startJ+2),
        100+60*(startI/2-1), 150+60*(startJ+2));
      line(100+60*(startI/2-1), 150+60*(startJ+2),
        100+60*(startI/2-1), 150+60*(startJ+1));
      line(100+60*(startI/2-1), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ+1));
      line(100+60*(startI/2), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ));
    }
    if (HeartInfo == 3)
    {
      line(100+60*(startI/2), 150+60*(startJ),
        100+60*(startI/2+2), 150+60*(startJ));
      line(100+60*(startI/2+2), 150+60*(startJ),
        100+60*(startI/2+2), 150+60*(startJ+2));
      line(100+60*(startI/2+2), 150+60*(startJ+2),
        100+60*(startI/2+1), 150+60*(startJ+2));
      line(100+60*(startI/2+1), 150+60*(startJ+2),
        100+60*(startI/2+1), 150+60*(startJ+1));
      line(100+60*(startI/2+1), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ+1));
      line(100+60*(startI/2), 150+60*(startJ+1),
        100+60*(startI/2), 150+60*(startJ));
    }
    if (HeartInfo == 4)
    {
      line(100+60*(startI/2), 150+60*(startJ),
        100+60*(startI/2+2), 150+60*(startJ));
      line(100+60*(startI/2+2), 150+60*(startJ),
        100+60*(startI/2+2), 150+60*(startJ+1));
      line(100+60*(startI/2+2), 150+60*(startJ+1),
        100+60*(startI/2+1), 150+60*(startJ+1));
      line(100+60*(startI/2+1), 150+60*(startJ+1),
        100+60*(startI/2+1), 150+60*(startJ+2));
      line(100+60*(startI/2+1), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*(startJ+2));
      line(100+60*(startI/2), 150+60*(startJ+2),
        100+60*(startI/2), 150+60*(startJ));
    }
  } else
  {
    if (notAlphaZero6)
    {
      texAlpha = 0;
      isAppeal = false;
      notAlphaZero6 = false;
    }
  }
  strokeWeight(4);
}

function showAnimation()
{
  if (trigger1 && isfirstDelayed) {
    anim_Yoko();
    rectX = startI/2;
    rectY = startJ;
  }
  if (trigger2 && isfirstDelayed) {
    anim_Tate();
    rectX = startI/2;
    rectY = startJ;
  }
  if (trigger3 && isfirstDelayed) {
    anim_Naname();
    rectX = startI/2;
    rectY = startJ;
  }
  if (trigger4 && isfirstDelayed) {
    anim_Yajiri();
    rectX = startI/2;
    rectY = startJ;
  }
  if (trigger5 && isfirstDelayed) {
    anim_Pyramid();
    rectX = startI/2;
    rectY = startJ;
  }
  if (trigger6 && isfirstDelayed) {
    anim_Heart();
    rectX = startI/2;
    rectY = startJ;
  }
}

function skillTwiceDelay()
{
  switch(skillDelayState)
  {
  case 0:
    firstTimer = millis();
    skillDelayState = 1;
    break;
  case 1:
    if (trigger1 && millis() - firstTimer >= firstDelay1 && !isfirstDelayed) {
      HeartMode = false;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    } else if (trigger2 && millis() - firstTimer >= firstDelay2 && !isfirstDelayed) {
      HeartMode = false;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    } else if (trigger3 && millis() - firstTimer >= firstDelay3 && !isfirstDelayed) {
      HeartMode = false;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    } else if (trigger4 && millis() - firstTimer >= firstDelay4 && !isfirstDelayed) {
      HeartMode = false;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    } else if (trigger5 && millis() - firstTimer >= firstDelay5 && !isfirstDelayed) {
      HeartMode = false;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    } else if (trigger6 && millis() - firstTimer >= firstDelay6 && !isfirstDelayed) {
      HeartMode = true;
      isfirstDelayed = true;
      secondTimer = millis();
      skillDelayState = 2;
    }
    break;

  case 2:
    if (trigger1 && millis() - secondTimer >= secondDelay1) {
      Score += point_Yoko;
      issecondDelayed = true;


      // 崩壊サウンドを追加
      destroyShort.play();
      destroyShort.amp(SE_vol);

      isfirstDelayed = false;
      trigger1 = false;
      skillDelayState = 3;
    } else if (trigger2 && millis() - secondTimer >= secondDelay2) {
      Score += point_Tate;
      issecondDelayed = true;

      // 崩壊サウンドを追加
      destroyShort.play();
      destroyShort.amp(SE_vol);

      isfirstDelayed = false;
      trigger2 = false;
      skillDelayState = 3;
    } else if (trigger3 && millis() - secondTimer >= secondDelay3) {
      Score += point_Naname;
      issecondDelayed = true;

      // 崩壊サウンドを追加
      destroyShort.play();
      destroyShort.amp(SE_vol);

      isfirstDelayed = false;
      trigger3 = false;
      skillDelayState = 3;
    } else if (trigger4 && millis() - secondTimer >= secondDelay4) {
      Score += point_Yajiri;
      issecondDelayed = true;

      // 崩壊サウンドを追加
      destroyLong.play();
      destroyLong.amp(SE_vol);

      isfirstDelayed = false;
      trigger4 = false;
      skillDelayState = 3;
    } else if (trigger5 && millis() - secondTimer >= secondDelay5) {
      Score += point_Pyramid;
      issecondDelayed = true;

      // 崩壊サウンドを追加
      destroyLong.play();
      destroyLong.amp(SE_vol);

      isfirstDelayed = false;
      trigger5 = false;
      skillDelayState = 3;
    } else if (trigger6 && millis() - secondTimer >= secondDelay6) {
      Score += point_Heart;
      issecondDelayed = true;

      // 崩壊サウンドを追加
      destroyLong.play();
      destroyLong.amp(SE_vol);

      isfirstDelayed = false;
      trigger6 = false;
      skillDelayState = 3;
    }
    break;



  case 3:
    if (issecondDelayed) {
      resetStates(); // フラグとステートのリセット
    }
    break;
  }
}

function resetStates()
{
  // 全てのフラグやステートをリセット
  //isfirstDelayed = false;
  //issecondDelayed = false;
  animNaY = 15*sqrt(2)-4;
  animY = 25;
  rectHeight = 10;
  rectAlpha = 255;
  triAlpha = 0;
  PysumTx = 0;
  skillDelayState = -1; // 待機状態に戻す
  trigger1 = trigger2 = trigger3 = trigger4 = trigger5 = trigger6 = false; // トリガーリセット
}

// 色の透明度が最大値になった時にtrueになる。
let notAlphaZero1 = false;
let notAlphaZero2 = false;
let notAlphaZero3 = false;
let notAlphaZero4 = false;
let notAlphaZero5 = false;
let notAlphaZero6 = false;

// 強調線を描画する際に役立てるi,j情報
let startI = 0;
let startJ = 0;
let HeartInfo = 0;

// 各スキルのアニメーション時間を考慮し、消去待機時間を調整できるように
// ステート管理によるタイマー(初期値は-1、適宜0にして発動。)
let skillDelayState = -1;
let isWaitState = true;

// スキル種類を検出
let trigger1 = false;// ヨコ
let trigger2 = false;// タテ
let trigger3 = false;// ナナメ
let trigger4 = false;// ヤジリ
let trigger5 = false;// ピラミッド
let trigger6 = false;// ハート

// 強調表示する時間
let firstTimer = 0;

let firstDelay1 = 2000;
let firstDelay2 = 2000;
let firstDelay3 = 2000;
let firstDelay4 = 2000;
let firstDelay5 = 2000;
let firstDelay6 = 2000;

let isfirstDelayed = false;

// アニメーション処理をする時間
let secondTimer = 0;

let secondDelay1 = 600;
let secondDelay2 = 600;
let secondDelay3 = 600;
let secondDelay4 = 700;
let secondDelay5 = 2000;
let secondDelay6 = 2000;

let issecondDelayed = false;

// タテ・ヨコのアニメーションで使う変数
let rectX = 0;
let rectY = 0;
let rectAlpha = 255;
let rectHeight = 10;
let animY = 25;

// ナナメのアニメーションで使う変数
//let animNaY = 15*sqrt(2)-4;

// アニメーション後の6で保管する時間
let followThrough = 0;
let appealTime = 2000;

// タテヨコナナメのビーム音判定
let isbeamSound = false;

//////////////////////////////////////////////////////////////////////
// スキル演出のアニメーション

function anim_Yoko()
{
  if (!isbeamSound)
  {
    beamSound.play();
    beamSound.amp(SE_vol);
    isbeamSound = true;
  }
  let speed = 2;
  if (rectHeight <= 60)
  {
    rectHeight += speed;
    animY -= speed/2;
  }

  if (rectHeight >= 60)
  {
    rectAlpha -= 17;
  }
  noStroke();
  fill(255, 255, 0, rectAlpha);
  rect(100, 150+60*rectY+animY, 60*sizeX/2, rectHeight);

  if (rectAlpha <= 100)
  {
    isbeamSound = false;
    isfirstDelayed = false;


    animY = 25;
    rectHeight = 10;
  }
}

function anim_Tate()
{
  if (!isbeamSound)
  {
    beamSound.play();
    beamSound.amp(SE_vol);
    isbeamSound = true;
  }

  let speed = 2;
  if (rectHeight <= 60)
  {
    rectHeight += speed;
    animY -= speed/2;
  }

  if (rectHeight >= 60)
  {
    rectAlpha -= 17;
  }
  noStroke();
  fill(255, 255, 0, rectAlpha);
  rect(100+60*rectX+animY, 150, rectHeight, 60*sizeY);

  if (rectAlpha <= 100)
  {
    isbeamSound = false;
    isfirstDelayed = false;


    animY = 25;
    rectHeight = 10;
  }
}


function anim_Naname() {
  if (!isbeamSound) {
    beamSound.play();
    beamSound.amp(SE_vol);
    isbeamSound = true;
  }
  push();
  clip(mask_naname);
  if (startI % 2 == 0 && rectY + ((sizeX / 2 - 1) - rectX) >= sizeX / 2 - 1) {
    // 上の条件の場合、rectY-rectXは負の値を取らないので、座標基準点は下
    translate(100, 150 + 60 * (rectY - rectX));
  } else if (startI % 2 == 1 && rectY + ((sizeX / 2 - 1) - rectX) >= sizeX / 2 - 1) {
    translate(100 - blockSize/2, 150 + 60 * (rectY - rectX - 1));
  } else if (startI % 2 == 1 && rectY + ((sizeX / 2 - 1) - rectX) < sizeX / 2 - 1) {
    // そうでなく、startI % 2 == 0 または startI % 2 == 1
    // で、rectY-rectX>=0が成り立たない可能性がある場合、
    translate(100 + 60 * (rectX - rectY), 150 - 60);
  } else if (startI % 2 == 0 && rectY + ((sizeX / 2 - 1) - rectX) < sizeX / 2 - 1) {
    translate(100 + 60 * (rectX - rectY - 1), 150 - 60);
  }
  rotate(radians(45));

  let speed = 2;
  if (rectHeight <= 30 * sqrt(2)) {
    rectHeight += speed;
    animNaY -= speed / 2;
  }

  if (rectHeight >= 30 * sqrt(2)) {
    rectAlpha -= 17;
  }
  noStroke();
  fill(255, 255, 0, rectAlpha);
  rect(0, 0 + animNaY, 1000 * sqrt(2), rectHeight);

  if (rectAlpha <= 0) {
    isbeamSound = false;
    isfirstDelayed = false;

    animNaY = 15 * sqrt(2) - 4;
    rectHeight = 10;
  }
  pop();

  /*// ↑↑↑ ここまでをアロー関数の中に入れる ↑↑↑
   
   }00, 150, 60 * sizeX / 2, 60 * sizeY); // クリッピング領域の指定
   
   // この方法なら noclip() は不要です
   //
   */
}
function mask_naname() {
  rect(spaceRight, spaceUp, blockSize*6, blockSize*10);
}

// ヤジリアニメーションに使う変数
// ヤジリが通り過ぎる時の速さ
let tx = 12;
// フレームごとの動いた距離の総数
let sumTx = 0;
// ヤジリの色が画面の動きに沿って変わってしまうため、
// 判定時の色のみ取得する変数を追加。
let getYajiriColor = true;
let yajiriColor = 0;

let isYajiriSound = false;

function mask_Yajiri() {
  rect(100, 150, 60 * sizeX / 2, 60 * sizeY); // クリッピング領域の指定
}

function anim_Yajiri() {
  if (!isYajiriSound) {
    YajiriSound.play();
    YajiriSound.amp(SE_vol);
    isYajiriSound = true;
  }
  push();
  clip(mask_Yajiri);

  push();

  // T字のヤジリ(移動方向負)座標には2パターンあり。
  let Dx1 = 100 + 60 * sizeX / 2;
  let Dy1 = 150 + 60 * (sizeX / 2 - (rectX - rectY));
  let Dx2 = 100 + 60 * (sizeY - (rectY - rectX));
  let Dy2 = 150 + 60 * sizeY;

  // 逆T時のヤジリ(移動方向正)
  let Dx3 = 100;
  let Dy3 = 150 + 60 * ((rectY + 1) - (rectX + 2));
  let Dx4 = 100 + 60 * ((rectX + 2) - (rectY + 1));
  let Dy4 = 150;

  // T字判定の時
  if (startI % 2 == 0 && sizeX / 2 - 1 - rectX <= sizeY - 1 - rectY) {
    translate(Dx1 - sumTx, Dy1 - sumTx);
  } else if (startI % 2 == 0 && sizeX / 2 - 1 - rectX > sizeY - 1 - rectY) {
    translate(Dx2 - sumTx, Dy2 - sumTx);
  }

  // 逆T字判定の時
  if (startI % 2 == 1 && sizeX / 2 - 1 - rectX >= sizeY - 1 - rectY) {
    translate(Dx3 + sumTx, Dy3 + sumTx);
  } else if (startI % 2 == 1 && sizeX / 2 - 1 - rectX < sizeY - 1 - rectY) {
    translate(Dx4 + sumTx, Dy4 + sumTx);
  }

  // とりあえず色は白で代用
  fill(255);

  if (startI % 2 == 0) {
    triangle(0, 0, 0, 60, 60, 60);
    triangle(0, 0, 60, 0, 60, 60);
    triangle(60, 0, 120, 60, 60, 60);
    triangle(0, 60, 60, 60, 60, 120);
  } else {
    push();
    translate(-blockSize/2,0);
    triangle(0, 0, 0, -60, -60, -60);
    triangle(0, 0, -60, 0, -60, -60);
    triangle(0, -60, -60, -120, -60, -60);
    triangle(-60, -60, -60, 0, -120, -60);
    pop();
  }

  sumTx += tx;

  if (Dx1 - sumTx <= -20 || Dx2 - sumTx <= -20 || Dy1 - sumTx <= -20 || Dy2 - sumTx <= -20) {
    console.log("到達！！");
    isfirstDelayed = false;
    isYajiriSound = false;
    getYajiriColor = true;
  } else if (Dx3 + sumTx >= 580 || Dx4 + sumTx >= 580 || Dy3 + sumTx >= 870 || Dy4 + sumTx >= 870) {
    console.log("逆到達！！");
    isfirstDelayed = false;
    isYajiriSound = false;
    getYajiriColor = true;
  }

  pop();
  pop();
}



// 三角形の色の濃さ
let triAlpha = 0;
// 三角形が拡大する速さ
let PyrTx = 5;
let PysumTx = 0;
// 表示時間
//let showTime = 200;
let showPyramid = showTime;

// サウンド用
let isExpand = false;

function anim_Pyramid() {
  // 修正点：クリッピングしたい処理全体をアロー関数で囲み、clipの第一引数に渡す
  push();
  clip(mask_Pyramid);
  triAlpha += 5;
  push();
  // L字判定の時
  if (startI % 2 == 0) {

    fill(255, 255, 0, triAlpha);
    stroke(0);
    translate(spaceRight + blockSize * rectX, spaceUp + blockSize * (rectY + 1));
    // 形を複製&拡大
    triangle(0, 0, 0, -blockSize - PysumTx, blockSize + PysumTx, 0);
    triangle(0, -blockSize - PysumTx, blockSize + PysumTx, -blockSize - PysumTx, blockSize + PysumTx, 0);
    triangle(0, -blockSize - PysumTx, 0, -blockSize * 2 - PysumTx * 2, blockSize + PysumTx, -blockSize - PysumTx);
    triangle(blockSize + PysumTx, 0, blockSize * 2 + PysumTx * 2, 0, blockSize + PysumTx, -blockSize - PysumTx);
  } else { // R字判定の時
    push();
    translate(-blockSize/2, 0);
    fill(255, 255, 0, triAlpha);
    stroke(0);
    translate(spaceRight + blockSize * (rectX + 2), spaceUp + blockSize * (rectY));
    // 形を複製&拡大
    triangle(0, 0, -blockSize - PysumTx, 0, 0, blockSize + PysumTx);
    triangle(0, blockSize + PysumTx, -blockSize - PysumTx, 0, -blockSize - PysumTx, blockSize + PysumTx);
    triangle(-blockSize - PysumTx, 0, -blockSize * 2 - PysumTx * 2, 0, -blockSize - PysumTx, blockSize + PysumTx);
    triangle(-blockSize - PysumTx, blockSize + PysumTx, 0, blockSize + PysumTx, 0, blockSize * 2 + PysumTx * 2);
    pop();
  }

  if (triAlpha >= 255 && PysumTx < blockSize) {
    if (!isExpand) {
      pyramidExpand.play();
      pyramidExpand.amp(SE_vol);
      isExpand = true;
    }
    PysumTx += PyrTx;
  }

  if (PysumTx >= blockSize) {
    isExpand = false;
    --showPyramid;
  }

  if (showPyramid <= 0) {
    //triAlpha = 0;
    //PysumTx = 0;
    isfirstDelayed = false;
  }

  pop();
  pop();

  // ↑↑↑ ここまでをアロー関数の中に入れる ↑↑↑
}
function mask_Pyramid() {
  rect(spaceRight, spaceUp, blockSize*sizeX/2, blockSize*sizeY);
}

let HeartTag1 = false;
let HeartTag2 = false;
let HeartTag3 = false;
let HeartTag4 = false;

function mask_Heart() {
  rect(spaceRight, spaceUp, blockSize*sizeX/2, blockSize*sizeY);
}
function anim_Heart()
{
  // 拡大系
  push();
  clip(mask_Heart);
  // 拡大系
  // 形を複製したら、拡大してバラバラに散る。
  triAlpha += 5;
  push();
  // L字判定の時
  if (HeartTag1)
  {
    console.log("hogehoge(1)");
    fill(255, 0, 0, triAlpha);
    stroke(0);
    translate(spaceRight+blockSize*rectX, spaceUp+blockSize*(rectY+2));
    // 形を複製&拡大
    triangle(0, 0, 0, -blockSize-PysumTx, blockSize+PysumTx, 0);
    triangle(0, -blockSize-PysumTx, blockSize+PysumTx, -blockSize-PysumTx, blockSize+PysumTx, 0);
    triangle(0, -blockSize-PysumTx, 0, -blockSize*2-PysumTx*2, blockSize+PysumTx, -blockSize-PysumTx);
    triangle(blockSize+PysumTx, 0, blockSize*2+PysumTx*2, 0, blockSize+PysumTx, -blockSize-PysumTx);
    triangle(0, -blockSize*2-PysumTx*2, blockSize+PysumTx, -blockSize*2-PysumTx*2, blockSize+PysumTx, -blockSize-PysumTx);
    triangle(blockSize+PysumTx, -blockSize-PysumTx, blockSize*2+PysumTx*2, 0, blockSize*2+PysumTx*2, -blockSize-PysumTx);
  } else if (HeartTag2)
  {
    console.log("hogehoge(2)");
    fill(255, 0, 0, triAlpha);
    stroke(0);
    translate(spaceRight+blockSize*(rectX+1), spaceUp+blockSize*(rectY+2));
    // 形を複製&拡大
    triangle(0, 0, -blockSize-PysumTx, 0, -blockSize-PysumTx, -blockSize-PysumTx);
    triangle(0, 0, 0, -blockSize-PysumTx, -blockSize-PysumTx, -blockSize-PysumTx);
    triangle(0, -blockSize-PysumTx, -blockSize-PysumTx, -blockSize-PysumTx, -blockSize-PysumTx, -blockSize*2-PysumTx*2);
    triangle(0, -blockSize-PysumTx, 0, -blockSize*2-PysumTx*2, -blockSize-PysumTx, -blockSize*2-PysumTx*2);
    triangle(-blockSize-PysumTx, 0, -blockSize*2-PysumTx*2, 0, -blockSize*2-PysumTx*2, -blockSize-PysumTx);
    triangle(-blockSize-PysumTx, 0, -blockSize-PysumTx, -blockSize-PysumTx, -blockSize*2-PysumTx*2, -blockSize-PysumTx);
  } else if (HeartTag3)
  {
    console.log("hogehoge(3)");
    fill(255, 0, 0, triAlpha);
    stroke(0);
    translate(spaceRight+blockSize*(rectX+2), spaceUp+blockSize*rectY);
    // 形を複製&拡大
    triangle(0, 0, 0, blockSize+PysumTx, -blockSize-PysumTx, 0);
    triangle(-blockSize-PysumTx, 0, 0, blockSize+PysumTx, -blockSize-PysumTx, blockSize+PysumTx);
    triangle(-blockSize-PysumTx, 0, -blockSize*2-PysumTx*2, 0, -blockSize-PysumTx, blockSize+PysumTx);
    triangle(0, blockSize+PysumTx, 0, blockSize*2+PysumTx*2, -blockSize-PysumTx, blockSize+PysumTx);
    triangle(-blockSize-PysumTx, blockSize+PysumTx, -blockSize*2-PysumTx*2, blockSize+PysumTx, -blockSize*2-PysumTx*2, 0);
    triangle(-blockSize-PysumTx, blockSize+PysumTx, 0, blockSize*2+PysumTx*2, -blockSize-PysumTx, blockSize*2+PysumTx*2);
  } else if (HeartTag4)
  {
    console.log("hogehoge(4)");
    fill(255, 0, 0, triAlpha);
    stroke(0);
    translate(spaceRight+blockSize*rectX, spaceUp+blockSize*rectY);
    // 形を複製&拡大
    triangle(0, 0, 0, blockSize+PysumTx, blockSize+PysumTx, blockSize+PysumTx);
    triangle(0, 0, blockSize+PysumTx, 0, blockSize+PysumTx, blockSize+PysumTx);
    triangle(blockSize+PysumTx, 0, blockSize+PysumTx, blockSize+PysumTx, blockSize*2+PysumTx*2, blockSize+PysumTx);
    triangle(blockSize+PysumTx, 0, blockSize*2+PysumTx*2, 0, blockSize*2+PysumTx*2, blockSize+PysumTx);
    triangle(0, blockSize+PysumTx, 0, blockSize*2+PysumTx*2, blockSize+PysumTx, blockSize*2+PysumTx*2);
    triangle(0, blockSize+PysumTx, blockSize+PysumTx, blockSize+PysumTx, blockSize+PysumTx, blockSize*2+PysumTx*2);
  }

  if (triAlpha >= 255 && PysumTx < blockSize)
  {
    if (!isExpand)
    {
      pyramidExpand.play();
      pyramidExpand.amp(SE_vol);
      isExpand = true;
    }
    PysumTx += PyrTx;
  }

  if (PysumTx >= blockSize)
  {
    isExpand = false;
    --showPyramid;
  }

  if (showPyramid <= 0)
  {
    //triAlpha = 0;


    //PysumTx = 0;
    isfirstDelayed = false;
  }

  pop();
  pop();
}
/////////////////////////////////////////////////////////////////////

// どの四角形を選んでいるか表示する(現状rect表示)
function drawCursor(x, y)
{
  fill(255, 255, 0);
  noStroke();
  rect(100+60*x, 150+60*y, 15, 5);
  rect(100+60*x, 150+60*y, 5, 15);

  rect(100+60*x, 210+60*y, 15, -5);
  rect(100+60*x, 210+60*y, 5, -15);

  rect(220+60*x, 150+60*y, -15, 5);
  rect(220+60*x, 150+60*y, -5, 15);

  rect(220+60*x, 210+60*y, -15, -5);
  rect(220+60*x, 210+60*y, -5, -15);
}

function gravity()
{
  for (let i = 0; i < sizeX; i++)
  {
    for (let j = 0; j < sizeY; j++)
    {
      if (!(trigger1 || trigger2 || trigger3 || trigger4 || trigger5 || trigger6))
      {
        // ブロックが空の場合は上の配列要素を渡し、一段下げる。
        if (i%2==0 && i+1 < sizeX && j+1 < sizeY
          && table[i][j+1] == 0
          && table[i+1][j+1] == 0)
        {
          let temp = table[i][j+1];
          table[i][j+1] = table[i][j];
          table[i][j] = temp;


          temp = table[i+1][j+1];
          table[i+1][j+1] = table[i+1][j];
          table[i+1][j] = temp;
        }

        // ある特定の条件の下で、三角形が浮いている様に見えるため
        // そこは組み合わさるように調整。探索開始点は一緒。
        if (i%2 == 0 && i%2==0 && i+1 < sizeX && j+1 < sizeY
          && table[i][j] == 0
          && table[i+1][j+1] == 0)
        {
          let temp = table[i+1][j+1];
          table[i+1][j+1] = table[i+1][j];
          table[i+1][j] = temp;
        }
      }
    }
  }
}

function load_triQuadCheck()
{
  for (let i = 0; i < sizeX; i++)
  {
    for (let j = 0; j < sizeY; j++)
    {
      // 判定開始位置について、偶奇を判定に入れないと大変なことになる。8/19追記　開始位置はさらに0出ないことが条件
      if (table[i][j] != 0 && table[i][j] != 6)
      {
        // 「ナナメ」判定について
        if (i + 3 < sizeX && j + 2 < sizeY)
        {
          if (i % 2 == 0
            && table[i][j] == table[i+1][j+1]
            && table[i+1][j+1] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+2])
          {
            table[i][j] = 0;
            table[i+1][j+1] = 0;
            table[i+2][j+1] = 0;
            table[i+3][j+2] = 0;
          }
        }


        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 1
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            table[i][j] = 0;
            table[i+1][j] = 0;
            table[i+2][j+1] = 0;
            table[i+3][j+1] = 0;
          }
        }

        // 「タテ」判定について
        if (i + 1 < sizeX && j + 2 < sizeY)
        {
          if (i % 2 == 0 && table[i][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1]
            && table[i+1][j+1] == table[i+1][j+2])
          {
            table[i][j] = 0;
            table[i][j+1] = 0;
            table[i+1][j+1] = 0;
            table[i+1][j+2] = 0;
          }
        }

        // 「ヨコ」判定について
        if (i + 3 < sizeX && i % 2 == 1
          && table[i][j] == table[i+1][j]
          && table[i+1][j] == table[i+2][j]
          && table[i+2][j] == table[i+3][j])
        {
          table[i][j] = 0;
          table[i+1][j] = 0;
          table[i+2][j] = 0;
          table[i+3][j] = 0;
        }

        // 「ハート」判定について (ハートの形についてはマス１つから判定する方法が無いので、スキル引数を追加し、その値によって判定。)
        // 左上型
        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1]
            && table[i+1][j+1] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            table[i][j] = table[i+1][j] = table[i][j+1] = table[i+1][j+1] = table[i+2][j+1] = table[i+3][j+1] = 0;
          }
        }

        // 右上型
        if (i - 2 >= 0 && j + 1 < sizeY)
        {
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i-2][j+1]
            && table[i-2][j+1] == table[i-1][j+1]
            && table[i-1][j+1] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1])
          {
            table[i][j] = table[i+1][j] = table[i-2][j+1] = table[i-1][j+1] = table[i][j+1] = table[i+1][j+1] = 0;
          }
        }

        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          // 右下型
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j]
            && table[i+2][j] == table[i+3][j]
            && table[i+3][j] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            table[i][j] = table[i+1][j] = table[i+2][j] = table[i+3][j] = table[i+2][j+1] = table[i+3][j+1] = 0;
          }

          // 左下型
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j]
            && table[i+2][j] == table[i+3][j]
            && table[i+3][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1])
          {
            table[i][j] = table[i+1][j] = table[i+2][j] = table[i+3][j] = table[i][j+1] = table[i+1][j+1] = 0;
          }
        }

        // 「ピラミッド」判定について
        // L字判定
        if (i + 2 < sizeX && j - 1 >= 0)
        {
          if (i % 2 == 0 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i][j-1])
          {
            table[i][j] = 0;
            table[i+1][j] = 0;
            table[i+2][j] = 0;
            table[i][j-1] = 0;
          }
        }

        // R字判定
        if (i + 2 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 1 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +2][j+1])
          {
            table[i][j] = 0;
            table[i+1][j] = 0;
            table[i+2][j] = 0;
            table[i+2][j+1] = 0;
          }
        }

        // 「ヤジリ」判定について
        // T字判定
        if (i + 2 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 0 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +1][j +1])
          {
            table[i][j] = 0;
            table[i +1][j] = 0;
            table[i +2][j] = 0;
            table[i +1][j +1] = 0;
          }
        }
        // 逆T字判定
        if (i + 2 < sizeX && j - 1 >= 0)
        {
          if (i % 2 == 1 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +1][j -1])
          {
            table[i][j] = 0;
            table[i +1][j] = 0;
            table[i +2][j] = 0;
            table[i +1][j -1] = 0;
          }
        }

        // 「カギ」判定について
        if (!(trigger1 || trigger2 || trigger3 || trigger4 || trigger5 || trigger6))
        {
          // 右下型上
          if (i + 3 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i+2][j]
              && table[i+2][j] == table[i+3][j+1])
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i+3][j+1] = 0;
            }
          }

          // 右下型下
          if (i + 2 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i+1][j+1]
              && table[i+1][j+1] == table[i+2][j+1])
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+1][j+1] = 0;
              table[i+2][j+1] = 0;
            }
          }

          // 左上型下
          if (i - 2 >= 0 && j - 1 >= 0)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i-1][j]
              && table[i-1][j] == table[i-2][j-1])
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i-1][j] = 0;
              table[i-2][j-1] = 0;
            }
          }

          // 左上型上
          if (i-1 >= 0 && j-1 >= 0)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i][j-1]
              && table[i][j-1] == table[i-1][j-1])
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i][j-1] = 0;
              table[i-1][j-1] = 0;
            }
          }

          // 「ハコ」判定について
          // タテ型
          if (i + 1 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0 && table[i][j] == table[i+1][j]&& table[i+1][j] == table[i][j+1]&& table[i][j+1] == table[i+1][j+1])
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i][j+1] = 0;
              table[i+1][j+1] = 0;
            }
          }
          // ヨコ型
          if (i + 3 < sizeX && i % 2 == 0 && table[i][j] != 6 && table[i][j] == table[i+1][j]&& table[i+1][j] == table[i+2][j] && table[i+2][j] == table[i+3][j])
          {
            if (j-1 >= 0 && table[i+2][j-1] != table[i][j])
            {
              if ((i-1 >= 0 && table[i-1][j] == table[i][j]) || (i+4 < sizeX && table[i+4][j] == table[i][j]))
              {
              } else
              {
                table[i][j] = 0;
                table[i+1][j] = 0;
                table[i+2][j] = 0;
                table[i+3][j] = 0;
              }
            }
          }
        }
      }
    }
  }
}

function triQuadCheck()
{
  for (let i = 0; i < sizeX; i++)
  {
    for (let j = 0; j < sizeY; j++)
    {
      // 判定開始位置について、偶奇を判定に入れないと大変なことになる。8/19追記　開始位置はさらに0出ないことが条件
      if (table[i][j] != 0 && table[i][j] != 6)
      {
        // 「ナナメ」判定について
        if (i + 3 < sizeX && j + 2 < sizeY)
        {
          if (i % 2 == 0&& table[i][j] == table[i+1][j+1]&& table[i+1][j+1] == table[i+2][j+1]&& table[i+2][j+1] == table[i+3][j+2])
          {
            //table[i][j] = 0;
            //table[i+1][j+1] = 0;
            //table[i+2][j+1] = 0;
            //table[i+3][j+2] = 0;
            //console.log("ナナメ判定されてるよ");
            //console.log("table[i][j] = "+table[i][j]);
            //console.log("table[i+1][j+1] = "+table[i+1][j+1]);
            //console.log("table[i+2][j+1] = "+table[i+2][j+1]);
            //console.log("table[i+3][j+2] = "+table[i+3][j+2]);
            startI = i;
            startJ = j;


            if (isWaitState)
            {
              trigger3 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              skill_Naname(i, j);
              issecondDelayed = false;
            }
            return;
          }
        }

        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 1&& table[i][j] == table[i+1][j]&& table[i+1][j] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            //table[i][j] = 0;
            //table[i+1][j] = 0;
            //table[i+2][j+1] = 0;
            //table[i+3][j+1] = 0;
            //console.log("ナナメ判定されてるよ");
            //console.log("table[i][j] = "+table[i][j]);
            //console.log("table[i+1][j] = "+table[i+1][j]);
            //console.log("table[i+2][j+1] = "+table[i+2][j+1]);
            //console.log("table[i+3][j+1] = "+table[i+3][j+1]);
            startI = i;
            startJ = j;

            if (isWaitState)
            {
              trigger3 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              skill_Naname(i, j);

              issecondDelayed = false;
            }

            return;
          }
        }

        // 「タテ」判定について
        if (i + 1 < sizeX && j + 2 < sizeY)
        {
          if (i % 2 == 0 && table[i][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1]
            && table[i+1][j+1] == table[i+1][j+2])
          {
            //table[i][j] = 0;
            //table[i][j+1] = 0;
            //table[i+1][j+1] = 0;
            //table[i+1][j+2] = 0;
            startI = i;
            startJ = j;

            if (isWaitState)
            {
              trigger2 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {

              // パーティクル呼び出し
              for (let k = 0; k < sizeY; k++)
              {
                for (let p = 0; p < 50; p++)
                {
                  if (table[i][k] != 0 && table[i+1][k] != 0)particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(k+0.25)));
                }
              }

              skill_Tate(i, j);
              issecondDelayed = false;
            }

            return;
          }
        }

        // 「ヨコ」判定について
        if (i + 3 < sizeX && i % 2 == 1
          && table[i][j] == table[i+1][j]
          && table[i+1][j] == table[i+2][j]
          && table[i+2][j] == table[i+3][j])
        {
          //table[i][j] = 0;
          //table[i+1][j] = 0;
          //table[i+2][j] = 0;
          //table[i+3][j] = 0;
          startI = i;
          startJ = j;

          if (isWaitState)
          {
            trigger1 = true;
            skillDelayState = 0;
            isWaitState = false;
          }
          if (issecondDelayed)
          {

            console.log("ヨコパーティクル");
            // パーティクル呼び出し
            for (let k = 0; k < sizeX/2; k++)
            {
              for (let p = 0; p < 50; p++)
              {
                if (table[k][j] != 0)particles.push(new Particle(spaceRight+blockSize*(k+0.5), spaceUp+blockSize*(j+0.25)));
              }
            }
            skill_Yoko(i, j);

            issecondDelayed = false;
          }

          return;
        }

        // 「ハート」判定について (ハートの形についてはマス１つから判定する方法が無いので、スキル引数を追加し、その値によって判定。)
        // 左上型
        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1]
            && table[i+1][j+1] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            startI = i;
            startJ = j;
            HeartInfo = 1;

            if (isWaitState)
            {
              trigger6 = true;
              skillDelayState = 0;
              HeartTag1 = true;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i][j+1] = 0;
              table[i+1][j+1] = 0;
              table[i+2][j+1] = 0;
              table[i+3][j+1] = 0;

              skill_Heart(i, j, 1);

              issecondDelayed = false;
            }

            return;
          }
        }

        // 右上型
        if (i - 2 >= 0 && j + 1 < sizeY)
        {
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i-2][j+1]
            && table[i-2][j+1] == table[i-1][j+1]
            && table[i-1][j+1] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1])
          {
            startI = i;
            startJ = j;
            HeartInfo = 2;

            if (isWaitState)
            {
              trigger6 = true;
              skillDelayState = 0;
              HeartTag2 = true;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j]= 0;
              table[i+1][j]= 0;
              table[i-2][j+1]= 0;
              table[i-1][j+1]= 0;
              table[i][j+1]= 0;
              table[i+1][j+1]= 0;

              skill_Heart(i, j, 2);

              issecondDelayed = false;
            }
            return;
          }
        }

        if (i + 3 < sizeX && j + 1 < sizeY)
        {
          // 右下型
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j]
            && table[i+2][j] == table[i+3][j]
            && table[i+3][j] == table[i+2][j+1]
            && table[i+2][j+1] == table[i+3][j+1])
          {
            startI = i;
            startJ = j;
            HeartInfo = 3;

            if (isWaitState)
            {
              trigger6 = true;
              skillDelayState = 0;
              HeartTag3 = true;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i+3][j] = 0;
              table[i+2][j+1] = 0;
              table[i+3][j+1] = 0;

              skill_Heart(i, j, 3);

              issecondDelayed = false;
            }
            return;
          }

          // 左下型
          if (i % 2 == 0
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j]
            && table[i+2][j] == table[i+3][j]
            && table[i+3][j] == table[i][j+1]
            && table[i][j+1] == table[i+1][j+1])
          {
            startI = i;
            startJ = j;
            HeartInfo = 4;

            if (isWaitState)
            {
              trigger6 = true;
              skillDelayState = 0;
              HeartTag4 = true;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i+3][j] = 0;
              table[i][j+1] = 0;
              table[i+1][j+1] = 0;

              skill_Heart(i, j, 4);

              issecondDelayed = false;
            }
            return;
          }
        }

        // 「ピラミッド」判定について
        // L字判定
        if (i + 2 < sizeX && j - 1 >= 0)
        {
          if (i % 2 == 0 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i][j-1])
          {
            startI = i;
            startJ = j;

            if (isWaitState)
            {
              trigger5 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i][j-1] = 0;

              skill_Pyramid(i, j);

              issecondDelayed = false;
            }
            return;
          }
        }

        // R字判定
        if (i + 2 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 1 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +2][j+1])
          {
            startI = i;
            startJ = j;

            if (isWaitState)
            {
              trigger5 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i+2][j+1] = 0;

              skill_Pyramid(i, j);

              issecondDelayed = false;
            }
            return;
          }
        }

        // 「ヤジリ」判定について
        // T字判定
        if (i + 2 < sizeX && j + 1 < sizeY)
        {
          if (i % 2 == 0 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +1][j +1])
          {
            //table[i][j] = 0;
            //table[i +1][j] = 0;
            //table[i +2][j] = 0;
            //table[i +1][j +1] = 0;

            startI = i;
            startJ = j;

            if (isWaitState)
            {
              trigger4 = true;
              skillDelayState = 0;
              isWaitState = false;
            }
            if (issecondDelayed)
            {
              skill_Yajiri(i, j);

              issecondDelayed = false;
            }
            return;
          }
        }
        // 逆T字判定
        if (i + 2 < sizeX && j - 1 >= 0)
        {
          if (i % 2 == 1 && table[i][j] == table[i +1][j]
            && table[i +1][j] == table[i +2][j]
            && table[i +2][j] == table[i +1][j -1])
          {
            //table[i][j] = 0;
            //table[i +1][j] = 0;
            //table[i +2][j] = 0;
            //table[i +1][j -1] = 0;
            if (table[i-1][j] != table[i][j])
            {
              startI = i;
              startJ = j;

              if (isWaitState)
              {
                trigger4 = true;
                skillDelayState = 0;
                isWaitState = false;
              }
              if (issecondDelayed)
              {
                skill_Yajiri(i, j);

                issecondDelayed = false;
              }
            }

            //return;
          }
        }

        // 「カギ」判定について
        if (!(trigger1 || trigger2 || trigger3 || trigger4 || trigger5 || trigger6))
        {
          // 右下型上
          if (i + 3 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i+2][j]
              && table[i+2][j] == table[i+3][j+1])
            {
              Score += point_normal;
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+2][j] = 0;
              table[i+3][j+1] = 0;
            }
          }

          // 右下型下
          if (i + 2 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i+1][j+1]
              && table[i+1][j+1] == table[i+2][j+1])
            {
              Score += point_normal;
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i+1][j+1] = 0;
              table[i+2][j+1] = 0;
            }
          }

          // 左上型下
          if (i - 2 >= 0 && j - 1 >= 0)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i-1][j]
              && table[i-1][j] == table[i-2][j-1])
            {
              Score += point_normal;
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i-1][j] = 0;
              table[i-2][j-1] = 0;
            }
          }

          // 左上型上
          if (i-1 >= 0 && j-1 >= 0)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i][j-1]
              && table[i][j-1] == table[i-1][j-1])
            {
              Score += point_normal;
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i][j-1] = 0;
              table[i-1][j-1] = 0;
            }
          }

          // 「ハコ」判定について
          // タテ型
          if (i + 1 < sizeX && j + 1 < sizeY)
          {
            if (i % 2 == 0
              && table[i][j] == table[i+1][j]
              && table[i+1][j] == table[i][j+1]
              && table[i][j+1] == table[i+1][j+1])
            {
              Score += point_normal;
              table[i][j] = 0;
              table[i+1][j] = 0;
              table[i][j+1] = 0;
              table[i+1][j+1] = 0;
            }
          }
          // ヨコ型
          if (i + 3 < sizeX && i % 2 == 0 && table[i][j] != 6
            && table[i][j] == table[i+1][j]
            && table[i+1][j] == table[i+2][j]
            && table[i+2][j] == table[i+3][j])
          {
            if (j-1 >= 0 && table[i+2][j-1] != table[i][j])
            {
              if ((i-1 >= 0 && table[i-1][j] == table[i][j]) || (i+4 < sizeX && table[i+4][j] == table[i][j]))
              {
              } else
              {
                Score += point_normal;
                table[i][j] = 0;
                table[i+1][j] = 0;
                table[i+2][j] = 0;
                table[i+3][j] = 0;
              }
            }
          }
        }
      }
    }
  }
}
//////////////////////////////////////////////////////////////////
// 「タテ、ヨコ、ナナメ、ピラミッド、ヤジリ、ハート」の特殊効果を実装。

// 特殊効果が一つ発動している場合は他に特殊効果を発動させない。
let isSkill = false;

// ヨコの特殊効果
function skill_Yoko(i, j)
{
  if (!isSkill)
  {
    console.log("ヨコスキル発動");
    isSkill = true;
    for (let x = i; x < sizeX; x++) table[x][j] = 0;


    for (let x = 0; x < i; x++) table[x][j] = 0;

    isWaitState = true;
    rectAlpha = 255;
    isSkill = false;
  }
}

// タテの特殊効果
function skill_Tate(i, j)
{
  if (!isSkill)
  {
    console.log("タテスキル発動");
    isSkill = true;
    for (let x = i; x <= i+1; x++)
    {
      for (let y = j; y < sizeY; y++) table[x][y] = 0;


      for (let y = 0; y <= j; y++) table[x][y] = 0;
    }
    isWaitState = true;
    rectAlpha = 255;
    isSkill = false;
  }
}

// ナナメの特殊効果
function skill_Naname(i, j)
{
  if (!isSkill)
  {
    isSkill = true;


    if (i % 2 == 0)
    {

      // パーティクル呼び出し
      for (let k = i; k < sizeX; k+=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j +(k-i)/2<sizeY && (table[k][j+(k-i)/2]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j+(k-i)/2+0.50)));
        }
      }
      for (let k = i+1; k <= sizeX; k+=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j+1+(k-i)/2 < sizeY && (table[k][j+1+(k-i)/2]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.5+1), spaceUp+blockSize*(j+1+(k-i)/2+0.25)));
        }
      }

      for (let k = i; k >= 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j-(i-k)/2 >= 0 && (table[k][j-(i-k)/2]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-(i-k)/2+0.50)));
        }
      }
      for (let k = i-1; k > 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j-(i-1-k)/2 >= 0 && (table[k][j-(i-1-k)/2]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.50+0.25), spaceUp+blockSize*(j-(i-1-k)/2+0.25)));
        }
      }

      console.log("ナナメスキル発動");
      push();
      translate(-blockSize, 0);
      for (let x = i; x < sizeX; x+=2)
      {
        if (j + int((x-i)/2) < sizeY) table[x][j+int((x-i)/2)] = 0;
      }

      for (let x = i+1; x <= sizeX; x+=2)
      {
        if (j + 1 + int((x-i)/2) < sizeY) table[x][j+1+int((x-i)/2)] = 0;
      }

      for (let x = i; x >= 0; x-=2)
      {
        if (j - int((i-x)/2) >= 0) table[x][j-int((i-x)/2)] = 0;
      }

      for (let x = i-1; x > 0; x-=2)
      {
        if (j - int((i-1-x)/2) >= 0) table[x][j-int((i-1-x)/2)] = 0;
      }
      pop();
    } else
    {

      // パーティクル呼び出し
      for (let k = i; k < sizeX; k+=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j +int((k-i)/2)<sizeY && (table[k][j +int((k-i)/2)]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.50), spaceUp+blockSize*(j+(k-i)/2+0.25)));
        }
      }
      for (let k = i+1; k < sizeX; k+=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j + int((k-i)/2) < sizeY  && (table[k][j +int((k-i)/2)]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j+(k-i)/2+0.50)));
        }
      }

      for (let k = i; k >= 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j-int((i-k)/2) >= 0 && (table[k][j-int((i-k)/2)]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.50), spaceUp+blockSize*(j-(i-k)/2+0.25)));
        }
      }
      for (let k = i-1; k >= 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j-int((i+1-k)/2) >= 0 && (table[k][j-int((i+1-k)/2)]!=0))
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-(i+1-k)/2+0.50)));
        }
      }

      console.log("ナナメスキル発動");
      for (let x = i; x < sizeX; x+=2)
      {
        if (j + int((x-i)/2) < sizeY) table[x][j+int((x-i)/2)] = 0;
      }

      for (let x = i+1; x < sizeX; x+=2)
      {
        if (j + int((x-i)/2) < sizeY) table[x][j + int((x-i)/2)] = 0;
      }

      for (let x = i; x >= 0; x-=2)
      {
        if (j - int((i-x)/2) >= 0) table[x][j-int((i-x)/2)] = 0;
      }

      for (let x = i-1; x >= 0; x-=2)
      {
        if (j - int((i+1-x)/2) >= 0) table[x][j-int((i+1-x)/2)] = 0;
      }
    }
    isWaitState = true;
    rectAlpha = 255;
    isSkill = false;
  }
}

// ヤジリの特殊効果
function skill_Yajiri(i, j)
{

  if (!isSkill)
  {
    isSkill = true;
    console.log("ヤジリスキル発動");
    if (i % 2 == 0)
    {
      // パーティクル呼び出し
      for (let k = i; k < sizeX; k+=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j + (k-i)/2 < sizeY && table[k][j + (k-i)/2] != 0)
          {
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j+(k-i)/2+0.50)));
          }


          if (j + (k-i)/2 < sizeY && k+2 < sizeX && table[k][j + (k-i)/2] != 0)
          {
            particles.push(new Particle(spaceRight+blockSize*(k/2+1+0.25), spaceUp+blockSize*(j+(k-i)/2+0.50)));
          }

          if (j + 1 + (k-i)/2 < sizeY && table[k][j+1+(k-i)/2] != 0)
          {
            particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j+1+(k-i)/2+0.50)));
          }
        }
      }

      for (let k = i; k >= 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j - (i+2-k)/2 >= 0 && table[k][j - (i+2-k)/2] != 0) particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-(i+2-k)/2+0.50)));
          if (j - (i-k)/2 >= 0 && table[k][j - (i-k)/2] != 0) particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-(i-k)/2+0.50)));
          if (j - (i-k)/2 >= 0 && table[k][j - (i-k)/2] != 0) particles.push(new Particle(spaceRight+blockSize*(k/2+0.5), spaceUp+blockSize*(j-(i-k)/2+0.25)));
          if (j - (i-2-k)/2 >= 0 && table[k][j - (i-2-k)/2] != 0) particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-(i-2-k)/2+0.50)));
        }
      }

      // 右下側のナナメライン消去
      for (let x = i; x < sizeX; x+=2)
      {
        if (j + (x-i)/2 < sizeY)
        {
          table[x][j+(x-i)/2] = 0;
          table[x+1][j+(x-i)/2] = 0;
        }

        if (j + (x-i)/2 < sizeY && x+2 < sizeX)
        {
          table[x+2][j + (x-i)/2] = 0;
        }

        if (j + 1 + (x-i)/2 < sizeY)
        {
          table[x+1][j + 1 + (x-i)/2] = 0;
        }
      }

      for (let x = i; x >= 0; x-=2)
      {
        if (j - (i+2-x)/2 >= 0) table[x][j-(i+2-x)/2] = 0;
        if (j - (i-x)/2 >= 0) table[x+1][j-(i-x)/2] = 0;
        if (j - (i-x)/2 >= 0) table[x][j-(i-x)/2] = 0;
        if (j - (i-2-x)/2 >= 0) table[x+1][j-(i-2-x)/2] = 0;
      }
    } else
    {
      // パーティクル呼び出し
      for (let k = i; k < sizeX; k+=2)
      {
        for (let p = 0; p< 50; p++)
        {
          if (j + (k-i)/2 < sizeY)
          {
            //table[x][j+(k-i)/2] = 0;
            if (table[k][j + (k-i)/2] != 0)
              particles.push(new Particle(spaceRight+blockSize*(k/2+0.5), spaceUp+blockSize*(j+(k-i)/2+0.250)));

            if (k+1 < sizeX && table[k][j + (k-i)/2] != 0)
            {
              //table[x+1][j+(x-i)/2] = 0;
              particles.push(new Particle(spaceRight+blockSize*(k/2+1+0.5), spaceUp+blockSize*(j+(k-i)/2+0.25)));
            }
            if (k+2 < sizeX && table[k][j + (k-i)/2] != 0)
            {
              //table[x+2][j+(x-i)/2] = 0;
              particles.push(new Particle(spaceRight+blockSize*(k/2+1+0.25), spaceUp+blockSize*(j+(k-i)/2+0.50)));
            }
            if (k+3 < sizeX && table[k][j + (k-i)/2] != 0)
            {
              //table[x+3][j+(x-i)/2] = 0;
              particles.push(new Particle(spaceRight+blockSize*(k/2+2+0.50), spaceUp+blockSize*(j+(k-i)/2+0.25)));
            }
          }
        }
      }

      for (let k = i; k >= 0; k-=2)
      {
        for (let p = 0; p < 50; p++)
        {
          if (j - (i-k)/2 >= 0)
          {
            //table[x][j - (i-x)/2] = 0;
            if (table[k][j - (i-k)/2] != 0)
              particles.push(new Particle(spaceRight+blockSize*(k/2+0.5), spaceUp+blockSize*(j-(i-k)/2+0.25)));
            if (j-1- (i-k)/2 >= 0 && table[k][j-1- (i-k)/2] != 0)particles.push(new Particle(spaceRight+blockSize*(k/2+1+0.25), spaceUp+blockSize*(j-1-(i-k)/2+0.50)));
            if (k-1 >= 0)
            {
              if (j-1 - (i-k)/2 >= 0 && table[k][j-1 - (i-k)/2] != 0)particles.push(new Particle(spaceRight+blockSize*(k/2+0.50), spaceUp+blockSize*(j-1-(i-k)/2+0.25)));
              if (j-2 - (i-k)/2 >= 0 && table[k][j-2 - (i-k)/2] != 0)particles.push(new Particle(spaceRight+blockSize*(k/2+0.25), spaceUp+blockSize*(j-2 - (i-k)/2+0.50)));
            }
          }
        }
      }

      console.log("ヤジリスキル発動");
      table[i+1][j-1] = 0;
      for (let x = i; x < sizeX; x+=2)
      {
        if (j + (x-i)/2 < sizeY)
        {
          table[x][j+(x-i)/2] = 0;
          if (x+1 < sizeX)
          {
            table[x+1][j+(x-i)/2] = 0;
          }
          if (x+2 < sizeX)
          {
            table[x+2][j+(x-i)/2] = 0;
          }
          if (x+3 < sizeX)
          {
            table[x+3][j+(x-i)/2] = 0;
          }
        }
      }

      for (let x = i; x >= 0; x-=2)
      {
        if (j - (i-x)/2 >= 0)
        {
          table[x][j - (i-x)/2] = 0;
          if (j-1- (i-x)/2 >= 0)table[x][j-1-(i-x)/2] = 0;
          if (x-1 >= 0)
          {
            if (j-1 - (i-x)/2 >= 0)table[x-1][j-1 - (i-x)/2] = 0;
            if (j-2-(i-x)/2 >= 0)table[x-1][j-2 - (i-x)/2] = 0;
          }
        }
      }
    }
    isWaitState = true;
    sumTx = 0;
    isSkill = false;
  }
}

// ピラミッドの特殊効果
function skill_Pyramid(i, j)
{
  if (!isSkill)
  {
    isSkill = true;
    console.log("ピラミッド発動");
    // L字型
    if (i % 2 == 0)
    {
      // 1段目
      if (j-3 >= 0) table[i][j-3] = 0;
      // 2段目
      if (j-2 >= 0)
      {
        table[i][j-2] = 0;
        table[i+1][j-2] = 0;
        table[i+2][j-2] = 0;
      }
      // 3段目範囲内
      // 4段目範囲内
      table[i+1][j-1] = 0;
      table[i+2][j-1] = 0;
      table[i+3][j-1] = 0;


      table[i+3][j] = 0;

      // 3列目
      if (i+4 < sizeX)
      {
        table[i+4][j-1] = 0;
        table[i+4][j] = 0;
        table[i+5][j] = 0;
      }

      // 4列目
      if (i+6 < sizeX)
      {
        table[i+6][j] = 0;
      }

      // パーティクル呼び出し

      for (let p = 0; p< 50; p++)
      {
        // 1段目
        if (j-3 >= 0)
        {
          //table[i][j-3] = 0;
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-3+0.5)));
        }
        // 2段目
        if (j-2 >= 0)
        {
          //table[i][j-2] = 0;
          //table[i+1][j-2] = 0;
          //table[i+2][j-2] = 0;

          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-2+0.50)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-2+0.250)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j-2+0.50)));
        }
        // 3段目範囲内
        // 4段目範囲内
        //table[i+1][j-1] = 0;
        //table[i+2][j-1] = 0;
        //table[i+3][j-1] = 0;
        //table[i+3][j] = 0;

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-1+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j-1+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j-1+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.250)));

        //table[i][j]
        //table[i+1][j]
        //table[i+2][j]
        //table[i][j-1]

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.250)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-1+0.250)));

        // 3列目
        if (i+4 < sizeX)
        {
          //table[i+4][j-1] = 0;
          //table[i+4][j] = 0;
          //table[i+5][j] = 0;

          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j-1+0.250)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+0.250)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+0.250)));
        }

        // 4列目
        if (i+6 < sizeX)
        {
          //table[i+6][j] = 0;
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.5), spaceUp+blockSize*(j+0.250)));
        }
      }
    } else
    {
      console.log("ピラミッド発動");
      // 1列目
      if (i-4 >= 0) table[i-4][j] = 0;
      // 2列目
      if (i-2 >= 0)
      {
        table[i-3][j] = 0;
        table[i-2][j] = 0;
        table[i-2][j+1] = 0;
      }

      // 範囲内
      table[i-1][j] = 0;
      table[i-1][j+1] = 0;
      table[i][j+1] = 0;
      table[i+1][j+1] = 0;

      // 3段目
      if (j + 2 < sizeY)
      {
        table[i][j+2] = 0;
        table[i+1][j+2] = 0;
        table[i+2][j+2] = 0;
      }
      // 4段目
      if (j + 3 < sizeY)
      {
        table[i+2][j+3] = 0;
      }

      // パーティクル呼び出し
      for (let p = 0; p< 50; p++)
      {
        // 1列目
        if (i-4 >= 0)
        {
          //table[i-4][j] = 0;
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.5), spaceUp+blockSize*(j+0.25)));
        }

        // 2列目
        if (i-2 >= 0)
        {
          //table[i-3][j] = 0;
          //table[i-2][j] = 0;
          //table[i-2][j+1] = 0;
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+1+0.25)));
        }

        // 範囲内
        //table[i-1][j] = 0;
        //table[i-1][j+1] = 0;
        //table[i][j+1] = 0;
        //table[i+1][j+1] = 0;

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+1+0.25)));

        //table[i][j] table[i+1][j] table[i+2][j] table[i+2][j+1]

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+1+0.25)));

        // 3段目
        if (j + 2 < sizeY)
        {
          //table[i][j+2] = 0;
          //table[i+1][j+2] = 0;
          //table[i+2][j+2] = 0;

          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+2+0.25)));
        }
        // 4段目
        if (j + 3 < sizeY)
        {
          //table[i+2][j+3] = 0;
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+3+0.25)));
        }
      }
    }
    isWaitState = true;
    triAlpha = 0;
    PysumTx = 0;
    showPyramid = showTime;
    isSkill = false;
  }
}

// ハートの特殊効果
function skill_Heart(i, j, p)
{
  if (!isSkill)
  {
    isSkill = true;


    if (p == 1)
    {
      // 左上型
      console.log("ハートスキルLefUp発動");

      // 1段目
      if (j-2 >= 0)
        for (let x = 0; x < 4; x++) table[i+x][j-2] = 0;

      // 2段目
      if (j-1 >= 0)
        for (let x = 0; x < 4; x++) table[i+x][j-1] = 0;

      // 範囲内
      table[i+2][j] = 0;
      table[i+3][j] = 0;

      // 3列目
      if (i+5 < sizeX)
      {
        for (let x = 4; x <= 5; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      // 4列目
      if (i+7 < sizeX)
      {
        for (let x = 6; x <= 7; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      // パーティクル呼び出し
      for (let q = 0; q< 50; q++)
      {
        // 1段目
        if (j-2 >= 0)
        {
          //table[i][j-2] = 0; // table[i+1][j-2] table[i+2][j-2] table[i+3][j-2]
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j-2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j-2+0.25)));
        }

        // 2段目
        if (j-1 >= 0)
        {
          //table[i][j-1] table[i+1]
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-1+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j-1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j-1+0.25)));
        }

        // 範囲内
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.25)));

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+1+0.25)));

        // 3列目
        if (i+5 < sizeX)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+1+0.25)));
        }

        // 4列目
        if (i+7 < sizeX)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.5), spaceUp+blockSize*(j+1+0.25)));
        }
      }

      triAlpha = 0;

      showPyramid = showTime;
    }

    if (p == 2)
    {
      // 右上型
      console.log("ハートスキルRigUp発動");

      // 1段目
      if (j-2 >= 0)
      {
        table[i-2][j-2] = 0;
        table[i-1][j-2] = 0;
        table[i][j-2] = 0;
        table[i+1][j-2] = 0;
      }

      // 2段目
      if (j-1 >= 0)
      {
        table[i-2][j-1] = 0;
        table[i-1][j-1] = 0;
        table[i][j-1] = 0;
        table[i+1][j-1] = 0;
      }

      // 3段目
      table[i-2][j] = 0;
      table[i-1][j] = 0;

      // -1列目
      if (i-3 >= 0)
      {
        table[i-4][j]=0;
        table[i-3][j]=0;
        table[i-4][j+1]=0;
        table[i-3][j+1]=0;
      }

      if (i-5 >= 0)
      {
        table[i-6][j]=0;
        table[i-5][j]=0;
        table[i-6][j+1]=0;
        table[i-5][j+1]=0;
      }

      for (let q = 0; q < 50; q++)
      {
        // 1段目
        if (j-2 >= 0)
        {
          //table[i-2][j-2] = 0;
          //table[i-1][j-2] = 0;
          //table[i][j-2] = 0;
          //table[i+1][j-2] = 0;

          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j-2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j-2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-2+0.25)));
        }

        // 2段目
        if (j-1 >= 0)
        {
          //table[i-2][j-1] = 0;
          //table[i-1][j-1] = 0;
          //table[i][j-1] = 0;
          //table[i+1][j-1] = 0;

          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j-1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j-1+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j-1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j-1+0.25)));
        }

        //// 3段目
        //table[i-2][j] = 0;
        //table[i-1][j] = 0;

        particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));

        particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));

        // -1列目
        if (i-3 >= 0)
        {
          //table[i-4][j]=0;
          //table[i-3][j]=0;
          //table[i-4][j+1]=0;
          //table[i-3][j+1]=0;

          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.5), spaceUp+blockSize*(j+1+0.25)));
        }

        if (i-5 >= 0)
        {
          //table[i-6][j]=0;
          //table[i-5][j]=0;
          //table[i-6][j+1]=0;
          //table[i-5][j+1]=0;

          particles.push(new Particle(spaceRight+blockSize*(i/2-3+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-3+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-3+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-3+0.5), spaceUp+blockSize*(j+1+0.25)));
        }
      }

      triAlpha = 0;

      showPyramid = showTime;
    }

    if (p == 3)
    {
      // 右下型
      console.log("ハートスキルRigDow発動");

      if (j+2 < sizeY)
        for (let x = 0; x <= 3; x++) table[i+x][j+2] = 0;

      if (j+3 < sizeY)
        for (let x = 0; x <= 3; x++) table[i+x][j+3] = 0;

      table[i][j+1] = 0;
      table[i+1][j+1] = 0;

      if (i-2 >= 0)
      {
        for (let x = -2; x <= -1; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      if (i-4 >= 0)
      {
        for (let x = -4; x <= -3; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      // パーティクル呼び出し
      for (let q = 0; q < 50; q++)
      {
        //一段目

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.25)));

        //二段目
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+1+0.25)));
        //三段目
        if (j+2 < sizeY)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+2+0.25)));
        }

        //四段目
        if (j+3 < sizeY)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+3.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+3.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+3+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+3+0.25)));
        }

        if (i-2 >= 0)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j + 0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-1+0.5), spaceUp+blockSize*(j+1+0.25)));
        }

        if (i-4 >= 0)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.5), spaceUp+blockSize*(j + 0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2-2+0.5), spaceUp+blockSize*(j+1+0.25)));
        }
      }

      triAlpha = 0;

      showPyramid = showTime;
    }

    if (p == 4)
    {
      // 左下型
      console.log("ハートスキルLefDow発動");

      if (j+2 < sizeY)
        for (let x = 0; x <= 3; x++) table[i+x][j+2] = 0;

      if (j+3 < sizeY)
        for (let x = 0; x <= 3; x++) table[i+x][j+3] = 0;

      table[i+2][j+1] = 0;
      table[i+3][j+1] = 0;

      if (i+5 < sizeX)
      {
        for (let x = 4; x <= 5; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      if (i+7 < sizeX)
      {
        for (let x = 6; x <= 7; x++)
        {
          table[i+x][j] = 0;
          table[i+x][j+1] = 0;
        }
      }

      for (let q = 0; q < 50; q++)
      {
        //一段目

        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+0.25)));

        //二段目
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+1+0.25)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+1+0.5)));
        particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+1+0.25)));
        //三段目
        if (j+2 < sizeY)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+2+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+2+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+2+0.25)));
        }

        //四段目
        if (j+3 < sizeY)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.25), spaceUp+blockSize*(j+3+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+0.5), spaceUp+blockSize*(j+3+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.25), spaceUp+blockSize*(j+3+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+1+0.5), spaceUp+blockSize*(j+3+0.25)));
        }

        if (i+5 < sizeX)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+2+0.5), spaceUp+blockSize*(j+1+0.25)));
        }

        if (i+7 < sizeX)
        {
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.25), spaceUp+blockSize*(j+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.5), spaceUp+blockSize*(j+0.25)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.25), spaceUp+blockSize*(j+1+0.5)));
          particles.push(new Particle(spaceRight+blockSize*(i/2+3+0.5), spaceUp+blockSize*(j+1+0.25)));
        }
      }
    }

    triAlpha = 0;

    showPyramid = showTime;
  }

  isWaitState = true;

  HeartTag1 = HeartTag2 = HeartTag3 = HeartTag4 = false;
  HeartInfo = 0;

  isSkill = false;
}

//////////////////////////////////////////////////////////////////

let s1xPressed = false;
let s3xPressed = false;

function keyPressed()
{

  /*一旦ここは後で設定することにします
   if (waitingForKey1) {
   actionKey1 = key;  // 押されたキーをアクションキー1として設定
   console.log("Action key 1 set to: " + actionKey1);
   c5.get(Textlabel.class, "info").setText("回転ボタンは " + actionKey1 + " に変更されました").setFont(createFont("ＭＳ Ｐゴシック", 42));
   waitingForKey1 = false;  // 設定が完了したので待機状態を解除
   } else if (waitingForKey2) {
   actionKey2 = key;  // 押されたキーをアクションキー2として設定
   console.log("Action key 2 set to: " + actionKey2);
   c5.get(Textlabel.class, "info").setText("入替ボタンは " + actionKey2 + " に変更されました").setFont(createFont("ＭＳ Ｐゴシック", 42));
   waitingForKey2 = false;  // 設定が完了したので待機状態を解除
   } else {
   // アクションキー1またはアクションキー2が押された場合の処理
   if (key == actionKey1) {
   //console.log("Action key 1 pressed: " + actionKey1);
   // アクション1をここに記述
   } else if (key == actionKey2) {
   //console.log("Action key 2 pressed: " + actionKey2);
   // アクション2をここに記述
   }
   }*/

  if (scene == 0)
  {
    // 何でもよいからキーが押された時、タイトルから移動
    titleDecide.play();
    titleDecide.amp(SE_vol);
    shadowState = 0;
  }

  if (scene == 1)
  {
    // タイトルへ戻る(タイトルを眺めたい人向け)
    if (!showHowtoplay && key == 'x' || key == 'X')
    {
      menuBGM.stop();
      cancelSound.play();
      cancelSound.amp(SE_vol);
      s1xPressed = true;
      shadowState = 0;
    }


    // メニュー操作

    if (!showHowtoplay && keyCode == LEFT_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);

      if (menuSelect == 0) menuSelect = 2;
      else --menuSelect;
    }
    if (!showHowtoplay && keyCode == RIGHT_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);
      if (menuSelect == 2) menuSelect = 0;
      else ++menuSelect;
    }

    // 遊び方説明を非表示にするとき
    if (showHowtoplay)
    {
      if (key == 'x' || key == 'X')
      {
　　　　setTimeout(() => {  // delay(300)の代わり ラムダ式
  　　　　showHowtoplay = false;
　　　　}, 300);
      }
    }

    if (!showHowtoplay && menuSelect == 0 && keyCode == ENTER)
    {
      menuBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // ゲームをロード
      loadState = 0;
    }
    if (!showHowtoplay && menuSelect == 1 && keyCode == ENTER)
    {
      decide.play();
      decide.amp(SE_vol);
      // 設定シーンへ
      shadowState = 0;
    }
    if (!showHowtoplay && menuSelect == 2 && keyCode == ENTER)
    {
      decide.play();
      decide.amp(SE_vol);
      // 遊び方説明へ
      // bool値をonにして画像を表示

      showHowtoplay = true;
    }
  }

  if (scene == 2 && !playingEnd && isGaming && !isPause)
  {
    if (canPushS && canPushA && !(trigger1 || trigger2 || trigger3 || trigger4 || trigger5 || trigger6))
    {
      if (key == ' ')
      {
        pauseSound.play();
        pauseSound.amp(SE_vol);
        isRunning = false;
        isPause = true;
      }


      // Aキーが押された時は、選択しているブロックの三角形二つを入れ替える。
      if (key == actionKey1 || key == 'a')
      {
        canPushA = false;
        rotateSound_sonoba.play();
        rotateSound_sonoba.amp(SE_vol);
        let sXplus = selectX + 1;

        // 元の値を保存
        rot1 = table[2*selectX][selectY];
        rot2 = table[2*selectX+1][selectY];
        rot3 = table[2*sXplus][selectY];
        rot4 = table[2*sXplus+1][selectY];

        // 無色で塗りつぶし
        table[2*selectX][selectY] = 6;
        table[2*selectX+1][selectY] = 6;
        table[2*sXplus][selectY] = 6;
        table[2*sXplus+1][selectY] = 6;

        isWaitChange = true;
        startChange = millis();

        //// カーソル左側のブロック
        //int temp = table[2*selectX + 1][selectY];
        //table[2*selectX + 1][selectY] = table[2*selectX][selectY];
        //table[2*selectX][selectY] = temp;

        //// カーソル右側のブロック
        //temp = table[2*sXplus + 1][selectY];
        //table[2*sXplus + 1][selectY] = table[2*sXplus][selectY];
        //table[2*sXplus][selectY] = temp;
      }

      // Sキーが押された時は、選択している二つのブロックを丸ごと入れ替える。
      if (key == actionKey2 || key == 's')
      {
        canPushS = false;
        rotateSound.play();
        rotateSound.amp(SE_vol);
        let sXplus = selectX + 1;

        // 元の値を保存
        temp1 = table[2*selectX][selectY];
        temp2 = table[2*selectX+1][selectY];
        temp3 = table[2*sXplus][selectY];
        temp4 = table[2*sXplus+1][selectY];

        // 無色で塗りつぶし
        table[2*selectX][selectY] = 6;
        table[2*selectX+1][selectY] = 6;
        table[2*sXplus][selectY] = 6;
        table[2*sXplus+1][selectY] = 6;

        isWaitSlide = true;
        startSlide = millis();
        //int sXplus = selectX + 1;

        //// 左下の三角形に着目して入れ替え。
        //int temp = table[2*sXplus][selectY];
        //table[2*sXplus][selectY] = table[2*selectX][selectY];
        //table[2*selectX][selectY] = temp;

        //// 右上の三角形に注目して入れ替え。
        //temp = table[2*sXplus + 1][selectY];
        //table[2*sXplus + 1][selectY] = table[2*selectX + 1][selectY];
        //table[2*selectX + 1][selectY] = temp;
      }
    }

    // カーソルヨコ移動
    if (isGaming && canPushS && canPushA)
    {
      if (keyCode == LEFT_ARROW)
      {
        gameCursorMove.play();
        gameCursorMove.amp(SE_vol);
        if (selectX > 0) --selectX;
      }
      if (keyCode == RIGHT_ARROW)
      {
        gameCursorMove.play();
        gameCursorMove.amp(SE_vol);
        if (selectX < sizeX/2 - 2) ++selectX;
      }

      // カーソルタテ移動
      if (keyCode == UP_ARROW)
      {
        gameCursorMove.play();
        gameCursorMove.amp(SE_vol);
        if (selectY > 0) --selectY;
      }
      if (keyCode == DOWN_ARROW)
      {
        gameCursorMove.play();
        gameCursorMove.amp(SE_vol);
        if (selectY < sizeY-1) ++selectY;
      }
    }
  }

  if (scene == 2 && isPause)
  {
    // カーソルタテ移動
    if (keyCode == UP_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);
      if (pauseSelect == 0) pauseSelect = 2;
      else --pauseSelect;
    }
    if (keyCode == DOWN_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);
      if (pauseSelect == 2) pauseSelect = 0;
      else ++pauseSelect;
    }


    if (pauseSelect == 0 && keyCode == ENTER)
    {
      decide.play();
      decide.amp(SE_vol);
      // ゲームを再開
      pauseMenuAlpha = 0;
      isPause = false;
      gameTime = millis()-elapsedTime;
      isRunning = true;
    }
    if (pauseSelect == 1 && keyCode == ENTER)
    {
      isGamingBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // やり直し
      pauseMenuAlpha = 0;
      loadState = 0;
    }
    if (pauseSelect == 2 && keyCode == ENTER)
    {
      isGamingBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // タイトルへ
      pauseMenuAlpha = 0;
      shadowState = 0;
    }
  }

  if (scene == 2 && isResult)
  {
    // カーソルタテ移動
    if (keyCode == UP_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);
      if (resultSelect == 0) resultSelect = 2;
      else --resultSelect;
    }
    if (keyCode == DOWN_ARROW)
    {
      cursorMove.play();
      cursorMove.amp(SE_vol);
      if (resultSelect == 2) resultSelect = 0;
      else ++resultSelect;
    }


    if (resultSelect == 0 && keyCode == ENTER)
    {
      isGamingBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // ゲームをもう一度リロード
      playingEnd = false;
      resultAlpha = 0;
      isResult = false;

      loadState = 0;
    }
    if (resultSelect == 1 && keyCode == ENTER)
    {
      isGamingBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // モード選択画面へ
      shadowState = 0;
    }
    if (resultSelect == 2 && keyCode == ENTER)
    {
      isGamingBGM.stop();
      decide.play();
      decide.amp(SE_vol);
      // タイトルへ
      shadowState = 0;
    }
  }

  if (scene == 3)
  {
    if (key == 'x' || key == 'X')
    {
      cancelSound.play();
      cancelSound.amp(SE_vol);
      s3xPressed = true;
      shadowState = 0;
    }
  }
}

let particles = [];
//ArrayList<Particle> particles = new ArrayList<Particle>();

let HeartMode = false;

let radTri = 0;
// パーティクルを発生させるクラス
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0, 2.0));
    this.acceleration = createVector(0, 0.08);
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    stroke(0, this.lifespan);
    strokeWeight(1);
    // 未定義の変数 HeartMode が使われています
    if (HeartMode) {
      fill(255, 0, 0, this.lifespan);
    } else {
      fill(255, 255, 0, this.lifespan);
    }


    push();
    translate(this.position.x, this.position.y);
    rotate(radians(radTri));
    this.drawRightTriangle(0, 0, 20);
    pop();
  }


  isFinished() {
    return this.lifespan < 0;
  }

  drawRightTriangle(x, y, size) {
    beginShape();
    triangle(x - 8, y - 10, x - 8, y + 10, x + 12, y + 10);
    endShape(CLOSE);
  }
}
