import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";

const CampaignDetail = () => {
    
    return (
        <>
            <SideBar />
            <CampaignDetailCSS>
                <h2 className="campaign-detail-top-main">진행 현황</h2>
                <div id="campaign-detail-top" className="campaign-detail-top-square-hc campaign-detail-top-square-vc">
                    
                </div>    
                <div id="campaign-detail-cm" className="campaign-detail-square-hc campaign-detail-square-vc">
                    
                </div>
            </CampaignDetailCSS>
            
            
        </>
    )
}

const CampaignDetailCSS = styled.div`
    .campaign-detail-top-main {
        position : absolute;
        left : 0;
        right : 0;
        top : 20px;
        bottom : 0;
        margin-bottom : auto;
        margin-top : auto;
        margin-right : auto;
        margin-left : 20%;
    }
    #campaign-detail-top {
        position : absolute;
        min-width : 1000px;
        min-height : auto;
    }

    .campaign-detail-top-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }

    .campaign-detail-top-square-vc {
        height : 15%;
        top : 80px;        
        margin-top : auto;
        margin-bottom : auto;
    }

    #campaign-detail-cm {
        position : absolute;
        min-width : 1000px;
        min-height : auto;
    }

    .campaign-detail-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }
    
    .campaign-detail-square-vc {
        height : 70%;
        bottom : 40px;
        margin-top : auto;
        margin-bottom : auto;
    }
`

export default CampaignDetail;