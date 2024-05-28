import React from 'react';
import { Box, Input } from '@chakra-ui/react';

interface YouTubeVideoProps {
  index: number;
  content?: string;
  updateContent: (index: number, content: string) => void;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ index, content, updateContent }) => {
  return (
    <Box>
      <Input
        placeholder="Enter YouTube video link"
        value={content || ''}
        onChange={(e) => updateContent(index, e.target.value)}
      />
    </Box>
  );
};

export default YouTubeVideo;
