import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios'

const  Table = () => {

    const [urls, setUrls] = useState([])
    
    const fetchUrls = async ()=>{
        const {data} = await Axios.get('http://localhost:5000/url');
        setUrls(data);
     }

       
     useEffect(() => {
        fetchUrls();        
   }, [])

    const renderTableData=()=> {
        return urls.map((url) => {
           const { _id, full, short } = url //destructuring
           return (
              <tr className="row w-100" key={_id}>
                  
                 <td className="col-8 text-truncate">{full}</td>
                 <td className="col-2">{short}</td>
                 <td className="col-1 text-truncate"><Link  to={`/${short}/stats`} >stats</Link></td>
                 <td className="col-1 text-truncate"><Link  to={`/${short}`} >vist</Link></td>
              
              </tr>
           )
        })
     }
    return (
      <div className="mt-4">
      <table className="table row w-100">
          <thead className="thead-dark row w-100">
              <tr className="row w-100">
                  <th className="col-8">full url</th>
                  <th className="col-2">short url</th>
                  <th className="col-1"></th>
                  <th className="col-1"></th>
              </tr>
          </thead>
              <tbody className="thead-dark row w-100">
                 {renderTableData()}
           </tbody>
      </table>
  </div>


    );
  }
  
export default Table;