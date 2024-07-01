import React from 'react';
import './BrowserWindow.css';

interface Area {
  shape: 'rect' | 'circle' | 'poly';
  coords: string;
  href: string;
  alt: string;
}

interface BrowserWindowProps {
  imageSrc: string;
  url: string;
  mapName?: string;
  areas?: Area[];
  alt?: string;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({
  imageSrc,
  mapName,
  areas,
  url = 'https://app.fix.security',
  alt = 'Website Screenshot',
}) => {
  return (
    <div className="browser-window">
      <div className="browser-header">
        <div className="buttons">
          <span className="button close"></span>
          <span className="button minimize"></span>
          <span className="button maximize"></span>
        </div>
        <div className="url-bar">
          <input type="text" value={url} readOnly />
        </div>
      </div>
      <div className="browser-content">
        <img
          src={imageSrc}
          alt={alt}
          useMap={mapName ? `#${mapName}` : undefined}
        />
        {mapName && areas && (
          <map name={mapName}>
            {areas.map((area, index) => (
              <area
                key={index}
                shape={area.shape}
                coords={area.coords}
                href={area.href}
                alt={area.alt}
              />
            ))}
          </map>
        )}
      </div>
    </div>
  );
};

export default BrowserWindow;
