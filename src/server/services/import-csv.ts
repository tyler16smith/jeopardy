import supabase from '@/utils/supabase';

interface QuestionRow {
  Category: string;
  Question: string;
  Answer: string;
  "Point Value": number;
}

export const importJeopardyCSV = async (text: string) => {
  debugger;
  if (!text) throw new Error('No csv data provided.');
  const gameData: QuestionRow[] = [];
  const playerNames: string[] = [];
  let currentSection = 'questions';

  // Parse the CSV
  const rows = text.split('\n');
  for (const row of rows) {
    const [category, question, answer, pointValue] = row.split(',');
    if (category && question && answer && pointValue) {
      gameData.push({
        Category: category,
        Question: question,
        Answer: answer,
        'Point Value': parseInt(pointValue),
      });
    } else {
      currentSection = 'players';
      playerNames.push(row);
    }
  }

  // Insert the data into the database
  const { data: game, error: gameError } = await supabase
    .from('Game')
    .insert([{ date: new Date() }])
    .single();

  if (gameError) throw new Error(`Error inserting game: ${gameError.message}`);
  console.log(`Inserted game with ID: ${game.id}`);

  // Insert players
  const playerInserts = playerNames.map(name => ({
    name,
    gameId: game.id,
  }));
  const { error: playerError } = await supabase
    .from('Player')
    .insert(playerInserts);

  if (playerError) throw new Error(`Error inserting players: ${playerError.message}`);

  // Process and insert categories and questions
  const categories = [...new Set(gameData.map(item => item.Category))];
  for (const category of categories) {
    const { data: categoryData, error: categoryError } = await supabase
      .from('Category')
      .insert([{ title: category, gameRoundId: 1 /* Assuming a single game round for simplicity */ }])
      .single();

    if (categoryError) throw new Error(`Error inserting category: ${categoryError.message}`);

    const questions = gameData.filter(q => q.Category === category);
    const questionInserts = questions.map(q => ({
      text: q.Question,
      answer: q.Answer,
      pointValue: q['Point Value'],
      categoryId: categoryData.id,
    }));

    const { error: questionError } = await supabase
      .from('Question')
      .insert(questionInserts);

    if (questionError) throw new Error(`Error inserting questions: ${questionError.message}`);
  }

  console.log('CSV import completed successfully.');
}

// Example usage
// importJeopardyCSV('path/to/your/file.csv').catch(console.error);
