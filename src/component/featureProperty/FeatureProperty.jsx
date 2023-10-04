import "./featureProperty.css";
import bg from "../../assets/bg.jpg";
import useFetch from "../../hooks/useFetch";
const FeatureProperty = () => {
    const {data, loading, error} = useFetch("http://localhost:5000/hotels?featured=true&limit=5")

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