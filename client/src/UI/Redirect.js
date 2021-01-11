import { useEffect} from 'react';

import { useParams} from 'react-router-dom';
import Axios from 'axios'


const Redirect = () =>{
    let { shorturl } = useParams();
    
    const fetchUrl = async ()=>{
    let {data}= await Axios.get(`http://localhost:5000/${shorturl}`);
    
    window.location = data.full;
    }
    useEffect(() => {
        fetchUrl();
    });

    return <h1>Pending</h1>
  }

  export default Redirect;

