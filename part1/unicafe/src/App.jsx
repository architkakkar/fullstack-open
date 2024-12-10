import { useState } from "react";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  const countGood = () => setGood((g) => g + 1);
  const countNeutral = () => setNeutral((n) => n + 1);
  const countBad = () => setBad((b) => b + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={countGood}>good</button>
      <button onClick={countNeutral}>neutral</button>
      <button onClick={countBad}>bad</button>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
