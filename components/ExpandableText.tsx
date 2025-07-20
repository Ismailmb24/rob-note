'use client';

import { useState } from 'react';
import { Button } from './ui/button';

type Props = {
  text: string;
  maxLength?: number; // Optional: defaults to 150
};

export default function ExpandableText({ text, maxLength = 150 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxLength;
  const displayedText = expanded || !isLong ? text : text.slice(0, maxLength) + '...';

  return (
    <div className="text-sm italic text-gray-500 mb-2">
      <p>{displayedText}</p>
      {isLong && (
        <Button
          variant="link"
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:underline text-xs p-0"
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}
