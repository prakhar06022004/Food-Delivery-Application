import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { setLocation, setAddress } from "../../redux/mapSlice";
import axios from "axios";
import { useEffect, useState } from "react";
function CheckOutPage() {
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;

  const { location, address } = useSelector((state) => state.map);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const ReCenterMap = ({ location }) => {
    if (location?.latitude && location?.longitude) {
      const map = useMap();
      map.setView([location.latitude, location.longitude], 16, {
        animate: true,
      });
    }
    return null;
  };
  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatchRedux(setLocation({ latitude: lat, longitude: lng }));
    // console.log(e);
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${geoApiKey}`
      );
      const data = `${result?.data?.results[0].address_line1} ${result?.data?.results[0].address_line2}`;
      console.log(data);
      dispatchRedux(setAddress(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      getAddressByLatLng(location.latitude, location.longitude);
    }
  }, [location]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (posi) => {
      // console.log(posi);
      const latitude = posi.coords.latitude;
      const longitude = posi.coords.longitude;
      dispatchRedux(setLocation({ latitude, longitude }));
      getAddressByLatLng(latitude, longitude);
    });
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${geoApiKey}`
      );
      // console.log(result?.data?.features?.[0]?.properties);
      const { lat, lon } = result?.data?.features?.[0]?.properties;
      dispatchRedux(setLocation({ latitude: lat, longitude: lon }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="text-amber-600 cursor-pointer absolute sm:top-5 sm:left-5 top-2 left-2">
        <IoIosArrowRoundBack size={40} onClick={() => navigate("/cart")} />
      </div>

      <div className="w-full max-w-3xl shadow-xl p-5 rounded-2xl space-y-5">
        <h1 className="font-fredoka font-medium sm:text-[18px] text-[20px]">
          CheckOut
        </h1>
        {/* location section */}
        <section>
          <h1 className="flex items-center gap-1">
            <FaLocationDot className="text-amber-600" size={24} />
            Delivery Location
          </h1>
          <div className="sm:flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Enter your delivery location..."
              className="w-full border-gray-200 py-2 px-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-300 rounded-2xl border-[1px]"
              value={addressInput || ""}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getLatLngByAddress();
                }
              }}
              // break temporry
            />
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className="flex justify-center items-center bg-amber-600 text-white rounded-full cursor-pointer sm:p-2 p-1 hover:bg-amber-700 duration-100"
                onClick={getLatLngByAddress}
              >
                <IoIosSearch size={25} />
              </button>
              <button
                className="inline-block cursor-pointer bg-blue-700 text-white sm:p-2 p-1 rounded-3xl hover:bg-blue-800 duration-200"
                onClick={getCurrentLocation}
              >
                <TbCurrentLocation size={27} />
              </button>
            </div>
          </div>

          <div className="border rounded-2xl overflow-hidden mt-4">
            <div className="h-64 w-full items-center justify-center">
              {location?.latitude && location?.longitude ? (
                <MapContainer
                  style={{ height: "100%", width: "100%" }}
                  center={[location.latitude, location.longitude]}
                  zoom={16}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[location.latitude, location.longitude]}
                    draggable
                    eventHandlers={{ dragend: onDragEnd }}
                  >
                    <Popup>Your current location</Popup>
                  </Marker>
                  <ReCenterMap location={location} />
                </MapContainer>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  📍Location not set yet
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="">
          <h2 className="text-lg text-gray-800 font-fredoka font-medium">
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition cursor-pointer ${
                paymentMethod === "cod"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-600 hover:border-gray-500"
              } `}
              onClick={() => setPaymentMethod("cod")}
            ></div>
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition cursor-pointer ${
                paymentMethod === "online"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-600 hover:border-gray-500"
              } `}
              onClick={() => setPaymentMethod("online")}
            ></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOutPage;
