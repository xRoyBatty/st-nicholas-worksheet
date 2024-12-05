import React, { useState } from 'react';

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
  // ... rest of the questions remain the same
];

const StNicholasWorksheet = () => {
  // State management remains the same
  const [showGlossary, setShowGlossary] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [mcAnswers, setMcAnswers] = useState({});
  const [orderAnswers, setOrderAnswers] = useState({});
  const [fillAnswers, setFillAnswers] = useState({});

  // All the functions remain exactly the same
  // Shuffle function
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Create shuffled arrays on initial render
  const [shuffledEnglish, shuffledPolish] = React.useMemo(() => {
    return [
      shuffle([...vocabularyPairs]),
      shuffle([...vocabularyPairs])
    ];
  }, []);

  const handleWordClick = (word, type) => {
    if (showResults) return;

    if (type === 'en' && word in matchedPairs) {
      const newMatchedPairs = { ...matchedPairs };
      delete newMatchedPairs[word];
      setMatchedPairs(newMatchedPairs);
      setSelectedWord(null);
      return;
    }
    if (type === 'pl' && Object.values(matchedPairs).includes(word)) {
      const pairKey = Object.keys(matchedPairs).find(key => matchedPairs[key] === word);
      const newMatchedPairs = { ...matchedPairs };
      delete newMatchedPairs[pairKey];
      setMatchedPairs(newMatchedPairs);
      setSelectedWord(null);
      return;
    }

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

  const scores = getScores();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Saint Nicholas Day Worksheet
        <br />
        <span className="text-xl">Karta pracy na Dzień Świętego Mikołaja</span>
      </h1>

      <button 
        onClick={() => setShowGlossary(!showGlossary)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        {showGlossary ? 'Hide Glossary' : 'Show Glossary'}
      </button>

      {showGlossary && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="font-bold text-xl mb-4">Glossary / Słowniczek</div>
          <div className="grid grid-cols-2 gap-2">
            {glossary.map((item, index) => (
              <div key={index} className="flex justify-between p-2 border-b">
                <span>{item.en}</span>
                <span className="text-gray-600">- {item.pl}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task 1: Matching */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">1. Vocabulary Match / Dopasuj słownictwo</h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            {shuffledEnglish.map((pair, index) => (
              <div
                key={`en-${index}`}
                onClick={() => handleWordClick(pair.en, 'en')}
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
                onClick={() => handleWordClick(pair.pl, 'pl')}
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
      </div>

      {/* Task 2: Multiple Choice */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">2. Video Comprehension / Zrozumienie filmu</h2>
        </div>
        <div className="space-y-6">
          {multipleChoiceQuestions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <label 
                    key={optIndex} 
                    className={`flex items-center space-x-2 p-2 rounded ${
                      showResults ? 
                        (option.value === correctMcAnswers[index] ? 'text-green-600 font-bold' : 
                         mcAnswers[index] === option.value ? 'text-red-600 line-through' : '') 
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={mcAnswers[index] === option.value}
                      onChange={() => setMcAnswers({...mcAnswers, [index]: option.value})}
                      disabled={showResults}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task 3: Story Order */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">3. Put the Story in Order / Ułóż historię we właściwej kolejności</h2>
        </div>
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
      </div>

      <button 
        onClick={checkAnswers}
        className="w-full py-4 mt-8 text-lg font-bold bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Answers / Sprawdź odpowiedzi
      </button>

      {/* Results Display */}
      {showResults && scores && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Your Results / Twoje wyniki</h2>
          </div>
          <div className="space-y-4">
            <p>Matching Task / Dopasowywanie: {scores.matching}/{vocabularyPairs.length}</p>
            <p>Multiple Choice / Wybór: {scores.multipleChoice}/{Object.keys(correctMcAnswers).length}</p>
            <p>Story Order / Kolejność: {scores.order}/{Object.keys(correctOrderAnswers).length}</p>
            <p>Fill in the blanks / Uzupełnianie: {scores.fill}/{Object.keys(correctFillAnswers).length}</p>
            <div className="pt-4 border-t">
              <p className="font-bold">Total Score / Wynik całkowity: {scores.total}/{scores.possible}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StNicholasWorksheet;
