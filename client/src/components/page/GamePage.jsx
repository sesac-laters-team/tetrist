import Game from "../game/Game";

export default function GamePage({ owner, guest }) {
    return (
        <div className="GamePage">
            <Game rows={20} columns={10} owner={owner} guest={guest} />
        </div>
    );
}
