export const dialogs = {
  friendlyNPC: {
    greeting: "Hello! How are you?",
    farewell: "Goodbye! Have a nice day!",
  },
  enemyNPC: {
    greeting: "I will destroy you!",
    farewell: "You win this time!",
  },
};
export const explorationDialogs = (frame: number, eggCount: number) => {
  if (eggCount === 0) {
    if (frame < 200) {
      return "Try to catch the orbs!";
    }
    if (frame < 400) {
      return "Time's flying by! But so are those orbs!";
    }
    if (frame < 600) {
      return "What's the matter, slowpoke?";
    }
    if (frame > 600) {
      return "Hah! Looks like someone's tentacles are tied!";
    }
  }
  if (eggCount === 1) {
    if (frame < 400) {
      return "You're one tentacle-rrific orb catcher!";
    }
    if (frame < 600) {
      return "I'm not an orb!";
    }
    if (frame < 600) {
      return "Don't get cocky, kid.";
    }
  }
  if (eggCount === 2) {
    if (frame < 600) {
      return "Enjoy your little lead while it lasts...";
    }
    if (frame < 800) {
      return "Make every second count... and every bug!";
    }
    if (frame < 80) {
      return "It's the final countdown!";
    }
  }
  const randomDialogs = [
    "here comes bigger orbs",
    "wanna meet your masters ?",
    "you're not ready for this.",
    "Tannhäuser Gate are close now",
    "we're gonna play a new game",
    "one minute to midnight",
  ];
  return randomDialogs[Math.round(frame / 10) % randomDialogs.length];
};

interface DialogueNode {
  message: string;
  choices?: Choice[];
}

interface Choice {
  text: string;
  nextNode: DialogueNode;
}
