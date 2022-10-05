//: this is not a component


import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
})

//. AuthContext is not an component, it will contain component

export default AuthContext;