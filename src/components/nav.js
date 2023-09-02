import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../App.css';



const smoothScroll = (year) => {
    const target = document.getElementById(year);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    };
  };

const Nav = ({ years, visibleYears }) => {
    return(
        <div class="dropdown">
            <Dropdown style={{ display: 'flex', justifyContent: 'center' }} as={ButtonGroup} className="mr-2">
                <Dropdown.Toggle variant="secondary" id="dropdown">
                    Jump to...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => smoothScroll("top")}> Top </Dropdown.Item>
                    <Dropdown.Divider />
                    {years.map(year => (
                        visibleYears[year] ? (
                            <Dropdown.Item onClick={() => smoothScroll(year)}>{year}</Dropdown.Item>
                        ) : null
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
};

export default Nav;