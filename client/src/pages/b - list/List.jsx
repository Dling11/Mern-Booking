import "./index.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Searchitem from "../../components/searchItem/Searchitem"

const List = () => {
  const location = useLocation();       //====> take note, you can't navigate straightly here || /hotels
  // console.log(location); //===> check what it returns
  const [date, setDate] = useState(location.state.date);                      //===> return the, input of the user, refer to Header.jsx
  const [openDate, setOpenDate] = useState(false);                            //===> return the, input of the user, refer to Header.jsx
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const destination = location.state.destination;
  const options = location.state.options;

  return (

    <div>
      <Navbar />
      <Header 
        type="list"
      />
      {/* ============> /hotels || Search Option <============ */}
      <div className="listContainer">

        <div className="listWrapper">

          <div className="listSearch">
            <h1 className="listTitle">
              Search
            </h1>
            <div className="lsItem">
              <label className="destination"> 
                Destination 
              </label>
              <input className="firstInput" placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label className="destination2"> Check-in Date </label>
              <span className="dataFormat" onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
              <DateRangePicker
                className="date"
                onChange={item => setDate([item.selection])}
                ranges={date}
                minDate={new Date()}
              />)}
            </div>

      {/* ===========> Options <=========== */}
            <div className="lsItem">
              <div className="lsOptions">
              <label>Options</label>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <span className="smaller">{" "}per night</span >
                  </span>
                  <input 
                    type="number" 
                    className="lsOptionInput firstInputOption" 
                    placeholder="Amount"
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <span className="smaller">{" "}per night</span >
                  </span>
                  <input 
                    type="number" 
                    className="lsOptionInput"
                    placeholder="Amount"
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} 
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} 
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    max={8}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} 
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()} 
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>

          <div className="listResults">
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
          </div>
        </div>

      </div>

    </div>
  )
}

export default List