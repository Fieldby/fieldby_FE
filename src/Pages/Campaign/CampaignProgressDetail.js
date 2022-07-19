import axios from "axios";
import { push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { realtimeDbService } from "../../fBase";

const CampaignProgressDetail = ({ uid, name, height, profile,simpleaddr, stroke, career, roundingFrequency, style1, style2, style3, igname, igfollower, igfollow, igmedia, bestImage1, bestImage2, bestImage3, token,checkedItemHandler, isSelected, isFollowed}) => {
    const [bChecked, setChecked] = useState(false);
    const [userBestImage1, setUserBestImage1] = useState('');
    const [userBestImage2, setUserBestImage2] = useState('');
    const [userBestImage3, setUserBestImage3] = useState('');
    const {currentUser} = useAuth();
    const [userIsFollowed, setIsUserFollowed] = useState(isFollowed);
    let {id} = useParams();
                                               
    useEffect(() => {
        const getUserBestImages = async() => {
            try {   
                    // for 문 사용 가능         
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage1}?fields=media_url&access_token=${token}`                        
                    );

                    const json2 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage2}?fields=media_url&access_token=${token}`
                    )

                    const json3 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage3}?fields=media_url&access_token=${token}`
                    )                    
                    setUserBestImage1(json1.data.media_url);
                    setUserBestImage2(json2.data.media_url);
                    setUserBestImage3(json3.data.media_url);                
            } catch (error) {
                console.log(error);
            }
        };
        getUserBestImages();
    }, [])
    

    const checkHandler = ({target}) => {
        setChecked(!bChecked);
        checkedItemHandler(uid, target.checked);
        console.log(bChecked);
    }

    const follwedUserHandler = () => {
        try {
            update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/followedUser`), {
                [uid] : uid
            });
            update(ref(realtimeDbService, `users/${uid}/campaigns/${id}/`), {
                isFollowed : true
        });
            setIsUserFollowed(true);
            console.log("follwing-success");
        } catch (error) {
            console.log(error);
        }              
    }

    const unfollowUserHandler = () => {
        try {
            remove(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/followedUser/${uid}`));
            update(ref(realtimeDbService, `users/${uid}/campaigns/${id}/`), {
                isFollowed : false
            });
            setIsUserFollowed(false);
            console.log("unfollow");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CampaignProgressDetailCSS>            
                <div className="campaign-register-user">
                    <div className="selected-box">
                        <input className="selected-checkbox" type='checkbox' checked={bChecked} onChange={(e) => checkHandler(e)}/>
                    </div>

                    <div className="campaign-user-container">
                        
                        <div className="campaign-user-instagram-wrapper">
                            <div className="campaign-register-user-infos">
                                {userIsFollowed === true ? (
                                    <div className="user-name-container">                                    
                                        <img className="unfollowing" src="/images/image 121.png" alt="follow" onClick={unfollowUserHandler} />                                                                        
                                        <span className="user-name">{name}</span>
                                        <img className="user-profile-img" src={profile} alt="profile" />
                                    </div>
                                ) : (
                                    <div className="user-name-container">                                    
                                        <img className="unfollowing" src="/images/image 112.png" alt="unfollow" onClick={follwedUserHandler}/>                                                                        
                                        <span className="user-name">{name}</span>
                                        <img className="user-profile-img" src={profile} alt="profile" />
                                    </div>
                                )}
                                
                                <div className="user-profile-container">
                                    
                                    <span>{height}cm</span>
                                    <span>{simpleaddr}</span>
                                </div>

                                <div className="user-golf-infos">
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">평균 타수 <span>{stroke}</span></div>
                                        <div className="user-golf-info">구력 <span>{career}차</span></div>
                                    </div>
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">월 라운딩 <span>{roundingFrequency}</span></div>    
                                        <div className="user-golf-info">스타일 <span> #{style1} #{style2} #{style3}</span></div>
                                    </div>
                                                                
                                </div>
                            </div>

                            <div className="user-instagram-infos-container">
                                <div className="user-instagram-logo-name">
                                    <a href={`https://www.instagram.com/${igname}`} className="instagram-link" target="_blank">
                                        <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                                        <span className="user-instagram-name">{igname}</span>
                                    </a>
                                    
                                </div>
                                <div className="user-instagram-profile">
                                    <div className="user-instagram-profile-info">팔로워 <span>{igfollower}</span></div>
                                    <div className="user-instagram-profile-info">팔로우 <span>{igfollow}</span></div>
                                    <div className="user-instagram-profile-info">게시물 <span>{igmedia}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="user-images-container">
                            <div className="user-image">
                                {userBestImage1
                                    ?
                                    <div>
                                        <img src={userBestImage1} alt="1" />                                                                                                            
                                        <img src={userBestImage2} alt="2" />
                                        <img src={userBestImage3} alt="3" />
                                    </div>                                    
                                    :
                                    <h3 className="empty-feed">등록된 피드가 없습니다.</h3>
                                }
                            </div>
                        </div>
                    </div>
                                        
            </div>            
        </CampaignProgressDetailCSS>
    )
}

const CampaignProgressDetailCSS = styled.div`
.campaign-register-user {
    display : flex;
    align-items : center;
    padding : 16px;
    margin-left : 16px;

    .selected-box {
        .selected-checkbox {
            border : 2px solid #747474;
            background-color : #22BAA8;
            padding : 12px;
        }
    }
    
    .campaign-user-container {
        display : flex;

        .campaign-user-instagram-wrapper {
            display : grid;
            min-width : 700px;
            .user-instagram-infos-container {
                display : flex;
                align-items : center;
                border-radius : 13px;
                background : #f1f1f1;
                margin-left : 112px;
                padding : 13px;
                justify-content : space-between;
                .user-instagram-logo-name {                    
                    display : flex;
                    align-items : center;
                    .instagram-link{
                        text-decoration : none;
                        display : flex;
                    }
                    .instagram-logo {
                        height : 15px;
                        width : 15px;
                    }
                    .user-instagram-name {
                        margin-left : 8px;
                        font-size : 12px;
                        color : #303030;
                        font-weight : 400;
                    }
                    
                }
                .user-instagram-profile {
                    display : flex;
                    .user-instagram-profile-info {
                        font-size : 11px;
                        color : #766F6F;
                        margin-left : 10px;
                        span {
                            color : #303030;
                            font-size : 11px;
                            margin-left : 6px;
                        }
                    }
                }
            }

            .campaign-register-user-infos {
                margin-left : 80px;
                margin-bottom : 8px;
                display : flex;
                .user-name-container {
                    display : flex;
                    align-items : center;
                    justify-content : space-evenly;
                    .unfollowing {
                        height : 21px;
                        width : 21px;
                    }
                    .user-name {
                        margin-left : 16px;
                        font-weight : 700;
                        font-size : 14px;
                        min-width : 100px;
                        text-align : center;
                    }
                    .user-profile-img {
                        margin-left : 16px;
                        border-radius : 50%;
                        width : 65px;
                        height : 65px;
                    }
                }

                .user-profile-container {
                    margin-left : 28px;
                    display : flex;
                    flex-direction : column;
                    justify-content : space-evenly;
                    
                    span {
                        color : #766F6F;
                        font-size : 12px;
                        font-weight : 400;
                    }
                }

                .user-golf-infos {
                    min-width : 285px;
                    margin-left : 28px;
                    display : grid;
                    padding : 12px;
                    border : 1px solid #f1f1f1;
                    border-radius : 13px;
                    .golf-info-wrapper {
                        display : flex;
                        justify-content : flex-start;
                        .user-golf-info {
                            padding : 8px;
                            color : #766F6F;
                            font-size : 11px;
                            font-weight : 400;
                            span {
                                color : #303030;
                                font-size : 12px;
                            }
                        }
                    }
                }
            }
        }

        .user-images-container {
            .user-image {
                overflow-x : auto;
                img {
                    margin-left : 16px;
                    height : 150px;
                }
            }
        }
    }
    
}
`

export default CampaignProgressDetail;