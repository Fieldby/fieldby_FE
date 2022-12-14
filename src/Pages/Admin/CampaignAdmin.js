import { push, ref, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { realtimeDbService, storageService } from "../../fBase";

const CampaignAdmin = () => {
    const [uid, setUid] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [brandInstagram, setBrandInstagram] = useState('');
    const [brandName, setBrandName] = useState('');
    const [recruitingDate, setRecruitingDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [downloadImageUrl, setDownLoadImageUrl] = useState('');
    const [percent, setPercent] = useState(0);
    const [guidePercent, setGuidePercent] = useState(0);
    const [guideDescription, setGuideDescription] = useState('');
    const [guideImageUrl, setGuideImageUrl] = useState('');
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [ftc, setFtc] = useState('');
    const [option, setOption] = useState('');
    const [required, setRequired] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDate, setItemDate] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [leastFeed, setLeastFeed] = useState(0);
    const [maintain, setMaintain] = useState(0);
    const [selectionDate, setSelectionDate] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [campaignPrice, setCampaignPrice] = useState(0); 
    

    function handleChange(event) {
        setMainImageUrl(event.target.files[0]);
    }

    const handleMainImageUpload = () => {
        if (!mainImageUrl) {
            console.log(mainImageUrl);
        }
        // sRef = firebase/storage , ref = firebase/database
        const storageRef = sRef(storageService, `/campaignImages/${campaignTitle}/${mainImageUrl.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mainImageUrl);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownLoadImageUrl(url);
                    console.log(url);
                });
            }
        );
    };

    const handleGuideChange = (event) => {
        const imageLists = event.target.files[0];
        setGuideImageUrl(imageLists);
    };

    const handleGuideImageUpload = () => {
        if (!guideImageUrl) {
            console.log(guideImageUrl);
        }
        const storageMultiRef = sRef(storageService, `campaignImages/${campaignTitle}/guideImages/${guideImageUrl.name}`)
        const uploadTaskMulti = uploadBytesResumable(storageMultiRef, guideImageUrl);

        uploadTaskMulti.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setGuidePercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTaskMulti.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    }
    
    const registerCampaign = () => {
        try {            
            const campaignUid = push(ref(realtimeDbService, `campaigns/`), {
                campaignTitle : campaignTitle,
                brandInstagram : brandInstagram,
                brandName : brandName,
                recruitingDate : recruitingDate,
                dueDate : dueDate.replace(/T/gi, '-').replace(/\:/, '-') ,
                recruitingNumber : recruitingNumber,
                brandUuid : uid,
                guides : [{
                    description : guideDescription,
                    imageUrl : guideImageUrl.name
                }],
            
                hashTags : {
                    ftc : ftc,
                    option : option,
                    required : required
                },
                isNew : true,
                item : {
                    description : itemDescription,
                    name : itemName,
                    price : itemPrice,
                    url : itemUrl
                },
                itemDate : itemDate,
                leastFeed : leastFeed,
                mainImageUrl : mainImageUrl.name,
                maintain : maintain,
                selectionDate : selectionDate,
                uploadDate : uploadDate,
                campaignPrice : campaignPrice
            });

            const campaignKey = campaignUid.key;

            update(ref(realtimeDbService, `brands/${uid}/campaigns/${campaignKey}`), {                   
                mainImageUrl : downloadImageUrl,
                campaignTitle : campaignTitle,
                recruitingDate : recruitingDate,
                dueDate : dueDate.replace(/T/gi, '-').replace(/\:/, '-'),
                recruitingNumber : recruitingNumber,
                selectionDate : selectionDate,
                uploadDate : uploadDate,
                itemDate : itemDate,
                itemPrice : itemPrice,
                campaignPrice : campaignPrice                                              
        });

            alert('????????? ????????? ?????????????????????.');
        } catch (error) {
            console.log(error.message);
        }
    }

    const updataCampaign = () => {
        try {
            update(ref(realtimeDbService, ))
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <CampaignAdminContainerCSS>
            <h1>Fieldby Business Suite Admin</h1>
            <input type="text" placeholder="?????? uid" onChange={(e) => {
                setUid(e.target.value);
            }} />
            <input type="text" placeholder="????????? ??????" onChange={(e) => {
                setCampaignTitle(e.target.value);
            }} />
            <input type="text" placeholder="????????? ?????????" onChange={(e) => {
                setBrandInstagram(e.target.value);
            }} />
            <input type="text" placeholder="????????? ??????" onChange={(e) => {
                setBrandName(e.target.value);
            }} />

            <span>????????? ?????? ??????</span>
            <input type="date" placeholder="????????? ?????? ??????" onChange={(e) => {
                setRecruitingDate(e.target.value);
            }} />

            <span>????????? ?????? ??????</span>
            <input type="datetime-local" placeholder="????????? ?????? ??????" onChange={(e) => {
                setDueDate(e.target.value);
            }} />
            <span>????????? ??????</span>
            <input type="text" placeholder="????????? ??????" onChange={(e) => {
                setCampaignPrice(e.target.value);
            }} />
            <input type="text" placeholder="????????????" onChange={(e) => {
                setRecruitingNumber(e.target.value);
            }}/>

            <input type="text" placeholder="???????????? ftc" onChange={(e) => {
                setFtc(e.target.value);
            }} />
            <input type="text" placeholder="???????????? option" onChange={(e) => {
                setOption(e.target.value);
            }} />
            <input type="text" placeholder="???????????? required" onChange={(e) => {
                setRequired(e.target.value);
            }} />
            <input type="text" placeholder="????????? ??????" onChange={(e) => {
                setItemDescription(e.target.value);
            }} />
            <input type="text" placeholder= "????????? ??????" onChange={(e) => {
                setItemName(e.target.value);
            }} />
            <input type="text" placeholder="????????? ??????" onChange={(e) => {
                setItemPrice(e.target.value);
            }} />
            <input type="text" placeholder="????????? Url" onChange={(e) => {
                setItemUrl(e.target.value);
            }}/>
            <span>????????? ??????</span>
            <input type="date" placeholder="?????? ??????" onChange={(e) => {
                setItemDate(e.target.value);
            }} />
            <input type="text" placeholder="?????? ??????" onChange={(e) => {
                setLeastFeed(e.target.value);
            }} />
            <input type="text" placeholder="??????" onChange={(e) => {
                setMaintain(e.target.value);
            }} />

            <span>?????? ??????</span>
            <input type="date" placeholder="?????? ??????" onChange={(e) => {
                setSelectionDate(e.target.value);
            }} />

            <span>????????? ??????</span>
            <input type="date" placeholder="????????? ??????" onChange={(e) => {
                setUploadDate(e.target.value);
            }} />

            <div className="main-image-input">
                <h3>?????? ?????????</h3>
                <input type="file" onChange={handleChange} accept="/image/*" />
                <button onClick={handleMainImageUpload}>?????? ????????? ?????????</button>
                <p>{percent}%</p>
            </div>

            
            <div className="guide-image-input">
                    <h3>????????? ?????????</h3>
                    <input type="file" accept="/image/*" onChange={handleGuideChange} />
                    <input type="text" placeholder="?????? ??????" onChange={(e) => {
                        setGuideDescription(e.target.value);
                    }}/>
                <button onClick={handleGuideImageUpload}>????????? ????????? ?????????</button>
                <p>{guidePercent}%</p>
            </div>
            
        
            <button onClick={registerCampaign}>????????? ????????????</button>
        </CampaignAdminContainerCSS>
    )
}

const CampaignAdminContainerCSS = styled.div`
    display : grid;
    align-items : center;
    justify-content : center;
    input {
        width : calc(100%);
        
    }
    button {
        margin-top : 20px;
        width : calc(100%);
    }

    .main-image-input {
        margin-top : 60px;
    }

    .guide-image-preview-container {
        display : flex;
        img {
            height : 250px;
            width : 250px;
        }
        
    }
`

export default CampaignAdmin;