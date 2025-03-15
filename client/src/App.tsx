import { Switch, Route } from "wouter";
import MainMenu from "@/pages/MainMenu";
import Game from "@/pages/Game";
import GameOver from "@/pages/GameOver";
import LevelComplete from "@/pages/LevelComplete";
import Controls from "@/pages/Controls";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/game" component={Game} />
      <Route path="/gameover" component={GameOver} />
      <Route path="/complete" component={LevelComplete} />
      <Route path="/controls" component={Controls} />
    </Switch>
  );
}