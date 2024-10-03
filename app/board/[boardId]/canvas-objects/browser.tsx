import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface BrowserProps {
    initialUrl: string;
    visibleControls: boolean;
    setVisibleControls: (visible: boolean) => void;
}

export const Browser: React.FC<BrowserProps> = ({ initialUrl, visibleControls, setVisibleControls }) => {
    const [inputUrl, setInputUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [proxyUrl, setProxyUrl] = useState('');
    const iFrameRef = useRef<HTMLIFrameElement>(null);

    console.log(iFrameRef.current?.src, 'iFrameRef.current?.src')

    useEffect(() => {
        if (initialUrl) {
            navigateToUrl(initialUrl);
        }
    }, [initialUrl]);

    const navigateToUrl = async (newUrl: string) => {
        setIsLoading(true);

        if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
            if (newUrl.includes('.')) {
                newUrl = `https://${newUrl}`;
            } else {
                // If the input doesn't contain a dot, treat it as a Google search
                newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}`;
            }
        }

        // Use the existing proxy endpoint
        const proxyEndpoint = '/api/browser';
        setProxyUrl(`${proxyEndpoint}?url=${encodeURIComponent(newUrl)}`);
        setInputUrl(newUrl);
        setIsLoading(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigateToUrl(inputUrl);
    };

    return (
        <div className="flex flex-col h-full w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex bg-gray-200">
                <form onSubmit={handleSubmit} className="flex-grow">
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                </form>
            </div>
            <div className="flex-grow relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-4xl" />
                    </div>
                )}
                {proxyUrl && (
                    <iframe
                        ref={iFrameRef}
                        src={proxyUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onBlur={() => setVisibleControls(false)}
                        style={{
                            pointerEvents: visibleControls ? "auto" : "none",
                        }}
                        onWheel={(e) => {
                            if (e.ctrlKey) {
                                e.preventDefault();
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};