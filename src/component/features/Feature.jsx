import "./feature.css";
import unitedStates from "../../assets/fontPage/andres-gavino--DQT1fnrNRo-unsplash.jpg"
import swizerland from "../../assets/fontPage/maryna-yanul-zsdYSkIka8Y-unsplash.jpg"
import dubai from "../../assets/fontPage/wael-hneini-QJKEa9n3yN8-unsplash.jpg"
import useFetch from "../../hooks/useFetch";
const Feature = () => {

    const { data, loading, error } = useFetch("http://localhost:5000/hotels/countByCity?cities=uk,dubai,toranto")
    return (
        <>
            <div className="featureContainer">
                {
                    loading ? "loading Please wait" :
                        <>
                            <div className="feature">
                                <div className="featureItem">
                                    <img src={dubai} alt="" />
                                    <div className="featureTitle">
                                        <h1>Dubai</h1>
                                        <h2>{data[0]} Property</h2>
                                    </div>
                                </div>
                                <div className="featureItem">
                                    <img src={swizerland} alt="" />
                                    <div className="featureTitle">
                                        <h1>SwizerLand</h1>
                                        <h2>{data[1]} Property</h2>
                                    </div>
                                </div>
                                <div className="featureItem">
                                    <img src={unitedStates} alt="" />
                                    <div className="featureTitle">
                                        <h1>United States</h1>
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