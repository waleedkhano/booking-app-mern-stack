import "./feature.css";
import bg from "../../assets/bg.jpg"
import useFetch from "../../hooks/useFetch";
const Feature = () => {

    const {data, loading, error} = useFetch("http://localhost:5000/hotels/countByCity?cities=uk,dubai,toranto")
    return(
        <>
            <div className="featureContainer">
                {
                    loading? "loading Please wait" :
                    <>
                    <div className="feature">
                    <div className="featureItem">
                        <img src={bg} alt="" />
                        <div className="featureTitle">
                            <h1>Dubai</h1>
                            <h2>{data[0]} Property</h2>
                        </div>
                    </div> 
                    <div className="featureItem">
                        <img src={bg} alt="" />
                        <div className="featureTitle">
                            <h1>Dubai</h1>
                            <h2>{data[1]} Property</h2>
                        </div>
                    </div>
                    <div className="featureItem">
                        <img src={bg} alt="" />
                        <div className="featureTitle">
                            <h1>Dubai</h1>
                            <h2>{data[2]} Property</h2>
                        </div>
                    </div>
                </div>
                </>}
            </div>
        </>
    )
}

export default Feature;