import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../store/auth-context';

//: two ways of consume context useContext of wrap everything in tag

//> case 1
// const Navigation = (props) => {
//   return (
//     <AuthContext.Consumer>
//       {(ctx)=>{
//       return  <nav className={classes.nav}>
//       <ul>
//         {ctx.isLoggedIn && (
//           <li>
//             <a href="/">Users</a>
//           </li>
//         )}
//         {ctx.isLoggedIn && (
//           <li>
//             <a href="/">Admin</a>
//           </li>
//         )}
//         {ctx.isLoggedIn && (
//           <li>
//             <button onClick={props.onLogout}>Logout</button>
//           </li>
//         )}
//       </ul>
//     </nav>
//       }}

//     </AuthContext.Consumer>
//   );
// };

//> case 2
const Navigation = (props) => {
    const ctx = useContext(AuthContext);
    return () => {
        return (
            <nav className={classes.nav}>
                <ul>
                    {ctx.isLoggedIn && (
                        <li>
                            <a href="/">Users</a>
                        </li>
                    )}
                    {ctx.isLoggedIn && (
                        <li>
                            <a href="/">Admin</a>
                        </li>
                    )}
                    {ctx.isLoggedIn && (
                        <li>
                            <button onClick={props.onLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };
};

export default Navigation;
