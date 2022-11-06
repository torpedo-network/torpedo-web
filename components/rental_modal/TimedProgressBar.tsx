import { useEffect, useState } from "react";
import ProgressBarComponent from "./ProgressBarComponent";

interface TimedProgressBarProps {
  label: string;
  timeEstimate: number;
  started: boolean;
  finished: boolean;
}

/**
 * A progress bar that takes roughly timeEstimate seconds to fill up.
 * Starts running when started gets set to true, and stops when finished gets set to true.
 * @param param0
 * @returns
 */
const TimedProgressBar = ({
  label,
  timeEstimate,
  started,
  finished,
}: TimedProgressBarProps) => {
  const optimalProgress = 0.9; // The progress bar should be 80% full when the time estimate is reached.
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (finished) {
      console.log("Finished");
      clearInterval(intervalId);
      setTimeout(() => {
        setProgress(1);
      }, 500); // move progress bar to 100%.
      // return () => clearTimeout(id);
    } else if (started) {
      const increment = 0.05 / timeEstimate;
      const id = setInterval(() => {
        setProgress((progress) => progress + increment);
      }, 50);
      setIntervalId(id);
      return () => clearInterval(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finished, timeEstimate]);

  useEffect(() => {
    // if (finished) {
    //   if (progress >= 1) {
    //     clearInterval(intervalId);
    //   }
    // } else {
    if (progress >= optimalProgress) {
      clearInterval(intervalId);
    }
    // }
  }, [progress, intervalId, finished]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">
          {label}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <ProgressBarComponent progress={progress} />
    </div>
  );
};

export default TimedProgressBar;
