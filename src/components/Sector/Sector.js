
import './style.css';
const zoom = 6;

function Sector({data}) {
  const blockStyle = {
    top: data.position_top*zoom + 'vh',
    left: data.position_left*zoom + 'vw',
  };

  console.log('b - ', blockStyle);
  console.log('p - ', data);

  return (
    <div className={'sector sector_type' + data.type} style={blockStyle}>
      f: { data.food}
      <br/>
      cr: { data.creatures?.length }
    </div>
  );
}

export default Sector;