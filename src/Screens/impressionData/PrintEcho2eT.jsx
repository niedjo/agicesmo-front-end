import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import HeaderImpress from "../../Components/HeaderImpress";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";

export default function PrintEcho2eT(props) {
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
                <HeaderImpress />
                {/* ce qui remplace le REFIdImpres */}
                <div style={{border : "1px solid #333", width : "90%", display : "flex", justifyContent : "space-between", margin : 20, padding : 10}}>
                    <table style={{height : "10px"}}>
                        <tr>
                            <td>Ref patient : </td>
                            <td>{ID.code_patient}</td>
                        </tr>
                        <tr>
                            <td>Date de naissance : </td>
                            <td>{new Date(ID.date_nais).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Age : </td>
                            <td>{ID.age}</td>
                        </tr>
                    </table>
                    <table style={{height : "30px"}}>
                        <tr>
                            <td>Nom et prenom : </td>
                            <td>{ID.nom_et_prenom}</td>
                        </tr>
                        <tr>
                            <td>Lieu de residence : </td>
                            <td>{ID.lieu_de_residence}</td>
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
                    <div className="flex super-end answer1">
                        <table>
                            <tr>
                                <td>Indication</td>
                                <td>{objet[1].indicateur}</td>
                            </tr>
                            <tr>
                                <td>voie d'examen</td>
                                <td>{objet[1].voie_exam}</td>
                            </tr>
                            <tr>
                                <td>Conditions de realisation</td>
                                <td>{objet[1].condition_realisation}</td>
                            </tr>
                            <tr>
                                <td>Membrane</td>
                                <td>{objet[1].membrane}</td>
                            </tr>
                            <tr>
                                <td>MAF</td>
                                <td>{objet[1].MAF}</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>Date d'examen</td>
                                <td>{objet[1].date_exam}</td>
                            </tr>
                            <tr>
                                <td>Nombre de foetus</td>
                                <td>{objet[1].nombre_foetus}</td>
                            </tr>
                            <tr>
                                <td>Type de grossesse</td>
                                <td>{objet[1].type_grossece}</td>
                            </tr>
                            <tr>
                                <td>Activitee cardiaque</td>
                                <td>{objet[1].activitee_cardiaque}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="flex super-end answer1">
                        <table>
                            <tr>
                                <td>RCF : </td>
                                <td>{objet[1].RFC} <i>bpm</i></td>
                            </tr>
                            <tr>
                                <td>AC : </td>
                                <td>{objet[1].AC} <i>mm</i></td>
                            </tr>
                            <tr>
                                <td>Clartee nucale : </td>
                                <td>{objet[1].clarte_nucale} <i>mm</i></td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>TTD : </td>
                                <td>{"inconnue car inexistant"} <i>mm</i> </td>
                            </tr>
                            <tr>
                                <td>LCC : </td>
                                <td>{objet[1].LCC} <i>mm</i></td>
                            </tr>
                            <tr>
                                <td>Femur : </td>
                                <td>{objet[1].femur} <i>mm</i></td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>BIP : </td>
                                <td>{objet[1].BIP} <i>mm</i> </td>
                            </tr>
                            <tr>
                                <td>PA : </td>
                                <td>{"inconnue car inexistant"} <i>mm</i></td>
                            </tr>
                            <tr>
                                <td>Terme : </td>
                                <td>{objet[1].terme} <i>Semaine (s)</i></td>
                            </tr>
                        </table>
                    </div>
                    <div className="flex">
                        <table style={{zIndex : 0}}>
                            <tr>
                                <td>Morphologie du pole cephalique : </td>
                                <td>{objet[1].morphologie_pole_cephalique}</td>
                            </tr>
                            <tr>
                                <td>Abdomen : </td>
                                <td>{objet[1].abdomen}</td>
                            </tr>
                            <tr>
                                <td>Aspect des membres : </td>
                                <td>{objet[1].aspect_des_membres}</td>
                            </tr>
                            <tr>
                                <td>Liquide Amniotique : </td>
                                <td>{objet[1].liquide_amniotique}</td>
                            </tr>
                            <tr>
                                <td>Localisation du Trophoblaste : </td>
                                <td>{objet[1].localisation_du_trophoblaste}</td>
                            </tr>
                            <tr>
                                <td>Aspect du Trophoblaste : </td>
                                <td>{objet[1].aspect_du_trophoblaste}</td>
                            </tr>
                            <tr>
                                <td>Deroulement : </td>
                                <td>{objet[1].deroulement}</td>
                            </tr>
                            <tr style={{border : "1px solid #333", width : "80%", zIndex : 1, position : "absolute"}}>
                                <td>Conclusion : </td>
                                <td style={{color : "green"}}>{`${objet[1].conclusion}`}</td>
                            </tr>
                        </table>
                        <table>

                        </table>
                    </div>
                    <div style={{height : "10px"}}></div>
                    {/* <FooterImpress /> */}
                    <div>{dateLocale}</div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};
