import React from "react";
import "../../styles/footer/Footer.scss";

const Footer = () => {
    return (
        <footer className="footer-container">
            {/* <div className="logo-section">
                <img src="/images/tetrist_bc.gif" />
            </div> */}
            <div className="stack-section">
                <div>
                    <h4>Contributor</h4>
                    <ul>
                        <li>김성민</li>
                        <li>김예지</li>
                        <li>이대원</li>
                        <li>강혜인</li>
                        <li>전재민</li>
                    </ul>
                </div>
                <div>
                    <h4>Front</h4>
                    <ul>
                        <li>ReactJS</li>
                        <li>Redux</li>
                        <li>SCSS</li>
                    </ul>
                </div>

                <div>
                    <h4>Back</h4>
                    <ul>
                        <li>Javascript</li>
                        <li>Node.js</li>
                        <li>Swagger</li>
                        <li>MySQL</li>
                        <li>Socket.io</li>
                        <li>Aws</li>
                    </ul>
                </div>
            </div>

            <div className="github-icon">
                <a
                    href="https://github.com/sesac-laters-team/tetrist"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fa fa-github"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
