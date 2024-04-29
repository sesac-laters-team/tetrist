const RankingModalContent = () => {
  const rankings = [
    { id: 1, username: "user1", points: 3000 },
    { id: 2, username: "user2", points: 2500 },
    { id: 3, username: "user3", points: 2000 },
  ];

  return (
    <>
      <div className="ranking-title-container">
        <div className="ranking-title">랭킹</div>
      </div>
      <div className="ranking-list-container">
        <div className="ranking-list">
          {rankings.map((rank) => (
            <div key={rank.id} className={`ranking-item rank-${rank.id}`}>
              <span className={`medal rank-${rank.id}`}></span>
              <span className="rank-username">{rank.username}</span>
              <span className="rank-points">{rank.points}점</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default RankingModalContent;
