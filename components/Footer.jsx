import React from "react";

const Footer = () =>{

    const STYLE = {
        footer: {
            position:'absolute',
            bottom:'0',
            width:'100%',
            height:'40px',
            'backgroundColor': '#a5c1df',
        }    
    };

    return (
      <footer className="footer" style={STYLE.footer}>
        <span className="text-muted">All Rights Reserved 2018 @GauravD</span>
      </footer>
    );
};

export default Footer;