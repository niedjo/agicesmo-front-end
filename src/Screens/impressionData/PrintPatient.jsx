import React, { useState } from 'react'
import { GoBack } from '../../Components/GoBack';
import agicesmo_Logo from '../../assets/test2/logoDall-E4.jpg'

const PrintPatient = (
    { 
        arriere, 
        nom_et_prenom, 
        lieu_de_residence, 
        numtel, 
        dateNais, 
        dateDuJour, 
        age, 
        sexe
    }

    ) => {

    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }
    
    const [Imprimable, setImprimable] = useState(false)

    const printer = (e) => {
        e.preventDefault()
        setImprimable(!Imprimable)
        document.f1.style.display = "none"

        setTimeout(() => 
        {
            window.print()
            document.f1.style.display = ""

        }, 500)

    }

  return (
    <div style={{background : "white", height : "100%"}}>
            {/* <GoBack handlclick={props.arriere}/> */}
        <center>
            <form name="f1" style={{background : "#71ACFA"}}>
                <GoBack handlclick={arriere}/>
                <button onClick={printer} className="btn btn-primary">Lancer l'impression</button>
            </form>
        </center>
        <div>
            <div className="header">
                <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                    <div className="logo-name">CESMO</div>
                    <img src={agicesmo_Logo} alt="logo du centre" width={100} height={100} style={{borderRadius : "50%"}} />
                    {/* <span className="spn"></span> */}
                </div>
                <div className="desc-center">
                    <div className="desc desc1">District de santee de Nkoln dongo</div>
                    <div className="desc desc2">Centre des Soins Medicaux et Obstetricaux</div>
                    <div className="desc desc3">Service D'imagerie</div>
                </div>
            </div>
            <div className="header2">
                <div className="desc1-header2">
                    <div style={{fontWeight : 600}}>Ouvert 24h /24 et 7j / 7</div>
                    <div>Situe a Nkomo, lieu dit Carrefour Marie Albert a 150m du stade Abaga.</div>
                    <div>Contact Telephonique : +237 699 234 894</div> 
                </div>
                <div className="desc2-header2">
                    <div>Nos prestations : </div>
                    <div>Echographie : Pelviennes - Endovaginales - Obstetricales - Abdominales - Testiculaires - Mammaires...</div>
                </div>
            </div>
        </div>

        {/* les identifiants a proprement dit */}

        <center style={{marginTop : 50}}>
            <table>
                <tr>
                    <td><b>Nom et prenom</b></td>
                    <td>{nom_et_prenom}</td>
                </tr>
                <tr>
                    <td><b>Date du jour</b></td>
                    <td>{dateDuJour}</td>
                </tr>
                <tr>
                    <td><b>Date de naissance</b></td>
                    <td>{dateNais}</td>
                </tr>
                <tr>
                    <td><b>Age</b></td>
                    <td>{age}</td>
                </tr>
                <tr>
                    <td><b>Sexe</b></td>
                    <td>{sexe}</td>
                </tr>
                <tr>
                    <td><b>Lieu de residence</b></td>
                    <td>{lieu_de_residence}</td>
                </tr>
            </table>
        </center>

    </div>
  )
}

export default PrintPatient