import { useNavigate } from "react-router";

function HomePage() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/items";
    navigate(path);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={routeChange}>Items</button>
    </>
  );
}

export default HomePage;
