import "./header.css";

const Header = () => {
  return (
    <div>
      <div id="webLogo"></div>
      <h1 className="title animate__animated animate__fadeInUp">
        MANAGE YOUR TASKS
      </h1>
      <p className="subTitle animate__animated animate__fadeInUp">
        Anywhere. Anytime.
      </p>
    </div>
  );
};
export default Header;
