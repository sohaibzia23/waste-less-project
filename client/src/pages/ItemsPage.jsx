import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";

function ItemsPage() {
  const [item, setItem] = useState({
    title: "",
    expiryDate: "",
    location: "",
    quantity: "",
    category: "",
    dateAdded: "",
  });

  const [isVisible, setIsVisible] = useState(false);

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

  const handleChange = (e) => {
    setItem((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:9000/items/additem",
      data: item,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data);
        console.log(`${item.title} added successfully`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (itemId) => {
    const url = `http://localhost:9000/items/deleteItem/${item.id}`;

    axios
      .delete(url)
      .then((res) => {
        this.setItems((prevData) => {
          items: prevData.items.filter((i) => i.id != item.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const itemList = items.map((item) => (
    <>
      {/* <ul>
        <li key={item.id}>
          {item.title + " "}

          {item.expiryDate.slice(0, -14) + " "}
          {item.location + " "}
          {item.quantity + " "}
          {item.category + " "}
        </li>
      </ul> */}

      <table bgcolor="black" style={{ width: "100%" }}>
        <tr bgcolor="grey" style={{ width: "100%" }}>
          <th>Title</th>
          <th>Expiry Date</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
        <tr bgcolor="lightgrey" key={item.id}>
          <td>{item.title}</td>
          <td>{item.expiryDate.slice(0, -14)}</td>
          <td>{item.location}</td>
          <td>{item.quantity}</td>
          <td>{item.category}</td>
        </tr>
      </table>
    </>
  ));

  const showForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <title>Items</title>
      <button style={{ float: "right" }} onClick={addItemButton} isVisible>
        Add Item
      </button>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={item.title}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          name="expiryDate"
          placeholder="Expiration date"
          value={item.expiryDate}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          name="location"
          placeholder="Location"
          value={item.location}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          name="quantity"
          placeholder="Quantity"
          value={item.quantity}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
        ></input>

        <br></br>

        <button type="submit">Add item</button>
      </form>
      ;<div>{itemList}</div>
    </>
  );
}

export default ItemsPage;
