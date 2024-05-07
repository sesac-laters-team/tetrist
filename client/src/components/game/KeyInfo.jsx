import React, { useState, useEffect } from "react";

const styles = {
    container: {
        display: "grid",
        placeItems: "center", // 수평 및 수직 중앙 정렬
        height: "100vh", // 화면 전체 높이
    },
    keyInfo: {
        textAlign: "center",
    },
    hidden: {
        display: "none",
    },
};

const KeyInfo = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const handleResize = () => setIsSmallScreen(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleResize);
        handleResize(); // 초기 체크를 위해 실행

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return (
        <div style={styles.container}>
            <div style={isSmallScreen ? styles.hidden : styles.keyInfo}>
                <h3>Key Controls:</h3>
                <ul>
                    <li>
                        <strong>Left Arrow:</strong> Move left
                    </li>
                    <li>
                        <strong>Right Arrow:</strong> Move right
                    </li>
                    <li>
                        <strong>Down Arrow:</strong> Soft drop
                    </li>
                    <li>
                        <strong>Up Arrow:</strong> Rotate
                    </li>
                    <li>
                        <strong>Space:</strong> Hard drop
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default KeyInfo;
