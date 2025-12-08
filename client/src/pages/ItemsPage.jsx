import { useEffect, useState } from "react";
import axios from "axios";

function ItemsPage() {
  const [item, setItem] = useState({
    title: "",
    expiryDate: "",
    location: "",
    quantity: "",
    category: "",
    dateAdded: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/items/getItems")
      .then((response) => {
        setItems(response.data);
        // console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <header>items</header>
      <button>Add item</button>
    </>
  );
}

export default ItemsPage;
