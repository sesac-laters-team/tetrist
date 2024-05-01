// 상품 목록을 나타내는 더미 데이터 배열
const shopItems = [
    // 게임방 테마
    { id: 1, color: '#95a5a6', title: '게임방 테마', price: '100P' },
    { id: 2, color: '#f39c12', title: '게임방 테마', price: '100P' },
    { id: 3, color: '#2ecc71', title: '게임방 테마', price: '100P' },
    // 프로필 테두리
    { id: 4, color: '#e74c3c', title: '프로필 테두리', price: '100P' },
    { id: 5, color: '#3498db', title: '프로필 테두리', price: '100P' },
    { id: 6, color: '#9b59b6', title: '프로필 테두리', price: '100P' },
    // 프로필 선택
    { id: 7, color: '#34495e', title: '프로필 선택', price: '100P' },
    { id: 8, color: '#16a085', title: '프로필 선택', price: '100P' },
    { id: 9, color: '#f1c40f', title: '프로필 선택', price: '100P' },
    // ...기타 아이템들
  ];
  
  const ShopModalContent = () => {
    return (
      <div className="shop-modal">
        
        <div className="shop-modal-header">
          <h2 className="shop-modal-title">상점</h2>
         
        </div>
            <div className="shop-points">Point : 1,000</div>
        <div className="shop-items">
          {shopItems.map((item) => (
            <div className="shop-item" key={item.id}>
              <div
                className="shop-item-color"
                style={{ background: item.color, borderRadius: item.title === '게임방 테마' ? '0' : '50%' }}
              ></div>
              <div className="shop-item-title">{item.title}</div>
              <div className="shop-item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ShopModalContent;
  