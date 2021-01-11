import { useEffect,useState} from 'react';
import Moment from 'moment';
import { useParams} from 'react-router-dom';
import Axios from 'axios'


const Stats = () =>{
    let { shorturl } = useParams();
    
    const [url, setUrl] = useState({})

    Moment.locale('en');

    const fetchUrl = async ()=>{
    let {data}= await Axios.get(`http://localhost:5000/${shorturl}/stats`);
    setUrl(data);
    }
    useEffect(() => {
        fetchUrl();
    });

    return  (
    <div className="container mt-4">
    
        <h1>Stats</h1>
        <div className="container mt-4">
            <p>Short Url: {url.short}</p>
            <p>Full Url: {url.full}</p>
            <p>Clicks: {url.clicks}</p>
            <p>Created at: {Moment(url.createdAt).format('d MMM yyyy HH:MM')}</p>
            <p>Last Accessed: {Moment(url.lastAccessed).format('d MMM yyyy HH:MM')}</p>
        </div>
    </div> 
)  }

  export default Stats;

