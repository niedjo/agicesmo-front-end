import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import HeaderImpress from "../../Components/HeaderImpress";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import REfPatientImpress from "../../Components/REfPatientImpress";

export default function PrintEchoObsT1(props) {
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
        <div style={{background : "white", height : "200vh", fontSize : 15}}>
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
                        <div>Uterus Orientation : </div> 
                        <div className="answer"> {objet[1].uterus_orientation}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Talle : </div> 
                        <div className="answer">{objet[1].taille}</div>
                    </div>
                    <div className="flex">
                        <div>Nombre de Foetus : </div> 
                        <div className="answer">{objet[1].nombre_dembryons}</div>
                    </div>
                    <div className="flex">
                        <div>Mobilitee Spontannee : </div> 
                        <div className="answer">{objet[1].mobilite_spontanee}</div>
                    </div>
                    <div className="flex">
                        <div>Activitee Cardiaque : </div> 
                        <div className="answer">{objet[1].activitee_cardiaque}</div>
                    </div>
                    <div className="flex">
                        <div>Frequence Cardiaque en BMP : </div> 
                        <div className="answer">{objet[1].frequence_cardiaque_en_BMP}</div>
                    </div>
                    <div className="flex">
                        <div>Longueur Cranio - caudale en mm : </div> 
                        <div className="answer">{objet[1].longueur_cranio_caudale}</div>
                    </div>
                    <div className="flex">
                        <div>Sac Gestationnel (GS) taille en mm : </div> 
                        <div className="answer">{objet[1].sac_gestationnel_taille}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Age gestationnel: </div> 
                        <div className="answer">{objet[1].age_gestationnel}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Date Probable d'accouchement : </div> 
                        <div className="answer">{objet[1].date_probable_daccouchement}</div>
                    </div>
                    <div className="flex super-end">
                        <div>Autres trouvailles </div> 
                        <div className="answer">{objet[1].Autre_trouvailles}</div>
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
