import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';


const smoothScroll = (year) => {
    const target = document.getElementById(year);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    };
  };

const Nav = ({ years }) => {
    return(
        <div>
            <Dropdown style={{ display: 'flex', justifyContent: 'center' }}>
                <Dropdown.Toggle variant="secondary" id="dropdown">
                    Jump to...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => smoothScroll("top")}> Top </Dropdown.Item>
                    {years.map(year => (
                        <Dropdown.Item onClick={() => smoothScroll(year)}>{year}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
};

export default Nav;