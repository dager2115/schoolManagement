import React from "react";
import { ISectionCardComponentProps } from "../containers/sectionCardContainer";

import '../sectionCard.scss'

const SectionCardLayout = (props: ISectionCardComponentProps) => {
    return (
        <div className="section-card" onClick={props.onClick}>
            {props.icon}
            <h3>{props.name}</h3>
        </div>
    )
}

export default SectionCardLayout