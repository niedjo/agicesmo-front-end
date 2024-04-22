import React, { useState, useEffect } from "react"
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { GoBack } from "../Components/GoBack"
import { SavePeoples } from "./SousPagesPrincipales/SavePeoples"
import { Echo } from "./SousPagesPrincipales/Echo"
import Screening_Medicale from "./SousPagesPrincipales/Screening_Medicale"
import Administration from "./SousPagesPrincipales/Administration"
import Administration_op from "./SousPagesPrincipales/administration/Administration_op"
import Vaccination from "./SousPagesPrincipales/Vaccination"
import Vaccination_op from "./SousPagesPrincipales/vaccination/Vaccination_op"
import Laboratoire from "./SousPagesPrincipales/Laboratoire"
import Laboratoire_op from "./SousPagesPrincipales/Laboratoire/Laboratoire_op"
import Achat from "./SousPagesPrincipales/Achat"
import Login from "./Login"
import { StockJour } from "./SousPagesPrincipales/StockJour"
import StockGarde from "./SousPagesPrincipales/StockGarde"
import StockGlobale from "./SousPagesPrincipales/StockGlobale"
import { Search } from "../Components/Search"
import RDV from "./SousPagesPrincipales/RDV"
import PatientInfo from "./SousPagesPrincipales/PatientInfo"
import ParIntervale from "./SousPagesPrincipales/requettes/ParIntervale"
import ParJour from "./SousPagesPrincipales/requettes/ParJour"
import ParcoursPersonnel from "./SousPagesPrincipales/ParcoursPersonnel"
import SimpleParcour from "./SousPagesPrincipales/SimpleParcour"
import Imagerie from "./SousPagesPrincipales/Imagerie"
// import Imagerie_op from "./SousPagesPrincipales/imagerie/Imagerie_op"
import Soins from "./SousPagesPrincipales/Soin"
import Soins_op from "./SousPagesPrincipales/soins/Soin_op"
import RetraitCaisse from "./SousPagesPrincipales/Caisse/RetraitCaisse"
import VisualiserDettes from "./SousPagesPrincipales/Caisse/VisualiserDettes"
import Consultation from "./SousPagesPrincipales/Consultation"
import Consultation_op from "./SousPagesPrincipales/consultation/Consultation_op"
import FacturationGlobale from "./SousPagesPrincipales/FacturationGlobale"
import Constant from "../Constant"

export const PagePrincipale = (props) => {

    const [Info, setInfo] = useState([])
    const [IsStop, setIsStop] = useState(false)
    const [IsStop2, setIsStop2] = useState(false)
    let NbeDays = 0

    useEffect(() => {
 
            const yourEffectFunction = () => {
                fetch(
                    `${Constant.ipUrl}getEchoEnd.php`,
                    {
                        method : "GET",
                    }
                )
                .then(data => data.json())
                .then((body) => {
                    // console.log(body)
                    setInfo(body['informations2'])
                    // alert("ok")
                    // console.log("component mounted", Patients)
                }).catch(error => console.warn("Erreur : il s'agit de : " + error))
            }

            yourEffectFunction()

        // Définir l'intervalle pour répéter l'effet toutes les 4 heures
        const intervalId = setInterval(yourEffectFunction, 2 * 60 * 60 * 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    function jours_entre(date1, date2) {
        const UN_JOUR = 1000 * 60 * 60 * 24; // Le nombre de millisecondes dans une journée
        const difference_ms = date1 - date2; // Calculer la différence en millisecondes
        const difference_jours = Math.round(difference_ms / UN_JOUR); // Convertir en jours et retourner
        return difference_jours;
    }


    const [IsLogin, setIsLogin] = useState(false)

    const [IsDisplay0, setIsDisplay0] = useState(false)
    const [IsDisplay1, setIsDisplay1] = useState(false)
    const [IsDisplay2, setIsDisplay2] = useState(false)
    const [IsDisplay3, setIsDisplay3] = useState(false)

    // le hover de la recherche


    // n'oublie pas le ou les dreniers useState

    // les enregistrements medicaux
    const [IsSavePeoples, setIsSavePeoples] = useState(false)
    const [Isecho, setIsecho] = useState(false)
    const [isScreeningMedicale, setisScreeningMedicale] = useState(false)
    const [IsAdministration, setIsAdministration] = useState(false)
    const [IsAdministration_op, setIsAdministration_op] = useState(false)
    const [IsVaccination, setIsVaccination] = useState(false)
    const [IsVaccination_op, setIsVaccination_op] = useState(false)

    // la caisse
    const [IsLaboratoire, setIsLaboratoire] = useState(false)
    const [IsLaboratoire_op, setIsLaboratoire_op] = useState(false)
    const [IsConsultation, setIsConsultation] = useState(false)
    const [IsConsultation_op, setIsConsultation_op] = useState(false)
    const [IsAchat, setIsAchat] = useState(false)
    const [IsImagerie, setIsImagerie] = useState(false)
    // const [IsImagerie_op, setIsImagerie_op] = useState(false)
    const [IsSoins, setIsSoins] = useState(false)
    const [IsSoins_op, setIsSoins_op] = useState(false)
    const [IsFacturationGlobale, setIsFacturationGlobale] = useState(false)

    const [IsRetraitCaisse, setIsRetraitCaisse] = useState(false)
    const [IsVisualiserDettes, setIsVisualiserDettes] = useState(false)
    // const [IsGestionDettes, setIsGestionDettes] = useState(false)

    // les stocks
    const [IsStockJour, setIsStockJour] = useState(false)
    const [IsStockGarde, setIsStockGarde] = useState(false)
    const [IsStockGlobale, setIsStockGlobale] = useState(false)

    // la recherche
    const [IsRDV, setIsRDV] = useState(false)
    const [IsPatientInfo, setIsPatientInfo] = useState(false)
    const [IsParcourPersonnel, setIsParcourPersonnel] = useState(false)
    const [IsParcourPersonnel1, setIsParcourPersonnel1] = useState(false)
    const [IsParIntervale, setIsParIntervale] = useState(false)
    const [IsParJour, setIsParJour] = useState(false)

    // on verifie la validite de la licence

    for (let i = 0; i < Info.length; i++) {
        if (i === Info.length - 1) {
            NbeDays = jours_entre(new Date(Info[i].sinon_preciser), new Date())
            // console.log(jours_entre(new Date(Info[i].sinon_preciser), new Date()), Info[i].sinon_preciser);
            if ((jours_entre(new Date(Info[i].sinon_preciser), new Date())) <= 0) {
                // alert("Votre Licence est expiree. Veillez la renouveller en contactant horizon")
                return (
                    <div style={{background : "white", width : "100%", height : "100%"}}>
                        <center style={{paddingTop : "30%"}}>
                            <h5 style={{color : "red"}}>Votre licence a expiree. Veillez Contacter horizon pour la renouveller</h5>
                        </center>
                    </div>
                )
            }
            else if ((jours_entre(new Date(Info[i].sinon_preciser), new Date())) === 2 && !IsStop2) {
                alert("votre licence expire dans deux jours ! Veillez Contacter horizon pour la renouveller")
                setIsStop2(true)
                break;
            }
            else if ((jours_entre(new Date(Info[i].sinon_preciser), new Date())) === 1 && !IsStop) {
                alert("votre licence expire dans une journee ! Veillez Contacter horizon pour la renouveller")
                setIsStop(true)
                break;
            }
        }
    }

    if (IsRDV) {
        return (
            <RDV arriere = {() => setIsRDV(false)} Saver = {props.param} />
        )
    }
    else if (IsPatientInfo) {
        return (
            <PatientInfo arriere = {() => setIsPatientInfo(false)} />
        )
    }
    else if (IsParIntervale) {
        return (
            <ParIntervale arriere = {() => setIsParIntervale(false)}/>
        )
    }
    else if (IsParJour) {
        return (
            <ParJour arriere = {() => setIsParJour(false)}/>
        )
    }
    else if (IsParcourPersonnel) {
        return (
            <SimpleParcour arriere = {() => setIsParcourPersonnel(false)}/>
        )
    }
    else if (props.param[0] === "Laborentain" || props.param[0] === "Secretaire Medicale") {
        if (IsSavePeoples) {
            return (
                <SavePeoples arriere = {() => {setIsSavePeoples(false)}} idSaver = {props.param[1]}/>
            )
        }
        if (Isecho) {
            return (
                <Echo arriere = {() => {setIsecho(false)}} Saver = {props.param}/>
            )
        }
        if (isScreeningMedicale) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Screening_Medicale arriere = {() => {setisScreeningMedicale(false)}} Saver = {props.param}/>
            )
        }
        if (IsAdministration) {
            return (
                <Administration arriere = {() => {setIsAdministration(false)}} Saver = {props.param}/>
            )
        }
        if (IsVaccination) {
            return (
                <Vaccination arriere = {() => {setIsVaccination(false)}} Saver = {props.param}/>
            )
        }
        if (IsLaboratoire_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Laboratoire_op arriere = {() => {setIsLaboratoire_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsConsultation_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Consultation_op arriere = {() => {setIsConsultation_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsSoins_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Soins_op arriere = {() => {setIsSoins_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsAdministration_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Administration_op arriere = {() => {setIsAdministration_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsVaccination_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Vaccination_op arriere = {() => {setIsVaccination_op(false)}} Saver = {props.param}/>
            )
        }
        
        return (
            <div>
                <div style={{
                    display : "flex", 
                    backgroundColor : "#7ba2db", 
                    height : 150, 
                    alignItems : "center", 
                    }}
                >
                    <div style={{marginTop : -90, zIndex : 1, position : "absolute"}}>
                        <GoBack handlclick={props.arriere}/>
                    </div>
                    
                    <div style={{display : "flex", placeItems : "center", justifyContent : "center", width : "100%"}}>
                        <button className="i6"></button>
                    </div>
                    <Search 
                        rdv={() => setIsRDV(true)} 
                        patientinfo={() => setIsPatientInfo(true)} 
                        parIntervale={() => setIsParIntervale(true)}
                        parjour={() => setIsParJour(true)}
                        parcaurpersonnel={() => setIsParcourPersonnel(true)}
                        marginTop = "3%"
                    />
                    
                </div>
                <div className="container" style={{marginTop : -50}}>
                    <center style={{zIndex : 1, transform : "scale(1)", marginBottom : 1}}>
                        <div className="box col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 400, marginTop : "10%"}}>
                            <div className="libelle"> <i className="i1"></i> ENREGISTREMENT</div>
                            <button onClick={() => {setIsLaboratoire_op(true)}} style={{width : "310px"}}>Laboratoire</button>

                            <div 
                                className="facturer" 
                                style={{width : 310, zIndex : 2, position : "absolute", marginTop : 190}} 
                                onMouseOver={() => {setIsDisplay0(true)}} 
                                onMouseOut={() => {setIsDisplay0(false)}}
                            >
                                <div>Operations simples <span></span></div>
                                <button style={{display : IsDisplay0 ? "" : "none"}} onClick={() => {setIsConsultation_op(true); setIsDisplay0(false)}}>Consultation</button>
                                <button style={{display : IsDisplay0 ? "" : "none"}} onClick={() => {setIsSoins_op(true); setIsDisplay0(false)}}>soins</button>
                            </div>
                            <div 
                                className="operation" 
                                style={{width : 310, zIndex : 1, position : "absolute", marginTop : 290}}  
                                onMouseOver={() => {setIsDisplay1(true)}} 
                                onMouseOut={() => {setIsDisplay1(false)}}
                            >
                                <div>Operations speciales <span className={IsDisplay1 ? "r" : "rotate"}></span></div>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsecho(true); setIsDisplay1(false)}}>Saiaie Echo T1-T2</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setisScreeningMedicale(true); setIsDisplay1(false)}}>Sceening medicale</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsAdministration_op(true); setIsDisplay1(false)}}>Administrations</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsVaccination_op(true); setIsDisplay1(false)}}>Vaccination</button>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
    if (props.param[0] === "Gestionnaire") {
        if (IsStockJour) {
            return <StockJour arriere = {() => setIsStockJour(false)} idSaver = {props.param[1]} />
        }
        if (IsStockGarde) {
            return <StockGarde arriere = {() => setIsStockGarde(false)} idSaver = {props.param[1]}/>
        }
        if (IsStockGlobale) {
            return <StockGlobale arriere = {() => setIsStockGlobale(false)} idSaver = {props.param[1]}/>
        }
        return (
            <div>
                <div style={{
                    display : "flex", 
                    backgroundColor : "#7ba2db", 
                    height : 150, 
                    alignItems : "center", 
                    }}
                >
                    <div style={{marginTop : -90, zIndex : 1, position : "absolute"}}>
                        <GoBack handlclick={props.arriere}/>
                    </div>
                    
                    <div style={{display : "flex", placeItems : "center", justifyContent : "center", width : "100%"}}>
                        <button className="i6"></button>
                    </div>
                    <Search 
                        rdv={() => setIsRDV(true)} 
                        patientinfo={() => setIsPatientInfo(true)} 
                        parIntervale={() => setIsParIntervale(true)}
                        parjour={() => setIsParJour(true)}
                        parcaurpersonnel={() => setIsParcourPersonnel(true)}
                        marginTop = "3%"
                    />
                    
                </div>
                <div className="container" style={{marginTop : -80}}>
                    <center>
                        <div className="box col-md-6 col-xs-6 col-ls-6 col-lg-6" style={{height : 400, marginTop : "12%"}}>
                            <div className="libelle"> <i className="i2"></i> GESTION DES STOCKS</div>
                            <button style={{width : 310}} onClick={() => setIsStockJour(true)}>Stocks pharmacie du jour</button>
                            <button style={{width : 310}} onClick={() => setIsStockGarde(true)}>Stocks pharmacie de garde</button>
                            <button style={{width : 310}} onClick={() => setIsStockGlobale(true)}>Stocks Globales du centre</button>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
    if (props.param[0] === "Caissier") {
        if (IsLaboratoire) {
            return (
                <Laboratoire arriere = {() => {setIsLaboratoire(false)}} Saver = {props.param}/>
            )
        }
        if (IsAchat) {
            return (
                <Achat arriere = {() => {setIsAchat(false)}} Saver = {props.param}/>
            )
        }
        if (IsImagerie) {
            return (
                <Imagerie arriere = {() => {setIsImagerie(false)}} Saver = {props.param}/>
            )
        }
        if (IsSoins) {
            return (
                <Soins arriere = {() => {setIsSoins(false)}} Saver = {props.param}/>
            )
        }
        if (IsRetraitCaisse) {
            return (
                <RetraitCaisse arriere = {() => {setIsRetraitCaisse(false)}} Saver = {props.param}/>
            )
        }
        if (IsVisualiserDettes) {
            return (
                <VisualiserDettes arriere = {() => {setIsVisualiserDettes(false)}} Saver = {props.param}/>
            )
        }

        if (IsFacturationGlobale) {
            return (
                <FacturationGlobale arriere = {() => {setIsFacturationGlobale(false)}} Saver = {props.param}/>
            )
        }

        return (
            <div>
                <div style={{
                    display : "flex", 
                    backgroundColor : "#7ba2db", 
                    height : 150, 
                    alignItems : "center", 
                    }}
                >
                    <div style={{marginTop : -90, zIndex : 1, position : "absolute"}}>
                        <GoBack handlclick={props.arriere}/>
                    </div>
                    
                    <div style={{display : "flex", placeItems : "center", justifyContent : "center", width : "100%"}}>
                        <button className="i6"></button>
                    </div>
                    <Search 
                        rdv={() => setIsRDV(true)} 
                        patientinfo={() => setIsPatientInfo(true)} 
                        parIntervale={() => setIsParIntervale(true)}
                        parjour={() => setIsParJour(true)}
                        parcaurpersonnel={() => setIsParcourPersonnel(true)}
                        marginTop = "3%"
                    />
                </div>
                <div className="container">
                    <center style={{ paddingBottom : 100}}>
                        <div className="box col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 450}}>
                            <div className="libelle"><i className="i4"></i> OPERATION DE CAISSE</div>
                            <button style={{width : 310}} onClick={() => {setIsSavePeoples(true)}}>Enregistrer un patient</button>
                            <div 
                                className="facturer" 
                                style={{width : 310, zIndex : 1, position : "absolute", marginTop : 190}} 
                                onMouseOver={() => {setIsDisplay3(true)}} 
                                onMouseOut={() => {setIsDisplay3(false)}}
                            >
                                <div>Facturer un patient <span></span></div>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsFacturationGlobale(true); setIsDisplay3(false)}}>Facturation Globale</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsLaboratoire(true); setIsDisplay3(false)}}>Laboratoire</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsConsultation(true); setIsDisplay3(false)}}>Consultation</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsAchat(true); setIsDisplay3(false)}}>Achat</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsImagerie(true); setIsDisplay3(false)}}>Imagerie</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsSoins(true); setIsDisplay3(false)}}>Soins</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsAdministration(true); setIsDisplay3(false)}}>Administration</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsVaccination(true); setIsDisplay3(false)}}>Vaccination</button>
                            </div>
                            <button style={{width : 310, marginTop : 140}} onClick={() => setIsRetraitCaisse(true)}>Retrait de caisse</button>
                            <button style={{width : 310}} onClick={() => setIsVisualiserDettes(true)}>Visualise les dettes</button>
                        </div>
                    </center>
                </div>
            </div>
        )
    }

    if (props.param[0] === "Administrateur" ) {
        if (IsLogin) {
            return <Login handlclick={() => setIsLogin(false)}/> 
        }
        if (IsSavePeoples) {
            return (
                <SavePeoples arriere = {() => {setIsSavePeoples(false)}} idSaver = {props.param[1]}/>
            )
        }
        if (Isecho) {
            return (
                <Echo arriere = {() => {setIsecho(false)}} Saver = {props.param}/>
            )
        }
        if (isScreeningMedicale) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Screening_Medicale arriere = {() => {setisScreeningMedicale(false)}} Saver = {props.param}/>
            )
        }
        if (IsAdministration) {
            return (
                <Administration arriere = {() => {setIsAdministration(false)}} Saver = {props.param}/>
            )
        }
        if (IsAdministration_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Administration_op arriere = {() => {setIsAdministration_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsVaccination) {
            return (
                <Vaccination arriere = {() => {setIsVaccination(false)}} Saver = {props.param}/>
            )
        }
        if (IsVaccination_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Vaccination_op arriere = {() => {setIsVaccination_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsStockJour) {
            return <StockJour arriere = {() => setIsStockJour(false)} idSaver = {props.param[1]}/>
        }
        if (IsStockGarde) {
            return <StockGarde arriere = {() => setIsStockGarde(false)} idSaver = {props.param[1]}/>
        }
        if (IsStockGlobale) {
            return <StockGlobale arriere = {() => setIsStockGlobale(false)} idSaver = {props.param[1]}/>
        }
        if (IsLaboratoire) {
            return (
                <Laboratoire arriere = {() => {setIsLaboratoire(false)}} Saver = {props.param}/>
            )
        }
        if (IsLaboratoire_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Laboratoire_op arriere = {() => {setIsLaboratoire_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsFacturationGlobale) {
            return (
                <FacturationGlobale arriere = {() => {setIsFacturationGlobale(false)}} Saver = {props.param}/>
            )
        }
        if (IsConsultation) {
            return (
                <Consultation arriere = {() => {setIsConsultation(false)}} Saver = {props.param}/>
            )
        }
        if (IsConsultation_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Consultation_op arriere = {() => {setIsConsultation_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsAchat) {
            return (
                <Achat arriere = {() => {setIsAchat(false)}} Saver = {props.param}/>
            )
        }
        if (IsImagerie) {
            return (
                <Imagerie arriere = {() => {setIsImagerie(false)}} Saver = {props.param}/>
            )
        }
        if (IsParcourPersonnel1) {
            return (
                <ParcoursPersonnel arriere = {() => {setIsParcourPersonnel1(false)}} Saver = {props.param}/>
            )
        }
        if (IsSoins) {
            return (
                <Soins arriere = {() => {setIsSoins(false)}} Saver = {props.param}/>
            )
        }
        if (IsSoins_op) {
            return (
                // eslint-disable-next-line react/jsx-pascal-case
                <Soins_op arriere = {() => {setIsSoins_op(false)}} Saver = {props.param}/>
            )
        }
        if (IsRetraitCaisse) {
            return (
                <RetraitCaisse arriere = {() => {setIsRetraitCaisse(false)}} Saver = {props.param}/>
            )
        }
        if (IsVisualiserDettes) {
            return (
                <VisualiserDettes arriere = {() => {setIsVisualiserDettes(false)}} Saver = {props.param}/>
            )
        }
        return (
            <div>
                <div style={{
                    display : "flex", 
                    backgroundColor : "#7ba2db", 
                    height : 150, 
                    alignItems : "center",
                    }}
                >
                    <div style={{marginTop : -90, zIndex : 1, position : "absolute"}}>
                        <GoBack handlclick={props.arriere}/>
                    </div>
                    
                    <div className="flex2" style={{
                        display : "flex", 
                        placeItems : "center", 
                        justifyContent : "space-around", 
                        marginLeft : "15%",
                        width : "55%"
                        }}
                    >
                        <button className="btn btn-primary" style={{borderRadius : 50, background : "blue", padding : 10}} onClick={() => setIsLogin(true)}>Creer un nouveau compte</button>
                        <div style={{width : 100}}></div>
                        <button className="i6"></button>
                        <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={<Tooltip id={`tooltip-bottom`}>Votre licence expire dans {NbeDays} jours</Tooltip>}
                            >
                            {/* <Button variant="primary"> */}
                                <button className="i7"></button>
                            {/* </Button> */}
                        </OverlayTrigger>
                        {/* <button className="i7"></button> */}
                        <button className="i1" style={{width : 50, height : 50, borderRadius : "10pc", border : "none"}} onClick={() => setIsSavePeoples(true)}></button>
                    </div>
                    <Search 
                        rdv={() => setIsRDV(true)} 
                        patientinfo={() => setIsPatientInfo(true)} 
                        parIntervale={() => setIsParIntervale(true)}
                        parjour={() => setIsParJour(true)}
                        parcaurpersonnel={() => setIsParcourPersonnel(true)}
                        marginTop = "3%"
                    /> 
                </div>
                <div className="container">
                    <div className="row flex-admin">
                        <div className="box col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 400}}>
                            <div className="libelle"> <i className="i1"></i> ENREGISTREMENT</div>
                            <button onClick={() => {setIsLaboratoire_op(true)}} style={{width : "310px"}}>Laboratoire</button>

                            <div 
                                className="facturer" 
                                style={{width : 310, zIndex : 2, position : "absolute", marginTop : 190}} 
                                onMouseOver={() => {setIsDisplay0(true)}} 
                                onMouseOut={() => {setIsDisplay0(false)}}
                            >
                                <div>Operations simples <span></span></div>
                                <button style={{display : IsDisplay0 ? "" : "none"}} onClick={() => {setIsConsultation_op(true); setIsDisplay0(false)}}>Consultation</button>
                                <button style={{display : IsDisplay0 ? "" : "none"}} onClick={() => {setIsSoins_op(true); setIsDisplay0(false)}}>soins</button>
                            </div>
                            <div 
                                className="operation" 
                                style={{width : 310, zIndex : 1, position : "absolute", marginTop : 290}}  
                                onMouseOver={() => {setIsDisplay1(true)}} 
                                onMouseOut={() => {setIsDisplay1(false)}}
                            >
                                <div>Operations speciales <span className={IsDisplay1 ? "r" : "rotate"}></span></div>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsecho(true); setIsDisplay1(false)}}>Saiaie Echo T1-T2</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setisScreeningMedicale(true); setIsDisplay1(false)}}>Sceening medicale</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsAdministration_op(true); setIsDisplay1(false)}}>Administrations</button>
                                <button style={{display : IsDisplay1 ? "" : "none"}} onClick={() => {setIsVaccination_op(true); setIsDisplay1(false)}}>Vaccination</button>
                            </div>
                        </div>
                        <div className="box col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 490}}>
                            <div className="libelle"><i className="i4"></i> OPERATION DE CAISSE</div>
                            <button style={{width : 310}} onClick={() => {setIsSavePeoples(true)}}>Enregistrer un patient</button>
                            <div 
                                className="facturer" 
                                style={{width : 310, zIndex : 1, position : "absolute", marginTop : 190}} 
                                onMouseOver={() => {setIsDisplay3(true)}} 
                                onMouseOut={() => {setIsDisplay3(false)}}
                            >
                                <div>Facturer un patient <span></span></div>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsFacturationGlobale(true); setIsDisplay3(false)}}>Facturation Globale</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsLaboratoire(true); setIsDisplay3(false)}}>Laboratoire</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsConsultation(true); setIsDisplay3(false)}}>Consultation</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsAchat(true); setIsDisplay3(false)}}>Achat</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsImagerie(true); setIsDisplay3(false)}}>Imagerie</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsSoins(true); setIsDisplay3(false)}}>Soins</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsAdministration(true); setIsDisplay3(false)}}>Administration</button>
                                <button style={{display : IsDisplay3 ? "" : "none"}} onClick={() => {setIsVaccination(true); setIsDisplay3(false)}}>Vaccination</button>
                            </div>
                            <button style={{width : 310, marginTop : 140}} onClick={() => setIsRetraitCaisse(true)}>Retrait de caisse</button>
                            <button style={{width : 310}} onClick={() => setIsVisualiserDettes(true)}>Visualise les dettes</button>
                        </div>
                        <div className="box box-search col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 510}}>
                            <div className="libelle"> <i className="i3"></i> RECHERCHE</div>
                            <button style={{width : 310}} onClick={() => setIsRDV(true)}>Calendrier des rendez – vous</button>
                            <button style={{width : 310}} onClick={() => setIsPatientInfo(true)}>Information sur un patient</button>
                            <button style={{width : 310}} onClick={() => setIsParcourPersonnel1(true)}>Parcours du personnel</button>
                            {/* <button style={{width : 310}}>Requettes pour Rapport d'activitees</button> */}
                            <div className="operation" style={{width : 310}}  onMouseOver={() => {setIsDisplay2(true)}} onMouseOut={() => {setIsDisplay2(false)}}>
                            <div>Requettes <span className={IsDisplay2 ? "r" : "rotate"}></span></div>
                                <button style={{display : IsDisplay2 ? "" : "none"}} onClick={() => {setIsParIntervale(true); setIsDisplay2(false)}}>Par intervale</button>
                                <button style={{display : IsDisplay2 ? "" : "none"}} onClick={() => {setIsParJour(true); setIsDisplay2(false)}}>Par jour</button>
                            </div>
                        </div>
                        <div className="box col-md-5 col-xs-5 col-ls-5 col-lg-5" style={{height : 410}}>
                            <div className="libelle"> <i className="i2"></i> GESTION DES STOCKS</div>
                            <button style={{width : 310}} onClick={() => setIsStockJour(true)}>Stocks pharmacie du jour</button>
                            <button style={{width : 310}} onClick={() => setIsStockGarde(true)}>Stocks pharmacie de garde</button>
                            <button style={{width : 310}} onClick={() => setIsStockGlobale(true)}>Stocks Globales du centre</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h3>deslolee nous ne vous reconnaissons pas.</h3>
            <GoBack handlclick={props.arriere}/>
        </div>
    )

    
}