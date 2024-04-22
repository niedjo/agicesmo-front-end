import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import './Achat.css'
import PrintFacture from "../impressionData/PrintFacture";
import Constant from "../../Constant";

export default function Soins(props) {
    const str = new Date().getUTCFullYear() + "-" + (parseFloat(new Date().getUTCMonth()) + 1).toString().padStart(2, '0') + "-" + new Date().getUTCDate().toString().padStart(2, '0')
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    top();

    const natureExam = [
        {id: "29", nature: "Accouchement Complexe", prix: 20000},
        {id: "30", nature: "Accouchement Gemelaire", prix: 17000},
        {id: "31", nature: "Accouchement Siège", prix: 15000},
        {id: "32", nature: "Accouchement Simple", prix: 12000},
        {id: "33", nature: "Aspiration U", prix: 25000},
        {id: "34", nature: "Certificats", prix: 1000},
        {id: "35", nature: "Circoncision 1 an ou plus", prix: 7000},
        {id: "36", nature: "Circoncision moins de 1 an", prix: 5000},
        {id: "37", nature: "Circoncision plus de 05 ans", prix: 15000},
        {id: "38", nature: "Curetage", prix: 30000},
        {id: "39", nature: "Hospitalisation", prix: 2500},
        {id: "40", nature: "Incision Complexe", prix: 1500},
        {id: "41", nature: "Incision simple", prix: 700},
        {id: "42", nature: "Injection IM", prix: 500},
        {id: "43", nature: "Injection IV", prix: 500},
        {id: "44", nature: "Observation", prix: 1500},
        {id: "45", nature: "Pansement complexe", prix: 1000},
        {id: "46", nature: "Pansement humide", prix: 700},
        {id: "47", nature: "Pansement simple", prix: 500},
        {id: "48", nature: "Petite chirurgie Complexe", prix: 6000},
        {id: "49", nature: "Petite chirurgie Simple", prix: 3000},
        {id: "50", nature: "Ponction", prix: 2000},
        {id: "51", nature: "Pose perfusion", prix: 500},
        {id: "52", nature: "Prelevement echantillon", prix: 500},
        {id: "53", nature: "Prise Parametres", prix: 100},
        {id: "54", nature: "Surveillance perfusion", prix: 500},
        {id: "55", nature: "Suture Complexe", prix: 2500},
        {id: "56", nature: "Suture simple", prix: 1000},
        {id: "57", nature: "Accouchement Macrosomie", prix: 15000},
        {id: "58", nature: "Dossier Medical", prix: 500},
        {id: "59", nature: "Lavage Oreille", prix: 3150},
        {id: "60", nature: "Tocolyse", prix: 5000},
        {id: "61", nature: "Percer Oreilles", prix: 1000},
        {id: "62", nature: "Chirurgie complexe", prix: 10000},
        {id: "63", nature: "stimulation", prix: 5000},
        {id: "64", nature: "Induction", prix: 5000},
        {id: "65", nature: "Aspiration nouveau né", prix: 1500},
        {id: "66", nature: "Episiotomie", prix: 500},
        {id: "67", nature: "Injection Speciale", prix: 5000},
        {id: "68", nature: "Infiltrations", prix: 10000},
        {id: "69", nature: "Hospitalisations Accouchements", prix: 5000},
        {id: "70", nature: "Soins Noveaux-nés", prix: 2000},
        {id: "71", nature: "Revision Uterine", prix: 3000},
        {id: "72", nature: "Soins Echo_Guidé", prix: 10000},
        {id: "73", nature: "soins Planning Familial", prix: 1000},
        {id: "74", nature: "Percer Oreilles", prix: 1000},
        {id: "75", nature: "K.O", prix: 1500},
        {id: "76", nature: "A.M.I", prix: 300},
        {id: "77", nature: "S.I.F", prix: 800},
        {id: "78", nature: "S.F", prix: 1000},
        {id: "79", nature: "Maturation cervicale", prix: 1500},
        {id: "80", nature: "Preparation cervicale", prix: 1500},
        {id: "81", nature: "Med.1", prix: 2500, "Designation complete du soin": "Hemovigilance"},
        {id: "82", nature: "Med.2", prix: 0, "Designation complete du soin": "Distribution des Medicaments"},
        {id: "83", nature: "Med.3", prix: 1000, "Designation complete du soin": "Catheter peripherique"},
        {id: "84", nature: "Med.4", prix: 2000, "Designation complete du soin": "Cathéter Central"},
        {id: "85", nature: "Med.5", prix: 2000, "Designation complete du soin": "Perfusions"},
        {id: "86", nature: "Med.6", prix: 500, "Designation complete du soin": "Injection Intramusculaire"},
        {id: "87", nature: "Med.7", prix: 500, "Designation complete du soin": "Injection Sous cutanée"},
        {id: "88", nature: "Med.8", prix: 1000, "Designation complete du soin": "Injection Intraveineuse"},
        {id: "89", nature: "Med.9", prix: 1500, "Designation complete du soin": "Injection Intradermique"},
        {id: "90", nature: "Med.10", prix: 500, "Designation complete du soin": "Entretien Infirmier"},
        {id: "91", nature: "Med.11", prix: 0, "Designation complete du soin": "Passation de service"},
        {id: "92", nature: "Med.12", prix: 10000, "Designation complete du soin": "Gestion de cas de décès"},
        {id: "93", nature: "Para.1", prix: 100, "Designation complete du soin": "Prise de temperature corporelle"},
        {id: "94", nature: "Para.2", prix: 200, "Designation complete du soin": "Surveillance de la frequece cardiaque"},
        {id: "95", nature: "Para.3", prix: 300, "Designation complete du soin": "Surveillance de la pression Arterielle"},
        {id: "96", nature: "Para.4", prix: 100, "Designation complete du soin": "Surveillance de la Frequence respiratoire"},
        {id: "97", nature: "Para.5", prix: 100, "Designation complete du soin": "Surveillance du Poids"},
        {id: "98", nature: "Para.6", prix: 100, "Designation complete du soin": "Surveillance des Mensurations"},
        {id: "99", nature: "Réa.1", prix: 1000, "Designation complete du soin": "Surveillance de la saturation en Oxygène"},
        {id: "100", nature: "Réa.2", prix: 5000, "Designation complete du soin": "Aspiration Endotrachéale"},
        {id: "101", nature: "Réa.3", prix: 5000, "Designation complete du soin": "Massage Cardique externe chez l'aldulte"},
        {id: "102", nature: "Réa.4", prix: 5000, "Designation complete du soin": "Oxygéno-therapie avec lunettes"},
        {id: "103", nature: "Réa.5", prix: 0, "Designation complete du soin": "Pose et surveillance d'un pousse seringue électrique"},
        {id: "104", nature: "Réa.6", prix: 3000, "Designation complete du soin": "Reanimation Cardio-respiratoire du Nouveau-né"},
        {id: "105", nature: "Uro.1", prix: 2000, "Designation complete du soin": "Surveillance de la Diurèse"},
        {id: "106", nature: "Uro.2", prix: 2500, "Designation complete du soin": "Pose d'une Sonde Urinaire par voie trans-uretrale"},
        {id: "107", nature: "Uro.3", prix: 1000, "Designation complete du soin": "Pose d'un étui penien chez l'aldulte (peniflow)"},
        {id: "108", nature: "Uro.4", prix: 1500, "Designation complete du soin": "Retrait d'une sonde urinaire"},
        {id: "109", nature: "Urg.1", prix: 1000, "Designation complete du soin": "Determination du score de Glasgow"},
        {id: "110", nature: "Chir.1", prix: 500, "Designation complete du soin": "Réalisation- Surveillance- renouvellement d'un pansement steril sur plaie aigue"},
        {id: "111", nature: "Chir.2", prix: 1000, "Designation complete du soin": "Abbaltion de fils"},
        {id: "112", nature: "Chir.3", prix: 0, "Designation complete du soin": "Lavage chirurgical des mains"},
        {id: "113", nature: "Chir.4", prix: 500, "Designation complete du soin": "Premier lever"},
        {id: "114", nature: "Chir.5", prix: 1000, "Designation complete du soin": "Pose de Bandage"},
        {id: "115", nature: "Chir.6", prix: 500, "Designation complete du soin": "Pose de Bandage de contention"},
        {id: "116", nature: "Chir.7", prix: 2000, "Designation complete du soin": "Surveillance de personne en Postopératoire"},
        {id: "117", nature: "Hyg.1", prix: 200, "Designation complete du soin": "lavage simple des mains"},
        {id: "118", nature: "Hyg.2", prix: 300, "Designation complete du soin": "Lavage hygiénique ou antiseptique des mains"},
        {id: "119", nature: "Hyg.3", prix: 100, "Designation complete du soin": "Friction Hydro-alcoolique des mains"},
        {id: "120", nature: "Hyg.4", prix: 1000, "Designation complete du soin": "Refection du lit"},
        {id: "121", nature: "Hyg.5", prix: 100, "Designation complete du soin": "Port et retrait du masque facial"},
        {id: "122", nature: "Lab.1", prix: 300, "Designation complete du soin": "Prelèvement veineux"},
        {id: "123", nature: "Lab.2", prix: 500, "Designation complete du soin": "Recueil d'urine"},
        {id: "124", nature: "Nurs.1", prix: 500, "Designation complete du soin": "Installation du patient"},
        {id: "125", nature: "Nurs.2", prix: 1000, "Designation complete du soin": "Aide à la Marche"},
        {id: "126", nature: "Nurs.3", prix: 500, "Designation complete du soin": "Prevention des chuttes"},
        {id: "127", nature: "Nurs.4", prix: 1000, "Designation complete du soin": "Soins d'escarres"},
        {id: "128", nature: "Nurs.5", prix: 2500, "Designation complete du soin": "Gavage"},
        {id: "129", nature: "Nurs.6", prix: 1000, "Designation complete du soin": "Bain de Bouche chez personne alitée"},
        {id: "130", nature: "Nurs.7", prix: 2500, "Designation complete du soin": "Toilette chez patient alité"},
        {id: "131", nature: "Nurs.8", prix: 0, "Designation complete du soin": "Apport Hydrique journalier chez personne dépendante absolue"},
        {id: "132", nature: "Visc.1", prix: 5000, "Designation complete du soin": "Lavement évacuateur"},
        {id: "133", nature: "Visc.2", prix: 5000, "Designation complete du soin": "Soin d'une stomie digestive laterale"},
        {id: "134", nature: "Gast.1", prix: 2500, "Designation complete du soin": "Pose d'une sonde naso-gastrique"},
        {id: "135", nature: "ORL.1", prix: 4000, "Designation complete du soin": "Lavage d'oreille"},
        {id: "136", nature: "ORL.2", prix: 2500, "Designation complete du soin": "Lavage de Sinus"},
        {id: "137", nature: "Oph.1", prix: 500, "Designation complete du soin": "Instillation de Collyre"},
        {id: "138", nature: "Oph.2", prix: 1000, "Designation complete du soin": "Lavage Occulaire"},
        {id: "139", nature: "Diab.1", prix: 500, "Designation complete du soin": "Mesure de la Glycemie Capillaire"},
        {id: "140", nature: "Diab.2", prix: 500, "Designation complete du soin": "Administration de l'insuline"},
        {id: "141", nature: "Diab.3", prix: 2500, "Designation complete du soin": "Gestion de l'hypoglycemie"},
        {id: "142", nature: "Obst.1", prix: 1500, "Designation complete du soin": "Surveillance menselle de la grosssesse"},
        {id: "143", nature: "Obst.2", prix: 10000, "Designation complete du soin": "Préparation Cervicale de 37 semaines"},
        {id: "144", nature: "Obst.3", prix: 15000, "Designation complete du soin": "pratique de l'accouchement simple"},
        {id: "145", nature: "Obst.4", prix: 20000, "Designation complete du soin": "pratique de l'accouchement complexe"},
        {id: "146", nature: "Obst.5", prix: 35000, "Designation complete du soin": "Pratique de l'accouchement par ventouse"},
        {id: "147", nature: "Obst.6", prix: 19400, "Designation complete du soin": "Kit d'accouchement"},
        {id: "148", nature: "Obst.7", prix: 25000, "Designation complete du soin": "Pratique de l'accouchement Gemellaire"},
        {id: "149", nature: "Obst.8", prix: 2000, "Designation complete du soin": "Revision Uterine Manuelle"},
        {id: "150", nature: "Obst.9", prix: 25000, "Designation complete du soin": "Revision Uterine Instrumentale"},
        {id: "151", nature: "Obst.9", prix: 30000, "Designation complete du soin": "Œuf Claire"},
        {id: "152", nature: "Obst.10", prix: 50000, "Designation complete du soin": "Grossesse Molaire"},
        {id: "153", nature: "Dplacement", prix: 2000, "Designation complete du soin": ""},
    ]

    const [Patients, setPatients] = useState([])
    const [Personnel, setPersonnel] = useState([])
    const [IsPrintFacture, setIsPrintFacture] = useState(false)
    const [CurrentPatient, setCurrentPatient] = useState()

    useEffect(() => {
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
                `${Constant.ipUrl}getPersonnel.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                setPersonnel([])
                body['personnel'].map(p => {
                    if(p.nom_statut === "Administrateur" || p.nom_statut === "Laborentain" || p.nom_statut ===  "Caissier"){
                        setPersonnel(x => [...x, p])
                    }
                })
                // alert("ok")
                // console.log("component mounted", Patients)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        }

        return () => {
            FetchData()    
        };
    }, [])

    const idPatient = useRef(null)
    // const DateExam = useRef()
    const NatureExam = useRef()
    // const qte = useRef()
    const prix = useRef()
    const reglement_client = useRef()
    const reste_a_payer = useRef()
    // const responsable = useRef()

    const [PrixTotal, setPrixTotal] = useState(0)
    const [Reglement_client, setReglement_client] = useState(0)
    const [Reste_a_payer, setReste_a_payer] = useState(0)

    if (IsPrintFacture) {
        return <PrintFacture 
            arriere = {() => setIsPrintFacture(false)} 
            content = {[{id : Date.now(), Exam : "Soins", TabNatureExam : [natureExam[NatureExam.current.value].nature], tab_qte : [1], tab_price : [prix.current.value]}]} 
            patient = {CurrentPatient}
            prix_total = {PrixTotal}
            reglement_client = {Reglement_client}
            reste_a_payer = {Reste_a_payer}
            stock = {[]}
        />
    }

    const handleChange = () => {
        prix.current.value = natureExam[NatureExam.current.value].prix
        reste_a_payer.current.value = prix.current.value - reglement_client.current.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const d = new Date().toLocaleString()
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        console.log(
            parseInt(idPatient.current.value),
            d,
            natureExam[NatureExam.current.value].nature,
            (prix.current.value).toString(),
            (reglement_client.current.value).toString(),
            (reste_a_payer.current.value).toString(),
            parseInt(props.Saver[1]),
        )

        
        try {
            const response = await fetch(
                `${Constant.ipUrl}setSoin.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : dateExam,
                        DateActuele : Date.now(),
                        NatureExam : natureExam[NatureExam.current.value].nature,
                        qte : (1).toString(),
                        prix : (prix.current.value).toString(),
                        reglement_client : (reglement_client.current.value).toString(),
                        reste_a_payer : (reste_a_payer.current.value).toString(),
                        responsable : "",
                        idSaver : parseInt(props.Saver[1]),
                        // nom_operateur : nom_operateur.current.value,
                        // returnSecureToken : true
                    })
                }
            )
    
            if (!response.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            alert("Soin Enregistree avec succes !")
        }

        Patients.map(p => p.code_patient === idPatient.current.value && setCurrentPatient(p))
        
        setPrixTotal(prix.current.value)
        setReglement_client(reglement_client.current.value)
        setReste_a_payer(reste_a_payer.current.value)
        
        setIsPrintFacture(true)
    }
    
    return(
        <div className="stockjour">
            <div style={{
                display : "flex", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 55, 
                alignItems : "center", 
                paddingRight : 60,
                }}
            >
                <GoBack handlclick={props.arriere}/>
                
                <h2 style={{color : "#333", textDecoration : "underline", marginLeft : "35%"}}>Soins</h2>
            </div>
            <center style={{paddingTop : 30}}>
                <form className="form-group form-group1 col-md-5" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Identifiant du patient</td>
                                <td>
                                    <select className="form-control" ref={idPatient}>
                                        {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Date du jour</td>
                                <td><input type="date" name="" className="form-control" ref={DateExam}/></td>
                            </tr> */}
                            <tr>
                                <td>Nature de l'examen</td>
                                <td>
                                    <select name="" className="form-control" ref={NatureExam} onChange={handleChange}>
                                        {natureExam.map((n, k) => <option key={k} value={k}>{n.nature}</option>)}
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>Quantite Sollicitee</td>
                                <td><input type="number" name="" className="form-control" ref={qte} onChange={handleChange}/></td>
                            </tr> */}
                            <tr>
                                <td>Prix</td>
                                <td><input type="number" name="" className="form-control" ref={prix} readOnly/></td>
                            </tr>
                            <tr>
                                <td>Reglement de client</td> {/* ce qu'il a donnee*/}
                                <td><input type="number" name="" className="form-control" ref={reglement_client} min={0} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td>Reste a payer</td> {/* ce qui lui reste a payer (sa dette)*/}
                                <td><input type="number" name="" className="form-control" ref={reste_a_payer} readOnly/></td>
                            </tr>
                            {/* <tr>
                                <td>Responsable</td>
                                <td>
                                    <select name="" className="form-control" ref={responsable}>
                                        {Personnel.map(p =>
                                            <option key={p.id} value={p.nom_et_prenom}>{p.nom_et_prenom}</option>
                                            )
                                        } 
                                    </select>
                                </td>
                            </tr> */}
                            <tr>
                                <td><button className="btn btn-danger"  onClick={(e) => {e.preventDefault()}}>Annuler</button></td>
                                <td align="right"><button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </center>
        </div>
    )
};
 