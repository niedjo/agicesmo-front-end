import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import './styles.css'
import agicesmo_Logo from '../../assets/test2/logoDall-E4.jpg'
import Constant from "../../Constant";

const PrintFacture = ({ arriere, content, patient, prix_total, reglement_client, reste_a_payer, stock}) => {
    
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

        setdate(new Date())
    }
    
    const [date, setdate] = useState(new Date())


  return (
    <div style={{background : "white", height : "100%"}}>
            {/* <GoBack handlclick={props.arriere}/> */}
        <center>
            <form name="f1" style={{background : "#71ACFA"}}>
                <GoBack handlclick={arriere}/>
                <button onClick={printer} className="btn btn-primary">Lancer l'impression</button>
            </form>
        </center>

        <nav>
            <img src={agicesmo_Logo} alt="logo du centre" width={100} height={100} style={{borderRadius : "50%"}} />
        </nav>
        <hr style={{width : "25%", borderWidth : 2, backgroundColor : "#000"}} />

        <nav style={{display : "flex", justifyContent : "space-between", width : "99%"}}>
            <div>
                <h5>{Constant.nom_centre}</h5>
                <div>{Constant.nom_complet_centre}</div>
                <div>{Constant.situation_du_district}</div>
                <div>{Constant.contact_telephonique}</div>
                <div style={{color : "blue"}}>{Constant.e_mail}</div>
            </div>
            <div>
                <h6>Facture Numero : {date.getTime()}</h6>
                <h6>Date et heure : {date.toLocaleString()}</h6>
                <div>{patient.nom_et_prenom}</div>
                <div>{patient.lieu_de_residence}</div>
                <div>CAMEROUN</div>
            </div>
        </nav>

        <center style={{marginTop : 20}}>
            <table className="table table-bordered table-hover" style={{borderColor : "#333", backgroundColor : "white", width : "90%"}}>
                <tr style={{background : "#7171ee"}}>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Quantitee</th>
                    <th>Prix unitaire</th>
                    <th>Prix Total</th>
                </tr>
                <tbody>
                    {content.map(c => (
                        c.TabNatureExam.map((t, key) => (
                            <tr key={key}>
                                <td>
                                    {   
                                        c.Exam === "Pharmacie"
                                        ? stock[c.TabNatureExam[key] - 1].nom
                                        : c.TabNatureExam[key]
                                    }
                                </td>
                                <td>{c.Exam}</td>
                                <td>{c.tab_qte ? c.tab_qte[key] : 1}</td>
                                <td>{c.tab_price[key]} FCFA</td>
                                <td>{c.tab_qte ? parseInt(c.tab_price[key]) * parseInt(c.tab_qte[key]) : c.tab_price[key]} FCFA</td>
                            </tr>
                        ))
                    ))}
                    <tr>
                        <td colSpan={4}><b>Total</b></td>
                        <td>{prix_total} FCFA</td>
                    </tr>
                    <tr>
                        <td colSpan={4}><b>Reglement Du Client</b></td>
                        <td>{reglement_client} FCFA</td>
                    </tr>
                    <tr>
                        <td colSpan={4}><b>Reste a payer</b></td>
                        <td>{reste_a_payer} FCFA</td>
                    </tr>
                </tbody>
            </table>
        </center>
    </div>
  )
}

export default PrintFacture