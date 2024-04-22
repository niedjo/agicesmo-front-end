import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";

export default function Impression(props) {

    const [Imprimable, setImprimable] = useState(false)

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
        <div style={{background : "white", height : "200vh"}}>
                {/* <GoBack handlclick={props.arriere}/> */}
            <form name="f1">
                <GoBack handlclick={props.arriere}/>
            </form>
            <div style={{backgroundImage : "none", backgroundColor : "white"}}>
                <AfficherObjet objet = {props.monObjet}/>
            </div>
            <form name="f2">
                <button onClick={printer}>dkjna</button>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    )
};
