import { useCallback, useMemo, useState } from "react";
import { drawCharacterOnCanvas } from "../assets/character";
import { drawHeartsOnCanvas } from "../assets/hearts";
import { Tile, TILE_SIZE } from "../assets/tile";
import { Direction, NonPlayerCharacter } from "./useNPCsState";
import { Phase } from "./useGameState";
import { useNavigate } from "react-router-dom";
import { DecisionTreeStep } from "../assets/cinema";
import { drawStars, Star } from "../assets/nightsky";

interface CinematicProps {
  eggsCollected: number;
  handleIsOutOfBound: () => void;
  handleUserInput: () => void;
  heartCount: number;
  isOutOfBound: boolean;
  map: Star[];
  npcs: NonPlayerCharacter[];
  position: { x: number; y: number };
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
  setUserSeqIndex: React.Dispatch<React.SetStateAction<number>>;
  updateNPC: (id: number, npc: Partial<NonPlayerCharacter>) => void;
  userInput: string[];
  userSeqIndex: number;
  selectedColor: string;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setGamePhase: (phase: Phase) => void;
  currentStep: DecisionTreeStep;
  handleInput: (input: string) => void;
  handleChoice: (choice: number) => void;
  resetDialog: () => void;
  splitText: (text: string, maxLength: number) => string[];
  witch: number;
}

// const initialAsciiChars = Array.from({ length: 4000 }, () =>
//   String.fromCharCode(33 + Math.floor(Math.random() * 94))
// );

// const insertCharsAtIndex = (
//   chars: string[],
//   index: number,
//   newChars: string[]
// ) => {
//   const updatedChars = [...chars];
//   // remove char of newChars length starting at index
//   updatedChars.splice(index, newChars.length, ...newChars);
//   return updatedChars; // Ensure the array length remains 100
// };

export const useCinematic = ({
  eggsCollected,
  handleIsOutOfBound,
  handleUserInput,
  heartCount,
  isOutOfBound,
  map,
  npcs,
  position,
  setHeartCount,
  setUserSeqIndex,
  updateNPC,
  userInput,
  setIsInputVisible,
  inputValue,
  setGamePhase,
  currentStep,
  handleInput,
  handleChoice,
  resetDialog,
  splitText,
  witch,
}: CinematicProps) => {
  const [bugPosition, setBugPosition] = useState({ x: 0, y: -400 });
  // const [asciiChars, setAsciiChars] = useState<string[]>(initialAsciiChars);
  const [orbDiameter, setOrbDiameter] = useState(0);
  const [smallOrbsPositions, setSmallOrbsPositions] = useState(() => {
    let positions: { x: number; y: number }[] = [];
    for (let i = 0; i < 100; i++) {
      positions.push({ x: Math.random() * 400, y: Math.random() * 400 });
    }
    return positions;
  });
  const [alpha, setAlpha] = useState(0);
  const [staticAlpha, setstaticAlpha] = useState(0);
  const [frame, setFrame] = useState(0);

  const navigate = useNavigate();

  const [conversationFrame, setConversationFrame] = useState<
    number | undefined
  >(undefined);
  // const generateAsciiChars = () => {
  //   const newChars: string[] = [];
  //   for (let i = 0; i < 100; i++) {
  //     newChars.push(String.fromCharCode(33 + Math.floor(Math.random() * 94))); // Random ASCII characters
  //   }
  //   setAsciiChars((prev) => {
  //     const updatedChars = [...prev];
  //     updatedChars.splice(-100, 100); // Remove the last 10 characters
  //     updatedChars.unshift(...newChars); // Insert 10 new characters at the beginning
  //     return updatedChars;
  //   });
  // };

  const isPlayerCollidingWithBug = useMemo(() => {
    return (
      position.x < bugPosition.x + 400 &&
      position.x > bugPosition.x &&
      position.y < bugPosition.y + 400 &&
      position.y > bugPosition.y
    );
  }, [bugPosition, position]);

  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (isOutOfBound) {
        handleIsOutOfBound();
        return;
      }
      if (alpha !== 1 && currentStep.type !== "happyEnd") {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0.6, "#0e002e"); // Dark blue
        gradient.addColorStop(0.88, "#552f73"); // Mid blue
        gradient.addColorStop(0.94, "#5a166f"); // Orange
        gradient.addColorStop(1, "#670d08"); // Yellow-orange (sunset)
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // draw a black layer on top of the map with alpha
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(0, 0, 400, 400);
      const stars = map.map((star) => {
        star.size += star.pulse;
        if (star.size > 2 || star.size < 1) {
          star.pulse = -star.pulse;
        }
        return star;
      });
      drawStars(ctx, stars);

      if (currentStep.type === "happyEnd") {
        // draw a static noise effect
        ctx.fillStyle = `rgba(255, 255, 255, ${staticAlpha})`;
        for (let i = 0; i < 400; i += 1) {
          for (let j = 0; j < 400; j += 1) {
            if (Math.random() > 0.7) {
              ctx.fillRect(i, j, 1, 1);
            }
          }
        }
      }

      if (now - firstFrameTime.current > 100) {
        setFrame((prev) => prev + 1);
        if (isPlayerCollidingWithBug && heartCount > 1) {
          setHeartCount((prev) => prev - 1);
        }
        // rise the alpha every 10 frames
        if (alpha < 1) {
          setAlpha((prev) => parseFloat((prev + 0.01).toFixed(2)));
        }
        // update the position of nps so they move toward the nearest edge of the map until they are out of bounds
        npcs.forEach(({ id, position: { x, y }, seqIndex, isFriendly }) => {
          let direction: Direction = { x: 0, y: 0 };

          if (frame > 250 && isFriendly) {
            const distance = Math.sqrt(
              Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2)
            );
            const minDistance = 64;

            if (distance < minDistance) {
              setConversationFrame((prev) => {
                if (prev === undefined) {
                  return 1;
                }
                return prev + 1;
              });

              // Calculate the angle to the user character
              const angle = Math.atan2(position.y - y, position.x - x);

              // Set direction to circle around the user character
              direction = {
                x: Math.cos(angle + Math.PI / 2) as 1, // Move perpendicular to the angle
                y: Math.sin(angle + Math.PI / 2) as 1, // Move perpendicular to the angle
              };
            } else {
              direction = {
                x: position.x - x > 0 ? 1 : -1,
                y: position.y - y > 0 ? 1 : -1,
              };
            }
            updateNPC(id, {
              position: {
                x: x + direction.x * 5,
                y: y + direction.y * 5,
              },
              seqIndex: (seqIndex + 1) % 4,
              direction,
            });
            return;
          }
          const distances: Record<string, number> = {
            top: y,
            bottom: 400 - y,
            left: x,
            right: 400 - x,
          };

          const nearestEdge = Object.keys(distances).reduce((a, b) =>
            distances[a] < distances[b] ? a : b
          );

          switch (nearestEdge) {
            case "top":
              direction.y = -1;
              break;
            case "bottom":
              direction.y = 1;
              break;
            case "left":
              direction.x = -1;
              break;
            case "right":
              direction.x = 1;
              break;
          }

          const nextX = x + direction.x;
          const nextY = y + direction.y;

          if (nextX < 0 || nextX > 400 || nextY < 0 || nextY > 400) {
            updateNPC(id, {
              position: { x: nextX, y: nextY },
            });
          } else {
            updateNPC(id, {
              position: { x: x + direction.x * 10, y: y + direction.y * 10 },
            });
          }
        });

        if (userInput.length > 0) {
          handleUserInput();
        }
        if (frame < 200) {
          // generateAsciiChars();
          setOrbDiameter((prev) => prev + 1);
        } else if (frame > 200) {
          setHeartCount(1);
          // let specificCharsString;
          // switch (true) {
          //   case frame >= 200 && frame < 250:
          //     specificCharsString = "ARE YOU THE LAST LIVING SOUL ? \n";
          //     break;
          //   case frame >= 250 && frame < 300:
          //     specificCharsString = "what are we going to do? \n";
          //     break;
          //   case frame >= 300 && frame < 350:
          //     specificCharsString = "How are we going to work this out? \n";
          //     break;
          //   case frame >= 350 && frame < 400:
          //     specificCharsString = `I ain't happy, I'm feeling glad \n
          //                             I got sunshine in a bag \n
          //                             I'm useless, but not for long \n
          //                             The future is coming on \n`;
          //     break;
          //   case frame > 400 && frame < 450:
          //     specificCharsString = `I'm walking to the something \n
          //                             Blah blah blah blah blah blah blah \n
          //                             (Collapse) \n
          //                             I'm drinking too much blah blah \n
          //                             (Fall out) \n
          //                             I'm feeling really blah blah, I want to blah blah blah \n
          //                             (Collapse) \n
          //                             And in the end it means I blah blah blah blah blah blah blah (Depend) \n
          //                             I brought myself together \n
          //                             Blah blah blah blah blah blah blah \n
          //                             (Watch out) \n
          //                             I didn't need the patience, life blah blah blah blah blah \n
          //                             (Collapse) \n
          //                             Don't you get too close or I'll blah blah blah blah blah \n
          //                             (Break up) \n
          //                             Stick it up your nose, blah blah blah blah blah blah blah \n
          //                             The end`;
          //     break;
          //   default:
          //     specificCharsString = "CHOOZE PAZUZU \n";
          //     break;
          // }
          // const specificChars = specificCharsString.split(""); // Convert string to array of characters
          // const specificIndex = Math.round(Math.random() * 4000); // Example index where you want to insert the characters
          // setAsciiChars((prev) =>
          //   insertCharsAtIndex(prev, specificIndex, specificChars)
          // );
          // Split the orb into multiple smaller orbs
          setOrbDiameter((prev) => {
            if (prev <= 1) return 1;
            return prev - 2;
          });
          const angleIncrement = (2 * Math.PI) / smallOrbsPositions.length;
          const speed = 2;
          setSmallOrbsPositions((prev) =>
            prev.map(({ x, y }, index) => ({
              x: x + Math.cos(angleIncrement * index) * speed,
              y: y + Math.sin(angleIncrement * index) * speed,
            }))
          );
          // for (let i = 0; i < smallOrbsPositions.length; i++) {
          //   const angle = i * angleIncrement;
          //   const orbX =
          //     200 + Math.cos(angle) * orbDiameter - smallOrbsPositions[i].x;
          //   const orbY =
          //     200 + Math.sin(angle) * orbDiameter - smallOrbsPositions[i].y;

          //   ctx.beginPath();
          //   ctx.arc(orbX, orbY, 5, 0, Math.PI * 2);
          //   ctx.fillStyle = "green";
          //   ctx.fill();
          //   ctx.closePath();

          //   setSmallOrbsPositions((prev) =>
          //     prev.map(({ x, y }, index) => ({
          //       x: x + Math.cos(angle) * speed,
          //       y: y + Math.sin(angle) * speed,
          //     }))
          //   );
          // }
        }
        // if ((bugPosition.y !== 0 && frame < 200) || frame > 300) {
        //   setBugPosition((prev) => {
        //     // if (prev.y < 0 || prev ) {
        //     return { x: prev.x, y: prev.y + 2 }; // Move down by 2 pixels
        //     // }
        //     // return prev;
        //   });
        // }
        setUserSeqIndex((prev) => (prev + 1) % 4);
        firstFrameTime.current = now;
      }

      // show egg count on the top right corner
      ctx.font = "16x arial";
      ctx.fillStyle = "white";
      ctx.fillText(eggsCollected.toString(), 380, 20);
      if (conversationFrame && alpha > 0) {
        const questionLines = splitText(currentStep.question, 40);

        questionLines.forEach((line, index) => {
          ctx.fillText(line, 200, 10 + index * 20);
        });
        if (currentStep.type === "happyEnd") {
          if (conversationFrame % 10 === 0) {
            if (alpha > 0) {
              setAlpha((prev) => parseFloat((prev - 0.01).toFixed(2)));
            }
            if (staticAlpha < 1) {
              setstaticAlpha((prev) => parseFloat((prev + 0.01).toFixed(2)));
            }
            if (alpha <= 0.1) {
              setGamePhase("static");
              return;
            }
            updateNPC(1, {
              color: `rgba(255, 0, 102, ${alpha})`,
            });
          }
        }
        if (currentStep.type === "blueEnd") {
          if (conversationFrame % 10 === 0) {
            if (alpha > 0) {
              setAlpha((prev) => parseFloat((prev - 0.01).toFixed(2)));
            }
            if (staticAlpha < 1) {
              setstaticAlpha((prev) => parseFloat((prev + 0.01).toFixed(2)));
            }
            if (alpha <= 0.1) {
              resetDialog();
              navigate("/bluescreen");
              return;
            }
            updateNPC(1, {
              color: `rgba(255, 0, 102, ${alpha})`,
            });
          }
        }
        if (currentStep.type === "end") {
          if (conversationFrame % 10 === 0) {
            if (staticAlpha <= 0.01) {
              setGamePhase("exlibris");
              return;
            }
            setstaticAlpha((prev) => parseFloat((prev + 0.01).toFixed(2)));
            setAlpha((prev) => parseFloat((prev - 0.01).toFixed(2)));
            updateNPC(1, {
              color: `rgba(255, 0, 102, ${alpha})`,
            });
          }
        }
        if (currentStep.type === "input") {
          setIsInputVisible(true);
          if (inputValue) {
            handleInput(inputValue);
          }
        } else {
          setIsInputVisible(false);
        }
        if (currentStep.type === "choice") {
          window.userName = inputValue;
          const rect = canvas.getBoundingClientRect();
          const isPointInRect = (x: number, y: number, rect: any) => {
            return (
              x >= rect.x &&
              x <= rect.x + rect.width &&
              y >= rect.y &&
              y <= rect.y + rect.height
            );
          };
          const choice1Rect = {
            x: 200,
            y: 330 - 10,
            width: ctx.measureText(currentStep.choices[0].text).width,
            height: 20,
          };
          const choice2Rect = {
            x: 200,
            y: 360 - 10,
            width: ctx.measureText(currentStep.choices[1].text).width,
            height: 20,
          };
          const handleClick = (event: any) => {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (isPointInRect(x, y, choice1Rect)) {
              handleChoice(0);
              canvas.removeEventListener("click", handleClick);
              // Handle choice 1 selection
            } else if (isPointInRect(x, y, choice2Rect)) {
              handleChoice(1);
              canvas.removeEventListener("click", handleClick);
              // Handle choice 2 selection
            }
          };
          const handlePressNumber = (event: KeyboardEvent) => {
            if (event.key === "1") {
              handleChoice(0);
              window.removeEventListener("keydown", handlePressNumber);
            } else if (event.key === "2") {
              handleChoice(1);
              window.removeEventListener("keydown", handlePressNumber);
            }
          };
          ctx.fillText("1-" + currentStep.choices[0].text, 200, 330);
          ctx.fillText("2-" + currentStep.choices[1].text, 200, 360);
          canvas.addEventListener("click", handleClick);
          window.addEventListener("keydown", handlePressNumber);
        }
      }
      if (frame > 200) {
        smallOrbsPositions.forEach(({ x, y }) => {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          const alpha = (frame - 200) / 100;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
          gradient.addColorStop(0.2, `rgba(255, 255, 255, ${alpha})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.closePath();
        });
      }
      npcs.forEach(
        ({ position: { x, y }, seqIndex: pnjSeqIndex, isFriendly, color }) => {
          const npcIsOutOfBound = x < -25 || x > 425 || y < -25 || y > 425;
          if (frame > 200 && isFriendly) {
            if (npcIsOutOfBound) return;
            ctx.drawImage(window.owls[2], x, y, 98, 98);
          }
          if (isFriendly && frame < 200) {
            ctx.drawImage(
              isFriendly ? window.owls[0] : window.owls[1],
              x,
              y,
              48,
              48
            );
          }
        }
      );
      ctx.font = "12px arial";
      ctx.fillStyle = "white";
      // asciiChars.forEach((char, index) => {
      //   const x = bugPosition.x + (index % 100) * 10;
      //   const y = bugPosition.y + Math.floor(index / 100) * 10;
      //   ctx.fillText(char, x, y);
      // });
      // draw the growing orb
      // if (orbDiameter < 100) {
      //   setOrbDiameter((prev) => prev + 1);
      // }
      ctx.beginPath();
      ctx.arc(200, 200, orbDiameter, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        200,
        200,
        0,
        200,
        200,
        orbDiameter
      );
      if (orbDiameter < 150) {
        gradient.addColorStop(0.5, "white");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        const tot = 50;
        const current = orbDiameter - 150;
        const coef = current / tot;
        console.log("current", current);
        console.log(coef);

        const color = `rgba(255, ${Math.round(255 * (1 - coef))}, ${Math.round(
          255 * (1 - coef)
        )}, 1)`;
        const extcolor = `rgba(255, ${Math.round(
          255 * (1 - coef)
        )}, ${Math.round(255 * coef)}, 0)`;
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, extcolor);
      }
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();

      ctx.font = "16px arial";
      ctx.drawImage(window.witches[witch], position.x, position.y, 64, 64);
      drawHeartsOnCanvas(ctx, heartCount);
    },
    [
      alpha,
      conversationFrame,
      currentStep.choices,
      currentStep.question,
      currentStep.type,
      eggsCollected,
      frame,
      handleChoice,
      handleInput,
      handleIsOutOfBound,
      handleUserInput,
      heartCount,
      inputValue,
      isOutOfBound,
      isPlayerCollidingWithBug,
      map,
      navigate,
      npcs,
      orbDiameter,
      position.x,
      position.y,
      resetDialog,
      setGamePhase,
      setHeartCount,
      setIsInputVisible,
      setUserSeqIndex,
      smallOrbsPositions,
      splitText,
      staticAlpha,
      updateNPC,
      userInput.length,
      witch,
    ]
  );
};
