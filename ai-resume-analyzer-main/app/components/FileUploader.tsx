import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border rounded-2xl p-1 neon-glow-upload">
            <div 
                {...getRootProps()} 
                className={`uplader-drag-area ${isDragActive ? 'drag-active' : ''}`}
            >
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file group" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src="/images/pdf.png" alt="pdf" className="size-10" />
                                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-200 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-indigo-300">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button 
                                className="p-2 cursor-pointer rounded-full hover:bg-red-500/20 transition-colors group/remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <div className="relative">
                                    <img 
                                        src="/icons/cross.svg" 
                                        alt="remove" 
                                        className="w-4 h-4 group-hover/remove:scale-110 transition-transform" 
                                    />
                                    <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover/remove:opacity-20 transition-opacity"></div>
                                </div>
                            </button>
                        </div>
                    ): (
                        <div className="flex flex-col items-center justify-center">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <div className="relative">
                                    <img 
                                        src="/icons/info.svg" 
                                        alt="upload" 
                                        className="size-20 transition-transform duration-500 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity animate-pulse"></div>
                                </div>
                            </div>
                            <p className="text-lg text-indigo-300 font-medium">
                                <span className="text-white font-bold neon-text">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-lg text-indigo-300">PDF (max {formatSize(maxFileSize)})</p>
                            
                            {isDragActive && (
                                <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/20 rounded-2xl backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-white neon-text-pulse">
                                        Drop your file
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader