const RankingModalContent = ({ ranking }) => {
    return (
        <>
            <div className="ranking-title-container">
                <div className="ranking-title">랭킹</div>
            </div>
            <div className="ranking-list-container">
                <div className="ranking-list">
                    {ranking.map((rank, i) => (
                        <div key={i} className={`ranking-item rank-${i + 1}`}>
                            <span className={`medal rank-${i + 1}`}></span>
                            <span className="rank-username">
                                {rank.nickname}
                            </span>
                            <span className="rank-points">{rank.rating}점</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default RankingModalContent;
