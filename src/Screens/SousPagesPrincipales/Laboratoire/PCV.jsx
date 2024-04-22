import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from "../../../Constant";

const PCV = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const Col = useRef(null)
    const LEUCORHEES = useRef(null)
    const TEST_A_LA_PROSTATE = useRef(null)
    const PH = useRef(null)
    const CELLULES_EPITH = useRef(null)
    const LEUCOCYTES = useRef(null)
    const LEVURES = useRef(null)
    const TRICHOMONAS_VAGINALE = useRef(null)
    const CG_M = useRef(null)
    const CG_P = useRef(null)
    const BG_M = useRef(null)
    const BG_P = useRef(null)
    const COCOBACILLES = useRef(null)
    const CLUE_CELL = useRef(null)
    const FLORE_DE_DODERLEIN_Type = useRef(null)

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
                        Examen : "PCV",
                        Col : Col.current.value,
                        LEUCORHEES : LEUCORHEES.current.value,
                        TEST_A_LA_PROSTATE : TEST_A_LA_PROSTATE.current.value,
                        PH : PH.current.value,
                        CELLULES_EPITH : CELLULES_EPITH.current.value,
                        LEUCOCYTES : LEUCOCYTES.current.value,
                        LEVURES : LEVURES.current.value,
                        TRICHOMONAS_VAGINALE : TRICHOMONAS_VAGINALE.current.value,
                        CG_M : CG_M.current.value,
                        CG_P : CG_P.current.value,
                        BG_M : BG_M.current.value,
                        BG_P : BG_P.current.value,
                        COCOBACILLES : COCOBACILLES.current.value,
                        CLUE_CELL : CLUE_CELL.current.value,
                        FLORE_DE_DODERLEIN_Type : FLORE_DE_DODERLEIN_Type.current.value,
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
            console.log(error);
        }
        finally {
            alert("Examen enregistree avec succes !")
        }
        

    }
  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        
        <center>
            <h4>PRELEVEMENT CERVICO VAGINALE</h4>
            <form className='form-group form-group1 col-md-6' style={{display : "flex", justifyContent: "space-around", alignItems : "center"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>Col</td>
                        <td><input type="text" className="form-control" ref={Col}/></td>
                    </tr>
                    <tr>
                        <td>LEUCORHEES</td>
                        <td><input type="text" className="form-control" ref={LEUCORHEES}/></td>
                    </tr>
                    <tr>
                        <td>TEST A LA PROSTATE</td>
                        <td><input type="text" className="form-control" ref={TEST_A_LA_PROSTATE}/></td>
                    </tr>
                    <tr>
                        <td>PH</td>
                        <td><input type="number" className="form-control" ref={PH}/></td>
                    </tr>
                    <tr>
                        <td>CELLULES_EPITH</td>
                        <td><input type="text" className="form-control" ref={CELLULES_EPITH}/></td>
                    </tr>
                    <tr>
                        <td>LEUCOCYTES</td>
                        <td><input type="text" className="form-control" ref={LEUCOCYTES}/></td>
                    </tr>
                    <tr>
                        <td>LEVURES</td>
                        <td><input type="text" className="form-control" ref={LEVURES}/></td>
                    </tr>
                    <tr>
                        <td>TRICHOMONAS VAGINALE</td>
                        <td><input type="text" className="form-control" ref={TRICHOMONAS_VAGINALE}/></td>
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
                        <td>COCOBACILLES</td>
                        <td><input type="text" className="form-control" ref={COCOBACILLES}/></td>
                    </tr>
                    <tr>
                        <td>CLUE-CELL</td>
                        <td><input type="text" className="form-control" ref={CLUE_CELL}/></td>
                    </tr>
                    <tr>
                        <td>FLORE DE DODERLEIN Type</td>
                        <td><input type="text" className="form-control" ref={FLORE_DE_DODERLEIN_Type}/></td>
                    </tr>
                    <tr>
                        <td><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></td>
                        <td align='right'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default PCV