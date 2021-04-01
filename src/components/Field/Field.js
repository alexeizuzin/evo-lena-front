
import { useEffect, useState } from 'react';
import Sector from '../Sector/Sector';

import './style.css';

const apiPath = 'http://v296823.hosted-by-vdsina.ru:5000/';
const sectorsPath = 'sectors?500';

function Field() {
  const [sectors, setSectors] = useState([]);
  console.log(' log 1: ', apiPath + sectorsPath);
  useEffect(() => {
    fetch( apiPath + sectorsPath, {})
      .then(response => response.json())
      .then((data) => {
        console.log(' success> ', data);
        setSectors(data);
      })
      .catch((err) => {
        console.log(' error> ', err);
      });
  }, []);
  return (
    <div className="field">
      { sectors.map(sector => <Sector key={sector.id} data={sector}/>) }
    </div>
  );
}

export default Field;
