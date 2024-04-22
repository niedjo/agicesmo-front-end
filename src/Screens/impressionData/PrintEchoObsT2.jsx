import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import HeaderImpress from "../../Components/HeaderImpress";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import REfPatientImpress from "../../Components/REfPatientImpress";

export default function PrintEchoObsT2(props) {
    const [Imprimable, setImprimable] = useState(false)
    const objet = props.objet

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
                <HeaderImpress />
                <REfPatientImpress ID = {objet[0]} objet = {objet[1]} />
                {/* <div style={{backgroundImage : "none", backgroundColor : "white"}}>
                    <AfficherObjet objet = {props.monObjet}/>
                </div> */}
            </center>
                <div className="body">
                    <div className="flex">
                        <div className="answer">BIOMETRIE : </div> 
                    </div>
                    <div className="flex super-end">
                        <div className="answer1">
                            <table>
                                <tr>
                                    <td>Nombre de foetus : </td>
                                    <td>{objet[1].nombre_dembryons}</td>
                                </tr>
                                <tr>
                                    <td>Mobilitee spontannee : </td>
                                    <td>{objet[1].mobilite_spontanee}</td>
                                </tr>
                                <tr>
                                    <td>Actvitee Cardiaque : </td>
                                    <td>{objet[1].activitee_cardiaque}</td>
                                </tr>
                                <tr>
                                    <td>Frequence Cardiaque en BMP : </td>
                                    <td>{objet[1].frequence_cardiaque_en_BMP}</td>
                                </tr>
                                <tr>
                                    <td>Diametre biparietale en mm : </td>
                                    <td>{objet[1].diametre_bipartiel}</td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td>Longueur Foemale (LF) en mm : </td>
                                    <td>{objet[1].longueur_femorale}</td>
                                </tr>
                                <tr>
                                    <td>Diametre Abdomino - transversale (DAT) en mm : </td>
                                    <td>{objet[1].diametre_abdomino_transversale}</td>
                                </tr>
                                <tr>
                                    <td>Perimetre abdominale en mm : </td>
                                    <td>{objet[1].perimetre_abdominale}</td>
                                </tr>
                                <tr>
                                    <td>Contour de la boite cranienne (PC) en mm : </td>
                                    <td>{objet[1].contour_de_la_boite_craniene}</td>
                                </tr>
                                <tr>
                                    <td>Estimation  du poids Foetale en gramme : </td>
                                    <td>{objet[1].estimation_poids_foetale}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="answer">ANNEXE </div> 
                    </div>
                    <div className="flex super-end">
                        <div>Aspect du trophoblaste ou placenta : </div> 
                        <div className="answer">{objet[1].aspect_du_trophoblaste_ou_placenta}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Activitee Cardiaque : </div> 
                        <div className="answer">{objet[1].activitee_cardiaque}</div>
                    </div>
                    <div className="flex">
                        <div>Placenta</div> 
                    </div>
                    <div className="flex super-end">
                        <div>Localisation du placenta : </div> 
                        <div className="answer">{objet[1].aspect_et_localisation_du_placenta}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Volume amniotique en mm <sup>3</sup> : </div> 
                        <div className="answer">{objet[1].volume_amniotique}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Presentation Foetal : </div> 
                        <div className="answer">{objet[1].presentation_foetale}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Age gestationnel en mois : </div> 
                        <div className="answer">{objet[1].age_gestationnel}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Date Probable d'accouchement : </div> 
                        <div className="answer">{objet[1].date_probable_daccouchement}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Sexe du foetus : </div> 
                        <div className="answer">{objet[1].sexe_du_foetus}</div>
                    </div>
                    <div className="flex">
                        <div className="answer">Autres trouvailles </div> 
                        <div className="answer" style={{width : 300}}>{objet[1].Autre_trouvailles}</div>
                    </div>
                    <div className="flex">
                        <div className="answer">Conclusion : </div>
                        <div className="answer" style={{width : 300}}>{objet[1].conclusion}</div>
                    </div>
                    <div className="flex">
                        <div className="answer">Autres elements de conclusion : </div>
                        <div className="answer" style={{width : 300}}>{objet[1].Autres_elements_de_conclusion}</div>
                    </div>
                    <div className="flex" style={{marginTop : 10}}>
                        <div className="answer">Nom de l'operateur : </div>
                        <div className="answer" style={{width : 300}}>{objet[1].nom_et_prenom}</div>
                    </div>
                    {/* <FooterImpress /> */}
                    <div>{dateLocale}</div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};
