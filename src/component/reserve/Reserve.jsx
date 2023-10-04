import "./reserve.css";
import { RxCross2 } from "react-icons/rx";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import {SearchContext} from "../../context/searchContext"
import axios from "axios";
import {useNavigate} from "react-router-dom";



const Reserve = ({ setOpen, hotelId }) => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState([])
    const { data, loading, error } = useFetch(`http://localhost:5000/hotels/room/${hotelId}`)
    const {date} = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const rdate = new Date(start.getTime());
    
        const rdates = [];
    
        while (rdate <= end) {
          rdates.push(new Date(rdate).getTime());
          rdate.setDate(rdate.getDate() + 1);
        }
    
        return rdates;
      };

      
      const allDates= getDatesInRange(date[0].startDate, date[0].endDate);
      const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
        allDates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };


    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRoom(checked ? [...selectedRoom, value] : selectedRoom.filter((item) => item !== value))

    }


    const handleReserve = async () =>{
        try {
            await Promise.all(
                selectedRoom.map((roomId) => {
                const res = axios.put(`http://localhost:5000/rooms/availability/${roomId}`, {
                  date: allDates,
                });
                return res.data;
              })
            );
            setOpen(false);
            navigate("/");
          } catch (err) {}
    }






    
    return (
        <>
            <div className="reserve">
                <div className="reserveContainer">
                    <RxCross2 className="close" onClick={() => setOpen(false)} />
                    <div className="ritems">
                        <p>Select your rooms: </p>
                        {data.slice(5).map(item => (
                            <div className="ritem" key={item._id}>
                                <div className="riteminfo">
                                    <div className="rtitle">{item.title}</div>
                                    <div className="rdesc">{item.desc}</div>
                                    <div className="rmax">Max People <strong>{item.maxPeople}</strong></div>
                                    <div className="rprice">{item.price}</div>
                                </div>
                                <div className="rselectroom">
                                {item.roomNumber.map(roomNumber => (
                                    <div className="room" key={roomNumber._id}>
                                        <label>{roomNumber.number}</label>
                                        <input type="checkbox" 
                                        value={roomNumber._id} 
                                        onChange={handleSelect} 
                                        disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}

                            <button className="rbutton" onClick={handleReserve}>Reserve Now</button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Reserve;