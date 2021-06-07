import './style.css';
const zoomHight = 16;
const zoomWidth = 7;

function Sector({data}) {
  const blockStyle = {
    // position: 'absolute',
    'gridRow': data.position_top,
    'gridColumn': data.position_left,
  };

  // console.log('b - ', blockStyle);
  // console.log('p - ', data);

  return (
    <div
      className={'sector sector_type' + data.type}
      style={blockStyle}
      key={ data.position_top + data.position_left}
    >
      {/* { data.position_top }
      -
      { data.position_left } */}
      🍏 { data.food }
      <br/>
      { !!data.creatures?.length && data.creatures.map((creature, i) => {
        const isVegan = creature.skills[1] === '1';
        const isСarnivore = creature.skills[2] === '1';
        // isСarnivore && console.log(creature);
        const showRED = creature.user_id === 60;
        return (
          <div
            className={'sector__creature' + (showRED ? ' sector__creature-red' : '' )}
            key={i}
            title={`💪[${ creature.skills }]`}
          >
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