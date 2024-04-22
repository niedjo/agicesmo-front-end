import React, { useState, useRef, useEffect } from "react";
import { GoBack } from "../Components/GoBack";
import { PagePrincipale } from "./PagePrincipale";
import './search.css'
import Constant from "../Constant";


export default function SignUp(props) {

    const [Info, setInfo] = useState([])

    useEffect(() => {

        function FetchData () {
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

        return () => {
            FetchData()
        };
    }, [])

    function jours_entre(date1, date2) {
        const UN_JOUR = 1000 * 60 * 60 * 24; // Le nombre de millisecondes dans une journée
        const difference_ms = date1 - date2; // Calculer la différence en millisecondes
        const difference_jours = Math.round(difference_ms / UN_JOUR); // Convertir en jours et retourner
        return difference_jours;
    }

    const [IsCoucou, setIsCoucou] = useState(true)
    const [IsOk, setIsOk] = useState(false)

    // les hook concernants le login 

    const nom = useRef(null)
    const mdp = useRef(null)
    const [Nom, setNom] = useState([])
    const [NomLogin, setNomLogin] = useState('')
    const [Mdp, setMdp] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // let ex = 0
        // Info.map((i, key) => 
        //     key === Info.length - 1 ? ex = (jours_entre(new Date(i.sinon_preciser), new Date())) : null
        // )
        // if (ex <= 0) {
        //     alert("Votre Licence est expiree. Veillez la renouveller en contactant horizon")
        // }
        
        for (let i = 0; i < Info.length; i++) {
            if (i === Info.length - 1) {
                console.log(jours_entre(new Date(Info[i].sinon_preciser), new Date()), Info[i].sinon_preciser);
                if ((jours_entre(new Date(Info[i].sinon_preciser), new Date())) <= 0) {
                    alert("Votre Licence est expiree. Veillez la renouveller en contactant horizon")
                    return
                }
            }
        }

        // n'oublie pas, c'est else if
        if (nom.current.value.length <= 0 || mdp.current.value.length <= 0) {
            alert("veillez remplir tous les champs")
        }
        else{
            fetch(
                `${Constant.ipUrl}getPersonnel.php`,
                {
                    method : "GET"
                }
            )
            .then(data => data.json())
            .then((body) => {
                // console.log(body)
                let i = 0
                body['personnel'].map(
                    p => {
                        i++
                        if (p.nom_et_prenom === nom.current.value && p.mot_de_passe === mdp.current.value) {
                            setNom([p.nom_statut, p.id, p.nom_et_prenom])
                            i--
                            setIsOk(!IsOk)
                            setNomLogin('')
                        }
                    }
                    )
                
                if (i === (body['personnel'].length) && IsOk === false) {
                    alert("erreur de nom d'utilisateur et / ou  de mot de passe. Veillez reessayer ")
                }
            }).catch(error => console.warn("Erreur : il s'agit de : " + error)) 
            // setNom(nom.current.value)
            // setNom([])
            // setMdp(mdp.current.value)
        }
    }

    const handleChange = (e) => {
        const rgx = /[a-z\s]/g
        const newNom = (e.target.value).replace(rgx, "")
        setNomLogin(newNom)
    }
  

    if (IsOk) {
        setTimeout(() => {
            setIsCoucou(false)
        }, 5000);
        return (
            <div className="c">
                {
                    IsCoucou ?
                    <center style={{paddingTop : 150}}>
                        <h3 className="hello col-md-5 col-xs-5 col-ls-5 col-lg-5">Bonjour M./Mme, {nom.current.value.toUpperCase()}</h3>
                    </center>
                    :
                    <div className="pagePrincipale">
                        <PagePrincipale param={Nom} arriere={() => {setIsOk(false); setIsCoucou(!IsCoucou);}}/>
                    </div>
                }
            </div>
        )
    }
        
    return (
        <div className="">
            <GoBack handlclick={props.handlclick}/>
            <br />
            <center style={{marginTop : 120}}>
                <h3>Connectez vous a votre compte</h3><br />
                <form className="form-group col-md-4 col-xs-4 col-ls-4 col-lg-4" onSubmit={handleSubmit}>
                    <label htmlFor="Nom">Nom d'utilisateur</label><br />
                    <input type="text" className="form-control uppercase" ref={nom} value={NomLogin} onChange={handleChange} /><br />
                    <label htmlFor="Mdp">Mot de passe</label><br />
                    <input type="password" className="form-control" ref={mdp}/><br />
                    <div style={{display : "flex", justifyContent:"space-around"}}>
                        <button className="btn btn-danger">Annuler</button>
                        <button className="btn btn-primary" onClick={handleSubmit}>Soumettre</button>
                    </div>
                </form>
            </center>
        </div>
    )
}