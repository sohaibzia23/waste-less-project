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
  const [showTable, setShowTable] = useState(true);

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

  const handleDelete = (_id) => {
    const newTable = items.filter((item) => item._id !== _id);
    axios
      .delete(`http://localhost:9000/items/deleteItem/${_id}`)
      .then((response) => {
        setItems(newTable);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ItemList = () => {
    return (
      <table bgcolor="black" width="800">
        <thead>
          <tr bgcolor="grey" width="800">
            <th width="200">Title</th>
            <th width="200">Expiry Date</th>
            <th width="200">Location</th>
            <th width="200">Quantity</th>
            <th width="200">Category</th>
            <th width="200">Days until Expiration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr bgcolor="lightgrey" key={item._id}>
              <td width="200">{item.title}</td>
              <td width="200">{item.expiryDate.slice(0, -14)}</td>
              <td width="200">{item.location}</td>
              <td width="200">{item.quantity}</td>
              <td width="200">{item.category}</td>
              <td width="200">{item.dateDifference + ` days`}</td>
              <td>
                <button
                  className="dark:lg:data-current:hover:bg-indigo-600"
                  onClick={(e) => handleDelete(item._id)}
                >
                  Delete Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const showForm = () => {
    setIsVisible(!isVisible);
  };

  const showButton = () => {
    setButtonVisible(false);
  };

  const hideTable = () => {
    setShowTable(false);
  };

  return (
    <>
      <title>Items</title>
      <header>Items</header>

      {showTable && <ItemList />}
      {buttonVisible ? (
        <button
          style={{ float: "right" }}
          onClick={() => {
            showForm();
            showButton();
            hideTable();
          }}
        >
          Add Item
        </button>
      ) : null}

      {isVisible && (
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-solid"
            name="title"
            placeholder="Title"
            value={item.title}
            onChange={handleChange}
          ></input>
          <br></br>
          <input
            className="border-2 border-solid"
            name="expiryDate"
            placeholder="Expiration date"
            value={item.expiryDate}
            onChange={handleChange}
          ></input>
          <br></br>
          <input
            className="border-2 border-solid"
            name="location"
            placeholder="Location"
            value={item.location}
            onChange={handleChange}
          ></input>
          <br></br>
          <input
            className="border-2 border-solid"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleChange}
          ></input>
          <br></br>
          <input
            className="border-2 border-solid"
            name="category"
            placeholder="Category"
            value={item.category}
            onChange={handleChange}
          ></input>
          <br></br>

          <br></br>

          <button
            className="bg-grey-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Add
          </button>
        </form>
      )}
    </>
  );
}

export default ItemsPage;
