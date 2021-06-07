import { useCallback, useEffect, useState } from 'react';
import Sector from '../Sector/Sector';

import './style.css';

const apiPath = ''; // http://v296823.hosted-by-vdsina.ru:5000/
const sectorsPath = 'sectors';

function Field({
  isSelectable,
  setIsSelectable,
}) {
  const [sectors, setSectors] = useState([]);
  // console.log(' log 1: ', apiPath + sectorsPath);
  const handleSectorClick = (sector) => {
    console.log('Sector: ', 'sector');
    setIsSelectable(false);
  }

  const updateSectors = useCallback(() => {
    fetch( apiPath + sectorsPath + `?${Math.random()}`, {})
      .then(response => response.json())
      .then((data) => {
        console.log(' success> ', 'data');
        setSectors(data);
      })
      .catch((err) => {
        console.log(' error> ', err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSectors();
    }, 4000);
    return () => clearInterval(interval);
  }, [updateSectors]);

  return (
    <div className={'field' + (isSelectable ? ' field_selectable' : '')}>
      { sectors.map((sector, i) => (
        <Sector
          onClick={() => { handleSectorClick(sector) }}
          key={ sector.position_top + '-' + sector.position_left + '-' + i}
          data={sector}
        />
      )) }
      {
        !sectors.length && (
          <div className="field__message">
            Загрузка ...
          </div>
        )
      }
    </div>
  );
}

export default Field;
