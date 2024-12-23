// YouTube.tsx
import { createReactBlockSpec } from "@blocknote/react";
import { BlockNoteEditor, Block } from "@blocknote/core";
import React from "react";

// Function to extract YouTube video ID from a URL
const extractYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.*\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// The YouTube Embed Block Implementation
const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="youtube-video">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Video"
      />
    </div>
  );
};

// Creating the YouTube Block Specification
export const YouTube = createReactBlockSpec(
  {
    type: "youtube", // The identifier of the block
    propSchema: {
      videoId: {
        default: "", // Default value (empty for now)
      },
    },
    content: "none", // No inline content (just an embed)
  },
  {
    // Render method to display the video in the editor
    render: (props) => {
      const { videoId } = props.block.props;
      return videoId ? <YouTubeEmbed videoId={videoId} /> : null;
    },

    // Parse method to convert a YouTube link into the block format
    parse: (element: HTMLElement) => {
      const videoId = extractYouTubeVideoId(element.innerHTML);
      return videoId
        ? { videoId } // If video ID is found, return the block properties
        : undefined; // Otherwise, return undefined
    },
  }
);
