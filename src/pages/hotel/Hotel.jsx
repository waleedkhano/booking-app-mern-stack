import "./hotel.css";
import Navbar from "../../component/navbar/Navbar";
import { CiLocationOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import MailList from "../../component/mailList/MailList"
import { useContext, useState } from "react";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img6 from "../../assets/6.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../component/reserve/Reserve";
const Hotel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNum, setSlideNum] = useState(0)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

        //This useFetch has been created on the other folder
        const {data, loading, error} = useFetch(`http://localhost:5000/hotels/find/${id}`)    

        const {user} = useContext(AuthContext)    
        const {date, Options} = useContext(SearchContext)    
        
        

        const milliSecondsPerDay = 1000*60*60*24;
        const dayDifference = (date1, date2) =>{
            const timeDiff = Math.abs(date2.getTime() - date1.getTime())
            const DiffDays = Math.ceil(timeDiff / milliSecondsPerDay);
            return DiffDays;
        }

        const days = dayDifference(date[0].endDate, date[0].startDate);

    const photos = [
        { src: img1 },
        { src: img2 },
        { src: img3 },
        { src: img4 },
        { src: img6 },
    ];
    const handleOpen = (index) => {
        setSlideNum(index)
        setOpen(true);
    }

    const handleMove = (direction) => {
        let newSlideNum;
        if (direction === 'l'){
            newSlideNum = slideNum === 0 ? 0 : slideNum - 1
        }else{
            newSlideNum = slideNum === 4 ? 0 : slideNum + 1
        }
        setSlideNum(newSlideNum)
    }
    
        const handleClick = () => {
            if(user){
                setOpenModal(true)
                
            }else{
                navigate("/login")
            }
        }
    return (
        <>
            <Navbar type="list" />
                {
                    loading ? ("loading") : (
                        <>
                        { open &&
                            <div className="slider">
                                <div className="sliderIcons">
                                <RxCross2 className="cross" onClick={()=>setOpen(false)} />
                                <BsFillArrowLeftSquareFill className="arrowLeft" onClick={()=>handleMove("l")}/>
                                <BsFillArrowRightSquareFill className="arrowRight" onClick={()=>handleMove("r")}/>
                                </div>
                                <div className="sliderImgs">
                                    <img src={photos[slideNum].src} alt="SliderImg" className="slideImg" />
                                    {/* <img src={data.photos[slideNum]} alt="SliderImg" className="slideImg" /> */}
                                </div>
                            </div>
                        }
                                <div className="hotelContainer">
                        <div className="hotel">
                        <button className="bookNowTop">Reserver or Book Now!</button>
                            <div className="hotelText">
                                <h1 className="hTitle">{data.name}</h1>
                                <div className="hAddress">
                                    <CiLocationOn />
                                    <p>{data.address}</p>
                                </div>
                                    <p className="hPara">Excellent Location - {data.distance}m </p>
                                    <p className="hPara">Book a stay over ${data.cheapestPrice} and get a free airport taxi</p>
                            </div>
                            <div className="hotelImages">
                                {/* {data.photos?.map((photo, index) => ( */}
                                {photos.map((photo, index) => (
                                    <div className="hotelImage" key={index}>
                                        {/* <img onClick={()=>handleOpen(index)} src={photo} alt={`hotelImg-${index}`} className="hotelImg" /> */}
                                        <img onClick={()=>handleOpen(index)} src={photo.src} alt={`hotelImg-${index}`} className="hotelImg" />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailText">
                                <h1>{data.title}</h1>
                                    <p>{data.desc}</p>
                                </div>
                                <div className="hotelDetailPrice">
                                    <h1>Perfect for {days}-night stay</h1>
                                        <p>
                                        Located in the real  travelers, and tourists. Hotels can range 
                                        from small family-run businesses to large international chains. 
                                        </p>
                                    <h2><b>${days * data.cheapestPrice * Options.room}</b> ( {days} night)</h2>
                                    <button className="bookNow" onClick={handleClick}>Reserver or Book Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    )
                }
                <MailList />
                {
                    openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>
                }
        </>
    );
};

export default Hotel;
