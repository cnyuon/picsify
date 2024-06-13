"use client";

import { Button } from "@/components/ui/button";


import Link from "next/link";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { ImageSlider } from "./components/slider/imageslider";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className={"py-20 mx-auto text-center flex flex-col items-center max-w-3xl"}>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Restore your old photos with <span className="text-blue-600">one click</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Do you have old, blurry photos that you want to restore?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button>
              <Link href={'/signup'}>Try Piscify for free</Link>
            </Button>
          </div>
          <div>
            <p className="text-sm mt-2 text-muted-foreground">(No Credit Card Required)</p>
          </div>

          <div className="mt-20">
            <ImageSlider />
            <div className="divider mt-6"></div>
          </div>

          <div className="items-center mt-10">
            <div className="mb-10">
              <h1 className="text-3xl font-bold">
                Bring your portrait back to <span className="text-blue-600">life</span>.
              </h1>
            </div>
            <div className="image-section flex flex-col md:flex-row items-center gap-4">
              <img src="images/asianlady.jpg" alt="old" className="fixed-size-image" />
              <img src="images/out.png" alt="new" className="fixed-size-image" />
            </div>


            <div className="divider mt-6"></div>
        

            <div className="mb-10 mt-10">
              <h1 className="text-3xl font-bold">
                Enhance your <span className="text-blue-600">low quality</span> pictures.
              </h1>
            </div>

            <div className="image-section flex flex-col md:flex-row items-center gap-4">
              <img src="images/edsheeranold.jpg" alt="old" className="fixed-size-image" />
              <img src="images/edsheerannew.jpg" alt="new" className="fixed-size-image" />
            </div>

            <div className="divider mt-6"></div>

            <div className="flex flex-col justify-center items-center sm:flex-row gap-4 mt-10">
                <div>
                  <h1 className="mb-5 text-xl font-bold">Get started for free</h1>
                  <p className="mb-5">You start with 5 free credits.</p>
                  <Button>
                    <Link href={'/signup'}>Sign up</Link>
                  </Button>
                </div>
          </div>



          </div>
        </div>
      </MaxWidthWrapper>
      <style jsx>{`
        .fixed-size-image {
          width: 350px; /* Adjust the width as needed */
          height: 350px; /* Adjust the height as needed */
          object-fit: cover; /* Ensures the image covers the given width and height */
          margin: 0 10px; /* Adds some space between the images */
          border-radius: 10px; /* Roundness of image */
        }
        .divider {
          width: 100%; /* Full width */
          height: 2px; /* Thickness of the divider */
          background-color: #e5e7eb; /* Light gray color */
          margin-top: 20px; /* Space above the divider */
        }
      `}</style>
    </>
  );
}

