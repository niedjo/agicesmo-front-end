import React, { useState, useRef , useEffect } from "react";
import { GoBack } from "../../Components/GoBack";
import './stock.css'
import { Tab, Tabs } from "../../Components/Tabs";
import BoutonModal from "../../Components/BoutonModal";
import EntreeSortie from "./EntreeSortie";
import Constant from "../../Constant";

export default function ParcoursPersonnel(props) {
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(document.documentElement.scrollTop)
    }
    // top();
    
    const [Mouvement, setMouvement] = useState([])
    const [IsEntreeEtSortie, setIsEntreeEtSortie] = useState(false)
    const [SearchValue, setSearchValue] = useState('')
    const [Personnel, setPersonnel] = useState([])
    const recherche = useRef(null)
    const personnel = useRef(null)
    const periode_de_travail = useRef(null)

    useEffect(() => {
        function FetchData () {
            fetch(
                `${Constant.ipUrl}getMouvement.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                setMouvement(body['mouvement'])
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
                setPersonnel(body['personnel'])
                // alert("ok")
                // console.log("component mounted")
            }).catch(error => console.warn("Erreur : il s'agit de : " + error))
        }

        FetchData()

        const intervalId = setInterval(FetchData, 1000); // 4 heures en millisecondes

        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        return () => {
            top()
        };
    }, [])

    if (IsEntreeEtSortie) {
        return <EntreeSortie arriere = {() => setIsEntreeEtSortie(false)}/>
    }


    const handleSubmit = async () => {

        try {
            const response = await fetch(
                `${Constant.ipUrl}updateHoraire.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        periode_de_travail : parseInt(periode_de_travail.current.value),
                        idSaver : parseInt(personnel.current.value),
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
            alert("Horaire de travail modifiee avec succes !")
        }

    }

    const cmpnt = (<>
        <form className="form-group">
            <table className="table">
                <tr>
                    <td>Nom du personnel</td>
                    <td>
                        <select className="form-control" style={{border : "1px solid blue"}} ref={personnel}>
                            {Personnel.map((p, key) =>
                                <option key={key} value={p.id}>{p.nom_et_prenom}</option>
                                )
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Periode de travail</td>
                    <td>
                        <select className="form-control" ref={periode_de_travail}>
                            <option value="0">Premiere periode</option>
                            <option value="1">Deuxiemme periode</option>
                            <option value="2">troisiemme periode</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
    </>)




    function OnRequestConnexionClosed (props) { 
        const Row1 = []
        const Row2 = []
        const Row3 = []

        let currentDate1 = new Date()
        let currentDate2 = new Date()
        let currentDate3 = new Date()
        props.mouvement.forEach((s, key) => {
            
          const recherche = s.nom_et_prenom.toLowerCase() + new Date(s.date_et_heure_entree).toLocaleDateString().toLowerCase() + new Date(s.date_et_heure_sortie).toLocaleDateString().toLowerCase()
          
          if (recherche.indexOf(props.search.toLowerCase()) === -1) {
            return
          }
          if (s.periode_de_travail === "0") {
            if (currentDate1.toLocaleDateString() !== new Date(s.date_et_heure_entree).toLocaleDateString()) {
                currentDate1 = new Date(s.date_et_heure_entree)
                Row1.push(
                    <tr>
                        <td colSpan={4} align="center" style={{color : "blue"}}>{currentDate1.toLocaleDateString() === new Date().toLocaleDateString() 
                        ?  "Aujourd'hui"
                        : currentDate1.toLocaleDateString()}</td>
                    </tr>
                )
            }
            let ecart0 = Math.abs(new Date(s.date_et_heure_sortie).getHours() - currentDate1.getHours(s.date_et_heure_entree))
            Row1.push(
                <tr align="center" key={key}>
                    <td className="">{s.nom_et_prenom}</td>
                    <td>{new Date(s.date_et_heure_entree).toLocaleString()}</td>
                    <td>{s.date_et_heure_sortie === "" ? <div style={{color : "red"}}>Pas Encore</div> : new Date(s.date_et_heure_sortie).toLocaleString()}</td>
                    <td>{((new Date(s.date_et_heure_entree).getHours() >= 8 && new Date(s.date_et_heure_entree).getHours() <= 16) && (new Date(s.date_et_heure_sortie).getHours() >= 8 && new Date(s.date_et_heure_sortie).getHours() <= 16)) ? <div style={{color : "blue"}}>OUI ({ecart0} heure (s))</div> : <div style={{color : "red"}}>NON</div>}</td>
                </tr>
            )
          }
          
          if (s.periode_de_travail === "1") {
            if (currentDate2.toLocaleDateString() !== new Date(s.date_et_heure_entree).toLocaleDateString()) {
                currentDate2 = new Date(s.date_et_heure_entree)
                Row2.push(
                    <tr>
                        <td colSpan={4} align="center" style={{color : "blue"}}>{currentDate2.toLocaleDateString() === new Date().toLocaleDateString() 
                        ?  "Aujourd'hui"
                        : currentDate2.toLocaleDateString()}</td>
                    </tr>
                )
            }
            let ecart1 = Math.abs(new Date(s.date_et_heure_sortie).getHours() - currentDate2.getHours(s.date_et_heure_entree))
            Row2.push(
                <tr align="center" key={key}>
                    <td className="">{s.nom_et_prenom}</td>
                    <td>{new Date(s.date_et_heure_entree).toLocaleString()}</td>
                    <td>{s.date_et_heure_sortie === "" ? <div style={{color : "red"}}>Pas Encore</div> : new Date(s.date_et_heure_sortie).toLocaleString()}</td>
                    <td>{((new Date(s.date_et_heure_entree).getHours() >= 16 && new Date(s.date_et_heure_entree).getHours() <= 23) && (new Date(s.date_et_heure_sortie).getHours() >= 16 && new Date(s.date_et_heure_sortie).getHours() <= 23)) ? <div style={{color : "blue"}}>OUI ({ecart1} heure (s))</div> : <div style={{color : "red"}}>NON</div>}</td>
                </tr>
            )
          }
          
          if (s.periode_de_travail === "2") {
            if (currentDate3.toLocaleDateString() !== new Date(s.date_et_heure_entree).toLocaleDateString()) {
                currentDate3 = new Date(s.date_et_heure_entree)
                Row3.push(
                    <tr>
                        <td colSpan={4} align="center" style={{color : "blue"}}>{
                        currentDate3.toLocaleDateString() === new Date().toLocaleDateString() 
                        ?  "Aujourd'hui"
                        : currentDate3.toLocaleDateString()}</td>
                    </tr>
                )
            }
            let ecart2 = Math.abs(new Date(s.date_et_heure_sortie).getHours() - currentDate3.getHours(s.date_et_heure_entree))
            Row3.push(
                <tr align="center" key={key}>
                    <td className="">{s.nom_et_prenom}</td>
                    <td>{new Date(s.date_et_heure_entree).toLocaleString()}</td>
                    <td>{s.date_et_heure_sortie === "" ? <div style={{color : "red"}}>Pas Encore</div> : new Date(s.date_et_heure_sortie).toLocaleString()}</td>
                    <td>{((new Date(s.date_et_heure_entree).getHours() >= 0 && new Date(s.date_et_heure_entree).getHours() <= 8) && (new Date(s.date_et_heure_sortie).getHours() >= 0 && new Date(s.date_et_heure_sortie).getHours() <= 8)) ? <div style={{color : "blue"}}>OUI ({ecart2} heure (s))</div> : <div style={{color : "red"}}>NON</div>}</td>
                </tr>
            )
          }
          
        })
        // console.warn('rendue');
        return (
          <tbody>
            {
                props.r1 ? Row1
                : props.r2 ? Row2
                : Row3

            }
          </tbody>
        )
    }

    const setOnRequestConnexionClosed = () => {
        setSearchValue(recherche.current.value)
    }

    return (
        <div className="stockjour">
            <div style={{
                display : "flex", 
                justifyContent : "space-around",
                alignItems : "center", 
                backgroundColor : "#7ba2db", 
                paddingBottom : 50,
                paddingTop : 20
                }}
            >
                <GoBack handlclick={props.arriere}/>
                <center><h1 style={{textDecoration : "underline"}}>Les Parcours du personnel</h1></center>
                <BoutonModal buttonName="Programmer les horaires" cmpnt = {cmpnt} handleSubmit = {handleSubmit} />
                {/* <button onClick={() => setIsEntreeEtSortie(true)}>mouvement</button> */}
            </div>
            <center style={{backgroundColor : "#7ba2db"}}>
                <div className="col-md-4" style={{paddingBottom : 30, display : "flex", justifyContent : "space-evenly"}}>
                    <input type="search" name="" id="" className="form-control" placeholder="rechercher un mouvement" ref={recherche} style={{width : 300}}/>
                    <button className="btn btn-primary" onClick={setOnRequestConnexionClosed}>rechercher</button>
                </div>
            </center>
            <center>
                <Tabs>
                    <Tab title="Premiere periode">
                        <center className="col-md-10">
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du personnel</th>
                                        <th>Heure d'Entree</th>
                                        <th>Heure de Sortiee</th>
                                        <th>Discipline et duree de travail</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClosed mouvement = {Mouvement} r1 = {1} search = {SearchValue} />}
                            </table>
                        </center>
                    </Tab>
                    <Tab title="Deuxieme periode">
                        <center className="col-md-10">
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du personnel</th>
                                        <th>Heure d'Entree</th>
                                        <th>Heure de Sortiee</th>
                                        <th>Discipline et duree de travail</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClosed mouvement = {Mouvement} r2 = {1} search = {SearchValue} />}
                            </table>
                        </center>
                    </Tab>
                    <Tab title="Troisieme periode">
                        <center className="col-md-10">
                            <table className="table table-bordered table-hover" style={{borderColor : "blue"}}>
                                <thead>
                                    <tr align="center">
                                        <th>Nom du personnel</th>
                                        <th>Heure d'Entree</th>
                                        <th>Heure de Sortiee</th>
                                        <th>Discipline et duree de travail</th>
                                    </tr>
                                </thead>
                                {<OnRequestConnexionClosed mouvement = {Mouvement} search = {SearchValue} />}
                            </table>
                        </center>
                    </Tab>
                </Tabs>
            </center>
        </div>
    )
};
