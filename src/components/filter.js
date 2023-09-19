import '../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Filter = ({ years, visibleYears, viewYears }) => {
    const toggleYear = (year) => {
        const toggle = {...visibleYears, [year]: !visibleYears[year] };
        viewYears(year, toggle[year]);
    };

    const viewAll = (value) => {
        viewYears('current', value);
        years.forEach(year => viewYears(year, value));
    };

    return (
        <div class="dropdown">
            <Dropdown style={{ display: 'flex', justifyContent: 'center' }} autoClose="outside" as={ButtonGroup} className="mr-2">
                <Dropdown.Toggle variant="secondary" id="dropdown">
                    Filter by Year
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => viewAll(true)}> View All </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => toggleYear('current')}>
                        {visibleYears['current'] ? <BsToggleOn /> : <BsToggleOff />}
                        {" "}
                        Currently Reading
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {years.map(year => (
                        <Dropdown.Item key={year} onClick={() => toggleYear(year)}>
                            {visibleYears[year] ? <BsToggleOn /> : <BsToggleOff />}
                            {" "}
                            {year}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
};

export default Filter;