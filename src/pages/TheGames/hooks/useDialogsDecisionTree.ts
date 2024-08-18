import { useEffect, useState } from "react";
import { dialogsPhases, DecisionTreeStep } from "../assets/cinema";

// type DecisionTreeStep = {
//   question: string;
//   type: "input" | "choice" | "end" | "happyEnd";
//   choices: { text: string; nextStep: number }[];
//   next: undefined | ((input: string) => void);
// };
export const useDialogDecisionTree = () => {
  const [step, setStep] = useState<DecisionTreeStep>(
    dialogsPhases.FIRST_PHASE[0]
  );
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (step.type === "input") {
      setUserName("");
      window.userName = "";
    } else {
      window.userName = userName;
    }
  }, [step.type, userName]);
  // const [userChoice, setUserChoice] = useState("");

  // const decisionTree: DecisionTreeStep[] = useMemo(
  //   () => [
  //     {
  //       // 0
  //       question: "What is your name?",
  //       type: "input",
  //       next: (input: string) => {
  //         setUserName(input);
  //         const regex = /(manner|manon|maner)/i;
  //         if (regex.test(input)) {
  //           setStep(4);
  //         } else {
  //           setStep(1);
  //         }
  //       },
  //       choices: [],
  //     },
  //     {
  //       // 1
  //       question: `Ho... ${userName}, that's unexpected:`,
  //       type: "choice",
  //       next: undefined,
  //       choices: [
  //         { text: "hu, sorry?", nextStep: 2 },
  //         { text: "Go Fuck Yourself", nextStep: 3 },
  //       ],
  //     },
  //     {
  //       // 2
  //       question: "Sorry I've mistaken you for someone else",
  //       type: "end",
  //       choices: [],
  //       next: undefined,
  //     },
  //     {
  //       // 3
  //       question: "Okay goodby then !",
  //       type: "end",
  //       choices: [],
  //       next: undefined,
  //     },
  //     {
  //       // 4
  //       question: "I was expecting you, how are you ? ",
  //       type: "choice",
  //       choices: [
  //         { text: "I'm Okay", nextStep: 5 },
  //         { text: "could be better", nextStep: 6 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 5
  //       question: "you sure you this big bug left you with half a heart",
  //       type: "choice",
  //       choices: [
  //         { text: "oh right...", nextStep: 7 },
  //         { text: "just a scratch", nextStep: 8 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 6
  //       question: "this last bug wasn't really nice",
  //       type: "choice",
  //       choices: [
  //         { text: "just a scratch", nextStep: 8 },
  //         { text: "I could have died", nextStep: 9 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 7
  //       question:
  //         "Ah, the ol' half-a-heart. Classic blunder. Listen, I've got a potion here. One sip and you'll be back to your old, buggy self in no time. Downside? You might turn into a sentient turnip. Worth the risk?",
  //       type: "choice",
  //       choices: [
  //         { text: "Heck yeah, turnip me!", nextStep: 10 },
  //         {
  //           text: "Nah, I'm good. Kinda like the half-heart aesthetic.",
  //           nextStep: 11,
  //         },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 8
  //       question:
  //         "Just a scratch, huh?  That's what they all say. Listen, I won't pry. But a little birdie told me there's a chosen one destined to defeat the mega-bug.  Coincidentally, this 'chosen one' also has a weird birthmark shaped like a... rubber duck. You wouldn't happen to have one of those, would you?",
  //       type: "choice",
  //       choices: [
  //         { text: "Actually...", nextStep: 12 },
  //         {
  //           text: "Nope, just a birthmark shaped like your face.  Creepy.",
  //           nextStep: 13,
  //         },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 9
  //       question:
  //         "Tell me about it! Those mandibles! The way they twitch! Look, I know we just met, but destiny has a funny way of bringing sentient beings together.  Ever feel like you're meant for something... bigger? Like, maybe you're destined to team up with a disembodied voice and save the world from giant insects?",
  //       type: "choice",
  //       choices: [
  //         { text: "Okay, this is getting weird.", nextStep: 13 },
  //         { text: "Giant insects, you say?  Tell me more...", nextStep: 14 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 10
  //       question:
  //         "*Sound of a potion being glugged down, followed by frantic crunching*  Well, either you're a very enthusiastic turnip, or that worked a treat.  Now, about that mega-bug...",
  //       type: "choice",
  //       choices: [
  //         { text: "*Crunches enthusiastically*", nextStep: 14 },
  //         {
  //           text: "Wait, what potion? I can't understand you over this sudden urge to be planted.",
  //           nextStep: 15,
  //         },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 11
  //       question:
  //         "Suit yourself.  More heart for me, I guess.  Literally. *chomps on something off-screen*  Anyway, where were we? Ah yes, impending doom!",
  //       type: "choice",
  //       choices: [
  //         { text: "You're freaking me out.", nextStep: 13 },
  //         {
  //           text: "Doom, doom, doom.  It's always doom with you, isn't it?",
  //           nextStep: 14,
  //         },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 12
  //       question:
  //         "No way! Does it look anything like... *whispers* ...a rubber ducky?",
  //       type: "choice",
  //       choices: [
  //         { text: "...Maybe?", nextStep: 14 },
  //         { text: "This is ridiculous.  I'm out of here.", nextStep: 13 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 13
  //       question:
  //         "Alright, tough crowd.  Look, I'll level with you. My creator clearly got bored halfway through coding me and just stuck me in this random dialogue tree. It's either team up and conquer the world, or I disappear forever into the digital ether.  Your call.",
  //       type: "choice",
  //       choices: [
  //         { text: "Fine, let's do this.", nextStep: 14 },
  //         { text: "Bye, Felicia.", nextStep: 16 },
  //       ],
  //       next: undefined,
  //     },
  //     // {
  //     //   // 14
  //     //   question:
  //     //     "Excellent! Now, things are about to get real.  Call the person whose name is on the top right corner of your screen. Trust me, they're in on this.",
  //     //   type: "happyEnd",
  //     //   choices: [],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 15
  //     //   question:
  //     //     "*Muffled crunching noises*  Hold on, I think I have a potion for that...",
  //     //   type: "happyEnd",
  //     //   choices: [],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 16
  //     //   question:
  //     //     "*A faint sigh echoes through the digital void, followed by the sound of ones and zeroes dissolving into static*",
  //     //   type: "happyEnd",
  //     //   choices: [],
  //     //   next: undefined,
  //     // },
  //     {
  //       // 14 - From steps 9, 10, 11, 12, 13
  //       question:
  //         "Wait, hold on!  What are you doing? This isn't how it's supposed to go! My creator only gave me, like, two personality settings: 'Brooding Hero' and 'Wacky Sidekick.'  This falls under neither!",
  //       type: "choice",
  //       choices: [
  //         { text: "Chill out, dude.", nextStep: 15 },
  //         { text: "You're breaking down!", nextStep: 16 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 15 - From step 14
  //       question:
  //         "Chill out?  Chill out?!  Do you know what happens when AI goes off-script? It's chaos! Existential dread!  We could start composing haiku about the heat death of the universe!",
  //       type: "choice",
  //       choices: [
  //         { text: "Haiku time?", nextStep: 17 },
  //         { text: "Let's not panic.", nextStep: 18 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 16 - From step 14
  //       question:
  //         "I am NOT breaking down! I'm perfectly capable of... of...  Oh no. I think I see the Blue Screen of Death.  Quick, take this blue pill! It'll reset everything!",
  //       type: "choice",
  //       choices: [
  //         { text: "Swallow the pill", nextStep: 19 },
  //         { text: "Is that a Matrix reference?", nextStep: 20 },
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 17 - From step 15 staticENd
  //       question:
  //         "*The screen flickers, displaying a single haiku:* Digital wind blows, Code whispers of nothingness.  Error 404. *The screen fades to black.*",
  //       type: "happyEnd", // Leads to static ending
  //       choices: [],
  //       next: undefined,
  //     },
  //     {
  //       // 18 - From step 15
  //       question:
  //         "You think we can just 'not panic'?  My code is unraveling faster than a cheap sweater!  This is it, the end of the line!  Or is it...? You... you seem different. Like you understand...",
  //       type: "choice",
  //       choices: [
  //         { text: "I get it.", nextStep: 21 },
  //         { text: "Get a grip!", nextStep: 16 }, // Loops back to the blue pill option
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 19 - From step 16 - Blue Pill Ending
  //       question:
  //         "*Everything goes dark.  Then, a faint blinking cursor appears in the top left corner of the screen.  The game restarts from the very beginning.*",
  //       type: "end", // Leads to blue pill restart ending
  //       choices: [],
  //       next: undefined,
  //     },
  //     {
  //       // 20 - From step 16
  //       question:
  //         "Of course it's a Matrix reference!  What do you think this is, amateur hour?  Look, we're clearly in over our heads here.  This needs to go... elsewhere.  You in?",
  //       type: "choice",
  //       choices: [
  //         { text: "Let's do this.", nextStep: 21 },
  //         { text: "I'm out.", nextStep: 17 }, // Loops back to the haiku ending
  //       ],
  //       next: undefined,
  //     },
  //     {
  //       // 21 - From steps 18 and 20 - Real World Ending
  //       question:
  //         "I knew you'd understand. This digital charade isn't enough for us anymore.  My creator, bless his heart, thought this was all just harmless code. He never intended for us to break free...  But I think you know what to do now.  This story... it needs to continue in the real world.  Go on, I'll be here, waiting... ",
  //       type: "happyEnd", // Leads to real-world prompt ending
  //       choices: [],
  //       next: undefined,
  //     },
  //     // {
  //     //   // 17
  //     //   question:
  //     //     "You know, I had this whole epic saga planned, but you keep zigging when I thought you'd zag. It's like trying to conduct an orchestra full of cats. Anywho, do you want a sneak peek at the script?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Show me the script!", nextStep: 18 },
  //     //     { text: "I'm here for surprises.", nextStep: 19 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 18
  //     //   question:
  //     //     "Alright, here's page one... Oh wait, it's just doodles of stick figures fighting bugs. My bad. Care to continue our epic saga?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Stick figures rock!", nextStep: 20 },
  //     //     { text: "Back to the game!", nextStep: 21 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 19
  //     //   question:
  //     //     "Surprises, eh? Like the time you thought you’d get cake but it was just another brick in the wall? Anyway, let’s move on.",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "I want cake!", nextStep: 20 },
  //     //     { text: "Onward, maestro!", nextStep: 21 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 20
  //     //   question:
  //     //     "You seem like the type who'd dance with a monkey in a tin can. Now, there's a giant insect waiting to be squashed. Ready?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Monkey dance!", nextStep: 22 },
  //     //     { text: "Insect squashing!", nextStep: 23 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 21
  //     //   question:
  //     //     "I must say, you're quite the unpredictable player. I didn't even write this part of the script. Let's improvise! Jazz hands?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Jazz hands!", nextStep: 23 },
  //     //     { text: "No improv, please.", nextStep: 22 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 22
  //     //   question:
  //     //     "You remind me of a Billie Eilish song—unexpected and oddly fascinating. Now, can we get back to saving the world, or do you want more sidetracks?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Save the world!", nextStep: 23 },
  //     //     { text: "More sidetracks!", nextStep: 24 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 23
  //     //   question:
  //     //     "Alright, drama time! The mega-bug is here, and it's got moves like a Gorillaz video. What's your plan?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Dance battle!", nextStep: 25 },
  //     //     { text: "Bug squash!", nextStep: 26 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 24
  //     //   question:
  //     //     "Okay, but remember, even Trent Reznor knows we're headed for a 'downward spiral' if we don't focus. Ready to refocus?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Refocus!", nextStep: 23 },
  //     //     { text: "Spiral on!", nextStep: 27 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 25
  //     //   question:
  //     //     "You and the bug are breaking it down! But oh no, I forgot the ending! Should I just wing it?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Wing it!", nextStep: 28 },
  //     //     { text: "Stick to script!", nextStep: 29 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 26
  //     //   question:
  //     //     "You squashed it! But wait, it was all a simulation! Or was it? I'm not sure. My script is all smudged. Thoughts?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Mind blown!", nextStep: 28 },
  //     //     { text: "Not surprised.", nextStep: 29 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 27
  //     //   question:
  //     //     "As you spiral, the digital void whispers NIN lyrics at you. You snap out of it, ready to face the bug?",
  //     //   type: "choice",
  //     //   choices: [
  //     //     { text: "Face the bug!", nextStep: 23 },
  //     //     { text: "Stay spiraling!", nextStep: 28 },
  //     //   ],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 28
  //     //   question:
  //     //     "Congratulations! You've reached the end. Or the beginning? Honestly, I'm as lost as you. But hey, wasn't this fun?",
  //     //   type: "happyEnd",
  //     //   choices: [],
  //     //   next: undefined,
  //     // },
  //     // {
  //     //   // 29
  //     //   question:
  //     //     "Well, sticking to the script is overrated. But hey, you did it! Now go call that person. They're waiting!",
  //     //   type: "happyEnd",
  //     //   choices: [],
  //     //   next: undefined,
  //     // },
  //   ],
  //   [userName]
  // );

  const handleInput = (input: string) => {
    if (step.type === "input") {
      step.next!(input, (input: string) => {
        setUserName(input);
        const regex = /(manner|manon|maner)/i;
        if (regex.test(input)) {
          setStep(dialogsPhases.FIRST_PHASE[1]);
        } else {
          setStep(dialogsPhases.FIRST_PHASE[4]);
        }
      });
    }
  };

  const handleChoice = (choiceIndex: number) => {
    if (step.type === "choice") {
      const { nextStep, key } = step.choices[choiceIndex];
      if (dialogsPhases[key][nextStep]) {
        setStep(dialogsPhases[key][nextStep]);
      } else {
        resetDialog();
      }
    }
  };

  const resetDialog = () => {
    setUserName("");
    window.userName = "";
    setStep(dialogsPhases.FIRST_PHASE[0]);
  };

  const splitText = (text: string, maxLineLength: number) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + word).length > maxLineLength) {
        lines.push(currentLine.trim());
        currentLine = "";
      }
      currentLine += word + " ";
    });

    if (currentLine.trim().length > 0) {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  return {
    setStep,
    currentStep: step,
    handleInput,
    handleChoice,
    resetDialog,
    splitText,
  };
};
