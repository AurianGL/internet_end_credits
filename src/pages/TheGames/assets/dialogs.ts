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

interface DialogueNode {
  message: string;
  choices?: Choice[];
}

interface Choice {
  text: string;
  nextNode: DialogueNode;
}
