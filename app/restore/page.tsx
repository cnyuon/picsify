"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FileInput from '../fileinput';  // Check correct path
import { Terminal, Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Restore = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [count, setCount] = useState<number | null>(null); // Initialize with null until the users credits are fetched
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // Loading state
    const router = useRouter();
    const apiUrl = "https://picsify-backend-2e4780a97926.herokuapp.com";


    useEffect(() => {
        const fetchUserCredits = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user-credits`, {
                    headers: {
                        'Clerk-User-Id': 'user_2h9WAwedsXZcaHaqmBxvOK1hISI' // Replace with actual user ID
                    }
                });
                setCount(response.data.credits);
            } catch (error) {
                console.error('Failed to fetch user credits:', error);
            }
        };

        fetchUserCredits();
    }, []);

    const handleFileChange = (file: File) => {
        setSelectedFile(file);
        setIsUploadComplete(false);  // Reset the upload completion state
        console.log('File selected:', file.name);
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file before uploading.');
            return;
        }
        
        const formData = new FormData();
        formData.append('image', selectedFile);
        setIsLoading(true);  // Start loading

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Clerk-User-Id': 'user_2h9WAwedsXZcaHaqmBxvOK1hISI' // Replace with actual user ID
                }
            });
            console.log(response.data);  // Display server response
            router.push(`/results?originalImageUrl=${encodeURIComponent(response.data.original_image_url)}&processedImageUrl=${encodeURIComponent(response.data.processed_image_url)}&timestamp=${new Date().getTime()}`);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsLoading(false);  // End loading
        }
    };

    const handleUploadClick = () => {
        if (count && count > 0) {
            uploadFile();
            setCount(count - 1);
        } else {
            alert('No credits left. Please purchase more credits.');
        }
    };

    const noCreditAlert = () => {
        return count !== null && count <= 0;
    };

    return (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-7">
                <h1>Upload an image</h1>
            </div>
            <div className="mb-7 text-muted-foreground">
                {count === null ? (
                    <p>Loading credits...</p> // Display loading state
                ) : (
                    <p>You have {count} credits left</p>
                )}
            </div>

            <FileInput onFileChange={handleFileChange} onUploadComplete={() => setIsUploadComplete(true)} />
            <Button onClick={handleUploadClick} className="mt-10 mb-10" type="button" disabled={isLoading || count === null}>
                {isLoading ? <Loader className="animate-spin" /> : 'Upload Image'}
            </Button>

            <div>
                {noCreditAlert() && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            You ran out of credits. Buy more <span className='text-blue-700'><Link href="/buycredits">here.</Link></span>
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default Restore;
