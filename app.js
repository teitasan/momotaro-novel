const backgrounds = {
  village: "assets/backgrounds/village.png",
  home: "assets/backgrounds/home-interior.png",
  road: "assets/backgrounds/road.png",
  onigashima: "assets/backgrounds/onigashima.png",
};

const characters = {
  momotaro: {
    name: "桃太郎",
    src: "assets/characters/momotaro.png",
  },
  grandmother: {
    name: "おばあさん",
    src: "assets/characters/grandmother.png",
  },
  grandfather: {
    name: "おじいさん",
    src: "assets/characters/grandfather.png",
  },
  dog: {
    name: "犬",
    src: "assets/characters/dog.png",
  },
  monkey: {
    name: "猿",
    src: "assets/characters/monkey.png",
  },
  pheasant: {
    name: "キジ",
    src: "assets/characters/pheasant.png",
  },
  oni: {
    name: "鬼の大将",
    src: "assets/characters/oni.png",
  },
};

const journey = [
  ["prologue", "桃から生まれる"],
  ["decision", "鬼退治を決意する"],
  ["kibidango", "きびだんごを受け取る"],
  ["dog", "犬と出会う"],
  ["monkey", "猿と出会う"],
  ["pheasant", "キジと出会う"],
  ["island", "鬼ヶ島へ向かう"],
  ["battle", "鬼と戦う"],
  ["surrender", "鬼が降参する"],
  ["treasure", "宝物を持ち帰る"],
  ["ending", "村へ帰る"],
];

const party = [
  ["dog_joined", "犬", "dog"],
  ["monkey_joined", "猿", "monkey"],
  ["pheasant_joined", "キジ", "pheasant"],
];

const flagLabels = [
  ["born", "桃から生まれた"],
  ["decided_to_defeat_oni", "鬼退治を決意した"],
  ["has_kibidango", "きびだんごを所持している"],
  ["met_dog", "犬と出会った"],
  ["gave_kibidango_to_dog", "犬にきびだんごを渡した"],
  ["dog_joined", "犬が仲間"],
  ["met_monkey", "猿と出会った"],
  ["gave_kibidango_to_monkey", "猿にきびだんごを渡した"],
  ["monkey_joined", "猿が仲間"],
  ["met_pheasant", "キジと出会った"],
  ["gave_kibidango_to_pheasant", "キジにきびだんごを渡した"],
  ["pheasant_joined", "キジが仲間"],
  ["arrived_onigashima", "鬼ヶ島へ到着した"],
  ["fought_oni", "鬼と戦った"],
  ["oni_surrendered", "鬼が降参した"],
  ["has_treasure", "宝を持っている"],
  ["returned_home", "村へ帰った"],
  ["game_cleared", "エンディング到達"],
];

const createInitialState = () => ({
  scene: "prologue",
  kibidango_count: 0,
  notice: "",
  flags: {
    born: true,
    decided_to_defeat_oni: false,
    has_kibidango: false,
    met_dog: false,
    gave_kibidango_to_dog: false,
    dog_joined: false,
    met_monkey: false,
    gave_kibidango_to_monkey: false,
    monkey_joined: false,
    met_pheasant: false,
    gave_kibidango_to_pheasant: false,
    pheasant_joined: false,
    arrived_onigashima: false,
    fought_oni: false,
    oni_surrendered: false,
    has_treasure: false,
    returned_home: false,
    game_cleared: false,
  },
});

let state = createInitialState();

const scenes = {
  prologue: {
    kicker: "プロローグ",
    title: "桃から生まれた子",
    location: "川辺の村",
    background: "village",
    speaker: "語り",
    tag: "物語",
    character: "grandmother",
    position: "side",
    text: "川で洗濯をしていたおばあさんのもとへ、大きな桃が流れてきました。\n桃を家へ持ち帰り、おじいさんと割ってみると、中から元気な男の子が現れます。\n\n二人は男の子を「桃太郎」と名付け、大切に育てました。",
    choices: [{ label: "物語を始める", action: "start", kind: "primary" }],
  },
  decision: {
    kicker: "第一話",
    title: "鬼退治を決意する",
    location: "おじいさん・おばあさんの家",
    background: "home",
    speaker: "桃太郎",
    tag: "決意",
    character: "momotaro",
    text: "成長した桃太郎は、鬼ヶ島の鬼たちが人々を苦しめていることを知りました。\n桃太郎は二人に向かって、まっすぐに言います。\n\n「ぼくが鬼ヶ島へ、鬼退治に行きます」",
    choices: [
      { label: "鬼退治に行く", action: "decide", kind: "primary" },
      { label: "もう少し考える", action: "wait-decision", kind: "secondary" },
    ],
  },
  kibidango: {
    kicker: "第二話",
    title: "きびだんごをもらう",
    location: "旅立ちの朝",
    background: "home",
    speaker: "おばあさん",
    tag: "旅じたく",
    character: "grandmother",
    position: "side",
    text: "おばあさんは、旅のためにきびだんごを作ってくれました。\n\n「これを持っておいき。日本一のきびだんごだよ」",
    choices: [
      { label: "きびだんごを受け取る", action: "receive-kibidango", kind: "primary" },
      { label: "今はいらない", action: "decline-kibidango", kind: "secondary" },
    ],
  },
  dog: {
    kicker: "第三話",
    title: "犬と出会う",
    location: "道中の分かれ道",
    background: "road",
    speaker: "犬",
    tag: "仲間との出会い",
    character: "dog",
    position: "side",
    onEnter: () => {
      state.flags.met_dog = true;
    },
    text: "旅の途中で、犬が桃太郎の前に現れました。\n犬は桃太郎の持っているきびだんごを見つめています。\n\n「ひとつ、分けてくれませんか？」",
    choices: [
      { label: "きびだんごを1つあげる", action: "give-dog", kind: "primary" },
      { label: "あげない", action: "decline-dog", kind: "secondary" },
    ],
  },
  monkey: {
    kicker: "第四話",
    title: "猿と出会う",
    location: "山道の途中",
    background: "road",
    speaker: "猿",
    tag: "仲間との出会い",
    character: "monkey",
    position: "side",
    onEnter: () => {
      state.flags.met_monkey = true;
    },
    text: "さらに進むと、今度は猿が道をふさいでいました。\n猿もきびだんごを欲しがっています。\n\n「ひとつ、分けてくれませんか？」",
    choices: [
      { label: "きびだんごを1つあげる", action: "give-monkey", kind: "primary" },
      { label: "あげない", action: "decline-monkey", kind: "secondary" },
    ],
  },
  pheasant: {
    kicker: "第五話",
    title: "キジと出会う",
    location: "海へ続く道",
    background: "road",
    speaker: "キジ",
    tag: "仲間との出会い",
    character: "pheasant",
    position: "side",
    onEnter: () => {
      state.flags.met_pheasant = true;
    },
    text: "さらに進むと、空からキジが舞い降りてきました。\nキジもきびだんごを欲しがっています。\n\n「ひとつ、分けてくれませんか？」",
    choices: [
      { label: "きびだんごを1つあげる", action: "give-pheasant", kind: "primary" },
      { label: "あげない", action: "decline-pheasant", kind: "secondary" },
    ],
  },
  island: {
    kicker: "第六話",
    title: "鬼ヶ島へ向かう",
    location: "鬼ヶ島・入口",
    background: "onigashima",
    speaker: "語り",
    tag: "到着",
    character: "momotaro",
    text: "犬・猿・キジを連れた桃太郎は、ついに鬼ヶ島へたどり着きました。\n目の前には、大きな門がそびえています。",
    onEnter: () => {
      state.flags.arrived_onigashima = true;
    },
    choices: [
      { label: "鬼ヶ島へ乗り込む", action: "enter-island", kind: "primary" },
      { label: "出発を見合わせる", action: "wait-island", kind: "secondary" },
    ],
  },
  battle: {
    kicker: "第七話",
    title: "鬼との戦い",
    location: "鬼ヶ島の門前",
    background: "onigashima",
    speaker: "語り",
    tag: "対決",
    character: "oni",
    position: "side",
    text: "鬼たちが桃太郎たちに襲いかかります。\n犬が鬼に噛みつき、猿が引っかき、キジが空から攻撃します。\n桃太郎も刀を振るい、仲間と力を合わせて鬼たちを追い詰めました。",
    choices: [
      { label: "力を合わせて戦う", action: "fight", kind: "primary" },
      { label: "逃げる", action: "run-away", kind: "secondary" },
    ],
  },
  surrender: {
    kicker: "第八話",
    title: "鬼の降参",
    location: "鬼ヶ島の広間",
    background: "onigashima",
    speaker: "鬼の大将",
    tag: "決着",
    character: "oni",
    position: "side",
    text: "鬼の大将は刀を置き、桃太郎たちの前で頭を下げました。\n\n「まいった。もう悪さはしない」",
    choices: [
      { label: "降参を受け入れる", action: "accept-surrender", kind: "primary" },
      { label: "まだ許さない", action: "reject-surrender", kind: "secondary" },
    ],
  },
  treasure: {
    kicker: "第九話",
    title: "宝物を持ち帰る",
    location: "鬼ヶ島の宝物庫",
    background: "onigashima",
    speaker: "語り",
    tag: "帰路",
    character: "momotaro",
    showTreasure: true,
    text: "鬼たちは、これまでに奪った宝物を桃太郎へ差し出しました。\n\nさあ、宝物を持って村へ帰りましょう。",
    choices: [
      { label: "宝物を持ち帰る", action: "take-treasure", kind: "primary" },
      { label: "置いていく", action: "leave-treasure", kind: "secondary" },
    ],
  },
  ending: {
    kicker: "エンディング",
    title: "めでたし、めでたし",
    location: "桃太郎の村",
    background: "village",
    speaker: "語り",
    tag: "CLEAR",
    character: "momotaro",
    text: "桃太郎は犬・猿・キジとともに村へ帰りました。\nおじいさんとおばあさんは、桃太郎の無事を喜びます。\n\n鬼から取り戻した宝物とともに、みんなは幸せに暮らしました。",
    onEnter: () => {
      state.flags.returned_home = true;
      state.flags.game_cleared = true;
    },
    choices: [{ label: "もう一度遊ぶ", action: "restart", kind: "primary" }],
  },
};

const sceneKicker = document.querySelector("#sceneKicker");
const sceneTitle = document.querySelector("#sceneTitle");
const sceneCounter = document.querySelector("#sceneCounter");
const visualStage = document.querySelector("#visualStage");
const stageCaption = document.querySelector("#stageCaption");
const stageBadge = document.querySelector("#stageBadge");
const characterImage = document.querySelector("#characterImage");
const treasureMark = document.querySelector("#treasureMark");
const speakerName = document.querySelector("#speakerName");
const dialogueTag = document.querySelector("#dialogueTag");
const dialogueText = document.querySelector("#dialogueText");
const notice = document.querySelector("#notice");
const choices = document.querySelector("#choices");
const inventoryCount = document.querySelector("#inventoryCount");
const inventoryCopy = document.querySelector("#inventoryCopy");
const partyCount = document.querySelector("#partyCount");
const partyList = document.querySelector("#partyList");
const flagList = document.querySelector("#flagList");
const restartButton = document.querySelector("#restartButton");

function stay(message) {
  state.notice = message;
  render();
}

function goTo(sceneId) {
  state.scene = sceneId;
  state.notice = "";
  scenes[sceneId]?.onEnter?.();
  render();
}

function giveKibidango({ companionFlag, givenFlag, nextScene, name }) {
  if (state.kibidango_count < 1) {
    stay("きびだんごがありません。桃太郎はその場で考えています。");
    return;
  }

  state.kibidango_count -= 1;
  state.flags[givenFlag] = true;
  state.flags[companionFlag] = true;
  state.flags.has_kibidango = state.kibidango_count > 0;
  goTo(nextScene);
  state.notice = `${name}が仲間になりました。`;
  render();
}

function performAction(action) {
  switch (action) {
    case "start":
      goTo("decision");
      break;
    case "decide":
      state.flags.decided_to_defeat_oni = true;
      goTo("kibidango");
      break;
    case "wait-decision":
      stay("桃太郎は、おじいさんとおばあさんの顔を見つめています。");
      break;
    case "receive-kibidango":
      state.kibidango_count = 3;
      state.flags.has_kibidango = true;
      goTo("dog");
      break;
    case "decline-kibidango":
      stay("おばあさんは、きびだんごを包み直しました。");
      break;
    case "give-dog":
      giveKibidango({
        companionFlag: "dog_joined",
        givenFlag: "gave_kibidango_to_dog",
        nextScene: "monkey",
        name: "犬",
      });
      break;
    case "decline-dog":
      stay("犬は桃太郎のあとを、少し離れてついてきます。");
      break;
    case "give-monkey":
      giveKibidango({
        companionFlag: "monkey_joined",
        givenFlag: "gave_kibidango_to_monkey",
        nextScene: "pheasant",
        name: "猿",
      });
      break;
    case "decline-monkey":
      stay("猿は腕を組んだまま、道のわきで待っています。");
      break;
    case "give-pheasant":
      giveKibidango({
        companionFlag: "pheasant_joined",
        givenFlag: "gave_kibidango_to_pheasant",
        nextScene: "island",
        name: "キジ",
      });
      break;
    case "decline-pheasant":
      stay("キジは木の枝にとまり、桃太郎を見つめています。");
      break;
    case "enter-island":
      goTo("battle");
      break;
    case "wait-island":
      stay("桃太郎たちは、門の前で静かに息を整えています。");
      break;
    case "fight":
      state.flags.fought_oni = true;
      goTo("surrender");
      break;
    case "run-away":
      stay("桃太郎たちは門前で踏みとどまり、もう一度身構えました。");
      break;
    case "accept-surrender":
      state.flags.oni_surrendered = true;
      goTo("treasure");
      break;
    case "reject-surrender":
      stay("鬼の大将は、頭を下げたまま動きません。");
      break;
    case "take-treasure":
      state.flags.has_treasure = true;
      goTo("ending");
      break;
    case "leave-treasure":
      stay("桃太郎は、宝物の前でしばらく考えています。");
      break;
    case "restart":
      state = createInitialState();
      render();
      break;
    default:
      break;
  }
}

function renderChoices(scene) {
  choices.replaceChildren();
  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button ${choice.kind === "secondary" ? "secondary" : ""}`;
    button.textContent = choice.label;
    button.addEventListener("click", () => performAction(choice.action));
    choices.append(button);
  });
}

function renderInventory() {
  inventoryCount.textContent = `${state.kibidango_count} / 3`;
  if (state.kibidango_count > 0) {
    inventoryCopy.textContent = `仲間に分けられるのは、あと${state.kibidango_count}つ。`;
  } else if (state.flags.gave_kibidango_to_pheasant) {
    inventoryCopy.textContent = "三つとも仲間に分けました。";
  } else {
    inventoryCopy.textContent = "おばあさんが作ってくれる旅のおとも。";
  }
}

function renderParty() {
  const joinedCount = party.filter(([flag]) => state.flags[flag]).length;
  partyCount.textContent = `${joinedCount} / 3`;
  partyList.replaceChildren();

  party.forEach(([flag, name, imageKey]) => {
    const member = document.createElement("div");
    const joined = state.flags[flag];
    member.className = `party-member ${joined ? "is-joined" : ""}`;
    member.innerHTML = `
      <img src="${characters[imageKey].src}" alt="${name}" />
      <span>${name}</span>
    `;
    if (!joined) member.title = "まだ仲間になっていません";
    partyList.append(member);
  });
}

function renderFlags() {
  flagList.replaceChildren();
  flagLabels.forEach(([key, label]) => {
    const row = document.createElement("div");
    const value = state.flags[key];
    row.className = "flag-row";
    row.innerHTML = `
      <span><code>${key}</code><br />${label}</span>
      <span class="flag-value ${value ? "is-true" : "is-false"}">${value ? "ON" : "OFF"}</span>
    `;
    flagList.append(row);
  });

  const countRow = document.createElement("div");
  countRow.className = "flag-row";
  countRow.innerHTML = `
    <span><code>kibidango_count</code><br />きびだんごの残数</span>
    <span class="flag-value ${state.kibidango_count ? "is-true" : "is-false"}">${state.kibidango_count}</span>
  `;
  flagList.append(countRow);
}

function renderStage(scene) {
  visualStage.style.setProperty("--scene-background", `url("${backgrounds[scene.background]}")`);
  stageCaption.textContent = scene.location;
  stageBadge.textContent = state.flags.game_cleared ? "CLEAR" : "基準ルート";

  treasureMark.classList.toggle("is-visible", Boolean(scene.showTreasure));
  characterImage.classList.remove("is-visible", "is-side-character");
  if (scene.character) {
    const character = characters[scene.character];
    characterImage.src = character.src;
    characterImage.alt = `${character.name}の立ち絵`;
    characterImage.classList.toggle("is-side-character", scene.position === "side");
    requestAnimationFrame(() => characterImage.classList.add("is-visible"));
  } else {
    characterImage.removeAttribute("src");
    characterImage.alt = "";
  }
}

function render() {
  const scene = scenes[state.scene];
  const currentIndex = journey.findIndex(([id]) => id === state.scene);
  sceneKicker.textContent = scene.kicker;
  sceneTitle.textContent = scene.title;
  sceneCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(journey.length).padStart(2, "0")}`;
  speakerName.textContent = scene.speaker;
  dialogueTag.textContent = scene.tag;
  dialogueText.textContent = scene.text;
  notice.textContent = state.notice;
  renderStage(scene);
  renderChoices(scene);
  renderInventory();
  renderParty();
  renderFlags();
}

restartButton.addEventListener("click", () => {
  state = createInitialState();
  render();
});

render();
