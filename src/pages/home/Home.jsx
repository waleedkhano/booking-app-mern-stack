import FeatureProperty from "../../component/featureProperty/FeatureProperty";
import Feature from "../../component/features/Feature";
import Footer from "../../component/footer/Footer";
import MailList from "../../component/mailList/MailList";
import Navbar from "../../component/navbar/Navbar";
import PropertyList from "../../component/propertyList/PropertyList";
import "./home.css";

const Home = () => {
    return(
        <>
        <Navbar/>
        <div className="homeContainer">
            <div className="home">
            <Feature/>
                <h1 className="homeTitle">Browse by property type</h1>
            <PropertyList />
                <h1 className="homeTitle">Guest of Home</h1>
            <FeatureProperty />
            <MailList/>
            <Footer/>
            </div>
        </div>

        </>
    )
}

export default Home;