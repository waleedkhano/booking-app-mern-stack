import "./mailList.css";
// import mail from ""
const MailList = () => {
    return(
        <>
        <div className="mail">
            <div className="mailContainer">
                <div className="mailImg"></div>
                <div className="mailContent">
                    <div className="mailcontentContainer">
                    <div className="mailTitle">
                        <p>Save time, save money!</p>
                    </div>
                    <div className="mailDesc">
                        <p>Sign up and we'll send the best deals to you</p>
                    </div>
                    <div className="mailbtn">
                        <input type="text" placeholder="Your Email" />
                        <button>Subscribe</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MailList;