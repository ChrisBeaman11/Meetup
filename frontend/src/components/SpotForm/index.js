import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SpotForm = ({ spot, formType }) => {
  const history = useHistory();
  const [country, setCountry] = useState(spot?.country);
  const [streetAddress, setStreetAddress] = useState(spot?.streetAddress);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = { ...spot, country, streetAddress };
    history.push(`spots/${spot.id}`)
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.country}</div>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <div className="errors">{errors.streetAddress}</div>
      <label>
        StreetAddress
        <textarea
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;
