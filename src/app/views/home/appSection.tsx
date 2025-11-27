import bgImg from "../../../../assets/grey_bg.png";
import mobileImg from "../../../../assets/Store-Listing.png"


const AppSection = () => {
  return (
    <div className=" w-full bg-cover "
    style={{ backgroundImage: `url(${bgImg.src})` }}>
      <div className="container">
          <div className="">
            <img src={mobileImg.src} alt="Appview" />
          </div>
          <div></div>
          <div></div>
      </div>
    </div>
  )
}

export default AppSection