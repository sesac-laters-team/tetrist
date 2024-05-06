const ShopModalContent = ({ shopList }) => {
    // console.log("shopInfo :: ", shopList);
    // [{product_id: 1, p_name: '기본', p_type: 'profile', p_img: 'default', p_price: 0}]

    const groupItemsByType = () => {
        const groupedItems = {};
        // shopList가 유효한 경우에만 처리
        if (shopList) {
            shopList.forEach((item) => {
                const { p_type } = item;
                if (!groupedItems[p_type]) {
                    groupedItems[p_type] = [];
                }
                groupedItems[p_type].push(item);
            });
        }
        return groupedItems;
    };

    const groupedItems = groupItemsByType();

    return (
        <div className="shop-modal">
            <div className="shop-modal-header">
                <h2 className="shop-modal-title">상점</h2>
            </div>
            <div className="shop-points">Point : 1,000</div>
            <div className="shop-items">
                {/* {shopItems.map((item) => (
                  <div className="shop-item" key={item.id}>
                      <div
                          className="shop-item-color"
                          style={{
                              background: item.color,
                              borderRadius:
                                  item.title === "게임방 테마" ? "0" : "50%",
                          }}
                      ></div>
                      <div className="shop-item-title">{item.title}</div>
                      <div className="shop-item-price">{item.price}</div>
                  </div>
              ))} */}
                {Object.keys(groupedItems).map((type) => (
                    <div key={type}>
                        <span className="type-label">{type}</span>
                        {groupedItems[type].map((item, index) => (
                            <div className={`shop-item`} key={item.product_id}>
                                <div className="shop-item-color">
                                    {/* 아이템 이미지 */}
                                </div>
                                <div className="shop-item-title">
                                    {item.p_name}
                                </div>
                                <div className="shop-item-price">
                                    {item.p_price}P
                                </div>
                            </div>
                        ))}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopModalContent;
