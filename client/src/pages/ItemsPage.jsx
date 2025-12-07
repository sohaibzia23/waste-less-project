import { useEffect, useState } from "react";
import axios from "axios";

function ItemsPage() {
  const [items, setItems] = useState({
    title: "",
    expiryDate: "",
    location: "",
    quantity: "",
    category: "",
    dateAdded: "",
  });

  let reqOne = axios.get("http://localhost:9000/items/getItems");
  let reqTwo = axios.post("http://localhost:9000/items/addItem");

  useEffect(() => {
    axios
      .all([reqOne, reqTwo])
      .then(
        axios.spread((resOne, resTwo) => {
          console.log(resOne.data);
          console.log(resTwo.data);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  });

  return <h1>items</h1>;
}

export default ItemsPage;
