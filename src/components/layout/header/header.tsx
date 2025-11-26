
import Navbar from "./navbar";
import WelcomeBar from "./welcomeBar";

const Header = () => {

  return (
    <div className="">
      <WelcomeBar />
      <nav className={``}>
      <Navbar />
      </nav>
    </div>
  );
};

export default Header;
