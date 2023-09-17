import React, { useRef, useEffect } from 'react';

const ContactText: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set the font and text to draw
    const font = '20px Times New Roman';
    const text = 'aurian.deslauriers@gmail.com';

    // Measure the text width and height
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(font, 10);

    // Set the canvas size to the text size
    canvas.width = textWidth;
    canvas.height = textHeight;

    // Draw the text onto the canvas as an image
    ctx.font = font;
    ctx.fillText(text, 0, textHeight - 5);

    // Disable text selection and copying
    canvas.style.userSelect = 'none';
    canvas.style.pointerEvents = 'none';
  }, []);

  return <canvas ref={canvasRef} />;
};

export const Contact = () => {
  return (
    <div className="error-content">
      <div className='error-message font-death text-lg'>
        <ContactText />
      </div>
    </div>
  )
}
