import bgImg from "../../../../assets/grey_bg.png";
import mobileImg from "../../../../assets/Store-Listing.png"
import playStore from "../../../../assets/play_store.png"
import macStore from "../../../../assets/mac-store.png"
import qrImg from "../../../../assets/qr.png"
import Link from "next/link";

const AppSection = () => {
  return (
    <div className=" w-full bg-cover py-16"
    style={{ backgroundImage: `url(${bgImg.src})` }}>
      <div className="container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex-shrink-0">
            <img src={mobileImg.src} alt="Appview" className="max-w-[200px] md:max-w-[300px] w-full h-auto" />
          </div>
          <div className="flex flex-col gap-y-4 items-center md:items-start">
              <h2 className="text-[28px] md:text-[36px] font-bold text-center md:text-left mb-2">Download Our App</h2>
              <p className="text-secondary text-center md:text-left mb-4 max-w-md">Get the best experience with our mobile app. Order food, track deliveries, and enjoy exclusive offers.</p>
              <div className="flex flex-col gap-y-3">
                  <Link href={""} className="hover:opacity-80 transition-opacity">
                    <img src={playStore.src} alt="Play Store link" className="h-12 w-auto"/>
                  </Link>
                  <Link href={""} className="hover:opacity-80 transition-opacity">
                    <img src={macStore.src} alt="Apple store link" className="h-12 w-auto"/>
                  </Link>
              </div>
          </div>
          <div className="flex-shrink-0">
            <img src={qrImg.src} alt="QR Image for App download" className="max-w-[150px] md:max-w-[200px] w-full h-auto" />
          </div>
      </div>
    </div>
  )
}

export default AppSection