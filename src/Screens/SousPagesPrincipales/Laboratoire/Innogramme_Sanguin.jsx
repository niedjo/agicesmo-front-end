import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const Innogramme_Sanguin = (props) => {
  
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

    const SODIUM = useRef(null)
    const POTASSIUM = useRef(null)
    const CHLORURE = useRef(null)
    const CALCIUM = useRef(null)
    const MAGNESIUM = useRef(null)

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
                        Examen : "Innogramme sanguin",
                        SODIUM : SODIUM.current.value,
                        POTASSIUM : POTASSIUM.current.value,
                        CHLORURE : CHLORURE.current.value,
                        CALCIUM : CALCIUM.current.value,
                        MAGNESIUM : MAGNESIUM.current.value,
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
            <h4>INNOGRAMME SANGUIN</h4>  
            <form className='form-group form-group1 col-md-5' onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>SODIUM (Na)</td>
                        <td><input type="number" className='form-control' ref={SODIUM} /></td>
                    </tr>
                    <tr>
                        <td>POTASSIUM (K)</td>
                        <td><input type="number" className="form-control" ref={POTASSIUM}/></td>
                    </tr>
                    <tr>
                        <td>CHLORURE (Cl)</td>
                        <td><input type="number" className="form-control" ref={CHLORURE}/></td>
                    </tr>
                    <tr>
                        <td>CALCIUM (Ca)</td>
                        <td><input type="number" className="form-control" ref={CALCIUM}/></td>
                    </tr>
                    <tr>
                        <td>MAGNESIUM (Mg2)</td>
                        <td><input type="number" className="form-control" ref={MAGNESIUM}/></td>
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

export default Innogramme_Sanguin
