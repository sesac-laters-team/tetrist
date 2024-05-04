import Game from "../game/Game";

export default function GamePage({ roomId }) {
    return (
        <div className="GamePage">
            <Game rows={20} columns={10} roomId={roomId} />
        </div>
    );
}
