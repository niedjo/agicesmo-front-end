import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import agicesmo_Logo from '../../assets/test2/logoDall-E4.jpg'
import Constant from "../../Constant";

export default function PrintScreeningMedicale(props) {
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
                        <div className="desc desc3">{Constant.service[5]}</div>
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
                    RESULTAT SCREENING MEDICALE
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
                <div className="">
                    <div className="">
                        <center>
                            <table style={{zIndex : 0}}>
                                <tr>
                                    <td><b>Resultat examen biologique : </b></td>
                                    <td>{objet[1].resultat_examene_biologique}</td>
                                    <td><b>Antecedants personel : </b></td>
                                    <td>{objet[1].antecedants_personel}</td>
                                    <td><b>Problemes de santee actuels : </b></td>
                                    <td>{objet[1].problemes_de_santes_actuels}</td>
                                </tr>
                                <tr>
                                    <td><b>Tousse depuis plus de deux semaines : </b></td>
                                    <td>{objet[1].tousse_depuis_plus_de_deux_semaines}</td>
                                    <td><b>Transpiration nocturne : </b></td>
                                    <td>{objet[1].transpiration_nocturne}</td>
                                    <td><b>Fievre persistante : </b></td>
                                    <td>{objet[1].fievre_persistante}</td>
                                </tr>
                                <tr>
                                    <td><b>Fatigue ou perte d'apetit : </b></td>
                                    <td>{objet[1].fatigue_ou_perte_dapetit}</td>
                                    <td><b>Amaigrissement : </b></td>
                                    <td>{objet[1].amaigrissement}</td>
                                    <td><b>Contact avec un tuberculeux : </b></td>
                                    <td>{objet[1].contact_avec_un_tuberculeux}</td>
                                </tr>
                                <tr>
                                    <td><b>Oederme de membre inferieur : </b></td>
                                    <td>{objet[1].oederme_de_membre_inferieur}</td>
                                    <td><b>Est actuelement sous traitement de : </b></td>
                                    <td>{objet[1].est_actuelement_sous_traitement_de}</td>
                                    <td><b>Date de derniere regle : </b></td>
                                    <td>{objet[1].date_de_derniere_regle}</td>
                                </tr>
                                <tr>
                                    <td><b>Gravida para : </b></td>
                                    <td>{objet[1].gravida_para}</td>
                                    <td><b>Autre histoire medicale : </b></td>
                                    <td>{objet[1].autre_histoire_medicale}</td>
                                    <td><b>Element dalergie : </b></td>
                                    <td>{objet[1].element_dalergie}</td>
                                </tr>
                                <tr>
                                    <td><b>Profil toxicologique : </b></td>
                                    <td>{objet[1].profil_toxicologique}</td>
                                    <td><b>Tension arteriele : </b></td>
                                    <td>{objet[1].tension_arteriele}</td>
                                    <td><b>Poids : </b></td>
                                    <td>{objet[1].poids}</td>
                                </tr>
                                <tr>
                                    <td><b>Taille : </b></td>
                                    <td>{objet[1].taille}</td>
                                    <td><b>Indice de masse corporelle : </b></td>
                                    <td>{objet[1].indice_de_masse_corporelle}</td>
                                    <td><b>Nombre d'enfant accompagnant : </b></td>
                                    <td>{objet[1].nombre_denfant_accompagnant}</td>
                                </tr>
                                <tr>
                                    <td><b>Bilan lesionnel : </b></td>
                                    <td>{objet[1].bilan_lesionnel}</td>
                                    <td><b>Examen d'entree anormale : </b></td>
                                    <td>{objet[1].examen_dentree_anormale}</td>
                                    <td><b>Blessure : </b></td>
                                    <td>{objet[1].blessure}</td>
                                </tr>
                                <tr>
                                    <td><b>Abus de substance : </b></td>
                                    <td>{objet[1].abus_de_substance}</td>
                                    <td><b>Gale : </b></td>
                                    <td>{objet[1].gale}</td>
                                    <td><b>Diarhee : </b></td>
                                    <td>{objet[1].diarhee}</td>
                                </tr>
                                <tr>
                                    <td><b>Probleme dentaire : </b></td>
                                    <td>{objet[1].probleme_dentaire}</td>
                                    <td><b>Symptomes de tuberculoses : </b></td>
                                    <td>{objet[1].symptomes_de_tuberculoses}</td>
                                    <td><b>IST : </b></td>
                                    <td>{objet[1].IST}</td>
                                </tr>
                                <tr>
                                    <td><b>Statut nutritionnel anormale : </b></td>
                                    <td>{objet[1].statut_nutritionnel_anormale}</td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan={3} align="center">
                                        <b>Autre observations : </b>  
                                    </td>
                                    <td colSpan={3} align="center">
                                        {objet[1].autre_observations}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} align="center">
                                        <b>Descisions ou actions : </b>  
                                    </td>
                                    <td colSpan={3} align="center">
                                        {objet[1].descision_ou_action}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} align="center">
                                        <b>Nom de l'operateur :</b>  
                                    </td>
                                    <td colSpan={3} align="center">
                                        {objet[1].nom_et_prenom}
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </div>
                    {/* <div style={{height : "25vh"}}></div> */}
                    {/* <FooterImpress /> */}
                    <div>{dateLocale}</div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};



// PrintScreeningMedicale