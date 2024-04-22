import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import { Tab, Tabs } from "../../Components/Tabs";
import './requettes/requettes.css'
import Constant from "../../Constant";

export default function PatientInfo(props) {

    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    // les usestates des resultats 
    const [Patients, setPatients] = useState([])
    const [Result, setResult] = useState([])
    const [Consultations, setConsultations] = useState([])
    const [Laboratoire, setLaboratoire] = useState([])
    const [Imagerie, setImagerie] = useState([])
    const [Pharmacie, setPharmacie] = useState([])
    const [Soin, setSoin] = useState([])
    const [Dette, setDette] = useState([])
    const [Screening_medicale, setScreening_medicale] = useState([])
    const [Administration, setAdministration] = useState([])
    const [Vaccination, setVaccination] = useState([])
    const [Echo2eT, setEcho2eT] = useState([])



    const [IdPatient, setIdPatient] = useState(false)
    const [Search, setSearch] = useState("1")
    
    useLayoutEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getFrequentations.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setPatients(body['patients'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))

            fetch(
                `${Constant.ipUrl}getScreeningMedicale.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setScreening_medicale(body['screening_medicale'])
                // alert("ok")
                console.log("component mounted", Screening_medicale)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))


            fetch(
                `${Constant.ipUrl}getPatientInfo.php`,
                {
                    method : "GET",
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setResult(body['informations'])
                setLaboratoire(body['informations1'])
                setImagerie(body['informations2'])
                setPharmacie(body['informations3'])
                setSoin(body['informations4'])
                setDette(body['informations5'])
                setEcho2eT(body['informations6'])
                setConsultations(body['informations7'])
                setAdministration(body['informations10'])
                setVaccination(body['informations11'])
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }

        return () => {
            FetchData()    
            setIdPatient(true)
        };
    }, [])

    const idPatient = useRef(null)

    const handleSearch = () => {
        let s = parseInt(idPatient.current.value)
        // s -= 1
        setSearch(s)
    }
    
    return (
        <div className="Requettes">
            <div style={{display : "flex", alignItems : "center", backgroundColor : "#7ba2db"}}>
                <GoBack handlclick={props.arriere}/>
                <h4>Informations sur un patient</h4>
                
                {/* {IdPatient ? JSON.stringify(Result[Search]) : "patientez..."} */}
            </div>
            <center style={{backgroundColor : "#7ba2db", paddingTop : 25, paddingBottom : 30, paddingLeft : 120, paddingRight : 20}}>
                <table>
                    <tbody>
                        <tr>
                            <td className="col-md-5">
                                {/* <input type="text" placeholder="Objet de la recherche" className="form-control"/> */}
                                <select className="form-control" ref={idPatient}>
                                    {IdPatient ? Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>) : ""}    
                                </select>
                            </td>
                            {/* le select avec un limit 1 */}
                            <td className="col-md-4"><button className="btn btn-primary" style={{background : "#054bb3", border : "2px solid blue"}} onClick={handleSearch}>Rechercher</button></td>
                        </tr>
                    </tbody>
                </table>
            </center>
            <center>
                <Tabs>
                    {/* on affiche chaque tab si le patient trouvee en base 
                    a fait le title dans la base et sinon, 
                    on dit desolee, le cleint "xxx" n'a pas ete enregitree dans votre centre */}
                    <Tab title="Frequentations">
                        <div>
                            {
                                IdPatient === true? 
                                Result.map(r => (
                                    r.code_patient === Search.toString() ? 
                                    <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={r.code_patient}>
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Date d'enregistrement</td>
                                                <td>{r.date_du_jour}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Date de naissance</td>
                                                <td>{r.date_nais}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Age</td>
                                                <td>{r.age}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Sexe</td>
                                                <td>{r.sexe}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Lieu de residence</td>
                                                <td>{r.lieu_de_residence}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Numero de telephone</td>
                                                <td>{r.numtel}</td>
                                            </tr>
                                            {/* <tr className="trr">
                                                <td>Raison de la venue</td>
                                                <td>{r.raison_de_la_venue === "Consultation" ? r.raison_de_la_venue + " (" + r.service + ")" : r.raison_de_la_venue}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                    : null
                                ))
                            : <h3>Chargement ...</h3>
                            }
                        </div>
                    </Tab> 
                    <Tab title="Consultations">
                        {
                                Consultations.map((r, key) => (
                                    r.code_patient_cons === Search.toString() && r.status_don === "1" ? 
                                    <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom du patient</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Type de consultations</td>
                                                <td>{r.type_de_consultation}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Expression des resultats</td>
                                                <td>{r.resultat}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_personnel}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : null
                                ))
                        }
                    </Tab>
                    <Tab title="Laboratoire"> 
                        {
                                Laboratoire.map((r, key) => (
                                    r.code_patient_lab === Search.toString() && r.status_don === "1" ? 
                                    <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom du patient</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nature de l'examen</td>
                                                <td>{r.nature_examen}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Quantitee</td>
                                                <td>{r.quantitee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Expression des resultats</td>
                                                <td>{r.expression_des_resultats}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Conclusion</td>
                                                <td>{r.conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : null
                                ))
                        }
                    </Tab>
                    <Tab title="Imagerie">
                        <div>
                            {
                                IdPatient === true? 
                                Imagerie.map((r, key) => (
                                    r.code_patient_fi === Search.toString() ? 
                                    <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                        {
                                        r.type_fiche_imagerie === "Echographie Pelvienne/Endovaginale" ? 
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Prescripteur</td>
                                                <td>{r.prescripteur}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Type Imagerie</td>
                                                <td style={{color : "red"}}>{r.type_fiche_imagerie}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Uterus Orientation</td>
                                                <td>{r.uterus_orientation}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Taille</td>
                                                <td>{r.taille}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Myometre</td>
                                                <td>{r.myometre}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre de myomes</td>
                                                <td>{r.si_myome_nombre}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Localisation et taille myome</td>
                                                <td>{r.localisation_et_taille_myome}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Endometre Echogeneticitee</td>
                                                <td>{r.Endometre_Echogeneticitee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Epaisseur de l'endometre</td>
                                                <td>{r.epaisseur_de_lendometre}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Structure de l'ovaire gauche</td>
                                                <td>{r.structure_de_lovaire_gauche}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>taille de l'ovaire gauche</td>
                                                <td>{r.taille_de_lovaire_gauche}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre de folecullecules antraux de l'ovaire gauche</td>
                                                <td>{r.nombre_de_folecullecules_antraux_de_lovaire_gauche}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Structure de l'ovaire droite</td>
                                                <td>{r.structure_de_lovaire_droite}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Taille de l'ovaire droite</td>
                                                <td>{r.taille_de_lovaire_droite}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre de folecullecules antraux de l'ovaire droite</td>
                                                <td>{r.nombre_de_folecullecules_antraux_de_lovaire_droite}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Conclusion</td>
                                                <td>{r.conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autres trouvailles</td>
                                                <td>{r.Autre_trouvailles}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autres elements de conclusion</td>
                                                <td>{r.Autres_elements_de_conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        r.type_fiche_imagerie === "Echographie Obstetricale depistage premier trimestre" ? 
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Type Imagerie</td>
                                                <td style={{color : "red"}}>{r.type_fiche_imagerie}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Uterus Orientation</td>
                                                <td>{r.uterus_orientation}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Taille</td>
                                                <td>{r.taille}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre dembryons</td>
                                                <td>{r.nombre_dembryons}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Mobilite spontanee</td>
                                                <td>{r.mobilite_spontanee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Activitee cardiaque</td>
                                                <td>{r.activitee_cardiaque}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Frequence cardiaque en BMP</td>
                                                <td>{r.frequence_cardiaque_en_BMP}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Longueur cranio caudale en mm</td>
                                                <td>{r.longueur_cranio_caudale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Sac gestationnel : taille en mm</td>
                                                <td>{r.sac_gestationnel_taille}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Epaisseur de la clarte nucale en mm</td>
                                                <td>{r.epaisseur_de_la_clarte_nucale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Age gestationnel</td>
                                                <td>{r.age_gestationnel}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Date probable d'accouchement</td>
                                                <td>{r.date_probable_daccouchement}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autre trouvailles</td>
                                                <td>{r.Autre_trouvailles}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Conclusion</td>
                                                <td>{r.conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autres elements de conclusion</td>
                                                <td>{r.Autres_elements_de_conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        r.type_fiche_imagerie === "Echographie Obstetricale depistage deuxiemme trimestre" ? 
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Type Imagerie</td>
                                                <td style={{color : "red"}}>{r.type_fiche_imagerie}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre de Foetus</td>
                                                <td>{r.nombre_dembryons}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Mobilite spontanee</td>
                                                <td>{r.mobilite_spontanee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Age gestationnel</td>
                                                <td>{r.age_gestationnel}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Date probable d'accouchement</td>
                                                <td>{r.date_probable_daccouchement}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Diametre biparietale en mm</td>
                                                <td>{r.diametre_bipartiel}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Contour de la boite craniene en mm</td>
                                                <td>{r.contour_de_la_boite_craniene}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Aspect de la paroie abdominale anterieur</td>
                                                <td>{r.aspect_de_la_boite_craniene_abdominale_anterieur}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Longueur femorale en mm</td>
                                                <td>{r.longueur_femorale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Diametre abdomino transversale</td>
                                                <td>{r.diametre_abdomino_transversale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Activitee cardiaque</td>
                                                <td>{r.activitee_cardiaque}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Frequence cardiaque en BMP</td>
                                                <td>{r.frequence_cardiaque_en_BMP}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Estimation du poids foetale en gramme</td>
                                                <td>{r.estimation_poids_foetale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Perimetre abdominale en mm</td>
                                                <td>{r.perimetre_abdominale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Volume amniotique en mm3</td>
                                                <td>{r.volume_amniotique}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>liquide amniotique</td>
                                                <td>{r.liquide_amniotique}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Aspect du trophoblaste ou placenta</td>
                                                <td>{r.aspect_du_trophoblaste_ou_placenta}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Presentation foetale</td>
                                                <td>{r.presentation_foetale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Sexe du foetus</td>
                                                <td>{r.sexe_du_foetus}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autre trouvailles</td>
                                                <td>{r.Autre_trouvailles}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Conclusion</td>
                                                <td>{r.conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autres elements de conclusion</td>
                                                <td>{r.Autres_elements_de_conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody> 
                                        :
                                        r.type_fiche_imagerie === "Echographie Obstetricale depistage deuxiemme et troisieme trimestre" ? 
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Type Imagerie</td>
                                                <td style={{color : "red"}}>{r.type_fiche_imagerie}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nombre de Foetus</td>
                                                <td>{r.nombre_dembryons}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Mobilite spontanee</td>
                                                <td>{r.mobilite_spontanee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Age gestationnel</td>
                                                <td>{r.age_gestationnel}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Date probable d'accouchement</td>
                                                <td>{r.date_probable_daccouchement}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Diametre biparietale en mm</td>
                                                <td>{r.diametre_bipartiel}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Contour de la boite craniene en mm</td>
                                                <td>{r.contour_de_la_boite_craniene}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Aspect de la paroie abdominale anterieur</td>
                                                <td>{r.aspect_de_la_boite_craniene_abdominale_anterieur}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Longueur femorale en mm</td>
                                                <td>{r.longueur_femorale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Diametre abdomino transversale</td>
                                                <td>{r.diametre_abdomino_transversale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Activitee cardiaque</td>
                                                <td>{r.activitee_cardiaque}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Frequence cardiaque en BMP</td>
                                                <td>{r.frequence_cardiaque_en_BMP}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Estimation du poids foetale en gramme</td>
                                                <td>{r.estimation_poids_foetale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Perimetre abdominale en mm</td>
                                                <td>{r.perimetre_abdominale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Volume amniotique en mm3</td>
                                                <td>{r.volume_amniotique}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>liquide amniotique</td>
                                                <td>{r.liquide_amniotique}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Aspect du trophoblaste ou placenta</td>
                                                <td>{r.aspect_du_trophoblaste_ou_placenta}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Presentation foetale</td>
                                                <td>{r.presentation_foetale}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Sexe du foetus</td>
                                                <td>{r.sexe_du_foetus}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autre trouvailles</td>
                                                <td>{r.Autre_trouvailles}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Conclusion</td>
                                                <td>{r.conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Autres elements de conclusion</td>
                                                <td>{r.Autres_elements_de_conclusion}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Nom de l'operateur</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody>    
                                        :
                                        null}
                                    </table>
                                    : null
                                ))
                            : <h3>Chargement ...</h3>
                            }
                            {
                                IdPatient === true?
                                Echo2eT.map((r, key) => (
                                    // r.type_fiche_imagerie = "echo";
                                    r.code_patient_echo2eT === Search.toString() && (
                                        <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                            <tbody>
                                                <tr className="trr">
                                                    <td>Nom et prenom</td>
                                                    <td>{r.nom}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Type imagerie</td>
                                                    <td style={{color : "red"}}>Echographie 2e trimestre</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>ID</td>
                                                    <td>{r.ID_Echo}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Date examen</td>
                                                    <td>{r.date_exam}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Indicateur</td>
                                                    <td>{r.indicateur}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Voie d'examen</td>
                                                    <td>{r.voie_exam}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Condition de realisation</td>
                                                    <td>{r.condition_realisation}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Nombre de foetus</td>
                                                    <td>{r.nombre_foetus}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Type de grossesse</td>
                                                    <td>{r.type_grossece}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Membrane</td>
                                                    <td>{r.membrane}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Activitee cardiaque</td>
                                                    <td>{r.activitee_cardiaque}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>RCF</td>
                                                    <td>{r.RFC}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>MAF</td>
                                                    <td>{r.MAF}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>AC</td>
                                                    <td>{r.AC}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>DAT</td>
                                                    <td>{r.DAT}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>LCC</td>
                                                    <td>{r.LCC}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>BIP</td>
                                                    <td>{r.BIP}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Clartee nucale</td>
                                                    <td>{r.clarte_nucale}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>HC</td>
                                                    <td>{r.HC}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Femur</td>
                                                    <td>{r.femur}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Terme</td>
                                                    <td>{r.terme}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Morphologie du pole cephalique</td>
                                                    <td>{r.morphologie_pole_cephalique}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Abdomen</td>
                                                    <td>{r.abdomen}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Aspect des membres</td>
                                                    <td>{r.aspect_des_membres}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Liquide Amniotique</td>
                                                    <td>{r.liquide_amniotique}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Localisation du Trophoblaste</td>
                                                    <td>{r.localisation_du_trophoblaste}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Aspect du Trophoblaste</td>
                                                    <td>{r.aspect_du_trophoblaste}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Deroulement</td>
                                                    <td>{r.deroulement}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>conclusion</td>
                                                    <td>{r.conclusion}</td>
                                                </tr>
                                                <tr className="trr">
                                                    <td>Nom de l'operateur</td>
                                                    <td>{r.nom_et_prenom}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) 
                                ))
                                : <h3>Chargement ...</h3>
                            }
                        </div>

                    </Tab>
                    <Tab title="Pharmacie">
                        {   IdPatient === true? 
                                Pharmacie.map((r, key) => (
                                    r.code_patient_achat === Search.toString() ? 
                                    <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                        <tbody>
                                            <tr className="trr" >
                                                <td>Nom et prenom</td>
                                                <td>{r.nom}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Date de l'achat</td>
                                                <td>{r.date_achat}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td className="">Intrant retire</td>
                                                <td>{r.intrant_retire}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Forme</td>
                                                <td>{r.forme}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Unite de mesure</td>
                                                <td>{r.quantitee}</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Unitee de vente</td>
                                                <td>{parseInt(r.prix) / parseInt(r.quantitee)}  FCFA</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Prix total</td>
                                                <td>{r.prix}  FCFA</td>
                                            </tr>
                                            <tr className="trr" >
                                                <td>Responsable</td>
                                                <td>{r.nom_et_prenom}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : null
                                ))
                            : <h3>Chargement ...</h3>}
                    </Tab>
                    <Tab title="Soins">
                    {   
                        IdPatient === true? 
                            Soin.map((r, key) => (
                                r.code_patient_soin === Search.toString() && r.status_don === "1" ? 
                                <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                    <tbody>
                                        <tr className="trr" >
                                            <td>Nom et prenom</td>
                                            <td>{r.nom}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Date du soin</td>
                                            <td>{r.date_exam}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Nature de l'examen</td>
                                            <td>{r.nature_examen}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Unite de mesure</td>
                                            <td>{r.quantitee}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Unitee de vente</td>
                                            <td>{parseInt(r.prix) / parseInt(r.quantitee)}  FCFA</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Prix total</td>
                                            <td>{r.prix}  FCFA</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Responsable</td>
                                            <td>{r.nom_et_prenom}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                            ))
                        : <h3>Chargement ...</h3>}
                    </Tab>
                    <Tab title="Dettes">
                    {   
                        IdPatient === true? 
                            Dette.map((r, key) => (
                                r.code_patient_dette === Search.toString() ? 
                                <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                    <tbody>
                                        <tr className="trr" >
                                            <td>Nom et prenom</td>
                                            <td>{r.nom_et_prenom}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Date de dette</td>
                                            <td>{r.date_de_dette}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Montant de Dette</td>
                                            <td>{r.montant_de_dette} FCFA</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Montant Soldee</td>
                                            <td>{r.montant_soldee} FCFA</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Responsable</td>
                                            <td>{r.nom_personnel}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                            ))
                        : <h3>Chargement ...</h3>}
                    </Tab>
                    <Tab title="Screening">
                    {   
                        IdPatient === true? 
                            Screening_medicale.map((r, key) => (
                                r.code_patient_sceen === Search.toString()? 
                                <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                    <tbody>
                                    <tr>
                                        <td><b>Resultat examen biologique : </b></td>
                                        <td>{r.resultat_examene_biologique}</td>
                                        <td><b>Antecedants personel : </b></td>
                                        <td>{r.antecedants_personel}</td>
                                        <td><b>Problemes de santee actuels : </b></td>
                                        <td>{r.problemes_de_santes_actuels}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Tousse depuis plus de deux semaines : </b></td>
                                        <td>{r.tousse_depuis_plus_de_deux_semaines}</td>
                                        <td><b>Transpiration nocturne : </b></td>
                                        <td>{r.transpiration_nocturne}</td>
                                        <td><b>Fievre persistante : </b></td>
                                        <td>{r.fievre_persistante}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Fatigue ou perte d'apetit : </b></td>
                                        <td>{r.fatigue_ou_perte_dapetit}</td>
                                        <td><b>Amaigrissement : </b></td>
                                        <td>{r.amaigrissement}</td>
                                        <td><b>Contact avec un tuberculeux : </b></td>
                                        <td>{r.contact_avec_un_tuberculeux}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Oederme de membre inferieur : </b></td>
                                        <td>{r.oederme_de_membre_inferieur}</td>
                                        <td><b>Est actuelement sous traitement de : </b></td>
                                        <td>{r.est_actuelement_sous_traitement_de}</td>
                                        <td><b>Date de derniere regle : </b></td>
                                        <td>{r.date_de_derniere_regle}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gravida para : </b></td>
                                        <td>{r.gravida_para}</td>
                                        <td><b>Autre histoire medicale : </b></td>
                                        <td>{r.autre_histoire_medicale}</td>
                                        <td><b>Element dalergie : </b></td>
                                        <td>{r.element_dalergie}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Profil toxicologique : </b></td>
                                        <td>{r.profil_toxicologique}</td>
                                        <td><b>Tension arteriele : </b></td>
                                        <td>{r.tension_arteriele}</td>
                                        <td><b>Poids : </b></td>
                                        <td>{r.poids}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Taille : </b></td>
                                        <td>{r.taille}</td>
                                        <td><b>Indice de masse corporelle : </b></td>
                                        <td>{r.indice_de_masse_corporelle}</td>
                                        <td><b>Nombre d'enfant accompagnant : </b></td>
                                        <td>{r.nombre_denfant_accompagnant}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bilan lesionnel : </b></td>
                                        <td>{r.bilan_lesionnel}</td>
                                        <td><b>Examen d'entree anormale : </b></td>
                                        <td>{r.examen_dentree_anormale}</td>
                                        <td><b>Blessure : </b></td>
                                        <td>{r.blessure}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Abus de substance : </b></td>
                                        <td>{r.abus_de_substance}</td>
                                        <td><b>Gale : </b></td>
                                        <td>{r.gale}</td>
                                        <td><b>Diarhee : </b></td>
                                        <td>{r.diarhee}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Probleme dentaire : </b></td>
                                        <td>{r.probleme_dentaire}</td>
                                        <td><b>Symptomes de tuberculoses : </b></td>
                                        <td>{r.symptomes_de_tuberculoses}</td>
                                        <td><b>IST : </b></td>
                                        <td>{r.IST}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Statut nutritionnel anormale : </b></td>
                                        <td>{r.statut_nutritionnel_anormale}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td colSpan={3} align="center">
                                            <b>Autre observations : </b>  
                                        </td>
                                        <td colSpan={3} align="center">
                                            {r.autre_observations}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} align="center">
                                            <b>Descisions ou actions : </b>  
                                        </td>
                                        <td colSpan={3} align="center">
                                            {r.descision_ou_action}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} align="center">
                                            <b>Nom de l'operateur :</b>  
                                        </td>
                                        <td colSpan={3} align="center">
                                            {r.nom_et_prenom}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                : null
                            ))
                        : <h3>Chargement ...</h3>}
                    </Tab>
                    <Tab title="Administration">
                    {   
                        IdPatient === true? 
                            Administration.map((r, key) => (
                                r.code_patient_admin === Search.toString() && r.status_don === "1" ? 
                                <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                    <tbody>
                                        <tr className="trr" >
                                            <td>Nom et prenom</td>
                                            <td>{r.nom_et_prenom}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Date de l'administration</td>
                                            <td>{r.date_administration}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Nature du document</td>
                                            <td>{r.nature_du_document}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Contenue du document</td>
                                            <td>{r.quantitee}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Nom du signataire</td>
                                            <td>{r.nom_personnel}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                            ))
                        : <h3>Chargement ...</h3>}
                    </Tab>
                    <Tab title="Vaccination">
                    {   
                        IdPatient === true? 
                            Vaccination.map((r, key) => (
                                r.code_patient_vacc === Search.toString() && r.status_don === "1" ? 
                                <table className="table table-bordered table-hover" style={{borderColor : "#555", width : "70%"}} key={key}>
                                    <tbody>
                                        <tr className="trr" >
                                            <td>Nom et prenom</td>
                                            <td>{r.nom_et_prenom}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Date de vaccination</td>
                                            <td>{r.date_exam}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Nature du vaccination</td>
                                            <td>{r.nature_du_vaccin}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Observation</td>
                                            <td>{r.observation}</td>
                                        </tr>
                                        <tr className="trr" >
                                            <td>Nom de l'operateur</td>
                                            <td>{r.nom_personnel}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                            ))
                        : <h3>Chargement ...</h3>}
                    </Tab>
                </Tabs>
            </center>
        </div>
    )
};
