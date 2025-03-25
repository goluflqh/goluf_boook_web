import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {books,navigate,token,cartItems,setCartItems,getCartAmount,delivery_charge,backendUrl} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //prevent page reload
    try {
      let orderItems = []

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = books.find((book) => book._id === itemId);
          if (itemInfo) {
            orderItems.push({ ...itemInfo, quantity: cartItems[itemId] });
          }
        }
      } 
     let orderData ={
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_charge
     }
     switch (method) {
      // api for COD method
      case 'cod':
        const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
        if (response.data.success) {
          setCartItems({})
          navigate('/orders')
        } else {
          toast.error(response.data.message);
        }
        break;
      
      //api for stripe method
      case 'stripe':
        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
        if (responseStripe.data.success) {
          const {session_url} = responseStripe.data
          window.location.replace(session_url)
        } else {
          toast.error(responseStripe.data.message);
        }
        break;
      default:
          break;
     }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
      
    }
}
  return (
    <section className="max-padd-container">
      {/* Container */}
      <form onSubmit={onSubmitHandler} className="pt-28">
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          {/* left side */}
          <div className="flex flex-1 flex-col gap-3 text-[95%]">
            <Title
              title1={"Delivery"}
              title2={"Information"}
              titleStyle={"h3"}
            />
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                placeholder="First Name"
                name="firstName"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.lastName}
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
            </div>
            <input
              onChange={onChangeHandler}
              value={formData.email}
              type="email"
              placeholder="Email"
              name="email"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full "
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.phone}
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full "
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.street}
              type="text"
              placeholder="Street"
              name="street"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full "
              required
            />
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.city}
                type="text"
                placeholder="City"
                name="city"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.state}
                type="text"
                placeholder="State"
                name="state"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.zipcode}
                type="text"
                placeholder="Zip Code"
                name="zipcode"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.country}
                type="text"
                placeholder="Country"
                name="country"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-1/2 "
                required
              />
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-1 flex-col">
            <CartTotal />
            {/* Payment method */}
            <div className="my-6">
              <h3 className="bold-20 mb-5">
                Payment <span className="text-secondary">Method</span>
              </h3>
              <div className="flex gap-3">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`${
                    method === "stripe" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`${
                    method === "cod" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Cash On Delivery
                </div>
              </div>
            </div>
            {/* Place order button */}
            <div className="mt-auto">
              <button type="submit" className="btn-secondaryOne">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
