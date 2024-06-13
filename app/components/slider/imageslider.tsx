

"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export const ImageSlider = () => {
  return (
    <>
      <div className="compare-slider-container">
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src="images/photofybefore.png" alt="Image one" />}
          itemTwo={<ReactCompareSliderImage src="images/photofyafter.png" alt="Image two" />}
        />
      </div>
      <style jsx>{`
        .compare-slider-container {
          width: 80%; /* Adjust the width as needed */
          max-width: 800px; /* Maximum width for the slider */
          margin: 0 auto; /* Center the slider */
          border-radius: 15px; /* Round the edges */
          overflow: hidden; /* Ensure rounded corners are applied to child elements */
        }
        @media (max-width: 600px) {
          .compare-slider-container {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};
