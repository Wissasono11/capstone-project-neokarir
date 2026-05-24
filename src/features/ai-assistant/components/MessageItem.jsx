import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageItem = ({ sender, text, timestamp }) => {
  const isBot = sender === 'bot';

  // Helper to parse simple markdown syntax into safe React elements
  const parseMarkdown = (rawText) => {
    if (!rawText) return '';
    
    // Split by newlines to handle paragraphs and lists
    const lines = rawText.split('\n');
    
    return lines.map((line, lineIndex) => {
      // 1. Check for bullet list item: starts with '- ' or '* '
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      
      // 2. Check for numbered list item: starts with '1. ', '2. ', etc.
      const isNumbered = /^\d+\.\s/.test(line.trim());
      
      let cleanLine = line;
      if (isBullet) {
        cleanLine = line.trim().replace(/^[-*]\s+/, '');
      } else if (isNumbered) {
        cleanLine = line.trim().replace(/^\d+\.\s+/, '');
      }

      // Parse bold tags **text**
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(cleanLine)) !== null) {
        const precedingText = cleanLine.substring(lastIndex, match.index);
        const boldText = match[1];
        
        if (precedingText) {
          parts.push(parseLinks(precedingText));
        }
        parts.push(<strong key={match.index} className="font-bold text-slate-800">{parseLinks(boldText)}</strong>);
        
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < cleanLine.length) {
        parts.push(parseLinks(cleanLine.substring(lastIndex)));
      }

      // Wrap in appropriate list or paragraph elements
      if (isBullet) {
        return (
          <li key={lineIndex} className="ml-4 list-disc mb-1 leading-relaxed text-slate-600">
            {parts}
          </li>
        );
      }
      
      if (isNumbered) {
        return (
          <li key={lineIndex} className="ml-5 list-decimal mb-1 leading-relaxed text-slate-600">
            {parts}
          </li>
        );
      }

      return (
        <p key={lineIndex} className={`mb-2 leading-relaxed ${isBot ? 'text-slate-600' : 'text-white'}`}>
          {parts}
        </p>
      );
    });
  };

  // Helper to parse markdown links: [label](url)
  const parseLinks = (textSegment) => {
    if (typeof textSegment !== 'string') return textSegment;
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(textSegment)) !== null) {
      const precedingText = textSegment.substring(lastIndex, match.index);
      const linkLabel = match[1];
      const linkUrl = match[2];

      if (precedingText) {
        parts.push(precedingText);
      }
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5"
        >
          {linkLabel}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < textSegment.length) {
      parts.push(textSegment.substring(lastIndex));
    }

    return parts.length > 0 ? parts : textSegment;
  };

  return (
    <div className={`flex items-start gap-3 w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      
      {/* Bot Avatar (Left side) */}
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
          <Bot className="w-5 h-5" />
        </div>
      )}

      {/* Message Bubble Column */}
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isBot ? 'items-start' : 'items-end'}`}>
        
        {/* Bubble */}
        <div
          className={`rounded-2xl px-5 py-3.5 text-body-sm font-medium ${
            isBot
              ? 'bg-white border border-slate-100 shadow-xs text-slate-700 rounded-tl-xs'
              : 'bg-primary text-white rounded-tr-xs shadow-xs'
          }`}
        >
          {isBot ? parseMarkdown(text) : <p className="leading-relaxed text-white">{text}</p>}
        </div>

        {/* Timestamp */}
        <span className="text-caption text-secondary-text/70 mt-1 font-semibold px-1">
          {timestamp}
        </span>
      </div>

      {/* User Avatar (Right side) */}
      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <User className="w-5 h-5" />
        </div>
      )}

    </div>
  );
};

export default MessageItem;
