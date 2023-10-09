import "./featureProperty.css";
import room from "../../assets/fontPage/room.jpg";
import royal from "../../assets/fontPage/royal.jpg";
import Leman from "../../assets/fontPage/lauke.jpg";
import Norway from "../../assets/fontPage/norway.jpg";
import Italy from "../../assets/fontPage/italy.jpg";
import bg from "../../assets/bg.jpg";
import useFetch from "../../hooks/useFetch";
const FeatureProperty = () => {
    // const {data, loading, error} = useFetch("http://localhost:5000/hotels?featured=true&limit=5")
    const {loading} = useFetch("http://localhost:5000/hotels?featured=true&limit=5")
    const data = [
        {_id: 1234, 
            name:"Apartment by Royal", 
            city:"Dubai",
            cheapestPrice: 392,
            photos:[royal],
        },
        {_id: 134, 
            name:"Leman Locke", 
            city:"Tower Hamlets, United Kingdom, London",
            cheapestPrice: 199,
            photos:[Leman],
        },
        {_id: 14, 
            name:"May's Apartments by May's", 
            city:"Norway, Reine",
            cheapestPrice: 1599,
            photos:[Norway],
        },
        {_id: 234, 
            name:"Forestis Dolomites", 
            city:"Italy, Brixen",
            cheapestPrice: 2200,
            photos:[Italy],
        },
        {_id: 123, 
            name:"Seasons Apartments Budapest", 
            city:"Hungary, Budapest",
            cheapestPrice: 60,
            photos:[room],
        },
        {_id: 12, 
            name:"Hotel Royal", 
            city:"consectetur",
            cheapestPrice: 32,
            photos:[bg],
        },
    ]

    return (
        <>
            <div className="featureProperty">

                {
                    loading ? "Loading" : <>
                        <div className="featurePropertyContainer" >
                    {
                        data.map(item=>(

                        <div className="fp" key={item._id}>
                            <img src={item.photos[0]} alt=" " />
                            <div className="fpSpan">
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity">{item.city}</span>
                                <span className="fpPrice">starting from ${item.cheapestPrice}</span>
                                {
                                    item.rating &&
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                                }
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </>}

            </div>
        </>
    )
}

export default FeatureProperty;