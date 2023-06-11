import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SpotForm.css";
import { createSingleSpot, updateSingleSpot } from "../../store/spots";

const SpotForm = ({ spot, formType }) => {
  const history = useHistory();
  let dispatch = useDispatch();

  const [country, setCountry] = useState(spot?.country || "");
  const [streetAddress, setStreetAddress] = useState(spot?.streetAddress || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [name, setName] = useState(spot?.name || "");
  const [price, setPrice] = useState(spot?.price || "");
  const [previewImages, setPreviewImages] = useState(spot?.previewImages || "");
  const [isUpdate, _] = useState(spot != null);
  const [inFlight, setInFlight] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.keys(errors).length > 0)return;
    setErrors({});
    // setInFlight(true);
    const newSpot = {
      ...spot,
      country,
      streetAddress,
      city,
      state,
      description,
      price,
      name,
      previewImages,
    };

    if (isUpdate) {
      dispatch(updateSingleSpot(newSpot)).then(() =>
        history.push(`/spots/${spot.id}`)
      );
    } else {
      dispatch(createSingleSpot(newSpot)).then((id) =>
        history.push(`/spots/${id}`)
      );
    }
  };
  // setInFlight(false);

  //   useEffect(() => {
  //     if (inFlight === false && spotLoaded.id) {
  //       history.push(`spots/${spot.id}`);
  //     }
  //   }, [inFlight]);

  useEffect(() => {
    let errorObj = {};

    if (!country.length) errorObj.country = "Country is required";
    if (!streetAddress.length)
      errorObj.streetAddress = "Street Address is required";
    if (!city.length) errorObj.city = "City is required";
    if (!state.length) errorObj.state = "State is required";
    if (description.length < 30)
      errorObj.description = "Description needs a minimum of 30 characters";
    if (!name.length) errorObj.name = "Name is required";
    if (!price.length) errorObj.price = "Price is required";

    if (!previewImages.length)
      errorObj.previewImages = "Preview image is required";
    for (let i = 0; i < previewImages.length; i++) {
      if (
        previewImages[i].indexOf(".png") !== -1 ||
        previewImages[i].indexOf(".jpeg") !== -1 ||
        previewImages[i].indexOf(".jpg") !== -1
      ) {
        errorObj.previewImages = "Image URL must end in .png. .jpg, or .jpeg";
      }
    }

    setErrors(errorObj);
  }, [
    country,
    streetAddress,
    city,
    state,
    description,
    name,
    price,
    previewImages,
  ]);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit} className="createSpotForm">
      <div className="FormContainer">
        <h2>{formType}</h2>
        <label>
          <div>
            Country {inFlight &&<div className="errors">{errors.country}</div>}
          </div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          StreetAddress {inFlight &&<div className="errors">{errors.streetAddress}</div>}
          <input
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </label>
        <div className="subFormContainer">
          <label>
            City {inFlight &&<div className="errors">{errors.city}</div>}
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            State {inFlight &&<div className="errors">{errors.state}</div>}
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </label>
        </div>

        <label>
          <p>Describe your place to guests</p>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {inFlight && <div className="errors">{errors.description}</div>}
        </label>

        <label>
          <p>Name of spot</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {inFlight &&<div className="errors">{errors.name}</div>}
        </label>

        <label>
          <p>Set a price for your spot</p>
          <input
            value={Number(price)}
            onChange={(e) => setPrice(e.target.value)}
          />
          {inFlight &&<div className="errors">{errors.price}</div>}
        </label>

        <label>
          <p>Preview Images</p>
          <textarea
            value={previewImages}
            onChange={(e) => setPreviewImages(e.target.value)}
          />
          {inFlight &&<div className="errors">{errors.previewImages}</div>}
        </label>
        <button
          // disabled={Object.keys(errors).length > 0}
          className="submitButton"
          type="submit"
          onClick={() => setInFlight(true)}
        >
          Create Spot
          {formType}
        </button>
      </div>
    </form>
  );
};

export default SpotForm;
