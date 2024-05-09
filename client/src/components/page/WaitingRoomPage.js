import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar";
import WaitingChat from "../chat/WaitingChat";
import axios from "axios";
import Footer from "../../components/common/footer";
axios.defaults.withCredentials = true;

// 기존 소켓 연결 유지
const socket = io.connect(`${process.env.REACT_APP_CHAT_SERVER}`, {
    autoConnect: false,
});

// 테트리스 블록 모양 및 색상 기능 추가
function getTetrisShapes() {
    return {
        I: [[1, 1, 1, 1]],
        O: [
            [1, 1],
            [1, 1],
        ],
        T: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        L: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
        J: [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1],
        ],
        S: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    };
}

function createTetrisBlock() {
    const shapes = getTetrisShapes();
    const keys = Object.keys(shapes);
    const shape = shapes[keys[Math.floor(Math.random() * keys.length)]];

    const block = document.createElement("div");
    block.className = "tetris-block";

    const colors = [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "cyan",
        "magenta",
        "lime",
        "pink",
        "teal",
        "brown",
        "navy",
        "coral",
        "gold",
        "plum",
        "violet",
        "olive",
        "maroon",
        "indigo",
        "aqua",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const rows = shape.length;
    const cols = shape[0].length;

    block.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    block.style.gridTemplateRows = `repeat(${rows}, 30px)`;

    shape.forEach((row) => {
        row.forEach((cell) => {
            const square = document.createElement("div");
            square.className = "tetris-square";
            if (cell === 1) {
                square.style.backgroundColor = color;
                block.appendChild(square);
            } else {
                const empty = document.createElement("div");
                empty.style.width = "30px";
                empty.style.height = "30px";
                block.appendChild(empty);
            }
        });
    });

    const leftPosition = Math.floor(
        Math.random() * (window.innerWidth - cols * 30)
    );
    const topPosition = -50;

    block.style.left = `${leftPosition}px`;
    block.style.top = `${topPosition}px`;
    block.style.animationDuration = `${Math.floor(Math.random() * 6) + 5}s`;

    return block;
}

function addFallingBlock() {
    const block = createTetrisBlock();
    if (!block) return;

    const container = document.querySelector(".waiting-room"); // 컨테이너 지정
    container.appendChild(block); // 컨테이너에 추가

    block.addEventListener("animationend", () => {
        block.remove();
    });
}

export default function WaitingRoomPage() {
    useEffect(() => {
        const interval = setInterval(addFallingBlock, 1000);
        return () => clearInterval(interval);
    }, []);

    const dispatch = useDispatch();

    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    const [createModal, setCreateModal] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // 기본값은 흰색
    const outside = useRef();

    // 페이지 로드 시 배경색 가져오기
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_SERVER}/shop/user`)
            .then((response) => {
                console.log("바뀐 배경 색 >> ", response.data.data.theme);
                setBackgroundColor(response.data.data.theme);
            })
            .catch((error) => {
                console.error("Error getting modal background color:", error);
            });
    }, [backgroundColor]);

    return (
        <div
            className="waiting-room"
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="logo-and-menubar">
                <img
                    src="/images/tetrist_logo.gif"
                    alt="LOGO"
                    class="logo-img"
                />
                <Menubar socket={socket} />
            </div>
            <br />

            <div className="ListTitle">
                <span className="roomListTitle">방 목록</span>
                <button
                    onClick={() => setCreateModal(true)}
                    className="btnJoin"
                >
                    방 만들기
                </button>
            </div>

            <RoomList socket={socket} />

            <div>
                <WaitingChat socket={socket}></WaitingChat>
            </div>

            {createModal && (
                <div
                    className="modal-outside"
                    ref={outside}
                    onClick={(e) => {
                        if (e.target === outside.current) {
                            setCreateModal(false);
                        }
                    }}
                >
                    <div className="create-modal">
                        {createModal === true ? (
                            <CreateRoom
                                socket={socket}
                                setCreateModal={setCreateModal}
                            />
                        ) : null}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
