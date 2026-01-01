import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownComponent({level, setLevel, states}) {
  const levels = [...Array(states.user.maxLevel).keys()].map(i=> i+1);
  // const handleSelect = (key) => {
  //   setLevel(prev => {
  //     return key;
  //   })
  // }
  return (
    <Dropdown autoClose="outside">
      <DropdownButton id="dropdown-basic-button" onSelect={setLevel} title={"level "+level}>
        {levels.map(level => {
          return <Dropdown.Item key={level} eventKey={level}>level {level}</Dropdown.Item>
        })}
      </DropdownButton>
    </Dropdown>
  );
}

export default DropdownComponent;