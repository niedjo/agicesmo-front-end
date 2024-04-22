import React, { useState } from "react";
import { GoBack } from "../../Components/GoBack";
import './styles.css'
import FooterImpress from "../../Components/FooterImpress";
import agicesmo_Logo from '../../assets/test2/logoDall-E4.jpg'
import Constant from "../../Constant";

export default function PrintLaboratoire(props) {
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
      
    return (
        <div style={{background : "white", height : "100%", fontSize : 10}}>
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
                        <div className="desc desc3">{Constant.service[3]}</div>
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
                    RESULTAT ANALYSES MEDICALES
                </div>

                {/* ce qui remplace le REFIdImpres */}
                <div style={{border : "1px solid #333", width : "90%", display : "flex", justifyContent : "space-between", margin : 20, padding : 10}}>
                    <table style={{height : "10px"}}>
                        <tr>
                            <td>Ref patient : </td>
                            <td>{ID.code_patient}</td>
                        </tr>
                        <tr>
                            <td>Date Examen : </td>
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
                        {/* <table style={{zIndex : 0}}>
                            <tr>
                                <td>Nature Examen : </td>
                                <td>{objet[1].nature_examen}</td>
                            </tr>
                            <tr>
                                <td>Expression des resultats : </td>
                                <td>{objet[1].expression_des_resultats}</td>
                            </tr>
                            <tr>
                                <td>Conclusion : </td>
                                <td style={{color : "red"}}>{`${objet[1].conclusion}`}</td>
                            </tr>
                            <tr>
                                <td>Nom de l'operateur : </td>
                                <td>{objet[1].nom_et_prenom}</td>
                            </tr>

                            {JSON.stringify(objet[2])}
                        </table> */}
                        {  (objet[1].nature_examen === "NFS (Numeration Formule Sanguine)"
                        || objet[1].nature_examen === "NFS (Numeration Formule Sanguine)_Partenaires") &&
                        <>
                            <center><h5>Numeration Formule Sanguine</h5></center>
                            <center>
                                <table style={{zIndex : 0, marginBottom : 0}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Reference</th>
                                    </tr>
                                    <tr>
                                        <td><b>WBC</b></td>
                                        <td style={{color : parseInt(objet[2].WCB) < 4 ? "red" : parseInt(objet[2].WCB) > 10 ? "blue" : "#000"}}>{objet[2].WCB}</td>
                                        <td>10^g/l</td>
                                        <td><i>4.00 - 10.00</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>LYM#</b></td>
                                        <td style={{color : parseInt(objet[2].LYM_D) < 0.60 ? "red" : parseInt(objet[2].LYM_D) > 4.10 ? "blue" : "#000"}}>{objet[2].LYM_D}</td>
                                        <td>10^g/l</td>
                                        <td><i>0.60 - 4.10</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MID#</b></td>
                                        <td style={{color : parseInt(objet[2].MID_D) < 0.10 ? "red" : parseInt(objet[2].MID_D) > 1.80 ? "blue" : "#000"}}>{objet[2].MID_D}</td>
                                        <td>10^g/l</td>
                                        <td><i>0.10 - 1.80</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>GRA#</b></td>
                                        <td style={{color : parseInt(objet[2].GRA_D) < 2.00 ? "red" : parseInt(objet[2].GRA_D) > 7.80 ? "blue" : "#000"}}>{objet[2].GRA_D}</td>
                                        <td>10^g/l</td>
                                        <td><i>2.00 - 7.80</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>LYM%</b></td>
                                        <td style={{color : parseInt(objet[2].LYM_P) < 20.00 ? "red" : parseInt(objet[2].LYM_P) > 50.00 ? "blue" : "#000"}}>{objet[2].LYM_P}</td>
                                        <td>%</td>
                                        <td><i>20.00 - 50.00</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MID%</b></td>
                                        <td style={{color : parseInt(objet[2].MID_P) < 1.00 ? "red" : parseInt(objet[2].MID_P) > 15.00 ? "blue" : "#000"}}>{objet[2].MID_P}</td>
                                        <td>%</td>
                                        <td><i>1.00 - 15.00</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>GRA%</b></td>
                                        <td style={{color : parseInt(objet[2].GRA_P) < 4.00 ? "red" : parseInt(objet[2].GRA_P) > 70.00 ? "blue" : "#000"}}>{objet[2].GRA_P}</td>
                                        <td>%</td>
                                        <td><i>4.00 - 70.00</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>RBC</b></td>
                                        <td style={{color : parseInt(objet[2].RCC) < 3.80 ? "red" : parseInt(objet[2].RCC) > 5.80 ? "blue" : "#000"}}>{objet[2].RCC}</td>
                                        <td>10^12/l</td>
                                        <td><i>3.80 - 5.80</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>HGB</b></td>
                                        <td style={{color : parseInt(objet[2].HGB) < 11.0 ? "red" : parseInt(objet[2].HGB) > 16.5 ? "blue" : "#000"}}>{objet[2].HGB}</td>
                                        <td>g/dl</td>
                                        <td><i>11.0 - 16.5</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>HCT</b></td>
                                        <td style={{color : parseInt(objet[2].HCT) < 30.0 ? "red" : parseInt(objet[2].HCT) > 50.0 ? "blue" : "#000"}}>{objet[2].HCT}</td>
                                        <td>%</td>
                                        <td><i>30.0 - 50.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MCV</b></td>
                                        <td style={{color : parseInt(objet[2].MCV) < 80.0 ? "red" : parseInt(objet[2].MCV) > 99.0 ? "blue" : "#000"}}>{objet[2].MCV}</td>
                                        <td>fL</td>
                                        <td><i>80.0 - 99.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MCH</b></td>
                                        <td style={{color : parseInt(objet[2].MCH) < 26.5 ? "red" : parseInt(objet[2].MCH) > 33.5 ? "blue" : "#000"}}>{objet[2].MCH}</td>
                                        <td>pg</td>
                                        <td><i>26.5 - 33.5</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MCHC</b></td>
                                        <td style={{color : parseInt(objet[2].MCHC) < 32.0 ? "red" : parseInt(objet[2].MCHC) > 36.0 ? "blue" : "#000"}}>{objet[2].MCHC}</td>
                                        <td>g/dl</td>
                                        <td><i>32.0 - 36.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>RDW-SD</b></td>
                                        <td style={{color : parseInt(objet[2].RDW_SD) < 35.0 ? "red" : parseInt(objet[2].RDW_SD) > 56.0 ? "blue" : "#000"}}>{objet[2].RDW_SD}</td>
                                        <td>fL</td>
                                        <td><i>35.0 - 56.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>RDW-CU</b></td>
                                        <td style={{color : parseInt(objet[2].RDW_CU) < 10.0 ? "red" : parseInt(objet[2].RDW_CU) > 15.0 ? "blue" : "#000"}}>{objet[2].RDW_CU}</td>
                                        <td>%</td>
                                        <td><i>10.0 - 15.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>PLT</b></td>
                                        <td style={{color : parseInt(objet[2].PLT) < 100.0 ? "red" : parseInt(objet[2].PLT) > 300.0 ? "blue" : "#000"}}>{objet[2].PLT}</td>
                                        <td>g/L</td>
                                        <td><i>100.0 - 300.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>MPV</b></td>
                                        <td style={{color : parseInt(objet[2].MPV) < 7.0 ? "red" : parseInt(objet[2].MPV) > 11.0 ? "blue" : "#000"}}>{objet[2].MPV}</td>
                                        <td>fL</td>
                                        <td><i>7.0 - 11.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>PWD</b></td>
                                        <td style={{color : parseInt(objet[2].PWD) < 10.0 ? "red" : parseInt(objet[2].PWD) > 18.0 ? "blue" : "#000"}}>{objet[2].PWD}</td>
                                        <td>%</td>
                                        <td><i>10.0 - 18.0</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>PCT</b></td>
                                        <td style={{color : parseInt(objet[2].PCT) < 0.100 ? "red" : parseInt(objet[2].PCT) > 0.500 ? "blue" : "#000"}}>{objet[2].PCT}</td>
                                        <td>%</td>
                                        <td><i>0.100 - 0.500</i></td>
                                    </tr>
                                    <tr>
                                        <td><b>P_LCR</b></td>
                                        <td style={{color : parseInt(objet[2].P_LCR) < 13.0 ? "red" : parseInt(objet[2].P_LCR) > 43.0 ? "blue" : "#000"}}>{objet[2].P_LCR}</td>
                                        <td>%</td>
                                        <td><i>13.0 - 43.0</i></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Hormone FSH"
                        || objet[1].nature_examen === "Hormone FSH_partenaire") &&
                        <>
                            <center><h5>Hormone FSH</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 550}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Norme</th>
                                    </tr>
                                    <tr>
                                        <td><b>FSH</b></td>
                                        <td style={{color : parseInt(objet[2].FSH) < 0.4 ? "red" : parseInt(objet[2].FSH) > 4.0 ? "blue" : "#000"}}>{objet[2].FSH}</td>
                                        <td>Ul/ml</td>
                                        <td><i>0.4 - 4.00</i></td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Hormone LH"
                        || objet[1].nature_examen === "Hormone LH_partenaire") &&
                        <>
                            <center><h5>Hormone LH</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 450}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Norme</th>
                                    </tr>
                                    <tr>
                                        <td><b>LH</b></td>
                                        <td>{objet[2].LH}</td>
                                        <td>mlU/ml</td>
                                        <td>
                                            <i>
                                                M : 1.25 - 13.50 <br />
                                                F : Phase Folliculaire 1.25 - 11.80 <br />
                                                    Ovulation 13.15 - 94.75 <br />
                                                    Phase Luteale 1.05 - 14.50 <br />
                                                    Menopause 7.70 - 64.20  
                                            </i>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Hormone PRL"
                        || objet[1].nature_examen === "Hormone PRL_partenaire") &&
                        <>
                            <center><h5>Hormone PRL</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 460}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Norme</th>
                                    </tr>
                                    <tr>
                                        <td><b>PRL</b></td>
                                        <td>{objet[2].PRL}</td>
                                        <td>µlU/ml</td>
                                        <td>
                                            <i>
                                                <p>M : 86.3 - 425.72</p>
                                                <p>F : 72.55 - 600.40</p>  
                                            </i>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Hormone PSA"
                        || objet[1].nature_examen === "Hormone PSA_partenaire") &&
                        <>
                            <center><h5>Hormone PSA</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 530}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Norme</th>
                                    </tr>
                                    <tr>
                                        <td><b>PSA</b></td>
                                        <td style={{color : parseInt(objet[2].PSA) < 0 ? "red" : parseInt(objet[2].PSA) > 10 ? "blue" : "#000"}}>{objet[2].PSA}</td>
                                        <td>ng/ml</td>
                                        <td>
                                            <i>
                                                0 - 10  
                                            </i>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Hormone TSH"
                        || objet[1].nature_examen === "Hormone TSH_partenaire") &&
                        <>
                            <center><h5>Hormone TSH</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 530}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Unitee</th>
                                        <th>Norme</th>
                                    </tr>
                                    <tr>
                                        <td><b>TSH</b></td>
                                        <td style={{color : parseInt(objet[2].TSH) < 0.4 ? "red" : parseInt(objet[2].TSH) > 4.0 ? "blue" : "#000"}}>{objet[2].TSH}</td>
                                        <td>ng/ml</td>
                                        <td>
                                            <i>
                                                0.4 - 4.0  
                                            </i>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "ECBU"
                        || objet[1].nature_examen === "ECBU_Partenaires") &&
                        <>
                            <center><h5>EXAMEN CYTOBACTERIOLOGIQUE DES URINES</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 0}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr><td colSpan={2} align="center" style={{color : "blue"}}>Etat Frais</td></tr>
                                    <tr>
                                        <td><b>ASPECT</b></td>
                                        <td>{objet[2].ASPECT}</td>
                                    </tr>
                                    <tr>
                                        <td><b>COULEUR</b></td>
                                        <td>{objet[2].COULEUR}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CELLULES EPITHELIALE</b></td>
                                        <td>{objet[2].CELLULES_EPITHELIALE}</td>
                                    </tr>
                                    <tr>
                                        <td><b>LUECOCYTES</b></td>
                                        <td>{objet[2].LUECOCYTES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>HEMATIES</b></td>
                                        <td>{objet[2].HEMATIES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PARASITES</b></td>
                                        <td>{objet[2].PARASITES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CRISTAUX</b></td>
                                        <td>{objet[2].CRISTAUX}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CYLINDRES</b></td>
                                        <td>{objet[2].CYLINDRES}</td>
                                    </tr>
                                    <tr><td colSpan={2} align="center" style={{color : "blue"}}>Coloration de GRAM</td></tr>
                                    <tr>
                                        <td><b>CG - </b></td>
                                        <td>{objet[2].CG_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CG + </b></td>
                                        <td>{objet[2].CG_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>BG - </b></td>
                                        <td>{objet[2].BG_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>BG + </b></td>
                                        <td>{objet[2].BG_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PN</b></td>
                                        <td>{objet[2].PN}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center"><u>{objet[1].nom_et_prenom}</u></td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "ECBU_ATB"
                        || objet[1].nature_examen === "ECBU_ATB_Partenaires" 
                        || objet[1].nature_examen === "ECBU Antibiogramme") &&
                        <>
                            <center><h5>EXAMEN CYTOBACTERIOLOGIQUE DES URINES ANRIBIOGRAMME</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 100}}>
                                    <tr>
                                        <td><b style={{color : "green"}}>Macroscopie</b></td>
                                        <td>{objet[2].Macroscopie}</td>
                                        <td><b>Volume</b></td>
                                        <td>{objet[2].Volume}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Couleur et aspect des Urines</b></td>
                                        <td>{objet[2].Couleur_et_aspect_des_Urines}</td>
                                        <td><b>PH</b></td>
                                        <td>{objet[2].PH}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Odeur</b></td>
                                        <td>{objet[2].Odeur}</td>
                                        <td><b>Viscositee</b></td>
                                        <td>{objet[2].Viscositee}</td>
                                    </tr>
                                    <tr>
                                        <td><b style={{color : "green"}}>Microscopie</b></td>
                                        <td>{objet[2].Microscopie}</td>
                                        <td><b>Cocci Gram -</b></td>
                                        <td>{objet[2].Cocci_Gram_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Leucocytes</b></td>
                                        <td>{objet[2].Leucocytes}</td>
                                        <td><b>Cocci Gram + </b></td>
                                        <td>{objet[2].Cocci_Gram_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cellules Epithelial</b></td>
                                        <td>{objet[2].Cellules_Epithelial}</td>
                                        <td><b>Bacciles Gram - </b></td>
                                        <td>{objet[2].Bacciles_Gram_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Levures</b></td>
                                        <td>{objet[2].Levures}</td>
                                        <td><b>Bacciles G + </b></td>
                                        <td>{objet[2].Bacciles_G_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Polynucleaires</b></td>
                                        <td>{objet[2].Polynucleaires}</td>
                                        <td><b>Trichomonas</b></td>
                                        <td>{objet[2].Trichomonas}</td>
                                    </tr>
                                    <tr>
                                        <td><b>C.epitheliales</b></td>
                                        <td>{objet[2].Cepitheliales}</td>
                                        <td><b>Cristaux</b></td>
                                        <td>{objet[2].Cristaux}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Culture</b></td>
                                        <td>{objet[2].Culture}</td>
                                        <td><b>Sensibles</b></td>
                                        <td>{objet[2].Sensibles}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Germes Isolees</b></td>
                                        <td>{objet[2].Germes_Isolees}</td>
                                        <td><b>Intermediaires </b></td>
                                        <td>{objet[2].Intermediaires}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Resistants</b></td>
                                        <td>{objet[2].Resistants}</td>
                                        <td><b>conclusion </b></td>
                                        <td>{objet[2].conclusion}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center"><u>{objet[1].nom_et_prenom}</u></td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Selles KOAP"
                        || objet[1].nature_examen === "Selles KOAP_Partenaires") &&
                        <>
                            <center><h5>Selles KOAP</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>Goute Epaisse</b></td>
                                        <td>{objet[2].Goute_Epaisse}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Selles KOAP</b></td>
                                        <td>{objet[2].Selles_KOAP}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "RMF"
                        || objet[1].nature_examen === "RMF_Partenaires") &&
                        <>
                            <center><h5>RMF</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>Goute Epaisse</b></td>
                                        <td>{objet[2].Goute_Epaisse}</td>
                                    </tr>
                                    <tr>
                                        <td><b>RMF</b></td>
                                        <td>{objet[2].RFM_SKIN_SNIP}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Urée (Urecemie)_Partenaires") &&
                        <>
                            <center><h5>Urecemie</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>UREE</b></td>
                                        <td style={{color : parseInt(objet[2].UREE) < 15.0 ? "red" : parseInt(objet[2].UREE) > 10.0 ? "blue" : "#000"}}>{objet[2].UREE}</td>
                                        <td>15.0 - 20.0</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Créat (Crétinine)"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Créat (Crétinine)_Partenaires") &&
                        <>
                            <center><h5>Crétinine</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>CREATININE</b></td>
                                        <td style={{color : parseInt(objet[2].CREATININE) < 0.7 ? "red" : parseInt(objet[2].CREATININE) > 1.4 ? "blue" : "#000"}}>{objet[2].CREATININE}</td>
                                        <td>0.7 - 1.4</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Ac Urique (Acide Urique)"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Ac Urique (Acide Urique)") &&
                        <>
                            <center><h5>ACIDE URIQUE</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>ACIDE URIQUE</b></td>
                                        <td style={{color : parseInt(objet[2].ACIDE_URIQUE) < 2.5 ? "red" : parseInt(objet[2].ACIDE_URIQUE) > 7.7 ? "blue" : "#000"}}>{objet[2].ACIDE_URIQUE}</td>
                                        <td>2.5 - 7.7</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Alb/Sucre Urinaire"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Alb/Sucre Urinaire_Partenaires") &&
                        <>
                            <center><h5>ALBUMINE SANGUIN</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>ALBUMINE SANGUIN</b></td>
                                        <td style={{color : parseInt(objet[2].ALBUMINE_SANGUIN) < 35.0 ? "red" : parseInt(objet[2].ALBUMINE_SANGUIN) > 50.0 ? "blue" : "#000"}}>{objet[2].ALBUMINE_SANGUIN}</td>
                                        <td>35.0 - 50.0</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Glycemie Contrôle"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Glycemie Contrôle_Partenaires") &&
                        <>
                            <center><h5>Glycemie Contrôle</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 450}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>GLYCEMIE d'URGENCE</b></td>
                                        <td style={{color : parseInt(objet[2].GLYCEMIE_URGENCE) < 0.0 ? "red" : parseInt(objet[2].GLYCEMIE_URGENCE) > 1000.0 ? "blue" : "#000"}}>{objet[2].GLYCEMIE_URGENCE}</td>
                                        <td> - </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>GLYCEMIE A JEUNE</b></td>
                                        <td style={{color : parseInt(objet[2].GLYCEMIE_A_JEUNE) < 0.6 ? "red" : parseInt(objet[2].GLYCEMIE_A_JEUNE) > 1.10 ? "blue" : "#000"}}>{objet[2].GLYCEMIE_A_JEUNE}</td>
                                        <td>0.6 - 1.10</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>GLYCEMIE POST PRANDIALE</b></td>
                                        <td style={{color : parseInt(objet[2].GLYCEMIE_POST_PRANDIALE) < 1.0 ? "red" : parseInt(objet[2].GLYCEMIE_POST_PRANDIALE) > 1.9 ? "blue" : "#000"}}>{objet[2].GLYCEMIE_POST_PRANDIALE}</td>
                                        <td>1.0 - 1.9</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Glycemie Première"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        ) &&
                        <>
                            <center><h5>Glycemie Première</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>GLYCEMIE d'URGENCE</b></td>
                                        <td style={{color : parseInt(objet[2].GLYCEMIE_URGENCE) < 0.0 ? "red" : parseInt(objet[2].GLYCEMIE_URGENCE) > 1000.0 ? "blue" : "#000"}}>{objet[2].GLYCEMIE_URGENCE}</td>
                                        <td> - </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Profil Lipidique"
                        // || objet[1].nature_examen === "Urée (Urecemie)"
                        || objet[1].nature_examen === "Profil Lipidique_Partenaires") &&
                        <>
                            <center><h5>Profil Lipidique</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>CHOLESTEROL T</b></td>
                                        <td style={{color : parseInt(objet[2].CHOLESTEROL_T) < 140.0 ? "red" : parseInt(objet[2].CHOLESTEROL_T) > 239.0 ? "blue" : "#000"}}>{objet[2].CHOLESTEROL_T}</td>
                                        <td>140 - 239</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>TRYCLYCERIDES</b></td>
                                        <td style={{color : parseInt(objet[2].TRYCLYCERIDES) < 35 ? "red" : parseInt(objet[2].TRYCLYCERIDES) > 160 ? "blue" : "#000"}}>{objet[2].TRYCLYCERIDES}</td>
                                        <td>35 - 160</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>HDL</b></td>
                                        <td style={{color : parseInt(objet[2].HDL) < 30 ? "red" : parseInt(objet[2].HDL) > 80 ? "blue" : "#000"}}>{objet[2].HDL}</td>
                                        <td>30 - 80</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>LDL</b></td>
                                        <td style={{color : parseInt(objet[2].LDL) < 1.0 ? "red" : parseInt(objet[2].LDL) > 190 ? "blue" : "#000"}}>{objet[2].LDL}</td>
                                        <td>1.0- 190</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Chol T (Cholesterol Total)"
                        // || objet[1].nature_examen === "Profil Lipidique_Partenaires"
                        || objet[1].nature_examen === "Chol T (Cholesterol Total)_Partenaires") &&
                        <>
                            <center><h5>Cholesterol Total</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>CHOLESTEROL T</b></td>
                                        <td style={{color : parseInt(objet[2].CHOLESTEROL_T) < 140.0 ? "red" : parseInt(objet[2].CHOLESTEROL_T) > 239.0 ? "blue" : "#000"}}>{objet[2].CHOLESTEROL_T}</td>
                                        <td>140 - 239</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    {/* <tr>
                                        <td><b>TRYCLYCERIDES</b></td>
                                        <td style={{color : parseInt(objet[2].TRYCLYCERIDES) < 35 ? "red" : parseInt(objet[2].TRYCLYCERIDES) > 160 ? "blue" : "#000"}}>{objet[2].TRYCLYCERIDES}</td>
                                        <td>35 - 160</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td><b>HDL</b></td>
                                        <td style={{color : parseInt(objet[2].HDL) < 30 ? "red" : parseInt(objet[2].HDL) > 80 ? "blue" : "#000"}}>{objet[2].HDL}</td>
                                        <td>30 - 80</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td><b>LDL</b></td>
                                        <td style={{color : parseInt(objet[2].LDL) < 1.0 ? "red" : parseInt(objet[2].LDL) > 190 ? "blue" : "#000"}}>{objet[2].LDL}</td>
                                        <td>1.0- 190</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "LDL"
                        // || objet[1].nature_examen === "Profil Lipidique_Partenaires"
                        || objet[1].nature_examen === "LDL_Partenaires") &&
                        <>
                            <center><h5>LDL</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 500}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    {/* <tr>
                                        <td><b>CHOLESTEROL T</b></td>
                                        <td style={{color : parseInt(objet[2].CHOLESTEROL_T) < 140.0 ? "red" : parseInt(objet[2].CHOLESTEROL_T) > 239.0 ? "blue" : "#000"}}>{objet[2].CHOLESTEROL_T}</td>
                                        <td>140 - 239</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td><b>TRYCLYCERIDES</b></td>
                                        <td style={{color : parseInt(objet[2].TRYCLYCERIDES) < 35 ? "red" : parseInt(objet[2].TRYCLYCERIDES) > 160 ? "blue" : "#000"}}>{objet[2].TRYCLYCERIDES}</td>
                                        <td>35 - 160</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td><b>HDL</b></td>
                                        <td style={{color : parseInt(objet[2].HDL) < 30 ? "red" : parseInt(objet[2].HDL) > 80 ? "blue" : "#000"}}>{objet[2].HDL}</td>
                                        <td>30 - 80</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    <tr>
                                        <td><b>LDL</b></td>
                                        <td style={{color : parseInt(objet[2].LDL) < 1.0 ? "red" : parseInt(objet[2].LDL) > 190 ? "blue" : "#000"}}>{objet[2].LDL}</td>
                                        <td>1.0- 190</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "HDL"
                        // || objet[1].nature_examen === "Profil Lipidique_Partenaires"
                        || objet[1].nature_examen === "HDL_Partenaires") &&
                        <>
                            <center><h5>HDL</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 450}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    {/* <tr>
                                        <td><b>CHOLESTEROL T</b></td>
                                        <td style={{color : parseInt(objet[2].CHOLESTEROL_T) < 140.0 ? "red" : parseInt(objet[2].CHOLESTEROL_T) > 239.0 ? "blue" : "#000"}}>{objet[2].CHOLESTEROL_T}</td>
                                        <td>140 - 239</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    {/* <tr>
                                        <td><b>TRYCLYCERIDES</b></td>
                                        <td style={{color : parseInt(objet[2].TRYCLYCERIDES) < 35 ? "red" : parseInt(objet[2].TRYCLYCERIDES) > 160 ? "blue" : "#000"}}>{objet[2].TRYCLYCERIDES}</td>
                                        <td>35 - 160</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    <tr>
                                        <td><b>HDL</b></td>
                                        <td style={{color : parseInt(objet[2].HDL) < 30 ? "red" : parseInt(objet[2].HDL) > 80 ? "blue" : "#000"}}>{objet[2].HDL}</td>
                                        <td>30 - 80</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    {/* <tr>
                                        <td><b>LDL</b></td>
                                        <td style={{color : parseInt(objet[2].LDL) < 1.0 ? "red" : parseInt(objet[2].LDL) > 190 ? "blue" : "#000"}}>{objet[2].LDL}</td>
                                        <td>1.0- 190</td>
                                        <td>mg/dl</td>
                                    </tr> */}
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "ALAT/SGPT"
                        // || objet[1].nature_examen === "Profil Lipidique_Partenaires"
                        // || objet[1].nature_examen === "HDL_Partenaires"
                        ) &&
                        <>
                            <center><h5>ALAT/SGPT</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 450}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>ALAT/SGPT</b></td>
                                        <td>{objet[2].SGPT_ALAT}</td>
                                        <td>
                                            <i>
                                                <p>H {"<"} 41</p>
                                                <p>F {"<"} 31</p>
                                            </i>
                                        </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "ASAT/SGOT"
                        // || objet[1].nature_examen === "Profil Lipidique_Partenaires"
                        // || objet[1].nature_examen === "HDL_Partenaires"
                        ) &&
                        <>
                            <center><h5>ASAT/SGOT</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 450}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>ASAT/SGOT</b></td>
                                        <td>{objet[2].SGOT_ASAT}</td>
                                        <td>
                                            <i>
                                                <p>H {"<"} 38</p>
                                                <p>F {"<"} 31</p>
                                            </i>
                                        </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Transaminases"
                        || objet[1].nature_examen === "Transaminases_Partenaires"
                        ) &&
                        <>
                            <center><h5>Transaminases</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 300}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>ALAT/SGPT</b></td>
                                        <td>{objet[2].SGPT_ALAT}</td>
                                        <td>
                                            <i>
                                                <p>H {"<"} 41</p>
                                                <p>F {"<"} 31</p>
                                            </i>
                                        </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>ASAT/SGOT</b></td>
                                        <td>{objet[2].SGOT_ASAT}</td>
                                        <td>
                                            <i>
                                                <p>H {"<"} 38</p>
                                                <p>F {"<"} 31</p>
                                            </i>
                                        </td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "AcHcv"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "AcHcv_Partenaires"
                        || objet[1].nature_examen === "Serologie Hepatite C"
                        || objet[1].nature_examen === "Serologie Hepatite C_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie des hepatites</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>Ac Hcv</b></td>
                                        <td>{objet[2].Ac_HCV}</td>
                                        <td>
                                            Negatif : Abscence d'antigene de surface du virus de l'Hepatite C <br />
                                            Positif : Presence d'antigene de surface du virus de l'Hepatite C <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "Ag HBS"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "AgHbs _Partenaires"
                        || objet[1].nature_examen === "Serologie Hepatite B"
                        || objet[1].nature_examen === "Serologie Hepatite B_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie des hepatites</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>Ag HBS</b></td>
                                        <td>{objet[2].Ag_Hbs}</td>
                                        <td>
                                            Negatif : Abscence d'antigene de surface du virus de l'Hepatite B <br />
                                            Positif : Presence d'antigene de surface du virus de l'Hepatite B <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "ASLO"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "ASLO_Partenaires"
                        ) &&
                        <>
                            <center><h5>ASLO</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>ASLO</b></td>
                                        <td>{objet[2].ASLO}</td>
                                        <td>
                                            Negatif : abscence de l'antig-ne streptolysine - O <br />
                                            Positif : Presence de l'antig-ne streptolysine - O
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "CRP"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "CRP_Partenaires"
                        ) &&
                        <>
                            <center><h5>CRP</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>CRP</b></td>
                                        <td>{objet[2].CRP}</td>
                                        <td>
                                            Negatif : taux de C-Proeine reactif en dessous de 6 mg/dl <br />
                                            Negatif : taux de C-Proeine reactif au dessus de 6 mg/dl <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "H Pylori Test"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "H Pylori Test_Partenaires"
                        ) &&
                        <>
                            <center><h5>H Pylori Test</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>H Pylori Test</b></td>
                                        <td>{objet[2].H_Pylori}</td>
                                        <td>
                                            Negatif : Abscence de l'antigene de l'helico bacterium Pylory <br />
                                            Negatif : Presence de l'antigene de l'helico bacterium Pylory <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "Serologie Chlamydiae (IgG/IgM)"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie Chlamydiae</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>Chlamydiae</b></td>
                                        <td>{objet[2].CHLAMYDIA}</td>
                                        <td>
                                            IgG Positif : Presence d'anticorps anti chlylamediae trachomatis pouvant traduire une cicatrice serologique<br />
                                            IgG Negatif : Confirmation d'une infection recente a germe chlylamediae trachomatis<br />
                                            IgG et IgM Negatif : Abscence d'infection a chlylamediae trachomatis<br />
                                            IgG et IgM Positif : Confirmation d'une infection ancienne a germe chlylamediae trachomatis encore active<br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "Serologie Rubeole_Partenaires"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "Serologie Rubeole"
                        ) &&
                        <>
                            <center><h5>Serologie Rubeole</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>RUBEOLE</b></td>
                                        <td>{objet[2].RUBEOLE}</td>
                                        <td>
                                            IgG Positif : Presence d'anticorps anti Rubella virus pouvant traduire une cicatrice serologique<br />
                                            IgG Negatif : Confirmation d'une infection recente a germe Rubella virus<br />
                                            IgG et IgM Negatif : Abscence d'infection a Rubella virus<br />
                                            IgG et IgM Positif : Confirmation d'une infection ancienne a germe Rubella virus encore active<br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "Serologie Toxo IgG et IGM"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "Serologie Toxo IgG et IGM_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie TOXOPLASMOSE</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>TOXOPLASMOSE</b></td>
                                        <td>{objet[2].TOXOPLASMOSE}</td>
                                        <td>
                                            IgG Positif : Presence d'anticorps anti toxoplasma gondii pouvant traduire une cicatrice serologique<br />
                                            IgG Negatif : Confirmation d'une infection recente a germe toxoplasma gondii<br />
                                            IgG et IgM Negatif : Abscence d'infection a toxoplasma gondii<br />
                                            IgG et IgM Positif : Confirmation d'une infection ancienne a germe toxoplasma gondii encore active<br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "Serologie WIDAL"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "Serologie WIDAL_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie WIDAL</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>WIDAL FELIX</b></td>
                                        <td>{objet[2].WIDAL_FELIX}</td>
                                        <td>
                                            la positivitee des souches "O" temoignent d'une periode de l'infectionse situant en dessous de 14 jours <br />
                                            la positivitee des souches "H" temoignent d'une periode de l'infectionse situant au dessus de 14 jours <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                           objet[1].nature_examen === "VIH"
                        // || objet[1].nature_examen === "ASLO_Partenaires"
                        || objet[1].nature_examen === "VIH_Partenaires"
                        ) &&
                        <>
                            <center><h5>Serologie LAV</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 400}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>HIV</b></td>
                                        <td>{objet[2].VIH}</td>
                                        <td>
                                            Negatif : Abscence d'antocorps dirrige contre le VIH <br />
                                            Positif : Presence d'antocorps dirrige contre le VIH<br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }

                        {  (
                            objet[1].nature_examen === "Ionogramme complet_Partenaires"
                        || objet[1].nature_examen === "Ionogramme complet"
                        || objet[1].nature_examen === "Ionogramme simple"
                        || objet[1].nature_examen === "Ionogramme simple_Partenaires"
                        ) &&
                        <>
                            <center><h5>Ionogramme Sanguin</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 380}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>SODIUM (Na)</b></td>
                                        <td style={{color : parseInt(objet[2].SODIUM) < 135.0 ? "red" : parseInt(objet[2].SODIUM) > 155.0 ? "blue" : "#000"}}>{objet[2].SODIUM}</td>
                                        <td>135 - 155</td>
                                        <td>Eg/l</td>
                                    </tr>
                                    <tr>
                                        <td><b>POTASSIUM (K)</b></td>
                                        <td style={{color : parseInt(objet[2].POTASSIUM) < 4.0 ? "red" : parseInt(objet[2].POTASSIUM) > 5.5 ? "blue" : "#000"}}>{objet[2].POTASSIUM}</td>
                                        <td>4.0 - 5.5</td>
                                        <td>Eg/l</td>
                                    </tr>
                                    <tr>
                                        <td><b>CHLORURE (cl)</b></td>
                                        <td style={{color : parseInt(objet[2].CHLORURE) < 95 ? "red" : parseInt(objet[2].CHLORURE) > 135 ? "blue" : "#000"}}>{objet[2].CHLORURE}</td>
                                        <td>95 - 135</td>
                                        <td>mmol</td>
                                    </tr>
                                    <tr>
                                        <td><b>CALCIUM (Ca)</b></td>
                                        <td style={{color : parseInt(objet[2].CALCIUM) < 8.0 ? "red" : parseInt(objet[2].CALCIUM) > 10.5 ? "blue" : "#000"}}>{objet[2].CALCIUM}</td>
                                        <td>8.0 - 10.5</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    <tr>
                                        <td><b>MAGNESIUM (Mg)</b></td>
                                        <td style={{color : parseInt(objet[2].MAGNESIUM) < 1.6 ? "red" : parseInt(objet[2].MAGNESIUM) > 2.5 ? "blue" : "#000"}}>{objet[2].MAGNESIUM}</td>
                                        <td>1.6 - 2.5</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "K (Potassium)"
                        // || objet[1].nature_examen === "Ionogramme complet"
                        || objet[1].nature_examen === "K (Potassium)_Partenaires"
                        ) &&
                        <>
                            <center><h5>K (Potassium)</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>POTASSIUM (K)</b></td>
                                        <td style={{color : parseInt(objet[2].POTASSIUM) < 4.0 ? "red" : parseInt(objet[2].POTASSIUM) > 5.5 ? "blue" : "#000"}}>{objet[2].POTASSIUM}</td>
                                        <td>4.0 - 5.5</td>
                                        <td>Eg/l</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Na (Sodium)"
                        // || objet[1].nature_examen === "Ionogramme complet"
                        || objet[1].nature_examen === "Na (Sodium)_Partenaires"
                        ) &&
                        <>
                            <center><h5>Na (SODIUM)</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>SODIUM (Na)</b></td>
                                        <td style={{color : parseInt(objet[2].SODIUM) < 135.0 ? "red" : parseInt(objet[2].SODIUM) > 155.0 ? "blue" : "#000"}}>{objet[2].SODIUM}</td>
                                        <td>135 - 155</td>
                                        <td>Eg/l</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Mg (Magnesium)_Partenaires"
                        // || objet[1].nature_examen === "Ionogramme complet"
                        || objet[1].nature_examen === "Mg (Magnesium)"
                        ) &&
                        <>
                            <center><h5>Mg (Magnesium)</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>MAGNESIUM (Mg)</b></td>
                                        <td style={{color : parseInt(objet[2].MAGNESIUM) < 1.6 ? "red" : parseInt(objet[2].MAGNESIUM) > 2.5 ? "blue" : "#000"}}>{objet[2].MAGNESIUM}</td>
                                        <td>1.6 - 2.5</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Ca (Calcium)_Partenaires"
                        // || objet[1].nature_examen === "Ionogramme complet"
                        || objet[1].nature_examen === "Ca (Calcium)"
                        ) &&
                        <>
                            <center><h5>Ca (Calcium)</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Reference</th>
                                        <th>Unitee</th>
                                    </tr>
                                    <tr>
                                        <td><b>CALCIUM (Ca)</b></td>
                                        <td style={{color : parseInt(objet[2].CALCIUM) < 8.0 ? "red" : parseInt(objet[2].CALCIUM) > 10.5 ? "blue" : "#000"}}>{objet[2].CALCIUM}</td>
                                        <td>8.0 - 10.5</td>
                                        <td>mg/dl</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Electrophorese_Partenaires"
                        // || objet[1].nature_examen === "Electrophorese_Partenaires"
                        || objet[1].nature_examen === "Electrophorese"
                        ) &&
                        <>
                            <center><h5>Electrophorese HB</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>Electrophorese HB</b></td>
                                        <td>{objet[2].Electrophorese_HB}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Groupe Sanguin Rhesus"
                        // || objet[1].nature_examen === "Electrophorese_Partenaires"
                        || objet[1].nature_examen === "Groupe Sanguin Rhesus_Partenaires"
                        ) &&
                        <>
                            <center><h5>Groupe Sanguin Rhesus</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>Systeme ABO et rhesus</b></td>
                                        <td>{objet[2].Groupe_sanguin_et_rhesus}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "VS"
                        // || objet[1].nature_examen === "Electrophorese_Partenaires"
                        || objet[1].nature_examen === "VS_Partenaires"
                        ) &&
                        <>
                            <center><h5>VS</h5></center>
                            <center style={{fontSize : 16}}>
                                <table style={{zIndex : 0, marginBottom : 430}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>VS</b></td>
                                        <td>{objet[2].VS}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "GE"
                        || objet[1].nature_examen === "GE_Selles_Widal"
                        || objet[1].nature_examen === "GE_Partenaires"
                        ) &&
                        <>
                            <center><h5>Goutte Epaisse</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 40}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>WIDAL FELIX</b></td>
                                        <td>{objet[2].WIDAL_FELIX}</td>
                                        <td>
                                            la positivitee des souches "O" temoignent d'une periode de l'infectionse situant en dessous de 14 jours <br />
                                            la positivitee des souches "H" temoignent d'une periode de l'infectionse situant au dessus de 14 jours <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>CRP</b></td>
                                        <td>{objet[2].CRP}</td>
                                        <td>
                                            Negatif : taux de C-Proeine reactif en dessous de 6 mg/dl <br />
                                            Negatif : taux de C-Proeine reactif au dessus de 6 mg/dl <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Goutte Epaisse</b></td>
                                        <td>{objet[2].Goutte_Epaisse}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Selles KOAP</b></td>
                                        <td>{objet[2].Selles_KOAP}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "PCV Simple"
                        || objet[1].nature_examen === "PCV Simple_Partenaires"
                        ) &&
                        <>
                            <center><h5>Prelevement Cervico Vaginale</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 20}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                    </tr>
                                    <tr>
                                        <td><b>Col</b></td>
                                        <td>{objet[2].Col}</td>
                                    </tr>
                                    <tr>
                                        <td><b>LEUCORHEES</b></td>
                                        <td>{objet[2].LEUCORHEES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>TEST A LA PROSTATE</b></td>
                                        <td>{objet[2].TEST_A_LA_PROSTATE}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PH</b></td>
                                        <td>{objet[2].PH}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CELLULES EPITH</b></td>
                                        <td>{objet[2].CELLULES_EPITH}</td>
                                    </tr>
                                    <tr>
                                        <td><b>LEUCOCYTES</b></td>
                                        <td>{objet[2].LEUCOCYTES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>LEVURES</b></td>
                                        <td>{objet[2].LEVURES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>TRICHOMONAS VAGINALE</b></td>
                                        <td>{objet[2].TRICHOMONAS_VAGINALE}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CG - </b></td>
                                        <td>{objet[2].CG_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CG + </b></td>
                                        <td>{objet[2].CG_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>BG - </b></td>
                                        <td>{objet[2].BG_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>BG + </b></td>
                                        <td>{objet[2].BG_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>COCOBACILLES</b></td>
                                        <td>{objet[2].COCOBACILLES}</td>
                                    </tr>
                                    <tr>
                                        <td><b>CLUE CELL</b></td>
                                        <td>{objet[2].CLUE_CELL}</td>
                                    </tr>
                                    <tr>
                                        <td><b>FLORE DE DODERLEIN Type</b></td>
                                        <td>{objet[2].FLORE_DE_DODERLEIN_Type}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "PCV_ATB"
                        || objet[1].nature_examen === "PCV avec Antibiogramme_Partenaires"
                        || objet[1].nature_examen === "PCV avec Antibiogramme"
                        || objet[1].nature_examen === "PCV_ATB_Partenaires"
                        ) &&
                        <>
                            <center><h5>Prelevement Cervico Vaginale Antibiogramme</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 40}}>
                                    <tr>
                                        <td><b>Macroscopie</b></td>
                                        <td>{objet[2].Macroscopie}</td>
                                        <td><b>Aspect des Leucorhees</b></td>
                                        <td>{objet[2].Aspect_des_Leucorhees}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Aspect du Col</b></td>
                                        <td>{objet[2].Aspect_du_Col}</td>
                                        <td><b>PH</b></td>
                                        <td>{objet[2].PH}</td>
                                    </tr>
                                    <tr>
                                        <td><b>KOH</b></td>
                                        <td>{objet[2].KOH}</td>
                                        <td><b>Microscopie</b></td>
                                        <td>{objet[2].Microscopie}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cocci Gram - </b></td>
                                        <td>{objet[2].Cocci_Gram_M}</td>
                                        <td><b>Leucocytes</b></td>
                                        <td>{objet[2].Leucocytes}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cocci Gram  + </b></td>
                                        <td>{objet[2].Cocci_Gram_P}</td>
                                        <td><b>Hematies</b></td>
                                        <td>{objet[2].Hematies}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Flore du type</b></td>
                                        <td>{objet[2].Flore_du_type}</td>
                                        <td><b>Cellules Epithelial</b></td>
                                        <td>{objet[2].Cellules_Epithelial}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bacciles Gram - </b></td>
                                        <td>{objet[2].Bacciles_Gram_M}</td>
                                        <td><b>Levures</b></td>
                                        <td>{objet[2].Levures}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bacciles G +</b></td>
                                        <td>{objet[2].Bacciles_G_P}</td>
                                        <td><b>Polynucleaires</b></td>
                                        <td>{objet[2].Polynucleaires}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Trichomonas</b></td>
                                        <td>{objet[2].Trichomonas}</td>
                                        <td><b>C.epitheliales</b></td>
                                        <td>{objet[2].Cepitheliales}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Culture</b></td>
                                        <td>{objet[2].Culture}</td>
                                        <td><b>Sensibles</b></td>
                                        <td>{objet[2].Sensibles}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Germes Isolees</b></td>
                                        <td>{objet[2].Germes_Isolees}</td>
                                        <td><b>Intermediaires</b></td>
                                        <td>{objet[2].Intermediaires}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Resistants</b></td>
                                        <td>{objet[2].Resistants}</td>
                                        <td><b>Conclusion</b></td>
                                        <td>{objet[2].conclusion}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Pus_ATB"
                        || objet[1].nature_examen === "Pus_ATB_Partenaires"
                        ) &&
                        <>
                            <center><h5>Prelevement Cervico Vaginale Antibiogramme</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 40}}>
                                    <tr>
                                        <td><b>Macroscopie</b></td>
                                        <td>{objet[2].Macroscopie}</td>
                                        <td><b>Aspect des Pus</b></td>
                                        <td>{objet[2].Aspect_des_Pus}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Microscopie</b></td>
                                        <td>{objet[2].Microscopie}</td>
                                        <td><b>Cocci Gram - </b></td>
                                        <td>{objet[2].Cocci_Gram_M}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cocci Gram + </b></td>
                                        <td>{objet[2].Cocci_Gram_P}</td>
                                        <td><b>Cellules Epithelial</b></td>
                                        <td>{objet[2].Cellules_Epithelial}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bacciles Gram M</b></td>
                                        <td>{objet[2].Bacciles_Gram_M}</td>
                                        <td><b>Bacciles G P</b></td>
                                        <td>{objet[2].Bacciles_G_P}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Polynucleaires</b></td>
                                        <td>{objet[2].Polynucleaires}</td>
                                        <td><b>C epitheliales</b></td>
                                        <td>{objet[2].Cepitheliales}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Culture</b></td>
                                        <td>{objet[2].Culture}</td>
                                        <td><b>Sensibles</b></td>
                                        <td>{objet[2].Sensibles}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Germes Isolees</b></td>
                                        <td>{objet[2].Germes_Isolees}</td>
                                        <td><b>Intermediaires</b></td>
                                        <td>{objet[2].Intermediaires}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Resistants</b></td>
                                        <td>{objet[2].Resistants}</td>
                                        <td><b>conclusion</b></td>
                                        <td>{objet[2].conclusion}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Spermoculture"
                        || objet[1].nature_examen === "Spermoculture_Partenaires"
                        ) &&
                        <>
                            <center><h5>Spermoculture</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 30}}>
                                    <tr>
                                        <td><b>Macroscopie</b></td>
                                        <td>{objet[2].Macroscopie}</td>
                                        <td><b>Volume</b></td>
                                        <td>{objet[2].Volume}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PH</b></td>
                                        <td>{objet[2].PH}</td>
                                        <td><b>Odeur</b></td>
                                        <td>{objet[2].Odeur}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Viscositee</b></td>
                                        <td>{objet[2].Viscositee}</td>
                                        <td><b>Microscopie</b></td>
                                        <td>{objet[2].Microscopie}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cocci Gram M</b></td>
                                        <td>{objet[2].Cocci_Gram_M}</td>
                                        <td><b>Leucocytes</b></td>
                                        <td>{objet[2].Leucocytes}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Cocci Gram + </b></td>
                                        <td>{objet[2].Cocci_Gram_P}</td>
                                        <td><b>Cellules Epithelial</b></td>
                                        <td>{objet[2].Cellules_Epithelial}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bacciles Gram M</b></td>
                                        <td>{objet[2].Bacciles_Gram_M}</td>
                                        <td><b>Levures</b></td>
                                        <td>{objet[2].Levures}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bacciles G + </b></td>
                                        <td>{objet[2].Bacciles_G_P}</td>
                                        <td><b>Polynucleaires</b></td>
                                        <td>{objet[2].Polynucleaires}</td>
                                    </tr>
                                    <tr>
                                        <td><b>C epitheliales</b></td>
                                        <td>{objet[2].Cepitheliales}</td>
                                        <td><b>Culture</b></td>
                                        <td>{objet[2].Culture}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Sensibles</b></td>
                                        <td>{objet[2].Sensibles}</td>
                                        <td><b>Germes Isolees</b></td>
                                        <td>{objet[2].Germes_Isolees}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Intermediaires</b></td>
                                        <td>{objet[2].Intermediaires}</td>
                                        <td><b>Resistants</b></td>
                                        <td>{objet[2].Resistants}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><b>conclusion</b></td>
                                        <td colSpan={2}>{objet[2].conclusion}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                        {  (
                            objet[1].nature_examen === "Test de Grossesse Urinaire"
                            || objet[1].nature_examen === "Test de Grossesse Urinaire_Partenaires"
                            || objet[1].nature_examen === "Test de Grossesse Sanguin_Partenaires"
                            || objet[1].nature_examen === "Test de Grossesse Sanguin"
                        ) &&
                        <>
                            <center><h5>Test de Grossesse</h5></center>
                            <center style={{fontSize : 15}}>
                                <table style={{zIndex : 0, marginBottom : 30}}>
                                    <tr>
                                        <th>Item</th>
                                        <th>Resultat</th>
                                        <th>Interpretation</th>
                                    </tr>
                                    <tr>
                                        <td><b>Recherche de Beta HCG Plasmique</b></td>
                                        <td>{objet[2].Beta_HCG_Plasmique}</td>
                                        <td>
                                            Negatif : B-HCG plasmique inferieur au seul detectable <br />
                                            Positif : Presence des B-HCG plasmique evoquant une probable grossesse <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td> Nom de l'operateur :</td>
                                        <td align="center">{objet[1].nom_et_prenom}</td>
                                    </tr>
                                </table>
                                {/* <div style={{marginBottom : 170}}><FooterImpress /></div> */}
                                <div>{dateLocale}</div>
                            </center>
                        </>
                        }
                    </div>
                </div>
            <form name="f2" style={{marginTop : 30, background : "blue"}}>
            </form>
                {/* <button onClick={() => {}}>dkjna</button> */}
        </div>
    ) 
};
