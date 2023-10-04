import { useLocation } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar"
import "./list.css";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../component/SearchItem/SearchItem";
import useFetch from "../../hooks/useFetch";


const List = () => {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [options, setOptions] = useState(location.state.Options)
    const [openDate, setOpenDate] = useState(false)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    //This useFetch has been created on the other folder
    const { data, loading, error, reFetch } = useFetch(
        `http://localhost:5000/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`)

        
    const handleClick = () => {
        reFetch();
    }

    return (
        <>

            <Navbar type="list" />
            <div className="listContainer">
                <div className="list">
                    <div className="listSearch">
                        <h1 className="listTitle">Search</h1>
                    </div>
                    <div className="listItems">
                        <label>Destination</label>
                        <input placeholder={destination} type="text" />
                    </div>


                    <div className="listItems">
                        <label>Check-in Date</label>
                        <span onClick={() => setOpenDate(!openDate)}>
                            {`${format(date[0].startDate, "dd/MM/yyyy")} 
                            to 
                            ${format(date[0].endDate, "dd/MM/yyyy")}`}
                        </span>
                        <div className="calender">
                            {
                                openDate && (
                                    <DateRange
                                        onChange={item => setDate([item.selection])}
                                        minDate={new Date()}
                                        ranges={date}
                                    />)
                            }
                        </div>
                    </div>
                    <div className="lsOptions">
                        <div className="lsOption">
                            <span className="optionText">
                                Min Price <small>per night</small>
                            </span>
                            <input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
                        </div>
                        <div className="lsOption">
                            <span className="optionText">
                                Max Price <small>per night</small>
                            </span>
                            <input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
                        </div>
                        <div className="lsOption">
                            <span className="optionText" >
                                Adult
                            </span>
                            <input type="number" min={1} placeholder={options.adult} />
                        </div>
                        <div className="lsOption">
                            <span className="optionText">
                                Children
                            </span>
                            <input type="number" min={0} placeholder={options.children} />
                        </div>
                        <div className="lsOption">
                            <span className="optionText">
                                Rooms
                            </span>
                            <input type="number" min={1} placeholder={options.room} />
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                </div>
                <div className="listResult">
                    {
                        loading ? "loading" : <>
                            {
                                data.map(item => (
                                    <SearchItem item={item} key={item._id} />
                                ))
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default List;