import SpotForm from './index.js';
import { useHistory } from 'react-router-dom';
import './createSpotButton.css';
export default function CreateSpotButton(){
let history = useHistory();
let handleClick  = () =>{
    history.push('/spots/new')
}
    return(
        <h2 className = "createSpot" style = {{'color': "turquoise", 'font-size': '20px'}}onClick={handleClick}>Create New Spot</h2>
    )
}
