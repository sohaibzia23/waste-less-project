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
  const [buttonVisible, setButtonVisible] = useState(true);

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

  const ItemList = () => {
    const items = items.map((item) => (
      <div key={item.id}>
        <table bgcolor="black" width="800">
          <thead>
            <tr bgcolor="grey" width="800">
              <th width="200">Title</th>
              <th width="200">Expiry Date</th>
              <th width="200">Location</th>
              <th width="200">Quantity</th>
              <th width="200">Category</th>
            </tr>
          </thead>
          <thead>
            <tr bgcolor="lightgrey">
              <td width="200">{item.title}</td>
              <td width="200">{item.expiryDate.slice(0, -14)}</td>
              <td width="200">{item.location}</td>
              <td width="200">{item.quantity}</td>
              <td width="200">{item.category}</td>
            </tr>
          </thead>
        </table>
      </div>
    ));
  };

  const showForm = () => {
    setIsVisible(!isVisible);
  };

  const showButton = () => {
    setButtonVisible(false);
  };

  return (
    <>
      <ItemList />
      <title>Items</title>

      {buttonVisible ? (
        <button
          style={{ float: "right" }}
          onClick={() => {
            showForm();
            showButton();
          }}
        >
          Add Item
        </button>
      ) : null}

      {isVisible && (
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

          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
}

export default ItemsPage;
