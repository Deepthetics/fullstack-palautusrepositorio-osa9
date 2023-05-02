import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAllDiaries, createEntry } from './diaryService';
import ErrorNotification from './ErrorNotification';
import { DiaryEntry, Visibility, Weather } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((entries) => setEntries(entries));
  }, []);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment,
    };
    try {
      const returnedEntry = await createEntry(entryToAdd);
      setEntries(entries.concat(returnedEntry));        
      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || 'Error occurred');
        setTimeout(() => {
          setErrorMessage('')
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={addEntry}>
        date<input value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br />
        visibility<input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} /><br />
        weather<input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} /><br />
        comment<input value={newComment} onChange={(event) => setNewComment(event.target.value)} /><br />
        <button type='submit'>Add</button>
      </form>
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
