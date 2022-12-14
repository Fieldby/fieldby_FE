import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";
import SideBar from "../../Components/SideBar/SideBar";
import { useAuth } from "../../Context/authProvider";
import CampaignList from "./CampaignList";

const Campaign = () => {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect (() => {        
        const dbRef = ref(getDatabase());
        const getUserData = async() => {
            const json = await get(child(dbRef, `brands/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);
                    setLoading(false);
                    setUserData(dataObj);
                } else {
                    console.log("No data");
                }
            }).catch ((error) => {
                console.log(error);
            })
        }
        getUserData();
    }, []);

    const [brandCampaignDatas, setBrandCampaignDatas] = useState([]);
    useEffect(() => {
        const dbBrandRef = ref(getDatabase());
        const getBrandCampaignData = async () => {
            const json = await get(child(dbBrandRef, `brands/${userId}/campaigns/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    console.log(data_obj);
                    const data_ent = Object.entries(data_obj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign({}, d[1], {id:d[0]}));
                    console.log(data_ent_arr);
                    setBrandCampaignDatas(data_ent_arr);
                } else {
                    console.log("No data");
                }
            }).catch((error) => {
                console.log(error);
            })          
        }
        getBrandCampaignData();
    }, []);

    return (
        <CampaignContainerCSS>
            <SideBar />
            {loading ? (
                <div className="spinner-cm">
                    <Spinner />
                </div>                
            ) : (
                <div id="campaign-cm" className="campaign-square-hc campaign-square-vc">                
                    <div className="campaign-all">??????</div>
                    {userData.campaigns 
                        ?
                            <table className="campaign-main">
                                <tbody>                                    
                                    <tr className="campaign-progress-table">
                                        <td className="campaign-progress-titles-isComplete">
                                            <span>????????????</span>
                                        </td>
                                        <td className="campaign-progress-titles-name">
                                            <span>?????????</span>
                                        </td>
                                        <td className="campaign-progress-titles-date">
                                            <span>????????? ??????</span>
                                        </td>
                                        <td className="campaign-progress-titles-number">
                                            <span>????????????</span>
                                        </td>
                                    </tr>
                                                                                                 
                                    {brandCampaignDatas.map((brandCampaignData) =>
                                        <CampaignList 
                                            key={brandCampaignData.id}                                        
                                            id={brandCampaignData.id}
                                            mainImageUrl={brandCampaignData.mainImageUrl}
                                            campaignTitle = {brandCampaignData.campaignTitle}
                                            recruitingDate = {brandCampaignData?.recruitingDate}
                                            dueDate = {brandCampaignData?.dueDate}
                                            recruitingNumber = {brandCampaignData.recruitingNumber}                                                                                                                                                                                                                                                                               
                                        />
                                    )}                                                                               
                                </tbody>                                                                                                                                                                              
                            </table>    
                        :   
                            <div className="campaign-empty">
                                <img src="images/campaign-empty.png" alt="no-campaign"/> 
                                <span>????????? ????????? ????????????.</span>
                            </div>
                    }       
                </div>
            )}
            <div className="company-info-box">
                <span className="company-info">(???)???????????? | ???????????? : ????????? | ????????????????????? : 682-81-02584 | ??????????????????????????? ??? 2021-????????????-1588??? | ?????? : ??????????????? ????????? ??????3??? 61, 4??? 404???(?????????) | ?????? : fieldby@gmail.com | ?????? : 070-7954-6410 | ?????? : 0504-066-9938??? 2022 FIELDBY Corporation. All Rights Reserved. | ???????????????????????? | ????????????</span>
            </div>           
        </CampaignContainerCSS>
    )
}

const CampaignContainerCSS = styled.div`
    .spinner-cm {
        position : absolute;
        left : 50%;
        top : 50%;
        right : 50%;
        bottom : 50%;
        margin-top : auto;
        margin-bottom : auto;
        margin-right : auto;
        margin-left : auto;
    }
    #campaign-cm {
        position : absolute;
        min-width : 900px;
        min-height : 700px;
        .campaign-all {
            padding : 20px;                        
            text-align : left;
            font-weight : 700;            
        }
    }
    
    .campaign-square-hc {
        width : 60%;
        left : 0;
        right : 0;
        margin-left : 30%;
        margin-right : auto;
        background : #ffffff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;  
    }

    .campaign-square-vc {
        height : 70%;
        top : 0;
        bottom : 0;
        margin-top : auto;
        margin-bottom : auto;
    }

    .campaign-main {        
        margin-left : 20px;
        margin-top : 80px;
        border-collapse: collapse;
        border-spacing: 0;
        width : calc(100% - 40px);                            
        .campaign-progress-table {
            display : flex;                        
            background : #f1f1f1;                        
            align-items : center;
            height : 50px;            
            padding-left : 24px;
            .campaign-progress-titles-isComplete {
                width : 20%;
                text-align : flex-start;
                
                span {
                    
                    font-weight : 400;
                    font-size : 15px;
                }
            }
            .campaign-progress-titles-name {
                width : 40%;
                text-align : flex-start;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 15px;
                }
            }
            .campaign-progress-titles-date {
                width : 30%;
                text-align : center;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 15px;
                }
            }
            .campaign-progress-titles-number {
                width : 10%;
                text-align : center;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 15px;
                }
            }
                        
        }

        .campaign-list-progress-table {      
                  
            .campaign-list {
                padding-left : 24px;
                padding-top : 10px;
                padding-bottom : 10px;
                text-decoration : none;
                color : #000000;
                display : flex;
                align-items : center;
                .campaign-data-progress {
                    color : #22BAA8;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    width : 20%;
                    text-align : flex-start;
                    span {
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;                     
                    }
                }

                .campaign-data-profile {
                    width : 40%;
                    .campaign-data-wrapper {
                        display : flex;
                        justify-content : flex-start;
                        align-items : center;
                        .campaign-main-image-box {
                            overflow : hidden;
                            position : relative;
                            width : 75px;
                            height : 75px;
                            margin-right : 20px;
                            border-radius : 6px;
                            .campaign-main-image {
                                position : absolute;
                                width : 100%;
                                top : 50%;
                                left : 50%;
                                transform : translate(-50%, -50%);                                                
                            }
                        }                        
                    }
                    span {
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;
                        text-align : center;
                    }
                }

                .campaign-data-date {
                    width : 30%;
                    text-align : center;
                    span {
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;                        
                    }
                }

                .campaign-data-number {
                    width : 10%;
                    text-align : center;
                    span {
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;
                        letter-spacing : 1.8px;
                    }
                }
            }
        }
    }

    .campaign-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 300px;
        img {
            width : 47px;
            height : 47px;
        }

        span {
            margin-top : 8px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;            
        }
    }

    .campaign-data-container {
        list-style-type : none;
        padding-inline-start : 0;
    }

    .company-info-box {
        position : absolute;
        bottom : 10px;
        left : 30%;
        right : 10%;
        margin-bottom : auto;        
        .company-info {
            font-size : 12px;
            font-weight : 400;
            color : #8e8e8e;
        }
    }
`

export default Campaign;