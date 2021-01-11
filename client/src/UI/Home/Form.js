import {useState} from 'react';
import Axios from 'axios'

const  Form = () => {

    const [full, setFull] = useState("")
    const [short, setShort] = useState("")
    
    const postUrls = async ()=>{
        short?
        await Axios.post('http://localhost:5000/url',{
            short,
            full
        }):
        await Axios.post('http://localhost:5000/url',{
            full
        })
        
     }


    return (
     <form onSubmit={postUrls}> 
        <div className="form-group">
            <label>Full URL* </label>
            <input className="form-control" required value={full}
            onChange={(e)=>setFull(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Short URL (Optional) </label>
            <input className="form-control" value={short}
            onChange={(e)=>setShort(e.target.value)}/>
            <small className="form-text text-muted">if you leave empty a short link will be auto generated for you</small>
        </div>
        <button type="submit" className="btn btn-dark btn-lg">Shrink</button>
    </form>
    ); 
  }
  
export default Form;