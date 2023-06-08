import "./index.css"

const Options = ({ options, handleOption }) => {
  return (
      <div className="options">

        <div className="optionItem">
          <span className="optionText"> Adult </span>
          <div className="optionCounter">
            <button 
              disabled={options.adult <=1} 
              className="optionCounterbtn" 
              onClick={() => handleOption("adult", "d")}
            > - </button>
            <span className="optionCounterNumber"> {options.adult} </span>
            <button 
              className="optionCounterbtn" 
              onClick={() => handleOption("adult", "i")}
            > + </button>
          </div>
        </div>

        <div className="optionItem">
          <span className="optionText"> Children </span>
          <div className="optionCounter">
            <button 
              disabled={options.children <=0} 
              className="optionCounterbtn" 
              onClick={() => handleOption("children", "d")}
            > - </button>
            <span className="optionCounterNumber"> {options.children} </span>
            <button className="optionCounterbtn" onClick={() => handleOption("children", "i")}> + </button>
          </div>
        </div>

        <div className="optionItem">
          <span className="optionText"> Room </span>
          <div className="optionCounter">
            <button 
              disabled={options.room <=1} 
              className="optionCounterbtn" 
              onClick={() => handleOption("room", "d")}
            > - </button>
            <span className="optionCounterNumber"> {options.room} </span>
            <button 
              className="optionCounterbtn" 
              onClick={() => handleOption("room", "i")}
            > + </button>
          </div>
        </div>
      
    </div>
  )
}

export default Options