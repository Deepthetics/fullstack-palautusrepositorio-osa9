import { useState, useEffect } from 'react';
import { getAllDiaries } from './diaryService';
import { NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((entries) => setEntries(entries));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
        {entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
            <br />
          </div>
        ))}
    </div>
  );
};

export default App;
