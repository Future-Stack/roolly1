/* eslint-disable @typescript-eslint/no-explicit-any */
import EmojiPicker, { type EmojiClickData, Theme } from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface EmojiPickerButtonProps {
    onEmojiSelect: (emoji: string) => void;
    disabled?: boolean;
}

const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({
    onEmojiSelect,
    disabled = false,
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onEmojiSelect(emojiData.emoji);
        setShowPicker(false);
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowPicker(!showPicker);
    };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                disabled={disabled}
                className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add emoji"
                type="button"
            >
                <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2} />
            </button>

            {showPicker && (
                <div
                    ref={pickerRef}
                    className="absolute bottom-full right-0 mb-2 z-50 shadow-2xl rounded-lg"
                    style={{ transform: 'translateY(-8px)' }}
                >
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={Theme.LIGHT}
                        width={320}
                        height={400}
                        searchPlaceHolder="Search emoji..."
                        previewConfig={{ showPreview: false }}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerButton;
