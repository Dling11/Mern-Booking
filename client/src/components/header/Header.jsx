import { faBed, faCalendar, faCar, faMagnifyingGlass, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { DateRangePicker } from 'react-date-range';
import { useState } from "react";
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Options from "./Options";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  //=========> Options For choices
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] -1
      }
    })
  }

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } }); //=====> when navigate to state grabs the = useState() => check List.jsx
  };

  return (
    <div className='header'>
          {/* ========> Header Container <======== */}
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer" }>   {/* ===> as props "type" > check List.jsx*/}

        <div className="headerList">
          {/* ========> Icons <======== */}
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span> Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span> Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span> Car Rentals</span>
          </div>
          <div className="headerListItem">
          <FontAwesomeIcon icon={faBed} />
            <span> Attraction</span>
          </div>
          <div className="headerListItem">
          <FontAwesomeIcon icon={faTaxi} />
            <span> Airport Taxis</span>
          </div>
        </div>

          {/* ========> Header Title <======== */}
        { type !== "list" && 
        <>                                 {/* =====> If type is not list = refer to b-list, then don't show this*/}
          <h1 className="headerTitle">
            A lifetime of discounts? It's Genius.
          </h1>
          <p className="headerDesc">Get rewarded for your travels, unlock instant savings of 10% or more with a free booking account.</p>
          <button className="headerBtn">
            Sign In / Register
          </button>

            {/* ========> Header Search <======== */}
          <div className="headerSearchContainer">
            <div className="headerSearchItem">
              <FontAwesomeIcon className="headerIcon" icon={faMagnifyingGlass} />
              <input 
                className="headerSearchInput"
                type="text" 
                placeholder="Where are you going?"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon className="headerIcon" icon={faCalendar} />
              <span 
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} to
                ${format(date[0].endDate, "MM/dd/yyyy")}`}
              </span>
            {/* ========> Date Picker <======== */}
              {openDate && <DateRangePicker
                className="date1"
                onChange={item => setDate([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date}
                direction="horizontal"
                minDate={new Date()}
              />}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon className="headerIcon" icon={faPerson} />
            {/* ========> Current space <======== */}
              <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children  - ${options.room} room`}
              </span>

            {/* ========> Options <======== */}
              {
                openOptions && 
                <Options          //====> Check Options.jsx => for info
                  options={options}
                  handleOption={handleOption}
                />
              }
            </div>
            <div className="headerSearchitem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </>}
        
      </div>

    </div>
  )
}

export default Header