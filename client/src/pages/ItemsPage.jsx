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
      <table className="bg-oklch(97% 0 0)" width="800">
        <thead>
          <tr bgcolor="grey" width="800">
            <th className="font-BBHBogle" width="200">
              Title
            </th>
            <th className="font-BBHBogle" width="200">
              Expiry Date
            </th>
            <th className="font-BBHBogle" width="200">
              Location
            </th>
            <th className="font-BBHBogle" width="200">
              Quantity
            </th>
            <th className="font-BBHBogle" width="200">
              Category
            </th>
            <th className="font-BBHBogle" width="200">
              Days until Expiration
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr bgcolor="lightgrey" key={item._id}>
              <td
                className={`${
                  item.dateDifference <= 2
                    ? "bg-red-500"
                    : item.dateDifference <= 7
                    ? "bg-yellow-300"
                    : item.dateDifference > 7
                    ? "bg-green-300"
                    : {}
                } font-Cabin`}
                width="200"
              >
                {item.title}
              </td>
              <td className="font-Cabin" width="200">
                {item.expiryDate.slice(0, -14)}
              </td>
              <td className="font-Cabin" width="200">
                {item.location}
              </td>
              <td className="font-Cabin" width="200">
                {item.quantity}
              </td>
              <td className="font-Cabin" width="200">
                {item.category}
              </td>
              <td className="font-Cabin" width="200">
                {item.dateDifference + ` days`}
              </td>
              <td>
                <button
                  className="font-BBHBogle py-2 px-4 rounded-2xl text-black bg-white hover:bg-red-800!"
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
      <header className="font-BBHBogle text-8xl fixed top-10 left-0 right-0 z-50 p-1 text-cyan-800">
        WasteLess
      </header>

      {showTable && <ItemList />}
      {buttonVisible ? (
        <button
          className="font-BBHBogle py-2 px-4 rounded-2xl"
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
            // onClick={handleSubmit}
          >
            Add
          </button>
        </form>
      )}
    </>
  );
}

export default ItemsPage;
