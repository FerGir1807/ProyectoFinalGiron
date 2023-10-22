import React from 'react'
import "./Footer.css"

export const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Tienda Deportiva Club de Fútbol Cruz Azul | All rights reserved |
                        Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    );
}
