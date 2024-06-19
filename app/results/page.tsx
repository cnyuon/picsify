"use client"; // Ensure this is at the top to indicate a client component

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const Results = () => {
    const searchParams = useSearchParams();
    const originalImageUrl = searchParams.get('originalImageUrl') || '';
    const processedImageUrl = searchParams.get('processedImageUrl') || '';
    const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
    const [comparison, setComparison] = useState(false); // Default to side-by-side

    const handleDownload = () => {
        if (downloadLinkRef.current) {
            downloadLinkRef.current.click();
        }
    };

    const processedFilename = processedImageUrl.split('/').pop();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


    return (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-7">
                <h1>Results</h1>
            </div>
            {originalImageUrl && processedImageUrl ? (
                <>
                    <div className='flex gap-3 justify-center items-center'>
                        <p className='text-sm'>Side by Side</p>
                        <Switch checked={comparison} onCheckedChange={() => setComparison(!comparison)} />
                        <p className='text-sm'>Comparison</p>
                    </div>

                    <div className="mt-10">
                        {comparison ? (
                            <div className="compare-slider-container">
                                <ReactCompareSlider
                                    itemOne={<ReactCompareSliderImage src={originalImageUrl} alt="Original Image" />}
                                    itemTwo={<ReactCompareSliderImage src={processedImageUrl} alt="Processed Image" />}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row justify-center items-center">
                                <div className='mt-5 flex justify-center items-center'>
                                    <p className='justify-center flex items-center mb-5'>Original Image</p>
                                    <img src={originalImageUrl} alt="Original" className="fixed-size-image" />
                                </div>
                                <div className='mt-5 flex justify-center items-center'>
                                    <p className='justify-center flex items-center mb-5'>Processed Image</p>
                                    <img src={processedImageUrl} alt="Processed" className="fixed-size-image" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <p className='text-sm mt-5 text-muted-foreground'>Refresh the page if image doesn&apos;t load.</p>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <Link href="/restore">
                            <Button className="mt-10" variant="outline">Enhance Another Image</Button>
                        </Link>
                        <div className="mt-10">
                            <Button onClick={handleDownload}>Download</Button>
                            <a
                                ref={downloadLinkRef}
                                href={`${API_URL}/download/${processedFilename}`}
                                download="enhanced_image.jpg"
                                style={{ display: 'none' }}
                            >
                                Download
                            </a>
                        </div>
                    </div>

                    <div className="divider mt-10"></div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <style jsx>{`
                .fixed-size-image {
                    width: 350px; /* Adjust the width as needed */
                    height: auto; /* Adjust the height as needed */
                    object-fit: cover; /* Ensures the image covers the given width and height */
                    margin: 0 10px; /* Adds some space between the images */
                    border-radius: 0px; /* Roundness of image */
                }
                .compare-slider-container {
                    width: 100%; /* Adjust the width as needed */
                    max-width: 800px; /* Maximum width for the slider */
                    margin: 0 auto; /* Center the slider */
                    border-radius: 15px; /* Round the edges */
                    overflow: hidden; /* Ensure rounded corners are applied to child elements */
                }
                @media (max-width: 600px) {
                    .compare-slider-container {
                        max-width: 100%;
                    }
                    .fixed-size-image {
                        width: 100%; /* Adjust the width for smaller screens */
                        height: auto; /* Maintain aspect ratio */
                    }
                }
            `}</style>
        </div>
    );
};

export default Results;
