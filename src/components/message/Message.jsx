import "./message.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { getMessageThunk } from "../../api/contact.api";

const Message = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages } = useSelector((state) => state.contactState);
  console.log("its me", messages)
  useEffect(() => {
    dispatch(getMessageThunk())
    console.log("its me", messages)

  }, [dispatch]);



  return (
    <div className="">
    
       <table className="table ">
            <caption> Messages</caption>
            <thead>
              <tr>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              
              </tr>
            </thead>
            <tbody>
           { messages.map((message) => {
          return (
              <tr>
                <td>{message.pseudo}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
              
                <td>{message.date_create}</td>
             
               
              </tr>
                 );
            })
             
           }
            </tbody>
          </table>
   
     
    </div>
  );
};

export default Message;
