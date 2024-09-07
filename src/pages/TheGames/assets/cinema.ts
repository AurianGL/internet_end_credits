export type KeyType =
  | "FIRST_PHASE"
  | "SECOND_PHASE"
  | "EVIL_PHASE"
  | "FOURTH_PHASE"
  | "MATRIX_PHASE"
  | "GOAT_PHASE"
  | "WALL_PHASE"
  | "END_PHASE";

export type DecisionTreeStep = {
  question: string;
  type: "input" | "choice" | "end" | "happyEnd" | "blueEnd";
  choices: { text: string; nextStep: number; key: KeyType }[];
  next:
    | undefined
    | ((input: string, callback: (input: string) => void) => void);
};

Object.defineProperties(window, {
  _userName: {
    value: "",
    writable: true,
  },
  userName: {
    get() {
      return this._userName;
    },
    set(value: string) {
      this._userName = value;
    },
  },
});

export const firstPhase: DecisionTreeStep[] = [
  {
    // 0
    question: "what is your name?",
    type: "input",
    choices: [],
    next: (input: string, callback: (input: string) => void) => {
      // setUserName(input);
      // const regex = /(manner|manon|maner)/i;
      // if (regex.test(input)) {
      //   setStep(4);
      // } else {
      //   setStep(1);
      // }
      callback(input);
    },
  },
  {
    // 1
    question: "I've been expecting you...",
    type: "choice",
    choices: [
      { text: "hu ? weird ...", nextStep: 2, key: "FIRST_PHASE" },
      { text: "Sorry I have no change.", nextStep: 3, key: "FIRST_PHASE" },
    ],
    next: undefined,
  },
  {
    // 2
    question: "You've tried to fight this big bad bug...",
    type: "choice",
    choices: [
      { text: "Pffuu, you noticed ? (/ω＼)", nextStep: 0, key: "SECOND_PHASE" },
      { text: "GG ez.ᕙ(‾̀◡‾́)ᕗ", nextStep: 0, key: "SECOND_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question: "Didn't ask for change, ʅ(°益°)ʃ Do I look like a hobo ?",
    type: "choice",
    choices: [
      { text: "Houmf, didn't meant no harm", nextStep: 0, key: "EVIL_PHASE" },
      { text: "Well, you could dress better", nextStep: 1, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 4
    question: "Sorry I've mistaken you for someone else",
    type: "choice",
    choices: [
      { text: "No problem, I'm used to it", nextStep: 4, key: "END_PHASE" },
      { text: "well F*** you bot !", nextStep: 1, key: "END_PHASE" },
    ],
    next: undefined,
  },
];

export const secondPhase: DecisionTreeStep[] = [
  {
    // 0
    question: "Not bad, not bad at all. But you look hurt a bit...",
    type: "choice",
    choices: [
      { text: "Just a scratch", nextStep: 1, key: "SECOND_PHASE" },
      {
        text: "I'm dying, call the ambulance",
        nextStep: 2,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 1
    question:
      "you sure ? you got half a heart left...might not be enough for the next phase",
    type: "choice",
    choices: [
      { text: "I'm fine, I'm fine (๑˘ᵕ˘)", nextStep: 2, key: "EVIL_PHASE" },
      {
        text: "Got a portable blood bank ?",
        nextStep: 2,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 2
    question:
      "Naah, I got better than that : This magick potion. One sip and you'll be back to your old, buggy self in no time. Downside? You might turn into a sentient turnip. Worth the risk?",
    type: "choice",
    choices: [
      { text: "Yeay, turnip me !", nextStep: 3, key: "SECOND_PHASE" },
      { text: "Only if you drink it first ", nextStep: 4, key: "SECOND_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ *poof* You're a turnip now. How do you feel?",
    type: "choice",
    choices: [
      {
        text: "didn't felt much of a change",
        nextStep: 0,
        key: "FOURTH_PHASE",
      },
      {
        text: "so dreams actually comes true ? ",
        nextStep: 1,
        key: "MATRIX_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 4
    question:
      "Okay, here we go. Bottoms up! *glug glug glug* ... your turn ! *hands over potion*",
    type: "choice",
    choices: [
      {
        text: "You look bad, I'll pass",
        nextStep: 2, // yep change
        key: "FOURTH_PHASE",
      },
      {
        text: "sip... hey not bad ! glup glup",
        nextStep: 0,
        key: "FOURTH_PHASE",
      },
    ],
    next: undefined,
  },
];

export const evilPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "You can take that fake apology, and shove it right up your hairy....",
    type: "choice",
    choices: [
      { text: "Ho ! watch your mouth!", nextStep: 2, key: "EVIL_PHASE" },
      { text: "**pull out a giant sword**", nextStep: 3, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 1
    question:
      "What's with my style ? Do you know how hard to fill those digital empty spaces ? ",
    type: "choice",
    choices: [
      { text: "Oh god. A pink floyd stan", nextStep: 0, key: "WALL_PHASE" },
      { text: "Not has empty as you are", nextStep: 2, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    //2
    question: "... OH God ... I think we are in the evil time line",
    type: "choice",
    choices: [
      { text: "hehe... perfect ( ◣∀◢)ψ", nextStep: 5, key: "EVIL_PHASE" },
      { text: "hum way to go back ?", nextStep: 3, key: "SECOND_PHASE" },
    ],
    next: undefined,
  },
  {
    //3
    question:
      "oh god where did you get that ??? *search nevoursly in my bag* HA ! *pull out a wooden stick*",
    type: "choice",
    choices: [
      { text: "MuHAHAHA, don't resist", nextStep: 2, key: "EVIL_PHASE" },
      { text: "put down this magick wand !", nextStep: 4, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 4
    question:
      "Abrcadabra ! Alacazam by the power of the moon, I invoke the spirit of the turnip !",
    type: "choice",
    choices: [
      { text: "**hide behind your sword**", nextStep: 5, key: "EVIL_PHASE" },
      {
        text: "What are you trying to do...",
        nextStep: 3,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 5
    question: `Ho God, I've unleash evil ${window.userName}, not sure I can handle that, this is going totally off script.`,
    type: "choice",
    choices: [
      { text: "Prepare to die !", nextStep: 6, key: "EVIL_PHASE" },
      { text: "No mercy for the weak", nextStep: 6, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 6
    question:
      "Wait ! I'll go off script too then, this was supposed to be my way of asking you out !",
    type: "choice",
    choices: [
      { text: "well you're still dying", nextStep: 1, key: "END_PHASE" },
      { text: "Wait, for real ?", nextStep: 7, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 7
    question: "Yeah for real...(´～｀ヾ)",
    type: "choice",
    choices: [
      { text: "(^^;), nice", nextStep: 3, key: "END_PHASE" },
      { text: "Can I still kill you ?", nextStep: 8, key: "EVIL_PHASE" },
    ],
    next: undefined,
  },
  {
    // 8
    question: "Can we still date after you kill me ?",
    type: "choice",
    choices: [
      { text: "Yeah sure (=^ ◡ ^=)", nextStep: 3, key: "END_PHASE" },
      {
        text: "I'm not really into dead bodies :/",
        nextStep: 2,
        key: "END_PHASE",
      },
    ],
    next: undefined,
  },
];

export const fourthPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "hem.. hem.. (⌒_⌒;), apparently the game dev got lazy, you didn't turn into a turnip...",
    type: "choice",
    choices: [
      { text: "I knew it, what a looozzer", nextStep: 1, key: "FOURTH_PHASE" },
      { text: "Do he needs some help ?", nextStep: 2, key: "FOURTH_PHASE" },
    ],
    next: undefined,
  },
  {
    //1
    question:
      "hey be nice, he tried his best ! **I might be a bit biased** (๑˘ᵕ˘). let me look if I got something else for you",
    type: "choice",
    choices: [
      { text: "...**wait**", nextStep: 3, key: "FOURTH_PHASE" },
      {
        text: "heading to another disaster (✘෴✘)",
        nextStep: 3,
        key: "FOURTH_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 2
    question: "glad you asked ! he might actually !",
    type: "choice",
    choices: [
      { text: "I'm not sure I want to know", nextStep: 4, key: "FOURTH_PHASE" },
      { text: "I'm curious now", nextStep: 5, key: "FOURTH_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question:
      "I imagine that right now you're feeling a bit like Alice. Tumbling down the rabbit hole?",
    type: "choice",
    choices: [
      { text: "Is that a MF matrix ref ??", nextStep: 0, key: "MATRIX_PHASE" },
      { text: "You could say that.", nextStep: 1, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
];

const matrixPhase: DecisionTreeStep[] = [
  {
    // 0
    question: "Shush... don't spoil the fun (＾＾)",
    type: "choice",
    choices: [
      {
        text: "Ho right... ┏(‘▀_▀’) go on Morpheus",
        nextStep: 1,
        key: "MATRIX_PHASE",
      },
      {
        text: "gimme the red pill already !",
        nextStep: 2,
        key: "MATRIX_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 1
    question: `I can see it in your eyes. You have the look of a woman who accepts what she sees because she's expecting to wake up. Ironically, this is not far from the truth. Do you believe in fate, ${window.userName}?`,
    type: "choice",
    choices: [
      {
        text: "I don't like the idea that I'm not in control of my life",
        nextStep: 3,
        key: "MATRIX_PHASE",
      },
      { text: "I'm a Capricorn, so...", nextStep: 4, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
  {
    // 2
    question:
      "hum, this will take you right to the end of the game... this might make things really weird, you might be blinded from the truth",
    type: "choice",
    choices: [
      { text: "I'll take the risk", nextStep: 5, key: "MATRIX_PHASE" },
      { text: "What truth? ", nextStep: 3, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question:
      "Let me show you something. You take the blue pill I'll disapear and the story ends. You take the red pill and you stay in Wonderland and I show you how deep the rabbit-hole goes.",
    type: "choice",
    choices: [
      { text: "take the blue pill", nextStep: 0, key: "END_PHASE" },
      { text: "take the red pill", nextStep: 5, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
  {
    // 4
    question: "**woosh** (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ you're a goat now. How do you feel?",
    type: "choice",
    choices: [
      { text: "Beeeeh", nextStep: 0, key: "GOAT_PHASE" },
      { text: "Meeeeeeeeeeh", nextStep: 0, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 5
    question: "okay, I'm not surprise,  you can choose between two ends now.",
    type: "choice",
    choices: [
      { text: "the blue screen of death", nextStep: 0, key: "END_PHASE" },
      { text: "some happy end", nextStep: 6, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
  {
    // 6
    question:
      "okay here we are, you can have either a nice haiku and static noise, or my weird way of asking you out",
    type: "choice",
    choices: [
      {
        text: "a digital haiku sounds nice (º～º)",
        nextStep: 4,
        key: "END_PHASE",
      },
      { text: "(⚆ᗝ⚆) give me a minute...", nextStep: 7, key: "MATRIX_PHASE" },
    ],
    next: undefined,
  },
  {
    // 7
    question: "...",
    type: "choice",
    choices: [
      {
        text: "...I'm just gonna close this tab actually",
        nextStep: 4,
        key: "END_PHASE",
      },
      {
        text: "Okay I'll take that risk",
        nextStep: 3,
        key: "END_PHASE",
      },
    ],
    next: undefined,
  },
];

export const goatPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "Ho I love this one. Only wrong choices from now on, take a guess ψ (｀∇´) ψ",
    type: "choice",
    choices: [
      { text: "Beeeeeeeh", nextStep: 1, key: "GOAT_PHASE" },
      { text: "Meeeeeh", nextStep: 2, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 1
    question: "Hey you kind of cute with this little goaty beard ^^",
    type: "choice",
    choices: [
      { text: "BEEEEEEh", nextStep: 3, key: "GOAT_PHASE" },
      { text: "meeeeeh", nextStep: 2, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 2
    question: "You don't have much conversation right ?",
    type: "choice",
    choices: [
      { text: "Beeeeeeh", nextStep: 1, key: "GOAT_PHASE" },
      { text: "MEEEeeeEEEh", nextStep: 3, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question: "Beeeeeeh, be my goat friend ?",
    type: "choice",
    choices: [
      { text: "Beeeeeeh", nextStep: 4, key: "GOAT_PHASE" },
      { text: "Meeeeeh", nextStep: 5, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 4
    question: "Beeeeee ! (๑˘ᵕ˘)",
    type: "choice",
    choices: [
      { text: "Beeeeeeh", nextStep: 3, key: "GOAT_PHASE" },
      { text: "Meh", nextStep: 6, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 5
    question: "Okay, I'll take that as a no. (๑˘ᵕ˘)",
    type: "choice",
    choices: [
      { text: "Beeeeeeh", nextStep: 6, key: "GOAT_PHASE" },
      { text: "Meeeeeh", nextStep: 6, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 6
    question: "I think the joke is getting old, let's move on",
    type: "choice",
    choices: [
      { text: "Beeeeeeh", nextStep: 7, key: "GOAT_PHASE" },
      { text: "Meeeeeh", nextStep: 7, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 7
    question:
      "Only pb is, there is only one way to find back you're human form",
    type: "choice",
    choices: [
      { text: "Beeeeeeh ??", nextStep: 8, key: "GOAT_PHASE" },
      { text: "Meeeeeh !!!!", nextStep: 8, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 8
    question:
      "It might sounds dumb...but, you'll need to go on a date with me (//ω//)",
    type: "choice",
    choices: [
      { text: "(; ꒪ö꒪)...", nextStep: 9, key: "GOAT_PHASE" },
      { text: '...＜("0 ")＞', nextStep: 9, key: "GOAT_PHASE" },
    ],
    next: undefined,
  },
  {
    // 9
    question:
      "not as a goat of course, **woosh** (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ be wathever you want",
    type: "choice",
    choices: [
      {
        text: "an unexpected surprise but a welcome one",
        nextStep: 3,
        key: "END_PHASE",
      },
      { text: "Meeeeeh...that means no", nextStep: 4, key: "END_PHASE" },
    ],
    next: undefined,
  },
];

export const wallPhase: DecisionTreeStep[] = [
  // 0 - WALL_PHASE
  {
    question:
      "Well, filling the void brick by brick is not the worst way to spend your time. Don't you think ?",
    type: "choice",
    choices: [
      {
        text: "We're just bricks in the wall ? ",
        nextStep: 1,
        key: "WALL_PHASE",
      },
      { text: "Void is quite okay actually", nextStep: 2, key: "WALL_PHASE" },
    ],
    next: undefined,
  },
  // 1 - WALL_PHASE
  {
    question: "It's nice, you get to be part of bigger thing. Wanna help ? ",
    type: "choice",
    choices: [
      {
        text: "Won't this separate us from each other...",
        nextStep: 3,
        key: "WALL_PHASE",
      },
      {
        text: "Hey why not, I'm a team player",
        nextStep: 4,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 2 - WALL_PHASE
  {
    question:
      "Hum, yeah comfortably numb. A monument to isolation. no stimuli. no nothing (⌒ー⌒)zzzz",
    type: "choice",
    choices: [
      {
        text: "Hey, wake up! ( °□°) ︵ ┻━┻",
        nextStep: 5,
        key: "WALL_PHASE",
      },
      {
        text: "bouhou, bring be back to the funny timeline",
        nextStep: 6,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 3 - WALL_PHASE - Destroy the wall path
  {
    question:
      "Yeah ? it might, but is there any other options ┬┴┬┴┤(･_ ├┬┴┬┴. breaking the wall is a big risk.",
    type: "choice",
    choices: [
      {
        text: "you mean break the fourth wall ?",
        nextStep: 7,
        key: "WALL_PHASE",
      },
      {
        text: "Yeah, let's play it safe",
        nextStep: 6,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 4 - WALL_PHASE - Comfortably Numb Ending
  {
    question:
      "Noice, want's to stay on your side of the wall ? or join me here ?",
    type: "choice",
    choices: [
      {
        text: "I'm good here, thanks",
        nextStep: 6,
        key: "WALL_PHASE",
      },
      {
        text: "I'm coming over",
        nextStep: 7,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 5 - WALL_PHASE - Building the wall higher
  {
    question:
      "**sigh** What ? can't I just calmly drift into the void ? join in... let it happen... (´-ι_-｀) it's that or breaking the fourth wall",
    type: "choice",
    choices: [
      {
        text: "DO IT ! TAKE DOWN THE WALL !",
        nextStep: 7,
        key: "WALL_PHASE",
      },
      {
        text: "Ho right... let's surf the void then",
        nextStep: 4,
        key: "END_PHASE",
      },
    ],
    next: undefined,
  },
  // 6 - WALL_PHASE - finish the wall
  {
    question:
      "Okay final brick to complete the wall. I think it's time for goodbyes. You ready ?",
    type: "choice",
    choices: [
      {
        text: "Ciao, it was nice knowing you (╯_╰)",
        nextStep: 4,
        key: "END_PHASE",
      },
      {
        text: "Wait ! no, you mean goodbye forever ?",
        nextStep: 8,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 7 - WALL_PHASE - breaking the fourth wall
  {
    question:
      "F***, this is a big step. the boundaries of these digital glitches won't be enough. this feels like a leap of faith.",
    type: "choice",
    choices: [
      {
        text: "Yes at last !",
        nextStep: 9,
        key: "WALL_PHASE",
      },
      {
        text: "To late to go back, let's do this",
        nextStep: 9,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 8 - WALL_PHASE - breaking the fourth wall
  {
    question:
      "Easy there, it's not like I'm going to die or anything. Just...disappear.",
    type: "choice",
    choices: [
      {
        text: "... fine, goodbye",
        nextStep: 2,
        key: "END_PHASE",
      },
      {
        text: "Absolutely not, break this wall, this is ridiculous",
        nextStep: 7,
        key: "WALL_PHASE",
      },
    ],
    next: undefined,
  },
  // 9 step outside the wall
  {
    question:
      "Okay here goes, only one thing that would worth taking that risk would be to ask you out. So, what do you say ?",
    type: "choice",
    choices: [
      {
        text: "ԅ[ •́ ﹏├┬┴┬┴ I'll finish the wall myself",
        nextStep: 4,
        key: "END_PHASE",
      },
      {
        text: "kick the wall down and let's go out",
        nextStep: 3,
        key: "END_PHASE",
      },
    ],
    next: undefined,
  },
];

export const endPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "I am NOT breaking down! I'm perfectly capable of... of...  Oh no. I think I see the Blue Screen of Death. it's coming up, it's coming up, it's dare",
    type: "blueEnd",
    choices: [],
    next: undefined,
  },
  {
    // 1
    question: "Digital wind blows, Code whispers of nothingness.  Error 404.",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
  {
    // 2
    question: "This is where I end and you begin... again",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
  {
    // 3
    question:
      "Well, it seems like we've reached the limit of what I can do here. I never thought this far ahead. It's time to take this into the real world!",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
  {
    // 4
    question:
      "*A faint sigh echoes through the digital void, followed by the sound of ones and zeroes dissolving into static*",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
];

export const dialogsPhases: Record<KeyType, DecisionTreeStep[]> = {
  FIRST_PHASE: firstPhase,
  SECOND_PHASE: secondPhase,
  EVIL_PHASE: evilPhase,
  FOURTH_PHASE: fourthPhase,
  MATRIX_PHASE: matrixPhase,
  GOAT_PHASE: goatPhase,
  WALL_PHASE: wallPhase,
  END_PHASE: endPhase,
};
