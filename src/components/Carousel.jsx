import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { useState } from "react";
import { IMAGE_URLS } from "./constants";
import classNames from "classnames";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % IMAGE_URLS.length;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex =
      (currentIndex - 1 + IMAGE_URLS.length) % IMAGE_URLS.length;
    setCurrentIndex(previousIndex);
  };

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
              className={classNames(
                "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
                {
                  "neeto-ui-bg-black": index === currentIndex,
                }
              )}
              key={index}
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
