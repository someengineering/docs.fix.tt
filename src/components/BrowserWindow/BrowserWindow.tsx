import { useHistory } from '@docusaurus/router';
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './BrowserWindow.css';

interface Area {
  shape: 'rect' | 'circle' | 'poly';
  coords: string;
  href: string;
  alt: string;
}

interface BrowserWindowProps {
  id?: string;
  imageSrc: string;
  url: string;
  mapName?: string;
  areas?: Area[];
  alt?: string;
}

const BrowserWindow: FC<BrowserWindowProps> = ({
  id,
  imageSrc,
  mapName,
  areas,
  url = 'https://app.fix.security',
  alt = 'Website Screenshot',
}) => {
  const history = useHistory();
  const imgRef = useRef<HTMLImageElement>(null);
  const [scaledAreas, setScaledAreas] = useState<Area[]>([]);

  const scaleAreas = useCallback(() => {
    const image = imgRef.current;
    if (image && areas) {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = image;
      const widthRatio = clientWidth / naturalWidth;
      const heightRatio = clientHeight / naturalHeight;

      const newAreas = areas.map((area) => {
        const coordsArray = area.coords.split(',').map(Number);
        const scaledCoords = coordsArray
          .map((coord, index) =>
            Math.round((index % 2 === 0 ? widthRatio : heightRatio) * coord),
          )
          .join(',');
        return { ...area, coords: scaledCoords };
      });

      setScaledAreas(newAreas);
    }
  }, [areas]);

  useEffect(() => {
    window.addEventListener('resize', scaleAreas);

    return () => {
      window.removeEventListener('resize', scaleAreas);
    };
  }, [scaleAreas]);

  const handleUrlClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  return (
    <div id={id} className="browser-window">
      <div className="browser-header">
        <div className="buttons">
          <span className="button close"></span>
          <span className="button minimize"></span>
          <span className="button maximize"></span>
        </div>
        <div className="url-bar">
          <input
            type="text"
            value={url}
            readOnly
            onClick={handleUrlClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className="browser-content">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          useMap={mapName ? `#${mapName}` : undefined}
          onLoad={scaleAreas}
        />
        {mapName && scaledAreas.length > 0 && (
          <map name={mapName}>
            {scaledAreas.map((area, index) => (
              <area
                key={index}
                shape={area.shape}
                coords={area.coords}
                href={area.href}
                alt={area.alt}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(area.href);
                }}
              />
            ))}
          </map>
        )}
      </div>
    </div>
  );
};

export default BrowserWindow;
