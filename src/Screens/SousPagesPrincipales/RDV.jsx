import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import BoutonModal from "../../Components/BoutonModal"
import './stock.css'
import './rdv.css'
import Constant from "../../Constant";

export default function RDV (props) {
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    function jours_entre(date1, date2) {
        const UN_JOUR = 1000 * 60 * 60 * 24; // Le nombre de millisecondes dans une journée
        const difference_ms = date1 - date2; // Calculer la différence en millisecondes
        const difference_jours = Math.round(difference_ms / UN_JOUR); // Convertir en jours et retourner
        return difference_jours;
    }

    const [Patients, setPatients] = useState([])
    const [Personnel, setPersonnel] = useState([])
    const [RDV, setRDV] = useState([])
    const [Count, setCount] = useState(1)
    const [Count2, setCount2] = useState(1)
    const [SearchValue, setSearchValue] = useState('')
    const [IsSpark, setIsSpark] = useState(false)
    const [CanRemerberInternally, setCanRemerberInternally] = useState(false)
    
    const recherche = useRef()

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
            if (Count % 2 !== 0) {
                FetchData()   
                setCount(c => c + 1) 
                setCount2(c => c + 1)
            }
        };
    }, [Count])

    useEffect(() => {
        const yourEffectFunction = () => {
            fetch(
                `${Constant.ipUrl}getRDV.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                setRDV(body["RDV"])
                setCount2(c => c + 1)
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        
        }
        yourEffectFunction()

        // Définir l'intervalle pour répéter l'effet toutes les 4 heures
        const intervalId = setInterval(yourEffectFunction, 10 * 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])


    const autoRemember = async (r) => {
        var myHeaders = new Headers();
            myHeaders.append("Authorization", Constant.apiKek);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

        var raw = JSON.stringify({
            "messages": [
                {
                    "destinations": [{"to": `237${r.numtel}`}],
                    "from": "AGICESMO",
                    "text": `Bonjour Mr/Mme ${r.nom_et_prenom}, vous avez rendez-vous demain au centre de santee ${Constant.nom_centre} a ${new Date(r.date_rdv).toLocaleTimeString()} pour ${r.motif}. \nSoyez a l'heure. \nMerci.`
                }
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            fetch("https://n82dny.api.infobip.com/sms/2/text/advanced", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.ok && response.status === 200) {
                    setCanRemerberInternally(true)
                    console.log("we can send");
                    return response.text()
                }
                else if (!response.ok && response.status === 401) {
                    alert("Votre compte de messagerie a atteint son expiration. Veillez la renouveler ou contacyer horizon pour plus d'informations")
                    // return response.text()
                }
                else if (!response.ok && response.status === 500) {
                    // alert("Votre compte de messagerie a atteint son expiration. Veillez la renouveler ou contacyer horizon pour plus d'informations")
                    // return response.text()
                }
                else {
                    console.log("poom poom");
                    alert("Votre compte de messagerie a atteint son expiration. Veillez la renouveler ou contacyer horizon pour plus d'informations");
                    setCanRemerberInternally(false)
                    //on pense au can remember internally
                }
            })
            .then(result => 
             {
                console.log(result); 
                if (result.includes("Message sent to next instance")) {
                    console.log("Le message a été envoyé avec succès !");
                }
            })
            .catch(error => console.warn("l'erreur c'est : ", error)); 
        } catch (error) {
            console.warn("l'erreur c'est : " + error)
            alert("impossible de se connecter, verifier votre connexion a internet")
        }

                if (CanRemerberInternally) {
                    try {
                        const response = await fetch(
                            `${Constant.ipUrl}setRememberRDV.php`,
                            {
                                method : "POST",
                                headers : {
                                    'Content-Type' : 'application/json'
                                },
                                body : JSON.stringify({
                                    idPatient : parseInt(r.id_rdv),
                                    // returnSecureToken : true
                                })
                            }
                        )

                        setCanRemerberInternally(false)
                        console.log("fetched");
                        setCount(c => c + 1)
                        setCount2(c => c + 1)
                        if (!response.ok) {
                            alert("probleme d'enregistrement, veillez reessayer")
                            throw new Error("il y a une petite erreur")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                
    }

    useEffect(() => {
        const yourEffectFunction = () => {
            for (let i = 0; i < RDV.length; i++) {
                const r = RDV[i];
                
                console.log("probleme");

                if (IsSpark && r.contacted === "0" && (jours_entre(new Date(r.date_rdv), new Date()) <= 1)) {
                    autoRemember(r)
                    console.log("probleme");
                    // return
                }
            }
        }

        yourEffectFunction()

        const intervalId = setInterval(yourEffectFunction, 10 * 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [Count2])

    const idPatient = useRef(null)
    const DateExam = useRef()
    const DateRDV = useRef()
    const motif = useRef()

    const cmpnt = (
        <table className="table">
            <tr>
                <td>Identifiant du patient</td>
                <td>
                    <select className="form-control" ref={idPatient}>
                        {Patients.map(p => <option key={p.code_patient} value={parseInt(p.code_patient)}>{p.nom_et_prenom}</option>)}    
                    </select>
                </td>
            </tr>
            <tr>
                <td>Date de prise en charge</td>
                <td><input type="datetime-local" className="form-control" ref={DateExam}/></td>
            </tr>
            <tr>
                <td>Date de Rendez-vous</td>
                <td><input type="datetime-local" className="form-control" ref={DateRDV}/></td>
            </tr>
            <tr>
                <td>Motif</td>
                <td>
                    <select className="form-control" ref={motif}>
                        <option value="Consultation de Suivie">Consultation de Suivie</option>
                        <option value="Prescription de medicaments">Prescription de medicaments</option>
                        <option value="Resultat des examens Medicaux">Resultat des examens Medicaux</option>
                        <option value="planification d'une intervention medicale">planification d'une intervention medicale</option>
                        <option value="Suivie Post operatoire">Suivie Post operatoire</option>
                        <option value="Vaccination">Vaccination</option>
                        <option value="Gestion des maladie chroniques">Gestion des maladie chroniques</option>
                        <option value="Consultation pour un deuxiemme avis">Consultation pour un deuxiemme avis</option>
                        <option value="Suivie de grossesse">Suivie de grossesse</option>
                        <option value="Evaluation de la sante generale">Evaluation de la sante generale</option>
                        <option value="Consultation de prevention">Consultation de prevention</option>
                    </select>
                </td>
            </tr>
        </table>
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${Constant.ipUrl}setRDV.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(idPatient.current.value),
                        DateExam : (DateExam.current.value).toString(),
                        DateRDV : (DateRDV.current.value).toString(),
                        motif : motif.current.value,
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
            alert("Rendez-vous programmee avec succes !")
            setCount(c => c + 1)
        }
    }

    const remember = async (id) => {
        // penser a donner un id a la table RDV
        try {
            const response = await fetch(
                `${Constant.ipUrl}setRememberRDV.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        idPatient : parseInt(id),
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
            alert("Rendez-vous Rappellee avec succes !")
            setCount(c => c + 1)
        }
    }

    function OnRequestConnexionClose (props) { 
        const Row1 = []
        const Row2 = []
        props.rdv.forEach((r, key) => {
          // if (produit.name.toLowerCase().indexOf(props.search.toLowerCase()) === -1) {
          //   return
          // }
          const recherche = r.nom_et_prenom.toLowerCase() + r.motif.toLowerCase() + new Date(r.date_de_prise_en_charge).toLocaleDateString().toLowerCase() + new Date(r.date_rdv).toLocaleDateString().toLowerCase()
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if ((jours_entre(new Date(r.date_rdv), new Date()) <= 3)  && (jours_entre(new Date(r.date_rdv), new Date()) >= 0)) {
            Row2.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom_et_prenom}</td>
                    <td className="">{r.numtel}</td>
                    <td className="">{r.nom_personnel}</td>
                    <td className="">{new Date(r.date_de_prise_en_charge).toLocaleString()}</td>
                    <td className="">{new Date(r.date_rdv).toLocaleString()}</td>
                    <td>{r.motif}</td>
                    <td>{r.contacted === "0" 
                    ? (!IsSpark ? <button className="btn btn-danger" style={{width : 120}} onClick={() => {remember(r.id_rdv)}}>
                        Rappeler
                      </button> : <div className="not-colled">Non Rappelee</div>) 
                    : <div className="called">Rappelee</div>}
                    </td>
                </tr>
              )
          }
          else{
            Row1.push(
                <tr align="center" key={key}>
                    <td className="">{r.nom_et_prenom}</td>
                    <td className="">{r.numtel}</td>
                    <td className="">{r.nom_personnel}</td>
                    <td className="">{new Date(r.date_de_prise_en_charge).toLocaleString()}</td>
                    <td className="">{new Date(r.date_rdv).toLocaleString()}</td>
                    <td>{r.motif}</td>
                    <td>{r.contacted === "0" 
                    ? (!IsSpark ? <button className="btn btn-danger" style={{width : 120}} onClick={() => {remember(r.id_rdv)}}>
                        Rappeler
                      </button> : <div className="not-colled">Non Rappelee</div>) 
                    : <div className="called">Rappelee</div>}
                    </td>
                </tr>
            )
          }
        })
        // console.warn('rendue');
        return (
            props.r1 ?
          <tbody>
            {Row2}
          </tbody>
           :
           <tbody>
            {Row1}
          </tbody>
        )
    }

    const setOnRequestConnexionClose = () => {
        setSearchValue(recherche.current.value)
    }

    
    return (
        <div className="stockjour">
            <div style={{
                display : "flex", 
                justifyContent : "space-between",
                backgroundColor : "#7ba2db", 
                paddingTop : 25, 
                paddingBottom : 30, 
                paddingLeft : 60, 
                paddingRight : 60}}
            >
                <GoBack handlclick={props.arriere}/>
                <h1>RDVs</h1>
                <BoutonModal buttonName="Definir un rendez-vous" cmpnt={cmpnt} handleSubmit={handleSubmit}/>
            </div>
            <center style={{backgroundColor : "#7ba2db", paddingBottom : 40}}>
                <div 
                    className="col-md-7" 
                    style={{display : "flex", justifyContent : "space-between"}}
                >
                    <input type="search" className="form-control" placeholder="Rechercher un rendez-vous" style={{borderColor : "blue"}} ref={recherche}/>
                    <button className="btn btn-primary" style={{marginLeft : "5%"}} onClick={setOnRequestConnexionClose}>Rechercher</button>
                </div>
            </center>
            <center>
                <h3 
                    className="col-md-7" 
                    style={{
                        paddingTop : 30, 
                        paddingBottom: 30, 
                        color : "blue", 
                        display : "flex", 
                        justifyContent : "space-around"
                    }}
                > 
                    <div>La liste des rendez-vous prevus </div> 
                    <div style={{color : "red"}}> dans moins de trois (03) jours </div>
                </h3>
                <div className="col-md-10" style={{backgroundColor : "aliceblue"}}>
                    <table className="table table-bordered" style={{borderColor : "blue", backgroundColor : "white"}}>
                        <thead>
                            <tr align="center">
                                <th>Nom du patient</th>
                                <th>Numero de telephone</th>
                                <th>Nom du personnel</th>
                                <th>Date de prise en charge</th>
                                <th>Date de rendez-vous</th>
                                <th>Motif</th>
                                <th>Contacter</th>
                            </tr>
                        </thead>
                        {RDV ? 
                        <OnRequestConnexionClose rdv = {RDV} search={SearchValue} r1={1}/>
                        : "chargement..."}
                    </table>
                </div>
                <h3 className="col-md-7" style={{paddingTop : 30, paddingBottom: 30, color : "blue"}}>Autres Rendez-Vous</h3>
                <div className="col-md-10">
                    <table className="table table-bordered" style={{borderColor : "blue", backgroundColor : "white"}}>
                        <thead>
                            <tr align="center">
                                <th>Nom du patient</th>
                                <th>Numero de telephone</th>
                                <th>Nom du personnel</th>
                                <th>Date de prise en charge</th>
                                <th>Date de rendez-vous</th>
                                <th>Motif</th>
                                <th>Contacter</th>
                            </tr>
                        </thead>
                        {RDV ? 
                        <OnRequestConnexionClose rdv = {RDV} search={SearchValue}/>
                        : "chargement..."}
                    </table>
                </div>
            </center>
        </div>
    )
}