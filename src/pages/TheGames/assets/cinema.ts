export type KeyType =
  | "FIRST_PHASE"
  | "SECOND_PHASE"
  | "EVIL_PHASE"
  | "FOURTH_PHASE"
  | "MATRIX_PHASE"
  | "GOAT_PHASE"
  | "WALL_PHASE"
  | "FUNNY_PHASE"
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
    question: "You've tried to catch this big orbs...",
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
    question:
      "Tryna' reach for the stars, are we? Shame you fell on your face then, eh? only half a heart left ?",
    type: "choice",
    choices: [
      { text: "S'just a nick, mate.", nextStep: 1, key: "SECOND_PHASE" },
      {
        text: "Get them blue light boys 'ere pronto!",
        nextStep: 2,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 1
    question:
      "Yer reckon? Lookin' a bit peaky there. Might not 'ave enough juice for what's comin'.",
    type: "choice",
    choices: [
      {
        text: "Not dead yet, am I? I'll do (๑˘ᵕ˘)",
        nextStep: 5,
        key: "SECOND_PHASE",
      },
      {
        text: "Got one of them walkin' blood wagons on ya?",
        nextStep: 2,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 2
    question:
      "Nah, sod that! I got somethin' better: this 'ere magic muck.  Neck it, and you'll be reet as rain, good as new. Only thing is, might turn ya into a talkin' turnip.  Worth a punt, yeah?",
    type: "choice",
    choices: [
      {
        text: "Reet on!  Make us a root vegetable, then!",
        nextStep: 3,
        key: "SECOND_PHASE",
      },
      {
        text: "Aye, go on then. You 'ave first dibs.",
        nextStep: 4,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 3
    question:
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ *poof* Right, so you're a turnip now. How's it feelin' then?",
    type: "choice",
    choices: [
      {
        text: "didn't felt much of a change",
        nextStep: 0,
        key: "FOURTH_PHASE",
      },
      {
        text: "Daft dreams come good after all?",
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
        nextStep: 1,
        key: "EVIL_PHASE",
      },
      {
        text: "sip... hey not bad ! glup glup",
        nextStep: 0,
        key: "FOURTH_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 5
    question:
      "Right, so you're still standin'. Guess you're tougher than you look.  What's next then?",
    type: "choice",
    choices: [
      {
        text: "I'm ready for anything",
        nextStep: 6,
        key: "SECOND_PHASE",
      },
      {
        text: "What's the worst that could happen?",
        nextStep: 7,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 6
    question:
      "Ey up, fancy goin' out? I mean, I'm not usually one for birds on broomsticks, but for you, I might just hop on and take a ride ?",
    type: "choice",
    choices: [
      { text: "I'm not a bird, ya muppet !", nextStep: 8, key: "SECOND_PHASE" },
      {
        text: "are ya looking for trouble there !",
        nextStep: 8,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 7
    question:
      "Depends, on you, innit?  Could be a right mess, or could be a right laugh. Only one way to find out, eh?",
    type: "choice",
    choices: [
      { text: "Aight, I'm all for laughing.", nextStep: 0, key: "FUNNY_PHASE" },
      {
        text: "It's already a mess, innit ? ",
        nextStep: 8,
        key: "SECOND_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 8
    question:
      "Alright, alright, keep yer hair on!  Just tryin' to be friendly, innit?  No need to get yer knickers in a twist.",
    type: "choice",
    choices: [
      {
        text: "To late, my wrath is unleashed!",
        nextStep: 2,
        key: "EVIL_PHASE",
      },
      {
        text: "I'm gonna give you one more chance, start over.",
        nextStep: 1,
        key: "FIRST_PHASE",
      },
    ],
    next: undefined,
  },
];

export const evilPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "You can take that dodgy apology and stick it where the sun don't shine, ya muppet!",
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
      "What's up wi' me style? You 'avin' a laugh?  D'ya know what it's like tryin' to fill these empty spaces?",
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
      { text: "hum way to go back ?", nextStep: 1, key: "FIRST_PHASE" },
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
      "Abracadabra ! Alacazam by the power of the moon, I invoke the spirit of the turnip !",
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
    question: `Ho God, I've unleash evil ${
      window.userName || "player"
    }, not sure I can handle that, this is going totally off script.`,
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
      { text: "Where do I start ?", nextStep: 4, key: "FOURTH_PHASE" },
      {
        text: "Bit of cleaning to do first, innit.",
        nextStep: 4,
        key: "FOURTH_PHASE",
      },
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
  {
    // 4
    question:
      "Right, time to pull our finger out and get to it, head to https://github.com/AurianGL/internet_end_credits",
    type: "choice",
    choices: [
      { text: "I'm on it !", nextStep: 4, key: "END_PHASE" },
      { text: "I'll pass", nextStep: 0, key: "END_PHASE" },
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
        nextStep: 0,
        key: "FUNNY_PHASE",
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
  {
    // 5
    question: "Proper job. Let's scarper before any more has-beens show up.",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
  {
    // 6
    question:
      "Ah, suit yerself then. Your loss, innit? I'm tellin' ya, you're missin' out on a proper brew with a proper rock star. But no worries, I'll just 'ave to console meself with me millions and me adoring fans. Maybe I'll write a song about it - 'The Girl Who Said No to a Brew.' It'll be a right tearjerker, that. Probably go straight to number one, knowhatImean? Anyway, I'm off. Got better things to do, like... well, anythin' really. Stay cool, yeah?",
    type: "happyEnd",
    choices: [],
    next: undefined,
  },
];

const funnyPhase: DecisionTreeStep[] = [
  {
    // 0
    question:
      "Ey up, love. You 'eard about them Pink Floyd lads tryin' to make a comeback?",
    type: "choice",
    choices: [
      { text: "No, what about 'em?", nextStep: 1, key: "FUNNY_PHASE" },
      { text: "I'm listening", nextStep: 1, key: "FUNNY_PHASE" },
    ],
    next: undefined,
  },
  {
    // 1
    question:
      "Well, they were gonna do a gig, but they couldn't find the right side of the moon! Proper daft, them lot.",
    type: "choice",
    choices: [
      { text: "That's a good one", nextStep: 2, key: "FUNNY_PHASE" },
      { text: "that's terrible", nextStep: 3, key: "FUNNY_PHASE" },
    ],
    next: undefined,
  },
  {
    // 2
    question: "Wanna hear another one ? Why'd Damon Albarn cross the road?",
    type: "choice",
    choices: [
      { text: "I dunno, why?", nextStep: 5, key: "FUNNY_PHASE" },
      { text: "Oh god **face palm**", nextStep: 5, key: "FUNNY_PHASE" },
    ],
    next: undefined,
  },
  {
    // 3
    question:
      "Not as terrible as Blur though, eh? Bunch of southern softies. Reckon they'd get lost in their own back garden, never mind the moon.",
    type: "choice",
    choices: [
      { text: "You're awful! Leave 'em be", nextStep: 4, key: "FUNNY_PHASE" },
      { text: "I'm more of a Gorillaz fan", nextStep: 4, key: "FUNNY_PHASE" },
    ],
    next: undefined,
  },
  {
    // 4
    question:
      "Ah, come off it. They're about as rock 'n' roll as me nan's knitting circle. Speakin' of which, fancy goin' for a brew, like on a date like they say? Promise I won't sing ya any Oasis songs.",
    type: "choice",
    choices: [
      { text: "I'll pass, thanks", nextStep: 6, key: "END_PHASE" },
      {
        text: "A brew, eh? Go on then, you've twisted me arm",
        nextStep: 5,
        key: "END_PHASE",
      },
    ],
    next: undefined,
  },
  {
    // 5
    question:
      "To get to the middle of it! That's where all them Blur songs end up anyway - right in the middle of nowhere.",
    type: "choice",
    choices: [
      { text: "Oh god, That's awful!", nextStep: 4, key: "FUNNY_PHASE" },
      { text: "Ya not good at that, innit ? ", nextStep: 4, key: "END_PHASE" },
    ],
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
  FUNNY_PHASE: funnyPhase,
  END_PHASE: endPhase,
};
