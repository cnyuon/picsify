import React, { useRef, useState } from 'react';

interface FileInputProps {
    onFileChange: (file: File) => void;
    onUploadComplete: () => void; // Adding the onUploadComplete prop
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange, onUploadComplete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave' || event.type === 'drop') {
            setDragActive(false);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            onFileChange(event.dataTransfer.files[0]);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            onFileChange(event.target.files[0]);
        }
    };

    const handleInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div 
            className="upload-box flex justify-center items-center w-full max-w-lg mx-auto my-4 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleInputClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{ border: dragActive ? '2px solid blue' : '2px dashed grey' }}
        >
                        <div>
                {selectedFile && (
                    <div>
                        <div className='flex justify-center items-center'>
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxHeight: '100px', marginBottom: '10px' }} />
                        </div>
                        <p className='mb-2'>Name: {selectedFile.name}</p>
                        <p className='mb-3'>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>

                    </div>
                )}
                {!selectedFile && 
                <div className='text-muted-foreground'>
                    Drag and drop your file here or click to select a file.
                </div>}
            </div>
            <input ref={fileInputRef} type="file" onChange={handleChange} style={{ display: 'none' }} accept="image/*" />
        </div>
    );
};

export default FileInput;
