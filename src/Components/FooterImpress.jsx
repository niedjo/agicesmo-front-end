import React from "react";

export default function FooterImpress() {
    const date1 = new Date()
    let dateLocale = date1.toLocaleString('fr-FR',{
        weekday : 'long',
        year : 'numeric',
        month : "long",
        day : "numeric",
        hour : 'numeric',
        minute : 'numeric',
        second : 'numeric'
    })
    return (
        <footer style={{marginTop : 50, paddingTop : 40}}>
            <div>{dateLocale}</div>
            <div style={{
                display : "flex",
                justifyContent : "center",
                width : "90%",
                color : "#fff",
                background : "#8080F0",
                fontWeight : "bold"
            }}>Niedjo Kuitche, PDG d'horizon</div>
        </footer>
    )
};
