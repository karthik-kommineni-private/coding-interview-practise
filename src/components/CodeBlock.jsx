import { useState } from 'react';
import './CodeBlock.css';

function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code) => {
    const keywords = new Set([
      'def', 'class', 'if', 'else', 'elif', 'while', 'for', 'in', 'return',
      'import', 'from', 'as', 'with', 'try', 'except', 'finally', 'raise',
      'True', 'False', 'None', 'self', 'range', 'len', 'enumerate',
      'max', 'min', 'sum', 'and', 'or', 'not', 'is', 'lambda', 'yield',
      'break', 'continue', 'pass', 'assert', 'global', 'nonlocal'
    ]);

    const lines = code.split('\n');
    const highlighted = lines.map(line => {
      const tokens = [];
      let i = 0;

      while (i < line.length) {
        // Skip whitespace
        if (line[i] === ' ' || line[i] === '\t') {
          tokens.push(line[i]);
          i++;
          continue;
        }

        // Comments
        if (line[i] === '#') {
          tokens.push(`<span class="comment">${escapeHtml(line.slice(i))}</span>`);
          break;
        }

        // Strings
        if (line[i] === '"' || line[i] === "'") {
          const quote = line[i];
          let j = i + 1;
          while (j < line.length && line[j] !== quote) {
            if (line[j] === '\\') j++; // Skip escaped chars
            j++;
          }
          tokens.push(`<span class="string">${escapeHtml(line.slice(i, j + 1))}</span>`);
          i = j + 1;
          continue;
        }

        // Numbers
        if (/\d/.test(line[i])) {
          let j = i;
          while (j < line.length && /\d/.test(line[j])) j++;
          tokens.push(`<span class="number">${line.slice(i, j)}</span>`);
          i = j;
          continue;
        }

        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(line[i])) {
          let j = i;
          while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
          const word = line.slice(i, j);

          // Check if it's a function call
          if (line[j] === '(') {
            tokens.push(`<span class="function">${word}</span>`);
          } else if (keywords.has(word)) {
            tokens.push(`<span class="keyword">${word}</span>`);
          } else {
            tokens.push(word);
          }
          i = j;
          continue;
        }

        // Other characters
        tokens.push(escapeHtml(line[i]));
        i++;
      }

      return tokens.join('');
    });

    return highlighted.join('\n');
  };

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const lines = code.split('\n');

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="language-badge">
          <span className="badge-dot"></span>
          {language}
        </div>
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <>
              <span className="check-icon">✓</span>
              Copied!
            </>
          ) : (
            <>
              <span className="copy-icon">📋</span>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="code-block-content">
        <div className="line-numbers">
          {lines.map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        <pre className="code-pre">
          <code
            className="code-element"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
