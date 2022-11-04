import React, { ReactElement } from "react"
import {Navigate} from "react-router-dom"

interface IPublicProps {
    children: ReactElement;
}

const PublicRoute: React.FC<IPublicProps> = ({children}) => {
    const auth: boolean = !!localStorage.getItem("id_token")
    if (auth) {
        return <Navigate to="/" />
    }
    else return children
}

export default PublicRoute;