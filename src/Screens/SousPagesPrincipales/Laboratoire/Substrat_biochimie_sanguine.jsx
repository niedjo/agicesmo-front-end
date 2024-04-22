import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const Substrat_biochimie_sanguine = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const UREE = useRef(null)
    const CREATININE = useRef(null)
    const ACIDE_URIQUE = useRef(null)
    const ALBUMINE_SANGUIN = useRef(null)
    const GLYCEMIE_URGENCE = useRef(null)
    const GLYCEMIE_A_JEUNE = useRef(null)
    const GLYCEMIE_POST_PRANDIALE = useRef(null)

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
                        Examen : "Substrat de biochimie sanguine",
                        UREE : UREE.current.value,
                        CREATININE : CREATININE.current.value,
                        ACIDE_URIQUE : ACIDE_URIQUE.current.value,
                        ALBUMINE_SANGUIN : ALBUMINE_SANGUIN.current.value,
                        GLYCEMIE_URGENCE : GLYCEMIE_URGENCE.current.value,
                        GLYCEMIE_A_JEUNE : GLYCEMIE_A_JEUNE.current.value,
                        GLYCEMIE_POST_PRANDIALE : GLYCEMIE_POST_PRANDIALE.current.value,
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
            <h4>Substrat de biochimie sanguine</h4>
            <form className='form-group form-group1 col-md-5' onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>UREE</td>
                        <td><input type="number" className="form-control" ref={UREE}/></td>
                    </tr>
                    <tr>
                        <td>CREATININE</td>
                        <td><input type="number" className="form-control" ref={CREATININE}/></td>
                    </tr>
                    <tr>
                        <td>ACIDE URIQUE</td>
                        <td><input type="number" className="form-control" ref={ACIDE_URIQUE}/></td>
                    </tr>
                    <tr>
                        <td>ALBUMINE SANGUIN</td>
                        <td><input type="number" className="form-control" ref={ALBUMINE_SANGUIN}/></td>
                    </tr>
                    <tr>
                        <td>GLYCEMIE d'URGENCE</td>
                        <td><input type="number" className="form-control" ref={GLYCEMIE_URGENCE}/></td>
                    </tr>
                    <tr>
                        <td>GLYCEMIE A JEUNE</td>
                        <td><input type="number" className="form-control" ref={GLYCEMIE_A_JEUNE}/></td>
                    </tr>
                    <tr>
                        <td>GLYCEMIE POST PRANDIALE</td>
                        <td><input type="number" className="form-control" ref={GLYCEMIE_POST_PRANDIALE}/></td>
                    </tr>
                    <tr>
                        <td align='center'><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></td>
                        <td align='right'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default Substrat_biochimie_sanguine