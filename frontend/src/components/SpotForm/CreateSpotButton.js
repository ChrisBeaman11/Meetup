import SpotForm from './index.js';
import { useHistory } from 'react-router-dom';
export default function CreateSpotButton(){
let history = useHistory();
let handleClick  = () =>{
    history.push('/spots/new')
}
    return(
        <button onClick={handleClick}>Create New Spot</button>
    )
}
