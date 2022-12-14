import axios from "axios";
import { ref, update } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShipChangeConfirmModal from "../../Components/Modal/ShipChangeConfirmModal";
import ShipChangeModal from "../../Components/Modal/ShipChangeModal";
import ShipConfirm from "../../Components/Modal/ShipComfirm";
import ShipComplete from "../../Components/Modal/ShipComplete";
import { realtimeDbService } from "../../fBase";
const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,roadaddress, detailaddress, shipment_name, shipment_number, fcmToken ,uid, campaignTitle, currentUser, campaignId, campaignShipComplete, itemPrice }) => {
    const [shipName, setShipName] = useState('');
    const [shipNumber, setShipNumber] = useState('');
    const [shipChangeName, setShipChangeName] = useState('');
    const [shipChangeNumber, setShipChangeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);    
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [modalChangeOpen, setModalChangeOpen] = useState(false);
    const [modalChangeConfirmOpen, setModalChangeConfirmOpen] = useState(false);    
    const navigate = useNavigate();

    const shipInfoHandler = () => {
        update(ref(realtimeDbService, `users/${uid}/campaigns/${campaignId}`), {
            shipment_name : shipName,
            shipment_number : shipNumber,
        })

        // update(ref(realtimeDbService, `users/${uid}/`), {
        //     reward : itemPrice
        // })

        update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${campaignId}`), {
            shipComplete : true
        })

        axios.post("https://fcm.googleapis.com/fcm/send", {
            "to" : fcmToken,
            "data" : {"type" : "item"},
            "notification" : {"title" : `ππ»'${campaignTitle}' μνμ΄ λ°μ‘ μλ£! `, "body" : `'${campaignTitle}' μνμ΄ λ°μ‘λμμ΅λλ€! μ΄μ‘μ₯ λ²νΈλ₯Ό νμΈν΄ μ£ΌμΈμ :)`}
        }, {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": "key=AAAAd3VbcvA:APA91bEE-_bu4E6TERxIVo0_66CjRQbfjIDB7FwiQJakRRv5rWVMK95R58UFCDUAS1l79mXKJQ_SQVwxjDgdST49rB43QJG-zD0Mmv6Zn2r4xJRAlNf5R-ZpJvmel3VWUSVAJK9bxOJO"
            }
        })
        setModalOpen(false);
        setConfirmModalOpen(true);        
    }

    const shipInfoChangeHandler = () => {
        update(ref(realtimeDbService, `users/${uid}/campaigns/${campaignId}`), {
            shipment_name : shipChangeName,
            shipment_number : shipChangeNumber, 
        })

        axios.post("https://fcm.googleapis.com/fcm/send", {
            "to" : fcmToken,
            "data" : {"type" : "item"},
            "notification" : {"title" : `ππ»'${campaignTitle}' μνμ΄ λ°μ‘ μλ£! `, "body" : `'${campaignTitle}' μνμ΄ λ°μ‘λμμ΅λλ€! μ΄μ‘μ₯ λ²νΈλ₯Ό νμΈν΄ μ£ΌμΈμ :)`}
        }, {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": "key=AAAAd3VbcvA:APA91bEE-_bu4E6TERxIVo0_66CjRQbfjIDB7FwiQJakRRv5rWVMK95R58UFCDUAS1l79mXKJQ_SQVwxjDgdST49rB43QJG-zD0Mmv6Zn2r4xJRAlNf5R-ZpJvmel3VWUSVAJK9bxOJO"
            }
        })
        setModalChangeOpen(false);
        setModalChangeConfirmOpen(true);
    }


    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
        window.location.reload();
    }

    const openChangeModal = () => {
        setModalChangeOpen(true);
    }
    
    const closeChangeModal = () => {
        setModalChangeOpen(false);
    }

    const closeChangeConfirmModal = () => {
        setModalChangeConfirmOpen(false);
        window.location.reload();
    }

    return (
        <>
        {shipment_name && shipment_number ? (
            <tr className="campaign-progress-table">
                <td className="selected-data-number">                    
                    <span>{id}</span>                    
                </td>
                <td className="selected-data-name">    
                    <div className="selected-data-profile">                
                        <img className="selected-user-profile" src={profile} alt="profile" />
                        <span className="selected-username">{name}</span>
                    </div>                    
                </td>
                <td className="selected-data-phone">                    
                    <span>{phoneNumber.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")}</span>                    
                </td>
                <td className="selected-data-address">                    
                    <div className="address-wrapper">
                        <div className="address-flex-box">
                            <div><span>μ°νΈλ²νΈ</span> <span>{zipno}</span></div>
                            <span>{roadaddress}</span>
                            <span>{detailaddress}</span>
                        </div>                        
                        
                    </div>                    
                </td>
                <td className="selected-data-post">
                    <span>{shipment_name}</span>                                                                                                   
                    <span>{shipment_number}</span>                                            
                </td>
                <td className="selected-data-btn">
                    <button className="ship-btn" onClick={openChangeModal}>μ‘μ₯ μμ νκΈ°</button>
                </td>
                <ShipChangeModal open={modalChangeOpen} close={closeChangeModal} confirm={shipInfoChangeHandler}>
                    <span className="main-info">νμ¬ νλ°°μ¬ : {shipment_name} μ‘μ₯λ²νΈ : {shipment_number}</span>
                    <select name="shipment_name" className="shipment-names" onChange={(e) => {
                        setShipChangeName(e.target.value);
                    }}>
                        <option value="">νλ°°μ¬ μ ν</option>
                        <option value="CJλνν΅μ΄">CJλνν΅μ΄</option>
                        <option value="μ°μ²΄κ΅­">μ°μ²΄κ΅­</option>
                        <option value="νμ§νλ°°">νμ§νλ°°</option>
                        <option value="λ‘μ  νλ°°">λ‘μ  νλ°°</option>
                        <option value="λ‘―λ°νλ°°">λ‘―λ°νλ°°</option>
                        <option value="κ²½λνλ°°">κ²½λνλ°°</option>
                        <option value="μΌμνλ°°">μΌμνλ°°</option>
                    </select>
                    <input type='text' placeholder="μ΄μ‘μ₯λ²νΈ" className="table-input" onChange={(e) => {
                        setShipChangeNumber(e.target.value);
                    }}/>
                </ShipChangeModal>
                <ShipChangeConfirmModal open={modalChangeConfirmOpen} result={closeChangeConfirmModal}>
                    <span className="complete-main-info">{name}λμ λ°°μ‘μ λ³΄κ° μμ λμμ΅λλ€!</span>
                </ShipChangeConfirmModal>                
            </tr>
        ) : (
            <tr className="campaign-progress-table">
                <td className="selected-data-number">                    
                    <span>{id}</span>                    
                </td>
                <td className="selected-data-name">    
                    <div className="selected-data-profile">                
                        <img className="selected-user-profile" src={profile} alt="profile" />
                        <span className="selected-username">{name}</span>
                    </div>                    
                </td>
                <td className="selected-data-phone">                    
                    <span>{phoneNumber.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")}</span>                    
                </td>
                <td className="selected-data-address">                    
                    <div className="address-wrapper">
                        <div className="address-flex-box">
                            <div><span>μ°νΈλ²νΈ</span> <span>{zipno}</span></div>
                            <span>{roadaddress}</span>
                            <span>{detailaddress}</span>
                        </div>                        
                        
                            <select name="shipment_name" className="shipment-names" onChange={(e) => {
                                setShipName(e.target.value);
                            }}>
                                <option value="">νλ°°μ¬ μ ν</option>
                                <option value="CJλνν΅μ΄">CJλνν΅μ΄</option>
                                <option value="μ°μ²΄κ΅­">μ°μ²΄κ΅­</option>
                                <option value="νμ§νλ°°">νμ§νλ°°</option>
                                <option value="λ‘μ  νλ°°">λ‘μ  νλ°°</option>
                                <option value="λ‘―λ°νλ°°">λ‘―λ°νλ°°</option>
                                <option value="κ²½λνλ°°">κ²½λνλ°°</option>
                                <option value="μΌμνλ°°">μΌμνλ°°</option>
                            </select>
                                                                            
                    </div>                    
                </td>
                <td className="selected-data-post">                                                                            
                    <input type='text' placeholder="μ΄μ‘μ₯λ²νΈ" className="table-input" onChange={(e) => {
                        setShipNumber(e.target.value);
                    }}/>                
                </td>
                <td className="selected-data-btn">
                    <button className="ship-btn" onClick={openModal}>μ‘μ₯ μ μ©νκΈ°</button>
                </td>
                <ShipConfirm open={modalOpen} close={closeModal} confirm={shipInfoHandler}>
                    <span className="main-info">νλ°°μ¬ : {shipName} μ‘μ₯λ²νΈ : {shipNumber}</span>
                    <span className="main-ask">ν¬λ¦¬μμ΄ν°μκ² λ°°μ‘μ λ³΄ μ λ¬ ν μμ μ΄ λΆκ°λ₯ν©λλ€.</span>
                    <span className="main-ask">λ°°μ‘μ λ³΄λ₯Ό μ λ¬νμκ² μ΅λκΉ?</span>
                </ShipConfirm>
                <ShipComplete open={confirmModalOpen} result={closeConfirmModal}>
                    <span className="complete-main-info">{name}λμκ² λ°°μ‘μ λ³΄κ° μ λ¬λμμ΅λλ€!</span>
                </ShipComplete>                
            </tr>
        )}        
    </>        
    )
}

export default CampaignResultDetail;