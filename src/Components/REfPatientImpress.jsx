import React from "react";

export default function REfPatientImpress(props) {

    const ID = props.ID
    const objet = props.objet

    return (
        <div style={{border : "1px solid #333", width : "90%", display : "flex", justifyContent : "space-between", margin : 20, padding : 10}}>
            <table style={{height : "10px"}}>
                <tr>
                    <td>Ref patient : </td>
                    <td>{ID.code_patient}</td>
                </tr>
                <tr>
                    <td>Date Examen : </td>
                    <td>{new Date(objet.date_examen).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Type Machine : </td>
                    <td>{objet.type_machine}</td>
                </tr>
                <tr>
                    <td>Indication : </td>
                    <td>{objet.indicateur}</td>
                </tr>
                <tr>
                    <td>Conditions Examen : </td>
                    <td>{objet.condition_examen}</td>
                </tr>
            </table>
            <table style={{height : "30px"}}>
                <tr>
                    <td>Nom et prenom : </td>
                    <td>{ID.nom_et_prenom}</td>
                </tr>
                <tr>
                    <td>Age : </td>
                    <td>{ID.age}</td>
                </tr>
                <tr>
                    <td>Sexe : </td>
                    <td>{ID.sexe}</td>
                </tr>
                <tr>
                    <td>Prescripteur : </td>
                    <td>{objet.prescripteur}</td>
                </tr>
                <tr>
                    <td>Type Sonde : </td>
                    <td>{objet.type_sonde}</td>
                </tr>
                <tr>
                    <td>DDR : </td>
                    <td>{new Date(objet.DDR).toLocaleDateString()}</td>
                </tr>
            </table>
        </div>
    )
    
};
