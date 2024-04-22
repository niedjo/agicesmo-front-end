import React from "react";
import './style.css'
import agicesmo_Logo from '../assets/test2/logoDall-E4.jpg'
import Constant from "../Constant";

export default function HeaderImpress() {
    return (
        <div>
            <div className="header">
                <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                    <div className="logo-name">{Constant.nom_centre}</div>
                    <img src={agicesmo_Logo} alt="logo du centre" width={100} height={100} style={{borderRadius : "50%"}} />
                    {/* <span className="spn"></span> */}
                </div>
                <div className="desc-center">
                    <div className="desc desc1">{Constant.situation_du_district}</div>
                    <div className="desc desc2">{Constant.nom_complet_centre}</div>
                    <div className="desc desc3">{Constant.service[0]}</div>
                </div>
            </div>
            <div className="header2">
                <div className="desc1-header2">
                    <div style={{fontWeight : 600}}>{Constant.ouverture}</div>
                    <div>{Constant.localisation}</div>
                    <div>Contact Telephonique : {Constant.contact_telephonique}</div> 
                </div>
                <div className="desc2-header2">
                    <div>Nos prestations : </div>
                    <div>{Constant.prestations}</div>
                </div>
            </div>
            <div className="header3">
                RESULTAT IMAGERIE
            </div>
        </div>
    )
};
