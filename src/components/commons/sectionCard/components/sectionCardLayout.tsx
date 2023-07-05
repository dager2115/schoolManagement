import React from "react";
import { ISectionCardComponentProps } from "../containers/sectionCardContainer";

import '../sectionCard.scss'

const SectionCardLayout = (props: ISectionCardComponentProps) => {
    return (
        <div className="section-card" onClick={props.onClick}>
            <h1>{props.name}</h1>
        </div>
    )
}

export default SectionCardLayout