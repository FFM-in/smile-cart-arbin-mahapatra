import { useEffect, useState, useRef } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

import { IMAGE_URLS } from "./constants";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef;

  const handleNextImage = () => {
    resetTimer();
    setCurrentIndex(previousIndex => (previousIndex + 1) % IMAGE_URLS.length);
  };

  const handlePreviousImage = () => {
    resetTimer();
    setCurrentIndex(
      previousIndex =>
        (previousIndex - 1 + IMAGE_URLS.length) % IMAGE_URLS.length
    );
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNextImage, 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleNextImage, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePreviousImage}
      />
      <div className="flex flex-col gap-2">
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <div className="flex flex-row items-center justify-center gap-1">
          {IMAGE_URLS.map((_, index) => (
            <span
              key={index}
              className={classNames(
                "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
                {
                  "neeto-ui-bg-black": index === currentIndex,
                }
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNextImage}
      />
    </div>
  );
};

export default Carousel;
