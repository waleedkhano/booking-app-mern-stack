import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) =>{
    return(
        <>
        <div className="searchItem">
            <div className="searchItemContainer">
                {/* {item.photos[0]} */}
                <div className="searchImg"></div>
                <div className="searchdesc span">
                    <h1 className="sTitle">{item.name}</h1>
                    <span className="sDistance">{item.distance}m From center</span>
                    <span className="staxi"><strong>Free Airport taxi</strong></span>
                    <span className="sSubtitle">Studio Apartment with AC</span>
                    <span className="sFeatures">{item.desc}</span>
                    <span className="sCancel"><strong>Free Cancellation</strong></span>
                    <p className="sChancelSubtitle">You can Cancel later, so lock this great place today!</p>
                </div>
                <div className="searchDetail">
                        {
                            item.rating &&
                    <div className="sRating span">
                            <span>Excelent</span>
                            <button className="ratingbtn">{item.rating}</button>
                        </div>
                        }
                    <div className="sDetailText span">
                        <span className="sPrice">${item.cheapestPrice}</span>
                        <span className="sTax">Includes Taxes</span>
                        <button> <Link to={`/hotel/${item._id}`}>
                        See Availability
                        </Link></button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchItem;