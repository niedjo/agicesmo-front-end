import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import HeaderImpress from "../../Components/HeaderImpress";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import REfPatientImpress from "../../Components/REfPatientImpress";

export default function PrintEchoAbdominale(props) {
    const [Imprimable, setImprimable] = useState(false)


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
                <REfPatientImpress />
                {/* <div style={{backgroundImage : "none", backgroundColor : "white"}}>
                    <AfficherObjet objet = {props.monObjet}/>
                </div> */}
            </center>
                <div className="body">
                    <div className="flex">
                        <div>RESULTATS : </div> 
                        <div className="answer"> Anteversee</div>
                    </div>
                    <div className="flex">
                        <div className="answer">Conclusion : </div>
                        <div className="answer" style={{width : 300}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quae ex rerum, praesentium vel libero! Excepturi dolorem corporis illo exercitationem eos mollitia corrupti neque, enim libero, soluta doloremque, ipsa consequatur.</div>
                    </div>
                    <div className="flex" style={{marginTop : 30}}>
                        <div className="answer">Nom de l'operateur : </div>
                        <div className="answer" style={{width : 300}}>NKDS</div>
                    </div>
                    <div style={{paddingTop : 190}}>
                    <div style={{height : "10px"}}></div>
                        {/* <FooterImpress /> */}
                        <div>{dateLocale}</div>
                    </div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};
