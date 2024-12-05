import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Define vocabulary pairs first
const vocabularyPairs = [
  { en: "bishop", pl: "biskup" },
  { en: "street", pl: "ulica" },
  { en: "sister", pl: "siostra" },
  { en: "gift", pl: "prezent" },
  { en: "gold", pl: "złoto" },
  { en: "window", pl: "okno" },
  { en: "morning", pl: "rano" },
  { en: "evening", pl: "wieczór" },
  { en: "happy", pl: "szczęśliwy" },
  { en: "sad", pl: "smutny" }
];

const glossary = [
  // Important story words
  { en: "bishop", pl: "biskup" },
  { en: "merchant", pl: "kupiec" },
  { en: "engaged", pl: "zaręczony/a" },
  { en: "married", pl: "żonaty/zamężna" },
  { en: "miserable", pl: "nieszczęśliwy/a" },
  { en: "trouble", pl: "kłopot" },
  { en: "secret", pl: "tajemnica" },
  { en: "silently", pl: "po cichu" },
  { en: "poor", pl: "biedny/a" },
  // Action words from video
  { en: "dropped", pl: "upuścił/wrzucił" },
  { en: "remember", pl: "pamiętać" },
  { en: "visited", pl: "odwiedził" },
  { en: "stopped", pl: "zatrzymał się" },
  { en: "bring", pl: "przynosić" },
  // Descriptive words
  { en: "wise", pl: "mądry" },
  { en: "kind", pl: "miły/dobry" },
  { en: "rich", pl: "bogaty" },
  { en: "overjoyed", pl: "zachwycony" },
  // Important nouns
  { en: "doorway", pl: "wejście" },
  { en: "pocket", pl: "kieszeń" }
];

const multipleChoiceQuestions = [
  {
    question: "Where did St. Nicholas live? (Gdzie mieszkał św. Mikołaj?)",
    options: [
      { value: "rome", label: "Rome (Rzym)" },
      { value: "myra", label: "Myra (Mira)" },
      { value: "athens", label: "Athens (Ateny)" }
    ]
  },
  {
    question: "What was he? (Kim był?)",
    options: [
      { value: "king", label: "a king (królem)" },
      { value: "bishop", label: "a bishop (biskupem)" },
      { value: "merchant", label: "a merchant (kupcem)" }
    ]
  },
  {
    question: "How many sisters did he help? (Ilu siostrom pomógł?)",
    options: [
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" }
    ]
  },
  {
    question: "What did he give them? (Co im dał?)",
    options: [
      { value: "food", label: "food (jedzenie)" },
      { value: "gold", label: "gold (złoto)" },
      { value: "clothes", label: "clothes (ubrania)" }
    ]
  },
  {
    question: "When did he give the gifts? (Kiedy dał prezenty?)",
    options: [
      { value: "morning", label: "morning (rano)" },
      { value: "afternoon", label: "afternoon (po południu)" },
      { value: "evening", label: "evening (wieczorem)" }
    ]
  },
  {
    question: "Who did St. Nicholas talk to? (Z kim rozmawiał św. Mikołaj?)",
    options: [
      { value: "parents", label: "parents (rodzicami)" },
      { value: "merchants", label: "rich merchants (bogatymi kupcami)" },
      { value: "bishops", label: "other bishops (innymi biskupami)" }
    ]
  },
  {
    question: "Why were the sisters sad? (Dlaczego siostry były smutne?)",
    options: [
      { value: "hungry", label: "they were hungry (były głodne)" },
      { value: "marriage", label: "they couldn't get married (nie mogły wyjść za mąż)" },
      { value: "sick", label: "they were sick (były chore)" }
    ]
  },
  {
    question: "How did he give them gold? (Jak dał im złoto?)",
    options: [
      { value: "handed", label: "handed it to them (dał im do ręki)" },
      { value: "door", label: "left it at the door (zostawił przy drzwiach)" },
      { value: "window", label: "through the window (przez okno)" }
    ]
  },
  {
    question: "What did people say about mysterious gifts? (Co ludzie mówili o tajemniczych prezentach?)",
    options: [
      { value: "nicholas", label: "they came from St. Nicholas (pochodziły od św. Mikołaja)" },
      { value: "king", label: "they came from the king (pochodziły od króla)" },
      { value: "merchants", label: "they came from merchants (pochodziły od kupców)" }
    ]
  },
  {
    question: "What do we call St. Nicholas now? (Jak teraz nazywamy św. Mikołaja?)",
    options: [
      { value: "father", label: "Father Christmas (Ojciec Boże Narodzenie)" },
      { value: "santa", label: "Santa Claus (Święty Mikołaj)" },
      { value: "bishop", label: "Bishop Nicholas (Biskup Mikołaj)" }
    ]
  }
];

const StNicholasWorksheet = () => {
  // Shuffle function
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Create shuffled arrays on initial render using useMemo
  const [shuffledEnglish, shuffledPolish] = React.useMemo(() => {
    return [
      shuffle([...vocabularyPairs]),
      shuffle([...vocabularyPairs])
    ];
  }, []);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [mcAnswers, setMcAnswers] = useState({});
  const [orderAnswers, setOrderAnswers] = useState({});
  const [fillAnswers, setFillAnswers] = useState({});

  // Correct answers for each task
  const correctMcAnswers = {
    0: "myra",
    1: "bishop",
    2: "3",
    3: "gold",
    4: "evening",
    5: "merchants",
    6: "marriage",
    7: "window",
    8: "nicholas",
    9: "santa"
  };

  const correctOrderAnswers = {
    0: "2", // St. Nicholas saw three sisters
    1: "1", // He walked in the streets
    2: "7", // The sisters were very happy
    3: "4", // He talked to rich merchants
    4: "6", // He gave them gold
    5: "3", // The sisters were sad
    6: "5", // He helped them secretly
    7: "8"  // They could get married
  };

  const correctFillAnswers = {
    0: "bishop",
    1: "streets",
    2: "sisters",
    3: "crying",
    4: "merchants",
    5: "evening",
    6: "gold",
    7: "happy",
    8: "married",
    9: "secret"
  };

  const handleWordClick = (word, type) => {
    if (showResults) return; // Don't allow changes after showing results

    // Check if the word is already part of a pair
    if (type === 'en' && word in matchedPairs) {
      // Remove the pair
      const newMatchedPairs = { ...matchedPairs };
      delete newMatchedPairs[word];
      setMatchedPairs(newMatchedPairs);
      setSelectedWord(null);
      return;
    }
    if (type === 'pl' && Object.values(matchedPairs).includes(word)) {
      // Find and remove the pair
      const pairKey = Object.keys(matchedPairs).find(key => matchedPairs[key] === word);
      const newMatchedPairs = { ...matchedPairs };
      delete newMatchedPairs[pairKey];
      setMatchedPairs(newMatchedPairs);
      setSelectedWord(null);
      return;
    }

    // Regular matching logic
    if (type === 'en') {
      if (selectedWord && selectedWord.type === 'pl') {
        setMatchedPairs({
          ...matchedPairs,
          [word]: selectedWord.word
        });
        setSelectedWord(null);
      } else {
        setSelectedWord({ word, type });
      }
    } else {
      if (selectedWord && selectedWord.type === 'en') {
        setMatchedPairs({
          ...matchedPairs,
          [selectedWord.word]: word
        });
        setSelectedWord(null);
      } else {
        setSelectedWord({ word, type });
      }
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  // Calculate scores when results are shown
  const getScores = () => {
    if (!showResults) return null;

    let mcScore = 0;
    Object.keys(mcAnswers).forEach(key => {
      if (mcAnswers[key] === correctMcAnswers[key]) mcScore++;
    });

    let orderScore = 0;
    Object.keys(orderAnswers).forEach(key => {
      if (orderAnswers[key] === correctOrderAnswers[key]) orderScore++;
    });

    let fillScore = 0;
    Object.keys(fillAnswers).forEach(key => {
      if (fillAnswers[key]?.toLowerCase() === correctFillAnswers[key]) fillScore++;
    });

    let matchingScore = 0;
    Object.keys(matchedPairs).forEach(key => {
      const correctPair = vocabularyPairs.find(pair => pair.en === key);
      if (correctPair && correctPair.pl === matchedPairs[key]) matchingScore++;
    });

    return {
      matching: matchingScore,
      multipleChoice: mcScore,
      order: orderScore,
      fill: fillScore,
      total: matchingScore + mcScore + orderScore + fillScore,
      possible: vocabularyPairs.length + Object.keys(correctMcAnswers).length + 
                Object.keys(correctOrderAnswers).length + Object.keys(correctFillAnswers).length
    };
  };

  const scores = getScores();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Saint Nicholas Day Worksheet
        <br />
        <span className="text-xl">Karta pracy na Dzień Świętego Mikołaja</span>
      </h1>

      <Button 
        onClick={() => setShowGlossary(!showGlossary)}
        className="mb-4"
      >
        {showGlossary ? 'Hide Glossary' : 'Show Glossary'}
      </Button>

      {showGlossary && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Glossary / Słowniczek</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {glossary.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <span>{item.en}</span>
                  <span className="text-gray-600">- {item.pl}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task 1: Matching */}
      <Card>
        <CardHeader>
          <CardTitle>1. Vocabulary Match / Dopasuj słownictwo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              {shuffledEnglish.map((pair, index) => (
                <div
                  key={`en-${index}`}
                  onClick={() => !showResults && handleWordClick(pair.en, 'en')}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedWord?.word === pair.en ? 'bg-blue-200' : ''
                  } ${showResults 
                      ? (pair.en in matchedPairs && matchedPairs[pair.en] === pair.pl 
                          ? 'bg-green-200' 
                          : pair.en in matchedPairs ? 'bg-red-200' : '')
                      : (pair.en in matchedPairs ? 'bg-blue-50' : '')
                    }`}
                >
                  {pair.en}
                  {showResults && pair.en in matchedPairs && matchedPairs[pair.en] !== pair.pl && 
                    <span className="ml-2 text-sm text-green-600">→ {pair.pl}</span>}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {shuffledPolish.map((pair, index) => (
                <div
                  key={`pl-${index}`}
                  onClick={() => !showResults && handleWordClick(pair.pl, 'pl')}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedWord?.word === pair.pl ? 'bg-blue-200' : ''
                  } ${showResults 
                      ? (Object.entries(matchedPairs).some(([en, pl]) => pl === pair.pl && en === vocabularyPairs.find(p => p.pl === pair.pl).en)
                          ? 'bg-green-200' 
                          : Object.values(matchedPairs).includes(pair.pl) ? 'bg-red-200' : '')
                      : (Object.values(matchedPairs).includes(pair.pl) ? 'bg-blue-50' : '')
                    }`}
                >
                  {pair.pl}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task 2: Multiple Choice */}
      <Card>
        <CardHeader>
          <CardTitle>2. Video Comprehension / Zrozumienie filmu</CardTitle>
        </CardHeader>
        <CardContent>
          {multipleChoiceQuestions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="mb-3">{q.question}</p>
              <RadioGroup
                value={mcAnswers[index]}
                onValueChange={(value) => 
                  setMcAnswers({...mcAnswers, [index]: value})
                }
              >
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`q${index}-${optIndex}`}
                      disabled={showResults}
                    />
                    <Label 
                      htmlFor={`q${index}-${optIndex}`}
                      className={showResults ? 
                        (option.value === correctMcAnswers[index] ? 'text-green-600 font-bold' : 
                         mcAnswers[index] === option.value ? 'text-red-600 line-through' : '') 
                        : ''}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Task 3: Story Order */}
      <Card>
        <CardHeader>
          <CardTitle>3. Put the Story in Order / Ułóż historię we właściwej kolejności</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Saint Nicholas was walking in the streets. (Święty Mikołaj spacerował ulicami.)",
              "He saw three sisters. (Zobaczył trzy siostry.)",
              "The sisters were very happy. (Siostry były bardzo szczęśliwe.)",
              "He talked to rich merchants. (Rozmawiał z bogatymi kupcami.)",
              "He gave them gold. (Dał im złoto.)",
              "The sisters were sad. (Siostry były smutne.)",
              "He helped them secretly. (Pomógł im potajemnie.)",
              "They could get married. (Mogły wyjść za mąż.)"
            ].map((sentence, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  max="8"
                  className={`w-16 p-2 border rounded ${
                    showResults ? 
                      (orderAnswers[index] === correctOrderAnswers[index] ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500')
                      : ''
                  }`}
                  value={orderAnswers[index] || ''}
                  onChange={(e) => setOrderAnswers({
                    ...orderAnswers,
                    [index]: e.target.value
                  })}
                  disabled={showResults}
                />
                <span>{sentence}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task 4: Fill in the blanks */}
      <Card>
        <CardHeader>
          <CardTitle>4. Complete the Story / Uzupełnij historię</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "St. Nicholas was a _______ (biskup) in Myra.",
              "One day, he walked in the _______ (ulicach).",
              "He saw three _______ (siostry).",
              "The youngest sister was _______ (płacząca).",
              "St. Nicholas talked to rich _______ (kupców).",
              "In the _______ (wieczorem), he went out.",
              "He put _______ (złoto) through the _______ (okno).",
              "The sisters were very _______ (szczęśliwe).",
              "Now they could get _______ (zamężne).",
              "People say _______ (tajemnicze) gifts come from St. Nicholas."
            ].map((sentence, index) => (
              <div key={index}>
                <input
                  type="text"
                  className={`border p-2 rounded w-32 mr-2 ${
                    showResults ? 
                      (fillAnswers[index]?.toLowerCase() === correctFillAnswers[index] ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500')
                      : ''
                  }`}
                  value={fillAnswers[index] || ''}
                  onChange={(e) => setFillAnswers({
                    ...fillAnswers,
                    [index]: e.target.value
                  })}
                  disabled={showResults}
                />
                <span>{sentence}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task 5: Writing */}
      <Card>
        <CardHeader>
          <CardTitle>5. Write Your Story / Napisz swoją historię</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use the sentences from Task 3 to write a story about Saint Nicholas. Try to use these helpful phrases: / Użyj zdań z zadania 3, aby napisać historię o świętym Mikołaju. Spróbuj użyć tych pomocnych zwrotów:</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 border rounded">
              <h3 className="font-bold mb-2">Time Phrases / Wyrażenia czasowe:</h3>
              <ul className="space-y-2">
                <li>One day (Pewnego dnia)</li>
                <li>While (Podczas gdy)</li>
                <li>Then (Potem)</li>
                <li>After that (Po tym)</li>
                <li>Finally (W końcu)</li>
              </ul>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-bold mb-2">Connecting Words / Słowa łączące:</h3>
              <ul className="space-y-2">
                <li>because (ponieważ)</li>
                <li>and (i)</li>
                <li>but (ale)</li>
                <li>so (więc)</li>
                <li>when (kiedy)</li>
              </ul>
            </div>
          </div>

          <textarea 
            className="w-full h-48 p-4 border rounded"
            placeholder="Write your story here... / Napisz tutaj swoją historię..."
            disabled={showResults}
          ></textarea>
        </CardContent>
      </Card>
      <Button 
        onClick={checkAnswers}
        className="w-full py-4 mt-8 text-lg font-bold"
      >
        Check Answers / Sprawdź odpowiedzi
      </Button>

      {/* Results Display */}
      {showResults && scores && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Results / Twoje wyniki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Matching Task / Dopasowywanie: {scores.matching}/{vocabularyPairs.length}</p>
              <p>Multiple Choice / Wybór: {scores.multipleChoice}/{Object.keys(correctMcAnswers).length}</p>
              <p>Story Order / Kolejność: {scores.order}/{Object.keys(correctOrderAnswers).length}</p>
              <p>Fill in the blanks / Uzupełnianie: {scores.fill}/{Object.keys(correctFillAnswers).length}</p>
              <div className="pt-4 border-t">
                <p className="font-bold">Total Score / Wynik całkowity: {scores.total}/{scores.possible}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StNicholasWorksheet;
