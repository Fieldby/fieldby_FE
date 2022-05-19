import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Campaign = () => {
    const userId = sessionStorage.getItem('uid');
    const [userData, setUserData] = useState('');
    
    useEffect (() => {
        const dbRef = ref(getDatabase());
        const getUserData = () => {
            get(child(dbRef, `brands/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setUserData(snapshot.val());
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        return getUserData;   
    }, [userId]);

    return (
        <CampaignContainerCSS>

            <div className="campaign-sidebar">
                <div className="campaign-logo">
                    <img src="images/필드바이 로고-47 1.png" alt=""/>
                    <h2 className="campaign-logo-name">Business Suite</h2>
                </div>

                <div className="campaign-sidemenu">
                    <div className="campaign-sidemenu-company-box">
                        <span className="campaign-sidemenu-company-name">{userData.companyName}</span>
                    </div>
                    <div className="campaign-sidemenu-progress-box">
                        <span className="campaign-sidemenu-progress">진행현황</span>
                    </div>
                    <div className="campaign-sidemenu-report-box">
                        <span className="campaign-sidemenu-report">캠페인 보고서</span>
                    </div>
                </div>
                
                <div className="campaign-customer-center">
                    <div className="campaign-customer-ask">
                        <span className="customer-ask">고객센터</span>
                    </div>
                </div>

            </div>

            <div id="campaign-cm" className="campaign-square-hc campaign-square-vc">
                <div className="campaign-main">
                    <span>캠페인 내역이 없습니다.</span>
                </div>
            </div>
        </CampaignContainerCSS>
    )
}

const CampaignContainerCSS = styled.div`
    .campaign-sidebar {
        position : abosolute;
        z-index : 9999;
        background : #ffffff;
        height : 100vh;
        width : 240px;
        display : flex;
        flex-direction : column;
        align-items : center;

        .campaign-logo {
            padding-top : 20px;
            img {
                height : 43px;
                width : 133px;
            }
            .campaign-logo-name {
                margin-left : 14px;
                margin-block-start : -10px;
                margin-block-end : 0;
                font-size : 18px;
                color : #303030;
                
            }
        }

        .campaign-sidemenu {
            margin-top : 45px;
            width : calc(100% - 30px);

            .campaign-sidemenu-company-box {
                border : 1px solid #22Baa8;
                border-radius : 5px;
                height : 43px;
                display : flex;
                justify-content : center;
                align-items : center;
                .campaign-sidemenu-company-name {
                    font-weight : 700;
                    color : #303030;
                }
            }

            .campaign-sidemenu-progress-box {
                margin-top : 12px;
                width : calc(120%);
                height : 50px;
                display : flex;
                justify-content : center;
                align-items : center;
                background: #303030;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
                border-radius: 5px;
                .campaign-sidemenu-progress {
                    font-weight : 700;
                    color : #ffffff;
                    
                }
            }

            .campaign-sidemenu-report-box {
                margin-top : 12px;
                height : 36px;
                display : flex;
                justify-content : center; 
                align-items : center; 
                .campaign-sidemenu-report {
                    font-weight : 700;
                    color : #303030;
                }
            }
        }

        .campaign-customer-center {
            margin-top : auto;
            margin-bottom : 40px;
        }
    }

    #campaign-cm {
        position : absolute;
        min-width : 900px;
        min-height : 700px;
    }
    
    .campaign-square-hc {
        width : 50%;
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
        display : flex;
        justify-content : center;
        
    }
`

export default Campaign;