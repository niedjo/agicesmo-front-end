import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const Bandelette_Urinaire = (props) => {
    
    const [CounterTop, setCounterTop] = useState(1)
    
    function top(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if (CounterTop % 2 !== 0) {
        top()
        setCounterTop(2)
    }

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
                        Examen : "BANDELETTE URINAIRE",
                        PROTEINE : PROTEINE.current.value,
                        NITRITES : NITRITES.current.value,
                        GLUCOSE : GLUCOSE.current.value,
                        CETONES : CETONES.current.value,
                        BILIRUBINE : BILIRUBINE.current.value,
                        LEUCOCYTES : LEUCOCYTES.current.value,
                        HEMATIES : HEMATIES.current.value,
                        HUROBILINOGENE : HUROBILINOGENE.current.value,
                        DENSITE : DENSITE.current.value,
                        PH : PH.current.value,
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

    const PROTEINE = useRef(null)
    const NITRITES = useRef(null)
    const GLUCOSE = useRef(null)
    const CETONES = useRef(null)
    const BILIRUBINE = useRef(null)
    const LEUCOCYTES = useRef(null)
    const HEMATIES = useRef(null)
    const HUROBILINOGENE = useRef(null)
    const DENSITE = useRef(null)
    const PH = useRef(null)

  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>BANDELETTE URINAIRE</h4>
            <form className='form-group form-group1 col-md-5' style={{display : "flex", justifyContent: "space-around"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>PROTEINE</td>
                        <td><input type="text" className="form-control" ref={PROTEINE}/></td>
                    </tr>
                    <tr>
                        <td>NITRITES</td>
                        <td><input type="text" className="form-control" ref={NITRITES}/></td>
                    </tr>
                    <tr>
                        <td>GLUCOSE</td>
                        <td><input type="text" className="form-control" ref={GLUCOSE}/></td>
                    </tr>
                    <tr>
                        <td>CETONES</td>
                        <td><input type="text" className="form-control" ref={CETONES}/></td>
                    </tr>
                    <tr>
                        <td>BILIRUBINE</td>
                        <td><input type="text" className="form-control" ref={BILIRUBINE}/></td>
                    </tr>
                    <tr>
                        <td>LEUCOCYTES</td>
                        <td><input type="text" className="form-control" ref={LEUCOCYTES}/></td>
                    </tr>
                    <tr>
                        <td>HEMATIES</td>
                        <td><input type="text" className="form-control" ref={HEMATIES}/></td>
                    </tr>
                    <tr>
                        <td>HUROBILINOGENE</td>
                        <td><input type="text" className="form-control" ref={HUROBILINOGENE}/></td>
                    </tr>
                    <tr>
                        <td>DENSITE</td>
                        <td><input type="text" className="form-control" ref={DENSITE}/></td>
                    </tr>
                    <tr>
                        <td>PH</td>
                        <td><input type="text" className="form-control" ref={PH}/></td>
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

export default Bandelette_Urinaire
