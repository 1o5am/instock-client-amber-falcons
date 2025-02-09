import "./WarehouseDetails.scss";4
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./WarehouseDetails.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

const WarehouseDetails = ({ id }) => {

  const [warehouse, setWarehouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
        console.log("Warehouse detail response:", response.data)
        setWarehouse(response.data);
      } catch (error) {
        console.error("Error fetching warehouse details:", error);
      }
    };

    if (id) {
      fetchWarehouseDetails();
    }
  }, [id]);

  if (!warehouse) {
    return <div>Not getting warehouse data</div>;
    
  }

//   return (
//     <section className="warehouse-details">
//       {/* <h2 className="warehouse-details__name">{warehouse.name}</h2>
//       <div className="warehouse-details-info">
//         <div className="warehouse-address">
//           <h3 className="warehouse-details__address">Warehouse Address:</h3>
//           <p className="warehouse-details__address-value">{warehouse.address}</p>
//         </div> */}
//       <div className="warehouse-details__header">
//         <button 
//           className="warehouse-details__back" 
//           onClick={() => navigate("/warehouses")}
//         >
//           Back to Warehouses
//         </button>
//         <h1 className="warehouse-details__title">{warehouse.warehouse_name}</h1>
//         <button 
//           className="warehouse-details__edit"
//           onClick={() => navigate(`/warehouses/${id}/edit`)}
//         >
//           Edit
//         </button>
//       </div>
      

//       <div className="warehouse-details__content">
//         <div className="warehouse-details__address">
//           <h2>WAREHOUSE ADDRESS:</h2>
//           <p>{warehouse.address}</p>
//           <p>{warehouse.city}, {warehouse.country}</p>
//         </div>
//       </div>

//       <div className="warehouse-details__content">
//         <div className="warehouse-details__address">
//           <h2>WAREHOUSE ADDRESS:</h2>
//           <p>{warehouse.address}</p>
//           <p>{warehouse.city}, {warehouse.country}</p>
//         </div>
//       </div>
//         {/* <div className="warehouse-contact">
//           <h3 className="warehouse-details__contact-name">Contact Name:</h3>
//           <p className="warehouse-details__contact-value">{warehouse.contactName}</p>
//           <h3 className="warehouse-details__contact-info">Contact Information:</h3>
//           <p className="warehouse-details__contact-phone">{warehouse.contactPhone}</p>
//           <p className="warehouse-details__contact-email">{warehouse.contactEmail}</p>
//         </div> */}

//         <div className="warehouse-details__contact">
//           <div className="warehouse-details__contact-name">
//             <h2>CONTACT NAME:</h2>
//             <p>{warehouse.contact_name}</p>
//             <p>{warehouse.contact_position}</p>
//           </div>

//           <div className="warehouse-details__contact-info">
//             <h2>CONTACT INFORMATION:</h2>
//             <p>{warehouse.contact_phone}</p>
//             <p>{warehouse.contact_email}</p>
//           </div>
//       </div>
//       <button className="warehouse-details__edit-button">
//         Edit
//       </button>
//     </section>
//   );
// };

  return (
    <section className="warehouse-details">
      <div className="warehouse-details__header">
        <div className="warehouse-details__title-container">
          <Link to="/warehouses" className="warehouse-details__back button">
            <img src={backArrow} alt="Back" />
          </Link>
          <h1 className="warehouse-details__title">{warehouse.warehouse_name}</h1>
        </div>
        <Link to={`/warehouses/${id}/edit`} className="warehouse-details__edit-button button">
          <img src={editIcon} alt="Edit" />
        </Link>
      </div>
      <div className="warehouse-details__content-container">
        <div className="warehouse-details__section">
          <div className="warehouse-details__address-details">
            <p className="warehouse-details__address-label label">WAREHOUSE ADDRESS:</p>
            <div className="warehouse-details__address-value">
              <p className="warehouse-details__text">{warehouse.address},</p>
              <span className="warehouse-details__text">{warehouse.city}, {warehouse.country}</span>
            </div>
          </div>
        </div>
        <div className="warehouse-details__section">
          <div className="warehouse-details__contact-details">
            <div className="warehouse-details__contact-name">
              <p className="warehouse-details__contact-label label">CONTACT NAME:</p>
              <p className="warehouse-details__text">{warehouse.contact_name}</p>
              <p className="warehouse-details__text">{warehouse.contact_position}</p>
            </div>

            <div className="warehouse-details__contact-info">
              <p className="warehouse-details__contact-label label">CONTACT INFORMATION:</p>
              <p className="warehouse-details__text">{warehouse.contact_phone}</p>
              <p className="warehouse-details__text">{warehouse.contact_email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseDetails;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./WarehouseDetails.scss";
// import editIcon from "../../assets/icons/edit-24px.svg";
// import backArrow from "../../assets/icons/arrow_back-24px.svg";

// const WarehouseDetails = ({ id }) => {
//   const [warehouse, setWarehouse] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWarehouseDetails = async () => {
//       try {
//         // First try to get all warehouses
//         const allWarehousesResponse = await axios.get(`http://localhost:8080/api/warehouses`);
//         console.log("All warehouses:", allWarehousesResponse.data);
        
//         // Then find the specific warehouse by id
//         const warehouseData = allWarehousesResponse.data.find(w => w.id === Number(id));
//         if (warehouseData) {
//           setWarehouse(warehouseData);
//         } else {
//           console.error("Warehouse not found");
//         }
//       } catch (error) {
//         console.error("Error fetching warehouse details:", error);
//       }
//     };

//     if (id) {
//       fetchWarehouseDetails();
//     }
//   }, [id]);

//   if (!warehouse) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section className="warehouse-details">
//       <div className="warehouse-details__header">
//         <div className="warehouse-details__title-container">
//           <Link to="/warehouses" className="warehouse-details__back">
//             <img src={backArrow} alt="Back" />
//             <span>Back to Warehouses</span>
//           </Link>
//           <h1 className="warehouse-details__title">{warehouse.warehouse_name}</h1>
//         </div>
//         <Link to={`/warehouses/${id}/edit`} className="warehouse-details__edit">
//           <img src={editIcon} alt="Edit" />
//           <span>Edit</span>
//         </Link>
//       </div>

//       <div className="warehouse-details__content">
//         <div className="warehouse-details__section">
//           <div className="warehouse-details__address">
//             <h2 className="warehouse-details__subtitle">WAREHOUSE ADDRESS:</h2>
//             <p className="warehouse-details__text">{warehouse.address}</p>
//             <p className="warehouse-details__text">{warehouse.city}, {warehouse.country}</p>
//           </div>
//         </div>

//         <div className="warehouse-details__section">
//           <div className="warehouse-details__contact">
//             <div className="warehouse-details__contact-name">
//               <h2 className="warehouse-details__subtitle">CONTACT NAME:</h2>
//               <p className="warehouse-details__text">{warehouse.contact_name}</p>
//               <p className="warehouse-details__text">{warehouse.contact_position}</p>
//             </div>

//             <div className="warehouse-details__contact-info">
//               <h2 className="warehouse-details__subtitle">CONTACT INFORMATION:</h2>
//               <p className="warehouse-details__text">{warehouse.contact_phone}</p>
//               <p className="warehouse-details__text">{warehouse.contact_email}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WarehouseDetails;