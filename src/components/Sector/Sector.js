
import './style.css';
const zoomHight = 16;
const zoomWidth = 7;

function Sector({data}) {
  const blockStyle = {
    top: (data.position_top - 1)*zoomHight + 'vh',
    left: (data.position_left - 1)*zoomWidth + 'vw',
  };

  // console.log('b - ', blockStyle);
  // console.log('p - ', data);

  return (
    <div className={'sector sector_type' + data.type} style={blockStyle}>
      🍏 { data.food }
      <br/>
      { !!data.creatures?.length && data.creatures.map(creature => {
        const isVegan = creature.skills[1] === '1';
        const isСarnivore = creature.skills[2] === '1';
        return (
          <div className="sector_creature" title={`💪[${ creature.skills }]`}>
            { isVegan && '🐮' }
            { isСarnivore && '🦁' }
            { !isСarnivore && !isVegan && '🐠' }
            { creature.amount }
          </div>
        )
      }) }
    </div>
  );
}

export default Sector;