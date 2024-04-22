import React, { useRef, useState } from 'react'
import { GoBack } from '../../../Components/GoBack'
import Constant from '../../../Constant';

const Nfs = (props) => {
    
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
                        Examen : "Nfs",
                        WCB : WCB.current.value,
                        LYM_D : LYM_D.current.value,
                        MID_D : MID_D.current.value,
                        GRA_D : GRA_D.current.value,
                        LYM_P : LYM_P.current.value,
                        MID_P : MID_P.current.value,
                        GRA_P : GRA_P.current.value,
                        RCC : RCC.current.value,
                        HGB : HGB.current.value,
                        HCT : HCT.current.value,
                        MCV : MCV.current.value,
                        MCH : MCH.current.value,
                        MCHC : MCHC.current.value,
                        RDW_SD : RDW_SD.current.value,
                        RDW_CU : RDW_CU.current.value,
                        PLT : PLT.current.value,
                        MPV : MPV.current.value,
                        PWD : PWD.current.value,
                        PCT : PCT.current.value,
                        P_LCR : P_LCR.current.value,
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

    const WCB = useRef(null)
    const LYM_D = useRef(null)
    const MID_D = useRef(null)
    const GRA_D = useRef(null)
    const LYM_P = useRef(null)
    const MID_P = useRef(null)
    const GRA_P = useRef(null)
    const RCC = useRef(null)
    const HGB = useRef(null)
    const HCT = useRef(null)
    const MCV = useRef(null)
    const MCH = useRef(null)
    const MCHC = useRef(null)
    const RDW_SD = useRef(null)
    const RDW_CU = useRef(null)
    const PLT = useRef(null)
    const MPV = useRef(null)
    const PWD = useRef(null)
    const PCT = useRef(null)
    const P_LCR = useRef(null)


  return (
    <div style={{background : "whitesmoke", height : "100%"}}>
        <GoBack handlclick={props.arriere}/>
        <center>
            <h4>NFS</h4>
            <form className='form-group form-group1 col-md-7' style={{display : "flex", justifyContent: "space-around"}} onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>WCB</td>
                        <td><input type="number" className="form-control" ref={WCB}/></td>
                    </tr>
                    <tr>
                        <td>LYM#</td>
                        <td><input type="number" className="form-control" ref={LYM_D}/></td>
                    </tr>
                    <tr>
                        <td>MID#</td>
                        <td><input type="number" className="form-control" ref={MID_D}/></td>
                    </tr>
                    <tr>
                        <td>GRA#</td>
                        <td><input type="number" className="form-control" ref={GRA_D}/></td>
                    </tr>
                    <tr>
                        <td>LYM%</td>
                        <td><input type="number" className="form-control" ref={LYM_P}/></td>
                    </tr>
                    <tr>
                        <td>MID%</td>
                        <td><input type="number" className="form-control" ref={MID_P}/></td>
                    </tr>
                    <tr>
                        <td>GRA%</td>
                        <td><input type="number" className="form-control" ref={GRA_P}/></td>
                    </tr>
                    <tr>
                        <td>RBC</td>
                        <td><input type="number" className="form-control" ref={RCC}/></td>
                    </tr>
                    <tr>
                        <td>HGB</td>
                        <td><input type="number" className="form-control" ref={HGB}/></td>
                    </tr>
                    <tr>
                        <td>HCT</td>
                        <td><input type="number" className="form-control" ref={HCT}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'><button className="btn btn-danger" onClick={props.arriere}>Annuler</button></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>MCV</td>
                        <td><input type="number" className="form-control" ref={MCV}/></td>
                    </tr>
                    <tr>
                        <td>MCH</td>
                        <td><input type="number" className="form-control" ref={MCH}/></td>
                    </tr>
                    <tr>
                        <td>MCHC</td>
                        <td><input type="number" className="form-control" ref={MCHC}/></td>
                    </tr>
                    <tr>
                        <td>RDW-SD</td>
                        <td><input type="number" className="form-control" ref={RDW_SD}/></td>
                    </tr>
                    <tr>
                        <td>RDW-CU</td>
                        <td><input type="number" className="form-control" ref={RDW_CU}/></td>
                    </tr>
                    <tr>
                        <td>PLT</td>
                        <td><input type="number" className="form-control" ref={PLT}/></td>
                    </tr>
                    <tr>
                        <td>MPV</td>
                        <td><input type="number" className="form-control" ref={MPV}/></td>
                    </tr>
                    <tr>
                        <td>PWD</td>
                        <td><input type="number" className="form-control" ref={PWD} /></td>
                    </tr>
                    <tr>
                        <td>PCT</td>
                        <td><input type="number" className="form-control" ref={PCT} /></td>
                    </tr>
                    <tr>
                        <td>P-LCR</td>
                        <td><input type="number" className="form-control" ref={P_LCR}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'><input type="submit" value={"Soumettre"} className="btn btn-primary" onClick={handleSubmit}/></td>
                    </tr>
                </table>
            </form>
        </center>
    </div>
  )
}

export default Nfs