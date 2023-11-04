import React, { useRef, useEffect } from 'react';

const ContactText = () => {
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
    // const textWidth = ctx.measureText(text).width;
    // const textHeight = parseInt(font, 10);

    // Set the canvas size to the text size
    const container = canvas.parentElement;
    if (!container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Calculate the center point of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2.5;

    // Set the text alignment to center
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the text onto the canvas as an image
    ctx.font = font;
    ctx.fillText(text, centerX, centerY);
    // Disable text selection and copying
    canvas.style.userSelect = 'none';
    canvas.style.pointerEvents = 'none';
  }, []);

  return <canvas ref={canvasRef} />;
};

export const Contact = () => {
  return (
    <div className="error-content"  style={{ overflow: 'hidden' }}>
      <div className='error-message'>
        <ContactText />
      </div>
    </div>
  )
}
