import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./header.css";
import { FaBed } from "react-icons/fa";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { GiPerson } from "react-icons/gi";
import { AiFillCar, AiOutlineCalendar } from "react-icons/ai";
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../../context/searchContext.js';

const Header = (props) => {
    const navigate = useNavigate();
    // Calender 
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //Options
    const [openOptions, setOpenOptions] = useState(false)
    const [Options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOption = (name, operation) => {
        setOptions(prev=>{
            return{
                ...prev, [name]: operation === "i" ? Options[name] +1 : Options[name] -1,
            }
        })
    }

    const {dispatch} = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination, date, Options}})
        
        navigate("/list", {state: {destination, date, Options}})
    }

    return (
        <>
            <div className="headerContainer">
                <div className={props.type === "list" ? "header listMode": "header"}>
                    <div className="selection">
                        <div className="select active"><FaBed /> Stays</div>
                        <div className="select "><MdOutlineFlightTakeoff /> Flights</div>
                        <div className="select"><AiFillCar /> Car rentals</div>
                        <div className="select"><FaBed /> Attractions</div>
                        <div className="select"><AiFillCar /> Airport Taxis</div>
                    </div>
                    { 
                    props.type !== "list" &&
                    <>
                        <div className="selectionDetails">
                        <div className="headerChecks">
                            <FaBed />
                            <input type="text" className='inp' 
                            placeholder="Where are you going?" 
                            onChange={e=>setDestination(e.target.value)}
                            />
                        </div>
                        <div className="headerChecks">
                            <AiOutlineCalendar />
                            <span onClick={() => setOpenDate(!openDate)} className='span'>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                            {
                                openDate && <div className="dateCalander">
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className="date"
                                    />
                                </div>
                            }
                        </div>
                        <div className="headerChecks">
                            <GiPerson />
                            <span onClick={()=>setOpenOptions(!openOptions)} className='span'>{`${Options.adult} Adult - ${Options.children} Children - ${Options.room} Rooms`}</span>
                            {   openOptions &&
                                <div className="options">
                                <div className="optionItem">
                                    <span className='optionText'> Adult </span>
                                    <div className="counter">
                                        <button className="counterButton" 
                                        disabled={Options.adult <= 1}
                                        onClick={()=>handleOption("adult", "d")}
                                        > - </button>
                                        <span className="optionNumber"> {Options.adult} </span>
                                        <button className="counterButton" onClick={()=>handleOption("adult", "i")}> + </button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className='optionText'>Children </span>
                                    <div className="counter">
                                        <button className="counterButton" 
                                        disabled= {Options.children <=0}
                                        onClick={()=>handleOption("children", "d")}
                                        > - </button>
                                        <span className="optionNumber"> {Options.children} </span>
                                        <button className="counterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className='optionText'> Rooms </span>
                                    <div className="counter">
                                        <button className="counterButton" 
                                        disabled={Options.room <= 1}
                                        onClick={()=>handleOption("room", "d")}
                                        > - </button>
                                        <span className="optionNumber"> {Options.room} </span>
                                        <button className="counterButton" onClick={()=>handleOption("room", "i")}> + </button>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="headerChecks">
                            <button className='headerbtn' onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                    </>}
                </div>
            </div>
        </>
    )
}

export default Header;