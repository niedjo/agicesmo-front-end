import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const ECBU = (props) => {

    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }


    const ASPECT = useRef(null)
    const COULEUR = useRef(null)
    const CELLULES_EPITHELIALE = useRef(null)
    const LUECOCYTES = useRef(null)
    const HEMATIES = useRef(null)
    const PARASITES = useRef(null)
    const CRISTAUX = useRef(null)
    const CYLINDRES = useRef(null)
    const CG_M = useRef(null)
    const CG_P = useRef(null)
    const BG_M = useRef(null)
    const BG_P = useRef(null)
    const PN = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const date = new Date();
        const dateExam = `${date.getFullYear()}-${((date.getMonth() + 1).toString()).padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${(date.getHours().toString().padStart(2, "0"))}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
        
        try {
            const response = await fetch(
                `${Constant.ipUrl}setExam.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        DateExam : dateExam,
                        true_date : props.DateExam,
                        Examen : "ECBU",
                        ASPECT : ASPECT.current.value,
                        COULEUR : COULEUR.current.value,
                        CELLULES_EPITHELIALE : CELLULES_EPITHELIALE.current.value,
                        LUECOCYTES : LUECOCYTES.current.value,
                        HEMATIES : HEMATIES.current.value,
                        PARASITES : PARASITES.current.value,
                        CRISTAUX : CRISTAUX.current.value,
                        CYLINDRES : CYLINDRES.current.value,
                        CG_M : CG_M.current.value,
                        CG_P : CG_P.current.value,
                        BG_M : BG_M.current.value,
                        BG_P : BG_P.current.value,
                        PN : PN.current.value,
                    })
                }
            )
    
            if (!response.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error);
        }
        
        try {
            const response2 = await fetch(
                `${Constant.ipUrl}makeExam.php`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        newDateExam : (dateExam).toString(),
                        DateExam : props.DateExam,
                        expression_des_resultats : "/",
                        responsable : parseInt(props.Saver[1]),
                        cesmo : "Laboratoire"
                        // penser a mettre a jour le responsable et le nom de l'operateur 
                    })
                }
            )      
            if (!response2.ok) {
                alert("probleme d'enregistrement, veillez reessayer")
                throw new Error("il y a une petite erreur")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            alert("Examen enregistree avec succes !")
        }
        

    }

  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        
        <center>
            <h4>EXAMEN CYTOBACTERIOLOGIQUE DES URINES</h4>
            <form className='form-group form-group1 col-md-8' style={{display : "flex", justifyContent: "space-around", alignItems : "center"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th colSpan={2} style={{color : "blue"}} align='left'> <h5>Etat frais</h5> </th>
                    </tr>
                    <tr>
                        <td>ASPECT</td>
                        <td>
                            <select className="form-control" ref={ASPECT}>
                                <option value="Limpide">Limpide</option>
                                <option value="Simple">Simple</option>
                                <option value="Complexe">Complexe</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>COULEUR</td>
                        <td>
                            <select className="form-control" ref={COULEUR}>
                                <option value="Rouge sombre">Rouge sombre</option>
                                <option value="Rouge vif">Rouge vif</option>
                                <option value="Jaune Sombre">Jaune Sombre</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>CELLULES EPITHELIALE</td>
                        <td>
                            <select className="form-control" ref={CELLULES_EPITHELIALE}>
                                <option value="Present">Present</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>LUECOCYTES</td>
                        <td>
                            <select className="form-control" ref={LUECOCYTES}>
                                <option value="Quelques (10/cps)">Quelques (10/cps)</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>HEMATIES</td>
                        <td>
                            <select className="form-control" ref={HEMATIES}>
                                <option value="Present">Present</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>PARASITES</td>
                        <td>
                            <select className="form-control" ref={PARASITES}>
                                <option value="Present">Present</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>CRISTAUX</td>
                        <td>
                            <select className="form-control" ref={CRISTAUX}>
                                <option value="Present">Present</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>CYLINDRES</td>
                        <td>
                            <select className="form-control" ref={CYLINDRES}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></td>
                    </tr>
                </table>
                <table style={{height : "92vh"}}>
                    <tr>
                        <th colSpan={2} style={{color : "blue"}} align='left'> <h5>Coloration GRAM</h5> </th>
                    </tr>
                    <tr>
                        <td>CG-</td>
                        <td>
                            <select className="form-control" ref={CG_M}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>CG+</td>
                        <td>
                            <select className="form-control" ref={CG_P}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>BG-</td>
                        <td>
                            <select className="form-control" ref={BG_M}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>BG+</td>
                        <td>
                            <select className="form-control" ref={BG_P}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>PN</td>
                        <td>
                            <select className="form-control" ref={PN}>
                                <option value="Quelques">Quelques</option>
                                <option value="Nombreux">Nombreux</option>
                                <option value="En quantitee suffisante">En quantitee suffisante</option>
                                <option value="Tres peu">Tres peu</option>
                                <option value="Abscent">Abscent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
        
        
        
        
        
        
        
        
        
        
        {/* <br />
        {props.DateExam}
        {dateExam}
        ECBU
        <br />
        {props.Saver[1]}
        <button onClick={handleSubmit}>soumettre</button> */}
    </div>
  )
}

export default ECBU