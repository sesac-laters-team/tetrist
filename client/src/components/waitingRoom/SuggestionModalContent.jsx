import React, { useState } from "react";
import axios from "axios";

const SuggestionModalContent = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/suggestion`,
                { title, content }
            );
            if (response.data.result) {
                alert(response.data.msg);
                closeModal();
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.error("건의사항 전송 중 오류가 발생했습니다:", error);
            alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="suggestion-container">
            <h2 className="suggestion-title">건의사항</h2>
            <form className="suggestion-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">제출</button>
            </form>
        </div>
    );
};

export default SuggestionModalContent;
