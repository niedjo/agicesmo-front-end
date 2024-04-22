import React, { useState } from "react"
import './tab.css'

export const Tabs = (props) => {
    // const tabs = React.Children.toArray(props.children) // recuperer les children
    // const tabs = React.Children.toArray(props.children).map(c => c.props.title) // recuperer les titres de chaque children

    const tabs = React.Children.toArray(props.children)
    const [Courent, setCourent] = useState(tabs[0].key)
    const newTabs = tabs.map(child => {
        return React.cloneElement(child, {selectionnee : child.key === Courent}) 
    })
    // console.log(tabs) 
    const cssTab = "col-md-3 col-xs-3 col-ls-3 col-lg-3"

    return <div className="contenus">
                <div className="navTab"> {/*ajouter une row pour le responsive*/} 
                    {
                        tabs.map(l => <span className={l.key === Courent ? "tabActive " + cssTab : "tab " + cssTab} onClick={() => setCourent(l.key)} key={l.key}>
                            {l.props.title}
                        </span> )
                    }
                </div>
                <div className="contenu" style={{height : "220vh", background : "aliceblue"}}>
                    {newTabs}
                </div>
        </div>
}

export const Tab = (props) => {
    return <div hidden={!props.selectionnee}>
        {props.children}
    </div>
}