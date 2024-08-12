import { useState, useEffect } from 'react';
import not_found from '../../assets/images/404.png';

function NotFound() {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageSize, setImageSize] = useState(400);

  useEffect(() => {
    // Simulate a condition that triggers the animation
    setTimeout(() => {
      setIsImageVisible(true);
    }, 1000);
  }, []);

  return (
    <div className="row d-flex align-items-center justify-content-center h-100">
      {isImageVisible && (
        <img
          src={not_found}
          alt="not-found"
          style={{
            width: `${imageSize}px`,
            transition: 'width 2s ease-in-out',
          }}
        />
      )}
    </div>
  );
}

export default NotFound;
