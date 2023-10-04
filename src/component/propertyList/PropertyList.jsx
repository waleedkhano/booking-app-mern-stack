import "./propertyList.css";
import bg from "../../assets/bg.jpg";
import useFetch from "../../hooks/useFetch"

const PropertyList = () =>{
    const {data, loading, error} = useFetch("http://localhost:5000/hotels/countByType")
    const images = [
        bg,
        bg,
        bg,
        bg,
        bg,
    ];
    return(
        <>
            <div className="propertyList">
           { 
           loading ? "Please Wait" : <>
           <div className="propertyListContainer">
                
               {
                data && images.map((img, i)=>(

                <div className="listItem" key={i}>
                    <img src={img} alt="property-img" />
                   <div className="propertyListContent">
                   <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
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

export default PropertyList;