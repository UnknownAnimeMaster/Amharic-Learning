import { lettersById } from "@/data/letters";
import { DailyReviewQuestion, ProgressState } from "@/types";

function pick<T>(items: T[], count: number) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

export function buildDailyReview(progress: ProgressState): DailyReviewQuestion[] {
  const learned = progress.knownLetters.length
    ? progress.knownLetters
    : ["ha", "la"];

  const weakSorted = Object.entries(progress.weakLetters)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);

  const focus = Array.from(new Set([...weakSorted, ...learned])).slice(0, 4);

  return focus.flatMap((letterId, index) => {
    const letter = lettersById[letterId];
    if (!letter) return [];

    const distractors = Object.values(lettersById)
      .filter((item) => item.id !== letter.id)
      .map((item) => item.character);

    const recognition: DailyReviewQuestion = {
      id: `${letterId}-recognize-${index}`,
      type: "recognize",
      prompt: `Tap the letter ${letter.character}`,
      choices: pick([letter.character, ...distractors], 4),
      correctAnswers: [letter.character],
      letterId
    };

    const wordQuestion: DailyReviewQuestion = {
      id: `${letterId}-word-${index}`,
      type: "word",
      prompt: `Which word has ${letter.character}?`,
      choices: pick(
        [
          ...letter.exampleWords.map((item) => item.amharic),
          ...Object.values(lettersById)
            .filter((item) => item.id !== letter.id)
            .flatMap((item) => item.exampleWords.slice(0, 1).map((word) => word.amharic))
        ],
        4
      ),
      correctAnswers: [letter.exampleWords[0]?.amharic ?? ""],
      letterId
    };

    return [recognition, wordQuestion];
  }).slice(0, 5);
}
