import React, { Component } from "react";
import SectionCardLayout from "../components/sectionCardLayout";

export interface ISectionCardComponentProps {
    name: string
    onClick: () => void
}

class SectionCardContainer extends Component<ISectionCardComponentProps, any>{
    render() {
        return (
            <SectionCardLayout {...this.props} />
        )
    }
}

export default SectionCardContainer