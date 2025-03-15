import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MainMenu from "@/pages/MainMenu";
import Game from "@/pages/Game";
import GameOver from "@/pages/GameOver";
import LevelComplete from "@/pages/LevelComplete";
import Controls from "@/pages/Controls";
import Credits from "@/pages/Credits";
import LevelEditor from "@/pages/LevelEditor"; // Added LevelEditor import
import { useState, useEffect } from "react";

function Router() {
  // Game state that needs to be shared between routes
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [completionTime, setCompletionTime] = useState(0);

  const resetGame = () => {
    setScore(0);
    setCoins(0);
    setLives(3);
    setLevel(1);
    setCompletionTime(0);
  };

  return (
    <Switch>
      <Route path="/" component={() => <MainMenu />} />
      <Route path="/game">
        {() => <Game 
          score={score} 
          setScore={setScore} 
          coins={coins} 
          setCoins={setCoins}
          lives={lives}
          setLives={setLives}
          level={level}
          setCompletionTime={setCompletionTime}
        />}
      </Route>
      <Route path="/gameover">
        {() => <GameOver 
          score={score} 
          resetGame={resetGame}
        />}
      </Route>
      <Route path="/level-complete">
        {() => <LevelComplete 
          score={score} 
          coins={coins}
          level={level}
          setLevel={setLevel}
          completionTime={completionTime}
        />}
      </Route>
      <Route path="/controls" component={Controls} />
      <Route path="/credits" component={Credits} />
      <Route path="/editor" component={LevelEditor} /> {/* Added LevelEditor route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;