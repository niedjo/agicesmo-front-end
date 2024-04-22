import React from "react";

export const GoBack = (props) => {
    return (
        <button className="btn btn-primary" onClick={props.handlclick} style={{margin : 10}}>
            retourner en arriere
        </button>
    )
}