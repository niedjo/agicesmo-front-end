import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import agicesmo_Logo from '../../assets/test2/logoDall-E4.jpg'
import Constant from "../../Constant";

export default function PrintVaccination(props) {
    const [Imprimable, setImprimable] = useState(false)
    const objet = props.objet
    const ID = objet[0]
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top(); 


    const  AfficherObjet = ({objet}) => {
        let Row = []
        let key = 0
        for (let cle in objet) {
          if (objet.hasOwnProperty(cle)) {
            Row.push(
                <p key={key}>{cle} : {objet[cle]}</p>
            )
            key++
            // console.log(`L'attribut '${cle}' a pour valeur '${objet[cle]}'`);
          }
        }
        return Row
    }

    const date1 = new Date()
    let dateLocale = date1.toLocaleString('fr-FR',{
        weekday : 'long',
        year : 'numeric',
        month : "long",
        day : "numeric",
        hour : 'numeric',
        minute : 'numeric',
        second : 'numeric'
    })

    const printer = (e) => {
        e.preventDefault()
        setImprimable(!Imprimable)
        document.f1.style.display = "none"
        document.f2.style.display = "none"

        setTimeout(() => 
        {
            window.print()
            
            document.f1.style.display = ""
            document.f2.style.display = ""
            // setTimeout(() => {
            //     setImprimable(!Imprimable)
            //     console.log(Imprimable)
                
            // }, 1000);
        }, 500)


    }


      
    //   // Exemple d'utilisation
    //   const monObjet = {
    //     nom: 'John',
    //     age: 30,
    //     ville: 'Paris'
    //   };
      
    return (
        <div style={{background : "white", height : "200vh", fontSize : 10}}>
                {/* <GoBack handlclick={props.arriere}/> */}
            <center>
                <form name="f1" style={{background : "#71ACFA"}}>
                    <GoBack handlclick={props.arriere}/>
                    <button onClick={printer} className="btn btn-primary">Lancer l'impression</button>
                </form>
            </center>
            <center>
                {/* le headerimpress */}
                <div className="header">
                    <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                        <div className="logo-name">{Constant.nom_centre}</div>
                        <img src={agicesmo_Logo} alt="logo du centre" width={100} height={100} style={{borderRadius : "50%"}} />
                        {/* <span className="spn"></span> */}
                    </div>
                    <div className="desc-center">
                        <div className="desc desc1">{Constant.situation_du_district}</div>
                        <div className="desc desc2">{Constant.nom_complet_centre}</div>
                        <div className="desc desc3">{Constant.service[2]}</div>
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
                    RESULTAT CONSULTATION
                </div>

                {/* ce qui remplace le REFIdImpres */}
                <div style={{border : "1px solid #333", width : "90%", display : "flex", justifyContent : "space-between", margin : 20, padding : 10}}>
                    <table style={{height : "10px"}}>
                        <tr>
                            <td>Ref patient : </td>
                            <td>{ID.code_patient}</td>
                        </tr>
                        <tr>
                            <td>Date Consultation : </td>
                            <td>{new Date(objet[1].date_exam).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Nom et prenom : </td>
                            <td>{ID.nom_et_prenom}</td>
                        </tr>
                    </table>
                    <table style={{height : "30px"}}>
                        <tr>
                            <td>Age : </td>
                            <td>{ID.sexe}</td>
                        </tr>
                        <tr>
                            <td>Sexe : </td>
                            <td>{ID.sexe}</td>
                        </tr>
                    </table>
                </div>
                {/* <div style={{backgroundImage : "none", backgroundColor : "white"}}>
                    <AfficherObjet objet = {props.monObjet}/>
                </div> */}
            </center>
                <div className="body">
                    <div className="flex">
                        <table style={{zIndex : 0}}>
                            <tr>
                                <td><b>Nature du Vaccin :</b> </td>
                                <td>{objet[1].nature_du_vaccin}</td>
                            </tr>
                            <tr>
                                <td><b>Observation : </b></td>
                                <td>{objet[1].observation}</td>
                            </tr>
                            <tr>
                                <td><b>Nom du signataire : </b></td>
                                <td>{objet[1].nom_personnel}</td>
                            </tr>
                        </table>
                    </div>
                    <div style={{height : "25vh"}}></div>
                    {/* <FooterImpress /> */}
                    <div>{dateLocale}</div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};

// PrintVaccination