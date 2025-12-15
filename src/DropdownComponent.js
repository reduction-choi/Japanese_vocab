import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownComponent({setLevel}) {
  const levels = [...Array(60).keys()].map(i=> i+1);
  const handleSelect = (key) => {
    setLevel(prev => {
      return key;
    })
  }
  return (
    <Dropdown autoClose="outside">
      <DropdownButton id="dropdown-basic-button" onSelect={handleSelect} title="Dropdown button">
        {levels.map(level => {
          return <Dropdown.Item key={level} eventKey={level}>level {level}</Dropdown.Item>
        })}
      </DropdownButton>
    </Dropdown>
  );
}

export default DropdownComponent;